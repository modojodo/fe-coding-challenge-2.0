<template>
  <div class="pane">
    <h3 class="nodeTitle">{{ title }}</h3>
    <div class="nodeContent" v-html="content"></div>
    <div class="question-panel">
      <div v-if="fields.length" class="content-answer">
        <ul class="answers">
          <li v-for="(field, index) in fields" :key="index">
            <Field :data="field" @update="updateFieldVal" :selected="variableValue"/>
          </li>
        </ul>
      </div>
      <div v-if="buttons.length" class="content-answer">
        <ul class="answers">
          <li v-for="button in buttons" :key="button.id">
            <survey-button :data="button" @next="goToNext"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import SurveyButton from "@/components/SurveyButton";
import Field from "@/components/Field";

export default {
  name: "Node",
  components: { Field, SurveyButton },
  data() {
    return {
      fieldVal: null,
    };
  },
  computed: {
    ...Vuex.mapState({
      node(state) {
        return state.survey.nodes ? state.survey.nodes[this.$route.params.node] : {};
      },
      activeNodeId: state => state.activeNodeId,
      variables: state => state.variables,
      nodeHistory: state => state.nodeHistory,
      hasVariable() {
        return this.node && this.node.variable
      },
      variableValue(state) {
        return this.hasVariable ? state.variables[this.node.variable] : null;
      },
      allNodes: state => state.survey.nodes,
    }),
    buttons() {
      return this.node.buttons || [];
    },
    fields() {
      return this.node.formfields || [];
    },
    title() {
      const { node, parseVariables } = this;
      return node.page_title ? parseVariables(node.page_title) : '';
    },
    content() {
      const { node, parseVariables } = this;
      return node.content ? parseVariables(node.content) : '';
    },

  },
  methods: {
    ...Vuex.mapActions(['updateVariables', 'updateActiveNode']),
    goToNext(targetId, value) {
      // Store answer in the given variable
      this.updateStoreVariables(value);

      // Set the node to next one
      this.nextNode(targetId)
    },
    nextNode(id) {
      // Set the node & update route
      this.updateActiveNode(id);
      this.$router.push({ params: { node: this.activeNodeId } });
    },
    parseVariables(str) {
      Object.keys(this.variables).forEach((val) => {
        const variable = `#${val}#`;
        while (str.indexOf(variable) >= 0) {
          str = str.replace(variable, this.variables[val])
        }
      })
      return str;
    },
    updateFieldVal(val) {
      this.fieldVal = val;
    },
    updateStoreVariables(value) {
      // Decide whether to update variable with field or button value
      const { node, updateVariables, fieldVal, hasVariable } = this;
      if (hasVariable) {
        const variableValue = fieldVal || value;
        updateVariables({ [node.variable]: variableValue });
      }
    },
    handleConditions() {
      const { node, nodeHistory, allNodes, nextNode } = this;
      let isConditionMet = false;
      let targetId = 0;
      if (node.conditions) {
        // TODO
        // Go through each condition to decide the path forward
        for (let i = 0; i < node.conditions.length; i++) {
          const { operator, target_node_id } = node.conditions[i];
          switch (operator) {
            case "eq": {
              const sourceNode = nodeHistory[nodeHistory.length - 2];
              const isMatched = allNodes[sourceNode].formfields.some(field => field.name === node.conditions[i].variable && field.checked);
              if (isMatched) {
                isConditionMet = true;
                targetId = target_node_id;
              }
              break;
            }
            case "default": {
              isConditionMet = true;
              targetId = target_node_id;
            }
          }
          if (isConditionMet) {
            break;
          }
        }
        if (targetId) {
          nextNode(targetId)
        }
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    // Guard against user entered nodes in the URL
    const { params: { node } } = to;
    if (node !== this.activeNodeId && !(this.nodeHistory.indexOf(node) >= 0)) {
      this.$router.go(-1)
      next();
    } else {
      next();
    }
  },
  watch: {
    '$route.params.node': function () {
      this.handleConditions()
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul.answers {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul.answers li {
  padding: 0;
  margin: 10px 0;
}

.nodeContent {
  text-align: justify;
}

.nodeQuestion {
  background: azure;
  font-weight: bold;
  font-style: italic;
  padding: 10px;
  margin-top: 20px;
}
</style>

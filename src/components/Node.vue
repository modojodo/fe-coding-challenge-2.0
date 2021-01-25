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
      this.updateActiveNode(targetId);
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
    }
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
  mounted() {
    if (this.node.conditions) {
      // TODO

    }
  },
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

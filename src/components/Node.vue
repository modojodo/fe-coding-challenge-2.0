<template>
  <div class="pane">
    <h3 class="nodeTitle">{{ title }}</h3>
    <div class="nodeContent" v-html="content"></div>
    <div class="question-panel">
      <div v-if="fields.length" class="content-answer">
        <ul class="answers">
          <li v-for="(field, index) in fields" :key="index">
            <Field :data="field"/>
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
      btnVal: null,
    };
  },
  computed: {
    ...Vuex.mapGetters({
      node: 'activeNode'
    }),
    ...Vuex.mapState(['variables']),
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
      if (this.node.variable) {
        this.updateVariables({ [this.node.variable]: value });
      }

      // Set the node to next one
      this.updateActiveNode(targetId);
    },
    parseVariables(str) {
      Object.keys(this.variables).forEach((val) => {
        const variable = `#${val}#`;
        while (str.indexOf(variable) >= 0) {
          str = str.replace(variable, this.variables[val])
        }
      })
      return str;
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

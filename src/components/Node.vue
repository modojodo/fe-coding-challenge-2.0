<template>
  <div class="pane">
    <h3 class="nodeTitle">{{ node.page_title }}</h3>
    <div class="nodeContent" v-html="node.content"></div>
    <div class="question-panel">
      <div v-if="buttons.length" class="content-answer">
        <ul class="answers">
          <li v-for="button in buttons" :key="button.id">
            <survey-button :data="button"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import SurveyButton from "@/components/SurveyButton";

export default {
  name: "Node",
  components: { SurveyButton },
  data() {
    return {};
  },
  computed: {
    ...Vuex.mapGetters({
      node: 'activeNode'
    }),
    buttons() {
      return this.node.buttons || []
    },
  },
  methods: {}
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

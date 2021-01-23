<template>
  <div class="pane">
    <h3 class="nodeTitle">{{ this.node.page_title }}</h3>
    <div class="nodeContent" v-html="this.node.content"></div>
    <div class="question-panel">
      <div v-if="buttons.length" class="content-answer">
        <ul class="answers">
          <li v-for="b in buttons" :key="b.id">
            <a class="btn btn-zingtree col-2" href="#">{{ b.button_text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: "Node",
  data() {
    return {
      store: store,
      sharedState: store.state
    }
  },
  computed: {
    buttons() {
      return this.node.buttons || []
    },
    node() {
      return this.sharedState.survey.nodes[this.sharedState.activeNodeId] || {}
    }
  },
  methods: {

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

a.btn {
  display: flex;
  padding: 10px 7px;
  background: #0e5a38;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  justify-content: center;
}

a.btn .col-2 {
  width: 50%;
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

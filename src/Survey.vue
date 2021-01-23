<template>
  <div id="app">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
      <div class="survey">
        <h1>{{ survey.name }}</h1>
        <Node />
      </div>
    </div>
  </div>
</template>

<script>
import store from './store'
import Node from './components/Node'

export default {
  name: 'Survey',
  components: { Node },
  data() {
    return {
      sharedState: store.state,
      loading: false
    }
  },
  computed: {
    survey() {
      return this.sharedState.survey
    },
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading {
  font-size: 35px;
}

.survey {
  max-width: 600px;
  margin: 0 auto;
}

.report {
  text-align: left;
  background: #2c3e50;
  color: white;
}

@media screen and (max-device-width: 767px){
    #app {
        margin: 20px;
    }
}
</style>

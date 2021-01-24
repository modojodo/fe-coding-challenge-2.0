<template>
  <div id="app">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
      <div class="survey">
        <h1>{{ survey.name }}</h1>
        <Node/>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import Node from './components/Node'

export default {
  name: 'Survey',
  components: { Node },
  data() {
    return {
      sharedState: this.$store.state,
      loading: false,
      surveyEndpoint: 'https://zt-eng.s3.us-east-1.amazonaws.com/fe-challenge/survey.json',
    }
  },
  computed: {
    ...Vuex.mapState({
      survey: state => state.survey,
    }),
  },
  methods: {
    ...Vuex.mapActions(['updateNodes']),
    toggleLoading() {
      this.loading = !this.loading;
    }
  },
  mounted() {
    this.toggleLoading();
    // Fire API Call to fetch data
    fetch(this.surveyEndpoint)
        .then(res => res.json())
        .then((surveyData) => {
          // Update state with received data
          this.updateNodes(surveyData.nodes)
              .then(() => this.toggleLoading());
        });
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

@media screen and (max-device-width: 767px) {
  #app {
    margin: 20px;
  }
}
</style>

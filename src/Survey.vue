<template>
  <div id="app">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-else>
      <div class="survey">
        <h1>{{ surveyName }}</h1>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: 'Survey',
  data() {
    return {
      loading: false,
      surveyEndpoint: 'https://zt-eng.s3.us-east-1.amazonaws.com/fe-challenge/survey.json',
    }
  },
  computed: {
    ...Vuex.mapState({
      surveyName: state => state.survey.name,
    }),
  },
  methods: {
    ...Vuex.mapActions(['updateNodes', 'reset']),
    toggleLoading() {
      this.loading = !this.loading;
    },
    addStyles(url) {
      const linkTag = document.createElement('link');
      linkTag.type = "text/css";
      linkTag.rel = "stylesheet";
      linkTag.href = url
      document.getElementsByTagName("head")[0].appendChild(linkTag);
    }
  },
  mounted() {
    this.reset();
    this.toggleLoading();
    // Fire API Call to fetch data
    fetch(this.surveyEndpoint)
        .then(res => res.json())
        .then((surveyData) => {
          // Add styles received from the API
          this.addStyles(surveyData.css_include);

          // Update state with received data
          this.updateNodes(surveyData.nodes)
              .then(() => {
                this.toggleLoading();
                this.$router.push({ name: 'survey-node', params: { node: this.$store.state.activeNodeId } });
              });
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

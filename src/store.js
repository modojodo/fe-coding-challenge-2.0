import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    survey: {
      "name": "COVID-19 self checker",
    },
    activeNodeId: null
  },
  actions: {
    updateNodes({ commit }, newNodes) {
      // Update nodes with new data from the API
      commit('UPDATE_NODES', newNodes);
      // Set active node to 1 whenever data updates
      commit('UPDATE_ACTIVE_NODE', 1);
    }
  },
  mutations: {
    UPDATE_NODES(state, nodes) {
      state.survey.nodes = nodes
    },
    UPDATE_ACTIVE_NODE(state, nodeNumber) {
      state.activeNodeId = nodeNumber;
    }
  },
  getters: {
    activeNode: state => state.activeNodeId ? state.survey.nodes[state.activeNodeId] : {},
  }
});

export default store
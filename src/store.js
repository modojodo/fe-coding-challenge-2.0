import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    survey: {
      "name": "COVID-19 self checker",
    },
    activeNodeId: null,
  },
  actions: {
    updateNodes({ commit }, newNodes) {
      // Get list of all variables
      const variables = [];
      for (const [, val] of Object.entries(newNodes)) {
        if (val.variable) {
          variables.push(val.variable);
        }
      }
      // Replace variables with Vue interpolation
      for (const [key, val] of Object.entries(newNodes)) {
        variables.forEach(variable => {
          if (val.content && val.content.includes(variable)) {
            newNodes[key].content = val.content.replace(`#${variable}#`, `{{${variable}}}`)
          }

          if (val.page_title && val.page_title.includes(variable)) {
            newNodes[key].page_title = val.page_title.replace(`#${variable}#`, `{{${variable}}}`)
          }
        });
      }

      // Update nodes with new data from the API
      commit('UPDATE_NODES', newNodes);
      // Set active node to 1 whenever data updates
      commit('UPDATE_ACTIVE_NODE', 1);
    },
    updateActiveNode({ commit }, nodeNumber) {
      commit('UPDATE_ACTIVE_NODE', nodeNumber);
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
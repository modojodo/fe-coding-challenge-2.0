import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);
const initialState = {
  survey: {
    "name": "COVID-19 self checker",
  },
  activeNodeId: null,
  variables: {},
  nodeHistory: [],
};


const store = new Vuex.Store({
  state: {
    ...initialState,
  },
  actions: {
    updateNodes({ commit }, newNodes) {
      // Get list of all variables, initialize them into the state for Vuex reactivity to kick in
      const variables = {};
      for (const [, val] of Object.entries(newNodes)) {
        if (val.variable) {
          variables[val.variable] = null;
        }
      }
      commit('UPDATE_VARIABLES', variables);
      // Update nodes with new data from the API
      commit('UPDATE_NODES', newNodes);
      // Set active node to 1 whenever data updates
      commit('UPDATE_ACTIVE_NODE', 1);
    },
    updateActiveNode({ commit }, nodeNumber) {
      commit('UPDATE_ACTIVE_NODE', nodeNumber);
      commit('UPDATE_NODE_HISTORY', nodeNumber);
    },
    updateVariables({ commit }, variable) {
      commit('UPDATE_VARIABLES', variable);
    },
    updateCheckbox({ commit }, payload) {
      commit('UPDATE_Field_VALUE', payload);
    },
    reset({ commit }) {
      commit('RESET_STATE');
    }
  },
  mutations: {
    UPDATE_NODES(state, nodes) {
      state.survey.nodes = nodes
    },
    UPDATE_ACTIVE_NODE(state, nodeNumber) {
      state.activeNodeId = nodeNumber;
    },
    UPDATE_VARIABLES(state, variable) {
      Vue.set(state, 'variables', {
        ...state.variables,
        ...variable,
      });
    },
    UPDATE_NODE_HISTORY(state, nodeNumber) {
      state.nodeHistory.push(nodeNumber);
    },
    UPDATE_Field_VALUE(state, { name, isChecked, nodeId }) {
      state.survey.nodes[nodeId].formfields.find(field => field.name === name).checked = isChecked;
    },
    RESET_STATE(state) {
      Vue.set(state, '', initialState);
    }
  },
  getters: {
    activeNode: state => state.activeNodeId ? state.survey.nodes[state.activeNodeId] : {},
  }
});

export default store
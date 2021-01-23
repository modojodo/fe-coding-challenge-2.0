import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    survey: {
      "name": "COVID-19 self checker",
      "root_node_id": "1",
      "nodes": {
        "0": {
          "page_title": "Welcome",
          "content": "<p>The purpose of the Coronavirus Self-Checker is to help you make decisions about seeking appropriate medical care. This system is not intended for the diagnosis or treatment of disease or other conditions, including COVID-19. This system is intended only for people who are currently located in the United States.</p><p><strong style=\u0027box-sizing: border-box; font-weight: 700; color: rgb(0, 0, 0); font-family: \"Open Sans\"; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;\u0027>This information is provided to you as a template and representation of content from the CDC. It is not meant to be all-inclusive with regard to medical guidance. Please see the <a href=\"https://www.cdc.gov/coronavirus/2019-ncov/index.html\" rel=\"noopener noreferrer\" style=\"box-sizing: border-box; color: rgb(149, 175, 0); font-weight: 600; text-decoration: none; user-select: auto;\" target=\"_blank\" title=\"\">Centers For Disease Control website</a> for the most up to date guidelines and information. Contact your doctor if you are sick.</strong></p>",
          "buttons": [
            {
              "button_text": "I agree",
              "target_node_id": "3",
              "value": "agree",
            },
            {
              "button_text": "I don\u0027t agree",
              "target_node_id": "2",
              "value": "disagree",
            }
          ]
        }
      }
    },
    activeNodeId: 0
  }
});

export default store
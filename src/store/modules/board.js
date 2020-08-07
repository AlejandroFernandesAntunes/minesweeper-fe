import { createNamespacedHelpers } from 'vuex';
import fetchBoard from '../../queries/board';
import apolloClient from '../../vue-apollo';
import _get from 'lodash/get';
export const namespacedHelper = createNamespacedHelpers('board');

const state = {
  gameBoard: null,
};

const actions = {
  fetchBoard(context, options) {
    context.commit('fetchBoard', options);
  },
  openCell({ state, commit }, { row, col }) {
    let pattern = state.pattern
    let cell = pattern[row][col]

    commit("setCellShow", cell)
  }
};

const getters = {
  getPattern(state) {
    return state.pattern
  },
};

const mutations = {
  setCellShow(_, cell) {
    cell.show = true
  },
  fetchBoard(state, options) {
    fetchBoard({
      apollo: apolloClient.defaultClient,
      rows: options['rows'],
      cols: options['cols'],
      difficulty: options['difficulty']
    })
      .then(response => _get(response, 'data.fetchBoard', {}))
      .then(response => {
        var structuredBoard = [];
        Object.keys(response).forEach(function (key) {
          let rowWithCells = response[key].map(function (cell) {
            return { data: cell, show: false }
          });
          structuredBoard.push(rowWithCells);
        })
        state.gameBoard = structuredBoard;
      });
  }
};


export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
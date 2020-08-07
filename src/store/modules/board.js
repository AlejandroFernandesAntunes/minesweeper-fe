import { createNamespacedHelpers } from 'vuex';
export const namespacedHelper = createNamespacedHelpers('board');

const state = {
  cellsData: [0, 0, 0, 0, "X"], //4:1
  pattern: null,
  size: 8
};

const actions = {
  async setPattern({ state, commit, dispatch }) {
    let pattern = []
    let size = state.size

    for (let rowIdx = 0; rowIdx < size; rowIdx++) {
      let subPattern = await dispatch("setSubPattern",
        {
          rowIdx: rowIdx,
          pattern: pattern
        });
      pattern.push(subPattern);
    }

    commit("setPatternState", pattern)
  },
  async setSubPattern({ state }, { rowIdx, pattern }) {
    let size = state.size
    let subPattern = []

    for (let colIdx = 0; colIdx < size; colIdx++) {
      // get random number
      let random = Math.floor(Math.random() * state.cellsData.length);
      let cell = state.cellsData[random];

      // change inserted cell value based on previous inserted value or vice versa
      // if previous cell value is "X" or "bomb", increment the inserted cell value
      // if inserted value is number and previous cell value is "X", add previous cell value
      let prevCell = subPattern[colIdx - 1];
      if (prevCell) {
        if (typeof cell === "string" && typeof prevCell === "number") subPattern[colIdx - 1] = prevCell + 1;
        if (typeof cell === "number" && typeof prevCell == "string") cell += 1;
      }

      // same method, but for previous row
      if (rowIdx > 0) {
        let prevUpperLeft = pattern[rowIdx - 1][colIdx - 1];
        let prevUpperRight = pattern[rowIdx - 1][colIdx + 1];
        let prevUpperCenter = pattern[rowIdx - 1][colIdx];

        if (prevUpperLeft) {
          typeof cell === "string"
            ? typeof prevUpperLeft === "number" ? pattern[rowIdx - 1][colIdx - 1] = prevUpperLeft + 1 : prevUpperLeft
            : typeof prevUpperLeft === "string" ? cell += 1 : cell;
        }
        if (prevUpperRight) {
          typeof cell === "string"
            ? typeof prevUpperRight === "number" ? pattern[rowIdx - 1][colIdx + 1] = prevUpperRight + 1 : prevUpperRight
            : typeof prevUpperRight === "string" ? cell += 1 : cell;
        }
        if (prevUpperCenter) {
          typeof cell === "string"
            ? typeof prevUpperCenter === "number" ? pattern[rowIdx - 1][colIdx] = prevUpperCenter + 1 : prevUpperCenter
            : typeof prevUpperCenter === "string" ? cell += 1 : cell;
        }
      }
      subPattern.push({cell, show: false});
    }
    return subPattern;
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
  }
};

const mutations = {
  setPatternState(state, pattern) {
    state.pattern = pattern
  },
  setCellShow(_, cell) {
    cell.show = true
  }
};


export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};
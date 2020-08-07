<template>
  <v-container>
    <v-row no-gutters v-for="(row, rowIndex) in this.gameBoard" :key="rowIndex" justify="center">
      <template v-for="(col, colIndex) in row">
        <v-hover v-slot:default="{ hover }" :key="colIndex">
          <v-col>
            <v-card
              :class="[{'hovered-cell': hover},'cell','flex-center']"
              elevation="3"
              outlined
              @click.left.prevent="openCell({row: rowIndex,col: colIndex})"
            >
              <div v-if="col.show">
                <span class="font-weight-bold">{{ col.data }}</span>
              </div>
            </v-card>
          </v-col>
        </v-hover>
      </template>
    </v-row>
    <v-row align="center">
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="form.rows" label="Rows" :rules="valuesRules" required></v-text-field>

        <v-text-field v-model="form.cols" label="Cols" :rules="valuesRules" required></v-text-field>
        <v-text-field v-model="form.difficulty" label="Difficulty" :rules="valuesRules" required></v-text-field>

        <v-btn color="success" class="mr-4" @click="newBoard">New Board</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Board",
  data: () => ({
    valid: true,
    valuesRules: [
      (val) =>
        (val && parseInt(val) <= 15 && parseInt(val) >= 1) ||
        "Please enter a value between 1 and 15",
    ],
    form: {},
  }),
  computed: {
    ...mapState("board", ["gameBoard"]),
  },
  methods: {
    ...mapActions("board", ["openCell", "fetchBoard"]),
    newBoard() {
      this.fetchBoard(this.form);
    },
  },
  created() {
    this.fetchBoard({ rows: 10, cols: 10, difficulty: 3 });
  },
};
</script>

<style lang="scss" scoped>
.cell {
  border-radius: 0px !important;
  height: 3rem;
  width: 3rem;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col {
  flex-grow: 0;
}
.hovered-cell {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.01) !important;
}
</style>

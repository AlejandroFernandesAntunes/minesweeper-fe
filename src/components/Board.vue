<template>
  <v-container>
    <v-row no-gutters v-for="(row, rowIndex) in getPattern" :key="rowIndex" justify="center">
      <template v-for="(col, colIndex) in row">
        <v-hover v-slot:default="{ hover }" :key="colIndex">
          <v-col>
            <v-card
              :class="[{'hovered-cell': hover},'cell','flex-center']"
              elevation="3"
              outlined
              @click.left.prevent="openCell({
      row: row_idx,
      col: col_idx
    })"
            ><div v-if="col.show">
        <span class="font-weight-bold">{{ col.data }}</span>
      </div></v-card>
          </v-col>
        </v-hover>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Board",
  computed: {
    ...mapGetters("board", ["getPattern"]),
  },
  methods: {
    ...mapActions("board", ["setPattern", "openCell"]),
  },
  created() {
    this.setPattern();
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
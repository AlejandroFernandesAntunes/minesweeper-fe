<template>
  <v-container>
    <v-row no-gutters v-for="(row, rowIndex) in 8" :key="rowIndex" justify="center">
      <template v-for="(col, colIndex) in 8">
        <v-hover v-slot:default="{ hover }" :key="colIndex">
          <v-col>
            <v-card :class="[{'hovered-cell': hover},'cell','flex-center']" elevation="3" outlined></v-card>
          </v-col>
        </v-hover>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Board",
  methods: {
    ...mapActions("board",["setPattern"]),
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
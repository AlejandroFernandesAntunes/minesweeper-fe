<template>
  <v-app>
    <v-main class="ma-12">
      <Board/>
    </v-main>
  </v-app>
</template>

<script>
import Board from './components/Board';

export default {
  name: 'App',

  components: {
    Board
  },

  data: () => ({
    //
  }),
};
</script>

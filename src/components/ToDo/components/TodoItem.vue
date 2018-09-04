<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title v-text="item.title"></v-list-tile-title>
      <v-list-tile-sub-title>{{ item.content }}</v-list-tile-sub-title>
      <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action class="todo-app_tile-action">
      <v-btn icon>
        <v-icon v-if="item.completed" color="grey lighten-1">done</v-icon>
        <v-icon v-if="!item.completed" color="grey lighten-1">info</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["item"],
  data() {
    return {};
  },
  methods: {}
});
</script>
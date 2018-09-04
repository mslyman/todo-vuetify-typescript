<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <!-- <v-card-title class="headline">Confirm</v-card-title> -->
      <v-card-text class="subheading">{{title}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="btnCancelClick()">
          CANCEL
        </v-btn>
        <v-btn color="primary" flat @click="btnOkClick()">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
type IConfirmDialogCallback = null | (() => void);
export interface IConfirmDialog {
  show: (title: string, callback: IConfirmDialogCallback) => void;
}
// Non - reactive members
interface IStatic {
  callback: IConfirmDialogCallback;
}
// Reactive members
interface IData {
  dialog: boolean;
  title: string;
}
var v = Vue.extend({
  props: {},
  data() {
    var d: IData = {
      dialog: false,
      title: ""
    };
    return d;
  },
  created: function() {
    // The hook is called Vue has already finished the observation phase
    var that: IStatic = <any>this;
    that.callback = null;
  },
  methods: {
    show(title: string, callback: IConfirmDialogCallback) {
      this.title = title;
      this.dialog = true;
      var that: IStatic = <any>this;
      that.callback = callback;
    },
    btnOkClick() {
      this.dialog = false;
      var that: IStatic = <any>this;
      if (that.callback) {
        that.callback();
      }
    },
    btnCancelClick() {
      this.dialog = false;
    }
  }
});
export default v;
</script>

<style lang="scss">
</style>
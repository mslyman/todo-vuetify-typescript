<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-form ref="form" v-model="valid" id="todo-item-form">
        <v-card-text>
          <v-text-field v-model="newItem.title" :readonly="newItem.completed" :rules="titleRules" required :label="titleLabel" :clearable="isNew" ref="txtTitle"></v-text-field>
          <v-textarea v-model="newItem.content" v-if="isTxtContentVisible || !isNew" :readonly="newItem.completed" rows="1" auto-grow label="Task content" hint="Task content" prepend-icon="notes" :clearable="isNew" ref="txtContent"></v-textarea>

          <v-dialog v-if="isDateVisible || !isNew" :disabled="newItem.completed" ref="dateDialog" v-model="dlgDateOpen" :return-value.sync="newItem.date" persistent lazy full-width width="290px">
            <v-text-field slot="activator" v-model="newItem.date" label="Date" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-if="isDateVisible || !isNew" v-model="newItem.date" scrollable no-title>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dlgDateOpen = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dateDialog.save(newItem.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

        </v-card-text>

        <v-card-actions>

          <v-speed-dial v-if="isNew" v-model="fab" direction="right" transition="slide-x-transition">
            <v-btn class="" slot="activator" v-model="fab" small color="primary" fab light flat>
              <v-icon>add_circle</v-icon>
              <v-icon>cancel</v-icon>
            </v-btn>
            <v-btn @click.stop.prevent="btnContentClick()" fab flat small>
              <v-icon>notes</v-icon>
            </v-btn>
            <v-btn @click.stop.prevent="btnDateClick()" fab flat small>
              <v-icon>event</v-icon>
            </v-btn>
          </v-speed-dial>

          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" v-if="!isNew && !newItem.completed" flat @click="complete()">Complete</v-btn>
          <v-btn :disabled="!valid" v-if="!newItem.completed" color="primary" flat @click="save()">Save</v-btn>
          <v-btn v-if="newItem.completed" color="primary" flat @click="hide()">Close</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <confirm-dialog ref="confirmDialog" />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Todo } from "../store";
import ConfirmDialog, { IConfirmDialog } from "./ConfirmDialog.vue";
export interface INewTaskDialog {
  show: (item: Todo) => void;
  hide: () => void;
}
export default Vue.extend({
  components: {
    ConfirmDialog
  },
  props: {},
  data() {
    var newItem: Todo = {
      id: -1,
      title: "",
      content: "",
      date: null,
      completed: false
    };
    return {
      newItem: newItem,
      dialog: false,
      titleRules: [(v: any) => !!v || "Title is required"],
      valid: true,
      titleLabel: "",
      fab: false,
      isTxtContentVisible: false,
      isDateVisible: false,
      dlgDateOpen: false
    };
  },
  watch: {},
  computed: {
    isNew(): boolean {
      return !!(this.newItem.id === -1);
    }
  },
  methods: {
    show(item: Todo) {
      var form = <any>this.$refs.form;
      if (item) {
        this.newItem.id = item.id;
        this.newItem.title = item.title;
        this.newItem.completed = item.completed;
        this.newItem.content = item.content;
        this.newItem.date = item.date;
        this.titleLabel = "Task";
      } else {
        this.newItem.id = -1;
        this.newItem.title = "";
        this.newItem.completed = false;
        this.newItem.content = "";
        this.newItem.date = null;
        this.titleLabel = "New task";
        this.isTxtContentVisible = false;
        this.isDateVisible = false;
        this.fab = false;
        form.reset();
      }
      this.dialog = true;
      if (this.newItem.id === -1) {
        this.$nextTick(() => {
          var txtTitle = <any>this.$refs.txtTitle;
          txtTitle.focus();
        });
      }
    },
    hide() {
      this.dialog = false;
    },
    btnContentClick() {
      this.isTxtContentVisible = true;
      this.$nextTick(() => {
        var inp = <any>this.$refs.txtContent;
        inp.focus();
      });
    },
    btnDateClick() {
      this.isDateVisible = true;
      this.$nextTick(() => {
        this.dlgDateOpen = true;
      });
    },
    save() {
      var form = <any>this.$refs.form;
      if (form.validate()) {
        this.dialog = false;
        this.$emit("result", this.newItem);
      } else {
        console.error("validation error");
      }
    },
    complete() {
      var dlg: IConfirmDialog = <any>this.$refs.confirmDialog;
      dlg.show("Complete and save?", () => {
        var form = <any>this.$refs.form;
        if (form.validate()) {
          this.newItem.completed = true;
          this.save();
        }
      });
    }
  }
});
</script>

<style lang="scss">
#todo-item-form {
  .v-btn--floating.v-btn--small .v-icon {
    font-size: 24px;
  }
  .v-speed-dial__list {
    margin-left: 4px;
  }
}
</style>
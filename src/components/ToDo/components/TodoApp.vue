<template>

  <v-app class='v-app'>
    <!-- <v-container fluid grid-list-lg> -->
    <n-icons />
    <v-navigation-drawer right clipped v-model="rightDrawer" app>
      <v-list>

        <v-subheader>Sort</v-subheader>

        <v-list-tile @click.stop="sort(0)" inset>
          <v-list-tile-content>
            <v-list-tile-title>
              <span class="v-app_lspc">By alphabet</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon v-if="sortMode == 0">done</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile @click.stop="sort(1)" inset>
          <v-list-tile-content>
            <v-list-tile-title>
              <span class="v-app_lspc">By date</span>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon v-if="sortMode == 1">done</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click.stop="deleteCompleted()" v-if="completedExists">
          <v-list-tile-content>
            <v-list-tile-title>Delete completed</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed app clipped-right>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">To do</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn> -->
      <v-btn icon @click="rightDrawer=!rightDrawer">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>

      <v-container fluid fill-height>

        <v-layout row>
          <v-flex xs12 sm8 offset-sm2 md6 offset-md3>

            <div class="v-app_splash" v-if="!(completedExists || !!remaining.length)"><img src="@/assets/task_scheduling.png" alt=""></div>

            <v-list v-if="completedExists || !!remaining.length" two-line subheader>
              <todo-item v-for="item of remaining" :key="item.id" @click.native="showDialog(item)" :item="item" />

              <v-subheader v-if="completedExists" @click="isShowCompleted=!isShowCompleted">Completed ({{completed.length}})
                <v-spacer></v-spacer>
                <v-icon v-if="!isShowCompleted">keyboard_arrow_down</v-icon>
                <v-icon v-if="isShowCompleted">keyboard_arrow_up</v-icon>
              </v-subheader>

              <todo-item v-for="item of completed" :key="item.id" v-if="isShowCompleted" @click.native="showDialog(item)" :item="item" />
            </v-list>

          </v-flex>
        </v-layout>

      </v-container>
      <confirm-dialog ref="confirmDialog" />
    </v-content>

    <v-footer color="none" app>
      <v-spacer></v-spacer>
      <div class="v-app_btn-add-wr">
        <v-btn @click="showDialog(null)" color="secondary" dark fab>
          <!-- <v-icon>add</v-icon> -->
          <n-icon>icon-plus</n-icon>
        </v-btn>
      </div>
    </v-footer>

    <new-task-dialog @result="onDialogResult" ref="newTaskDialog" />
  </v-app>

</template>

<script lang="ts">
import Vue from "vue";
import { AppState, FilterType } from "../models";
import { Store, Todo } from "../store";
import NewTaskDialog, { INewTaskDialog } from "./NewTaskDialog.vue";
import TodoItem from "./TodoItem.vue";
import ConfirmDialog, { IConfirmDialog } from "./ConfirmDialog.vue";

const enum SortMode {
  Alphabet = 0,
  Date = 1
}

export default Vue.extend({
  components: {
    NewTaskDialog,
    TodoItem,
    ConfirmDialog
  },
  props: [],

  data() {
    const initialState = {
      filterType: FilterType.All,
      sharedState: Store.state,
      rightDrawer: null,
      isShowCompleted: false,
      sortMode: SortMode.Alphabet
    };
    return initialState;
  },
  methods: {
    showDialog(item: Todo) {
      var dlg: INewTaskDialog = <any>this.$refs.newTaskDialog;
      dlg.show(item);
    },
    onDialogResult(newItem: Todo) {
      var dlg: INewTaskDialog = <any>this.$refs.newTaskDialog;
      dlg.hide();
      const title = newItem ? newItem.title.trim() : "";
      if (!title) {
        return;
      }
      if (newItem.id === -1) {
        // New item
        var item: Todo = {
          id: newItem.id,
          completed: newItem.completed,
          content: newItem.content,
          date: newItem.date,
          title
        };
        Store.addTodo(item);
      } else {
        // Edit
        Store.modifyTodo(newItem.id, newItem);
      }
    },
    deleteCompleted() {
      var dlg: IConfirmDialog = <any>this.$refs.confirmDialog;
      dlg.show("Delete all completed items?", () => {
        Store.deleteCompleted();
        this.rightDrawer = null;
      });
    },
    removeTodo(id: number) {
      console.log(`deleting #${id}`);
      Store.removeTodo(id);
    },
    filterChange(filterType: FilterType) {
      this.filterType = filterType;
    },
    sort(sortMode: SortMode) {
      this.sortMode = sortMode;
    },
    sortTodos(todos: Todo[]) {
      if (this.sortMode === SortMode.Alphabet) {
        return todos.sort(
          (x, y) => (x.title > y.title ? 1 : x.title < y.title ? -1 : 0)
        );
      } else {
        return todos.sort((x, y) => {
          var d1 = x.date,
            d2 = y.date;
          var t1: string = d1 ? d1 : "9",
            t2: string = d2 ? d2 : "9";
          return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
        });
      }
    }
  },
  computed: {
    todos(): Todo[] {
      return this.sharedState.todos;
    },
    remaining(): Todo[] {
      var a = this.todos.filter(todo => !todo.completed);
      return this.sortTodos(a);
    },
    completed(): Todo[] {
      var a = this.todos.filter(todo => todo.completed);
      return this.sortTodos(a);
    },
    completedExists(): boolean {
      return !!this.completed.length;
    }
  }
});
</script>

<style lang="scss">
html {
  overflow: auto;
}
.container {
  padding: 0;
}
.v-app_btn-add-wr {
  width: 0px;
  height: 100%;
  position: relative;
  .v-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
}
.v-app_lspc {
  padding-left: 16px;
}
.v-app {
  .v-navigation-drawer > .v-list .v-list__tile {
    font-weight: 400;
  }
}
.v-app_splash {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 50%;
  }
}
</style>
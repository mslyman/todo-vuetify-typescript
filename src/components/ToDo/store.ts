import Vue from "vue";

//export type FilterType = 'all' | 'completed' | 'active';
export interface Todo {
    id: number,
    title: string;
    content: string | null;
    date: string | null;
    completed: boolean;
}

export interface ISharedState {
    todos: Todo[];
}

export interface IStore {
    state: ISharedState;
    // change item    
    addTodo: (item: Todo) => void;
    removeTodo: (id: number) => void;
    modifyTodo: (id: number, newItem: Todo) => void;
    // change items
    completeAll: () => void;
    deleteCompleted: () => void;
    // helper function
    indexById: (id: number) => number;
    itemById: (id: number) => Todo | null;
    nextId: () => number;
}

var store: IStore = {
    state: {
        todos: []
    },
    // change item
    addTodo(item: Todo) {
        item.id = this.nextId();
        this.state.todos.push(item);
    },
    removeTodo(id: number) {
        var idx = this.indexById(id);
        if (idx >= 0) {
            this.state.todos.splice(idx, 1);
        }
    },
    modifyTodo(id: number, newItem: Todo) {
        var item = this.itemById(id);
        if (item) {
            var idx = this.state.todos.indexOf(item);
            item.completed = newItem.completed;
            item.title = newItem.title;
            item.content = newItem.content;
            item.title = newItem.title;
            item.date = newItem.date;
            this.state.todos.splice(idx, 1, item);
        }
    },
    // change items
    completeAll() {
        for (var item of this.state.todos) {
            if (!item.completed) {
                item.completed = true;
            }
        }
    },
    deleteCompleted() {
        this.state.todos = this.state.todos.filter(todo => !todo.completed);
    },
    indexById(id: number): number {
        var f = this.state.todos.filter(todo => todo.id === id);
        if (f.length) {
            return this.state.todos.indexOf(f[0]);
        }
        else {
            return -1;
        }
    },
    itemById(id: number): Todo | null {
        var f = this.state.todos.filter(todo => todo.id === id);
        if (f.length) {
            return f[0];
        }
        else {
            return null;
        }
    },
    nextId(): number {
        if (this.state.todos.length) {
            var ids = this.state.todos.map(o => o.id);
            return 1 + Math.max(...ids);
        }
        else {
            return 1;
        }
    }
}

export { store as Store };
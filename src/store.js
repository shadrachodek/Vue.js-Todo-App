import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        'id': 1,
        'title': 'Finish Vue Screencast',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false
      }
    ]

  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },

    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos;
      }
      else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed);
      }
      else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed);
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        'id': todo.id,
        'title': todo.title,
        'completed': false,
        'editing': false
      });
    },
    updateTodo(state, todo) {
      let index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, todo);
    },
    removeTodo(state, todo) {
      let index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1);
    },
    clearCompletedTodos(state){
        state.todos = state.todos.filter(
        todo => !todo.completed
      );
    },
    todoFiltered(state, filter) {
      state.filter = filter
    },
    checkedTodos(state, checked) {
      state.todos.forEach(todo => todo.completed = checked)
    }

  },
  actions: {

  }
})

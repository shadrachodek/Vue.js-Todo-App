<template>
  <div>
    <input type="text" class="todo-input" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining"></todo-item>
    </transition-group>
     <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>
    <div class="extra-container">
      <todo-filtered :filter="filter"></todo-filtered>
      <div>
        <transition name="fade">
         <todo-clear-complete v-if="showClearCompletedButton" ></todo-clear-complete>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearComplete from './TodoClearComplete'
TodoClearComplete

export default {


  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearComplete
  },
  data () {
    return {
      idForTodo: 3,
      beforeEditCache: '',
      newTodo: '',
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
    }
  },
  created(){
    eventBus.$on('removedTodo', (index) => this.removeTodo(index))
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
    eventBus.$on('checkAllTodos', () => this.checkAllTodos())
    eventBus.$on('filterChanged', (value) => this.filter = value)
    eventBus.$on('clearCompletedTodos', () => this.clearCompletedButton())
  },
  beforeDestroy(){
    eventBus.$off('removedTodo', (index) => this.removeTodo(index))
    eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
    eventBus.$off('checkAllTodos', () => this.checkAllTodos())
    eventBus.$off('filterChanged', (value) => this.filter = value)
    eventBus.$off('clearCompletedTodos', () => this.clearCompletedButton())


  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining() {
      return this.remaining != 0;
    },

    todosFiltered(){
      if(this.filter == 'all'){
        return this.todos
      }
      else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      }
      else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton(){
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {

    // add todo item to the list
    addTodo() {
      if(this.newTodo.trim().length == 0){
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = '';
      this.idForTodo++;
    },
    // remove todo item from the list
    removeTodo(index) {
      this.todos.splice(index, 1);
    },

    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo)
    },

    checkAllTodos(){
      this.todos.forEach(todo => todo.completed = event.target.checked)
    },

    clearCompletedButton(){
      this.todos = this.todos.filter(todo => !todo.completed)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .todo-input {
    width:100%;
    padding: 10px 10px;
    font-size: 18px;
    margin-bottom: 16px;


    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;

  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left:12px;
    width: 100%;
    padding: 10px;
    border: 1px solide #cccccc;
    font-family: Arial, Helvetica, sans-serif;
    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: red;
    }
  }

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  //css Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

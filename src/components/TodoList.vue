<template>
  <div>
    <input type="text" class="todo-input" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item v-for="(todo) in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining"></todo-item>
    </transition-group>

     <div class="extra-container">
      <checked-all-todo></checked-all-todo>
      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filtered></todo-filtered>
      <div>
        <transition name="fade">
         <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import CheckedAllTodo from './CheckedAllTodo'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    CheckedAllTodo,
    TodoFiltered,
    TodoClearCompleted
  },
  data () {
    return {
      idForTodo: 3,
      beforeEditCache: '',
      newTodo: '',
    }
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered(){
      return this.$store.getters.todosFiltered;
    },
  },
  methods: {
    // add todo item to the list
    addTodo() {
      if(this.newTodo.trim().length == 0){
        return;
      }
      this.$store.commit('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      });
      this.newTodo = '';
      this.idForTodo++;
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

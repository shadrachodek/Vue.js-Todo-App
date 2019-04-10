<template>
  <div>
    <input type="text" class="todo-input" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
          <div class="todo-item-left">
            <input type="checkbox" v-model="todo.completed" >
            <div v-if="!todo.editing"  @dblclick="editTodo(todo)" class="todo-item-label" :class="{ completed : todo.completed}">{{todo.title}}</div>
            <input v-else class="todo-item-edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
          </div>
          <div class="remove-item" @click="removeTodo(index)">
            &times;
          </div>
        </div>
    </transition-group>
     <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All
        </label>
      </div>
      <div>{{ remaining }} items left </div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{ active:filter == 'all' }" @click=" filter = 'all' ">All</button>
        <button :class="{ active:filter == 'active' }" @click=" filter = 'active' ">Active</button>
        <button :class="{ active:filter == 'completed' }" @click=" filter = 'completed' ">Completed</button>
      </div>
      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompletedButton">Clear Completed</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
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

  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
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
    // edit the existing todo item on the list
    editTodo(todo){
      this.beforeEditCache = todo.title
      todo.editing = true;
    },
    // know what was edited
    // if existing item was edit to empty value return the before rdit value
    doneEdit(todo) {
      if(todo.title.trim() == ''){
        todo.title = this.beforeEditCache
      }
      todo.editing = false;
    },
    // remove todo item from the list
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    // cancel to revet to the formal todo item while editing
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    checkAllTodos(){
      this.todos.forEach(todo => todo.completed = event.target.checked)
    },

    clearCompletedButton(){
      this.todos = this.todos.filter(todo => !todo.completed)
    }
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

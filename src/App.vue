<template>
   <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import TodoItemsRemaining from './components/TodoItemsRemaining'
import CheckedAllTodo from './components/CheckedAllTodo'
import TodoFiltered from './components/TodoFiltered'
import TodoClearCompleted from './components/TodoClearCompleted'



export default {
  name: 'app',
  components: {
    TodoList,
    TodoItem,
    TodoItemsRemaining,
    CheckedAllTodo,
    TodoFiltered,
    TodoClearCompleted,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}


</style>


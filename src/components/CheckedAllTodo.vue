<template>
  <div>
    <label>
      <input type="checkbox" :checked='!anyRemaining' @change="checkedAllTodos">Check All
    </label>
  </div>
</template>

<script>
export default {
  name: 'checked-all-todo',
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },

  methods: {
    checkedAllTodos() {
      this.$store.state.todos.forEach(todo => todo.completed = event.target.checked)
    }
  }
}


</script>
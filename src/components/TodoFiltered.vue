<template>
  <div>
    <button :class="{ active:filter == 'all' }" @click="todoFilter('all')">All</button>
    <button :class="{ active:filter == 'active' }" @click="todoFilter('active')">Active</button>
    <button :class="{ active:filter == 'completed' }" @click="todoFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: "todo-filtered",
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    todoFilter(filter) {
      this.$store.commit('todoFiltered', filter)
    }
  }
};
</script>
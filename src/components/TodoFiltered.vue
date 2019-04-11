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
  props: {
    filter: {
      type: String,
      required: true
    }
  },

  methods: {
    allChecked() {
      eventBus.$emit("checkAllTodos");
    },
    todoFilter(value) {
      eventBus.$emit("filterChanged", value);
    }
  }
};
</script>
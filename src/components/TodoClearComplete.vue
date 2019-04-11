<template>
  <div>
     <button @click="clearCompletedButton">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-complete",
  props: {
    showClearBtn: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    clearCompletedButton() {
      eventBus.$emit("clearCompletedTodos");
    },
  }
};
</script>
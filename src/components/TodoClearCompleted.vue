<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompletedButton">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },

  methods: {
    clearCompletedButton() {
     this.$store.commit('clearCompletedTodos')
    }
  }
};
</script>
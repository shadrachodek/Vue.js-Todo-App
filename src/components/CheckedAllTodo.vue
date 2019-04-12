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
      this.$store.commit('checkedTodos', event.target.checked)
    }
  }
}


</script>
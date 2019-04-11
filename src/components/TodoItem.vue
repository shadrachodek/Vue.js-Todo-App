<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <div
        v-if="!editing"
        @dblclick="editTodo()"
        class="todo-item-label"
        :class="{ completed : completed}"
      >{{title}}</div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit()"
        @keyup.enter="doneEdit()"
        @keyup.esc="cancelEdit()"
        v-focus
      >
    </div>
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll : {
      type: Boolean,
    }
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.editing,
      'beforeEditCache': ''
    }
  },
  watch: {
      checkAll(){
        if (this.checkAll) {
          this.completed = true
        } else {
          this.completed = this.todo.completed
        }

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
    removeTodo(index) {
      eventBus.$emit('removeTodo', index)
    },
    // edit the existing todo item on the list
    editTodo(){
      this.beforeEditCache = this.title
      this.editing = true;
    },
    // know what was edited
    // if existing item was edit to empty value return the before rdit value
    doneEdit() {
      if(this.title.trim() == ''){
        this.title = this.beforeEditCache
      }
      this.editing = false;
      eventBus.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
        }

      })
    },
     // cancel to revet to the formal todo item while editing
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
  }
};
</script>
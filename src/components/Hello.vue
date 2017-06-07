<template>
<div class="todo">
  <input type="text" v-model="item" placeholder="Add new item" @keyup.enter="addNewTodo">
  <ul>
    <li v-for="(todo, index) in todoList">
      <span v-text="todo.event" class="" v-bind:class="{finish:todo.isFinished}" @click="toggleFinish(index)"></span>
      <button @click="deleteTodo(index)">&times;</button>
    </li>
  </ul>
</div>
</template>

<script>
import Store from '../store'
export default {
  name: 'hello',
  data () {
    return {
      item: '',
      todoList: [],
      isShown: false
    }
  },
  methods: {
    addNewTodo: function() {
      this.todoList.push({
        event: this.item,
        isFinished: false
      });
      this.item = '';
    },
    deleteTodo: function(index) {
      this.todoList.splice(index, 1);
    },
    toggleFinish: function(index) {
      this.todoList[index].isFinished = !this.todoList[index].isFinished;
    },
    getTodoList: function() {
      var json = window.localStorage.getItem('todo-list');
      console.log(json.event);
    }
  },
  watch: {
    todoList: {
      handler: function(items) {
        Store.save(items);
      },
      deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.finish {
  text-decoration: line-through;
}
button {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
}

</style>

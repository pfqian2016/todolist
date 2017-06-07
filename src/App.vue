<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="todo">
      <input type="text" v-model="item" placeholder="添加一条新的todo" @keyup.enter="addNewTodo">
      <p v-if="todoList.length === 0">暂无代办事项</p>
      <ol>
        <li v-for="(todo, index) in todoList" @mouseover="todo.showBtn = true" @mouseleave="todo.showBtn = false">
          <span v-text="todo.event" :class="{finished:todo.isFinished}" @click="toggleFinish(index)"></span>
          <button @click="deleteTodo(index)" v-show="todo.showBtn">&times;</button>
        </li>
      </ol>
      <button class="clear" @click="clearAll">清除所有</button>
    </div>
  </div>
</template>

<script>
import Store from './store'

export default {
  name: 'app',
  components: {
    Store
  },
  data() {
    return {
      item: '',
      todoList: Store.fetch()
    }
  },
  methods: {
    addNewTodo: function() {
      if(this.item.length === 0) {
        alert('请输入需要添加的事件')
      }else{
          this.todoList.push({
          event: this.item,
          isFinished: false,
          showBtn: false
        });
      }
      this.item = '';
    },
    deleteTodo: function(index) {
      this.todoList.splice(index, 1);
    },
    toggleFinish: function(index) {
      this.todoList[index].isFinished = !this.todoList[index].isFinished;
    },
    clearAll: function() {
      Store.clear();
      this.todoList = Store.fetch();
    }
  },
  watch: {
    todoList: {
      handler: function(items) {
        Store.save(items)
      },
      deep:true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo {
    width: 400px;
    margin: 0 auto;
    text-align: center;
}
.finished {
  text-decoration: line-through;
  color: #f00;
}
button {
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
}
.clear {
  border: 1px solid #ccc;
  border-radius: 3px;
}
.clear:hover {
  background-color: #eee;
}
ul {
  padding: 0;
  list-style-type: none;
}
</style>

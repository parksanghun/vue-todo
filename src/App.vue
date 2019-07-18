<template>
  <div id="app">
    <TodoHeader />
    <TodoInput></TodoInput>
    <!--<TodoInput @add-event="addOneItem"/>-->
    <!--<TodoInput v-on:addItemEvent="addOneItem"/>-->
    <!--<TodoList :props-data="todoItems" @remove-event="removeTodo" @toggle-event="toggleComplete"/>-->
      <!--<TodoList v-on:removeItemEvent="todoItems" v-on:toggleItemEvent="toggleComplete"></TodoList>-->
    <TodoList></TodoList>
    <!--<TodoFooter @clear-event="clearList"/>-->
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  data: function() {
      return {
          todoItems: []
      }
  },
  created: function() {
      if(localStorage.length > 0){
          for(var i=0; i < localStorage.length; i++) {
              if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                  console.log(typeof localStorage.getItem(localStorage.key(i)));
                  console.log( JSON.parse(localStorage.getItem(localStorage.key(i))) );
                  //JSON.parse()는 json string을 object로 변환
                  //this.todoItems.push(localStorage.key(i));
                  this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
              }
          }
      }
  },
  methods: {
      addOneItem(todoItem) {
          var obj = {completed: false, item:todoItem};
          localStorage.setItem(todoItem,JSON.stringify(obj));
          this.todoItems.push(obj);
      },
      clearList() {
          localStorage.clear();
          this.todoItems = [];
      },
      removeTodo(todoItemObj, index) {
          localStorage.removeItem(todoItemObj.item, index);
          this.todoItems.splice(index, 1);
      },
      toggleComplete(todoItemObj, index) {
          // todoItem.completed = !todoItem.completed;
          this.todoItems[index].completed = !todoItemObj.completed;
          //localStorage에 updateItem 메서드가 없어서 removeItem하고 setItem 한다.
          localStorage.removeItem(todoItemObj.item);
          localStorage.setItem(todoItemObj.item, JSON.stringify(todoItemObj));
      }
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #f6f6f6;
  }
  input {
    border-style: groove;
    width:200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>

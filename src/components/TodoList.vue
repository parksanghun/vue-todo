<template>
    <div>
        <!--ul>li*3 -->
        <transition-group  name="list" tag="ul">
            <li v-for="(todoItem, index) in this.getTodoItems" v-bind:key="todoItem.item" class="shadow">
                <i class="fas fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
                    v-on:click="toggleTodo(todoItem)"></i>
                <span v-bind:class="{textCompleted: todoItem.completed}">{{todoItem.item}}</span>
                <span class="removeBtn" v-on:click="removeTodoItem(todoItem)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    props: ['propsData'],
    methods: {
        ...mapActions(['removeTodoItem']),
        toggleTodo(todoItem) {
            todoItem.completed = !todoItem.completed;
            this.$store.dispatch('toggleTodoItem', todoItem);
        }
        // ...mapMutations({removeTodo: 'removeOneItem'}),
        // ...mapMutations({toggleComplete: 'toggleOneItem'}),
        // removeTodo: function(todoItem, index) {
        //     this.$store.commit('removeOneItem', {todoItem, index});
            // this.$emit('remove-event', todoItem, index);
        // },
        // toggleComplete: function(todoItem, index) {
        //     this.$store.commit('toggleOneItem', {todoItem, index});
            // this.$emit('toggle-event', todoItem, index);
        // }
    },
    computed: {
        ...mapGetters(['getTodoItems'])
    },
    mounted () {
        this.$store.dispatch('loadTodoItems')
    },
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>

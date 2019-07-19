<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" v-on:click="removeAllTodoItems">Clear All</span>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions(['removeAllTodoItems']),
        // ...mapMutations({
        //     clearTodo: 'removeAllItems'
        // }),
        // clearTodo: function() {
            // this.$emit('clear-event');
        //     this.$store.commit('removeAllItems');
        // }
    }
}


</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>

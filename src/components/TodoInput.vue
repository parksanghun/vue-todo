<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
        <Modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">
                경고!
                <i class="closeModalBtn fas fa-times"
                   @click="showModal=false"></i>
            </h3>
            <div slot="body">
                아무것도 입력하지 않으셨습니다.
            </div>
        </Modal>
        <!-- <button @click="addTodo">add</button> -->
    </div>
</template>

<script>
import Modal from './common/Modal.vue'
export default {
    components: {
        'Modal': Modal
    },
    data() {
        return {
            showModal: false,
            newTodoItem: ""
        }
    },
    // data:function() {
    // },
    methods:{
        addTodo:function() {
            if (this.newTodoItem !== '') {
                this.$store.commit('addOneItem', this.newTodoItem);
                // this.$emit('add-event', this.newTodoItem);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        },
        clearInput:function() {
            //addTodo() 함수에 있었지만 clearInput()함수로 이동
            this.newTodoItem = '';
        }
    }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
}
</style>

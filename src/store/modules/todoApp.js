import axios from "axios";

const server_url = 'http://localhost:4500/api/todos/';

const state = {
    todoItems: []
}

const getters = {
    getTodoItems(state) {
        return state.todoItems;
    }
}

const mutations = {
    setTodoItems(state, items) {
        state.todoItems = items;
    },
    addOneItem(state, todoItem) {
        const obj = { completed: false, item: todoItem };
        localStorage.setItem(todoItem,JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
        state.todoItems[payload.index].completed = !payload.todoItem.completed;
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    removeAllItems(state) {
        localStorage.clear();
        state.todoItems = [];
    }
}
const actions = {
    loadTodoItems (context) {
        axios
            .get(server_url)
            .then(r => r.data)
            .then(items => {
                context.commit('setTodoItems', items)
            })
    },
    removeTodoItem(context, payload) {
        axios
            .delete(`${server_url}${payload.id}`)
            .then(r => r.data)
            .then(items => {
                context.commit('setTodoItems', items)
            })
    },
    addTodoItem(context, payload) {
        axios
            .post(`${server_url}`,payload)
            .then(r => r.data)
            .then(items => {
                context.commit('setTodoItems', items)
            })
    },
    removeAllTodoItems(context) {
        axios
            .delete(`${server_url}`)
            .then(r => r.data)
            .then(items => {
                context.commit('setTodoItems', items)
            })
    },
    toggleTodoItem(context, payload) {
        axios
            .put(`${server_url}${payload.id}`,payload)
            .then(r => r.data)
            .then(items => {
                context.commit('setTodoItems', items)
            })
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
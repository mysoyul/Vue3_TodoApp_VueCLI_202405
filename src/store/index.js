import { createStore, createLogger } from "vuex"
import http from "@/store/common/http-common"
import axios from "axios"

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state: { todoItems: [] },
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.log(`status = ${error?.response?.status} : errMsg = ${error.message}`)
                    } else {
                        console.error(error);
                    }
                });
        }, //loadTodoItems
        removeTodo({ commit }, payload) {
            http
                .delete(`/todos/${payload.id}`)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //removeTodo
        addTodo({ commit }, payload) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //addTodo
        toggleTodo({ commit }, payload) {
            http
                .patch(`/todos/${payload.id}`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //toggleTodo
        
    },
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
        addTodo(state, todoItem) {
            const todoItemObj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(todoItemObj));
            state.todoItems.push(todoItemObj);
        },//addTodo
        removeTodo(state, payload) {
            const { todo: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },//removeTodo
        toggleTodo(state, payload) {
            const { todo: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        }, //toggleTodo
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },
})
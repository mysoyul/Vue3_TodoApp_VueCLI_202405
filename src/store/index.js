import { createStore, createLogger } from "vuex"

const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const itemJson = localStorage.getItem(localStorage.key(i))
                if (itemJson) {
                    arr.push(JSON.parse(itemJson))
                }
            }
        }
        return arr;
    }
}

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state: { todoItems: storage.fetch() },
    mutations: {
        addTodo(state, todoItem) {
            const todoItemObj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(todoItemObj));
            state.todoItems.push(todoItemObj);
        },//addTodo
        removeTodo(state, payload) {
            const { todo:{ item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },//removeTodo
        toggleTodo(state, payload) {
            const { todo:{ item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        }
    },
})
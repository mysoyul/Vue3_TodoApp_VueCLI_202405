<template>
    <div class="inputBox shadow">
        <!-- <p>입력한 값1 = {{ newTodoItem }}</p>
        입력한 값2 = <span v-text="newTodoItem"></span><br /> -->
        <!-- <input type="text" v-model="newTodoItem"> -->
        <input type="text" :value="newTodoItem" @input="handleInput" @keyup.enter="addTodo">
        <!-- <button @click="addTodo">추가</button> -->
        <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodoItem = ref("")

//Event 정의
const emit = defineEmits(["input:todo"])

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    //Event 발생
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}
const addTodo = () => {
    const todoItem = newTodoItem.value
    localStorage.setItem(todoItem, todoItem)
    clearInput()
}
const clearInput = () => {
    newTodoItem.value = ""
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
    width: 80%;
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
</style>
<template>
    <div>
        <p>
            입력한 값1 = {{ newTodoItem }}
        </p>
        입력한 값2 = <span v-text="newTodoItem"></span><br />

        <!-- <input type="text" v-model="newTodoItem"> -->
        <input type="text" :value="newTodoItem" @input="handleInput">
        <button @click="addTodo">추가</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodoItem = ref("")

const emit = defineEmits(["input:todo"])

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}
const addTodo = () => {
    const todoItem = newTodoItem.value
    localStorage.setItem(todoItem, todoItem)
    newTodoItem.value = ""
}

</script>

<style scoped></style>
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
        <MyModal v-show="showModal" @close="showModal = false">
            <template v-slot:header>
                <h3>
                    경고!
                    <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
                </h3>
            </template>
            <template v-slot:body>
                <div>아무것도 입력하지 않으셨습니다.</div>
            </template>
        </MyModal>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MyModal from '@/components/common/MyModal.vue'
import { useStore } from "vuex"

const store = useStore()

const showModal = ref(false)

const newTodoItem = ref("")

//Event 정의
const emit = defineEmits(["input:todo", "add:todo"])

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    //Event 발생
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}

const addTodo = () => {
    if (newTodoItem.value !== "") {
        const todoItemStr = newTodoItem.value
        //emit("add:todo", todoItemStr)
        //store.commit("addTodo", todoItemStr)
        const itemObj = { completed: false, item: todoItemStr }
        store.dispatch("addTodo", itemObj)
        clearInput()
    } else {
        showModal.value = !showModal.value
    }
}

const clearInput = () => {
    newTodoItem.value = ""
}


</script>

<style scoped>
.closeModalBtn {
    color: #42b983;
}

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
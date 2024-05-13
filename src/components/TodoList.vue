<template>
    <div>
        <ul>
            <li v-for="(item, index) in todoItems" v-bind:key="index">
                {{ item }}
            </li>
        </ul>

    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const todoItems = ref([])

onBeforeMount(() => {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            todoItems.value.push(localStorage.key(i))
        }
    }
})
</script>

<style scoped></style>
<script setup>
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const addTodo = async (todoText) => {
  await todoStore.addTodo(todoText)
}
</script>

<template>
  <div class="min-h-screen py-5">
    <div class="mx-auto max-w-5xl">
      <div class="bg-red-600">
        <h1 class="text-4xl font-bold text-white p-5 text-center">Todo List kak kak</h1>
      </div>
      <div>
        <input
          class="border border-gray-300 block mb-2 w-full mt-2 p-2"
          placeholder="Enter todo name"
          type="text"
          v-model="todoText"
        />
        <button
          class="block bg-red-600 w-full text-white py-2 font-bold rounded-xl"
          @click="addTodo(todoText)"
        >
          Submit todo
        </button>
      </div>
    </div>
  </div>
</template>

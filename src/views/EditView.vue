<script setup>
import router from '@/router'
import { useTodoStore } from '@/stores/todo'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const route = useRoute()
const todo = ref({})
const name = ref('')

onMounted(async () => {
  await todoStore.loadTodo(route.params.id)
  todo.value = todoStore.selectedTodo
  name.value = todo.value.name
})

const editTodo = async () => {
  const update = {
    name: name.value,
  }
  await todoStore.editTodo(todo.value.id, update)
  alert('แก้ไขเรียบร้อย')
  router.push({ name: 'todo-list' })
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl" v-if="todo.id">
      <h1 class="text-3xl font-semibold mb-6 text-gray-800">แก้ไขเนื้อหาไอดี: {{ todo.id }}</h1>
      <div class="mb-3">
        <p class="text-lg">รายการ</p>
        <input
          class="border border-gray-300 px-6 py-3 block w-full rounded-md text-lg bg-gray-300"
          type="text"
          v-model="todo.id"
          readonly
        />
      </div>
      <div class="mb-3">
        <p class="text-lg">รายการ</p>
        <input
          class="border border-gray-300 px-6 py-3 block w-full rounded-md text-lg"
          type="text"
          v-model="name"
        />
      </div>
      <div class="flex gap-3">
        <button
          class="bg-blue-500 w-full p-3 text-white text-lg hover:bg-blue-700 rounded-md"
          @click="editTodo"
        >
          ยืนยันการแก้ไข
        </button>
        <RouterLink
          class="bg-gray-500 w-full p-3 text-white text-lg hover:bg-gray-700 rounded-md text-center"
          :to="{ name: 'todo-list' }"
        >
          ย้อนกลับ
        </RouterLink>
      </div>
    </div>
    <!-- <div v-else><p>No todo</p></div> -->
  </div>
</template>

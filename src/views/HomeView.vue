<script setup>
import { useTodoStore } from '@/stores/todo'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const todoStore = useTodoStore()
const todoText = ref('')
const loadingChk = ref(false)

onMounted(async () => {
  loadingChk.value = true
  await todoStore.loadTodos()
  console.log(todoStore.list)
  loadingChk.value = false
})

const addTodo = async (todoText) => {
  await todoStore.addTodo(todoText)
  alert("เพิ่มรายการเรียบร้อย")
  window.location.reload()
}

const editStatus = async (todoId, todoData) => {
  const updateData = {
    name: todoData.name,
    status: todoData.status,
  }
  await todoStore.editTodo(todoId, updateData)
}

const deleteTodo = async (id) => {
  const isConfirm = window.confirm('Do you want to delete this todo?')
  if (isConfirm) {
    try {
      await todoStore.deleteTodo(id)
      const index = todoStore.list.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        todoStore.list.splice(index, 1)
      }
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }
}
</script>

<template>
  <div class="min-h-screen py-5">
    <div class="mx-auto max-w-7xl">
      <h2 v-if="loadingChk">Loading..</h2>
      <div class="relative mt-5 shadow-2xl bg-white p-10 rounded-lg">
        <h1 class="text-4xl font-black">Todo List</h1>
        <p class="ms-2">อยากเพิ่มอะไรก็เพิ่ม</p>
        <div>
          <input
            class="border border-gray-300 block mb-2 w-full mt-2 p-2"
            placeholder="กรอกชื่อรายการ"
            type="text"
            v-model="todoText"
          />
          <button
            class="block bg-gray-300 w-full py-2 font-bold rounded-sm cursor-pointer hover:bg-gray-400"
            @click="addTodo(todoText)"
          >
            เพิ่มรายการ
          </button>
        </div>
        <hr class="mb-3 mt-3 text-gray-400" />
        <table class="w-full">
          <thead class="bg-gray-100 text-left rounded-full">
            <tr>
              <th class="px-6 py-3 font-bold">ไอดี</th>
              <th class="px-6 py-3 font-bold">รายการ</th>
              <th class="px-6 py-3 font-bold">สถานะ</th>
              <th class="px-6 py-3 font-bold">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="todo.id"
              class="border-b border-gray-300 hover:bg-gray-100"
              v-for="(todo, index) in todoStore.list"
            >
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ todo.name }}</td>
              <td class="px-6 py-4">
                <select
                  class="bg-white border border-gray-300 py-1.5 rounded-md pl-2"
                  v-model="todo.status"
                  @change="editStatus(todo.id, todo)"
                >
                  <option value="">Select Status</option>
                  <option :key="status.id" v-for="status in todoStore.statuses" :value="status">
                    {{ status }}
                  </option>
                </select>
              </td>
              <td class="p-2">
                <RouterLink :to="{ name: 'todo-edit', params: { id: todo.id } }">
                  <button
                    class="bg-blue-100 px-5 py-1.5 rounded-md text-blue-500 cursor-pointer me-2"
                  >
                    แก้ไข
                  </button>
                </RouterLink>
                <button
                  @click="deleteTodo(todo.id)"
                  class="bg-red-100 px-5 py-1.5 rounded-md text-red-500 cursor-pointer"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

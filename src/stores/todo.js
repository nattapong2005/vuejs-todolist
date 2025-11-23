// import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
const BASE_URL = 'https://69218a40512fb4140be089ac.mockapi.io/'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done'],
  }),

  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(BASE_URL + '/todos')
        this.list = response.data
      } catch (error) {
        console.log('error', error)
      }
    },

    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.log('error', error)
      }
    },

    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending',
      }
      console.log(bodyData)

      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        this.list.push(response.data)
        console.log('add todo completed.')
      } catch (error) {
        console.log('error', error)
      }
    },

    async editTodo(id, todoData) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        this.loadTodos()
        
        console.log('edit todo completed.')
      } catch (error) {
        console.log('error', error)
      }
    },

    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('delete todo completed.')
      } catch (error) {
        console.log('error', error)
      }
    },
  },
})

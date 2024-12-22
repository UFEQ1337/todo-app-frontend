<template>
  <form @submit.prevent="addTask" class="flex items-center space-x-2">
    <input
      type="text"
      v-model="title"
      placeholder="Dodaj nowe zadanie"
      class="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
    >
      Dodaj
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskForm",
  emits: ["task-added"],
  setup(props, { emit }) {
    const store = useStore();
    const title = ref("");

    const addTask = async () => {
      try {
        await store.dispatch("createTask", { title: title.value });
        title.value = "";
        emit("task-added");
      } catch (err) {
        console.error("Błąd podczas dodawania zadania:", err);
      }
    };

    return {
      title,
      addTask,
    };
  },
});
</script>

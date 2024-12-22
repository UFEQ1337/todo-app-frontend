<template>
  <div
    class="flex items-center justify-between p-4 bg-white shadow-md mb-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
  >
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleCompleted"
        class="form-checkbox h-5 w-5 text-green-600"
      />
      <span
        :class="[
          'ml-3 text-lg',
          task.completed ? 'line-through text-gray-500' : 'text-gray-800',
        ]"
      >
        {{ task.title }}
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <button
        @click="editTask"
        class="flex items-center text-yellow-500 hover:text-yellow-700 transition-colors duration-200"
        aria-label="Edytuj zadanie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 19l6-6-6-6"
          />
        </svg>
        Edytuj
      </button>
      <button
        @click="deleteTask"
        class="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200"
        aria-label="Usuń zadanie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Usuń
      </button>
    </div>

    <!-- Modal Edycji -->
    <transition name="fade">
      <div
        v-if="isEditing"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative"
        >
          <h3 class="text-2xl font-semibold mb-4">Edycja Zadania</h3>
          <form @submit.prevent="updateTaskTitle">
            <div class="mb-4">
              <label for="taskTitle" class="block text-gray-700 mb-2"
                >Tytuł Zadania</label
              >
              <input
                id="taskTitle"
                type="text"
                v-model="editedTitle"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="isEditing = false"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Anuluj
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Zapisz
              </button>
            </div>
          </form>
          <button
            @click="isEditing = false"
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Zamknij modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ["task-updated", "task-deleted"],
  setup(props, { emit }) {
    const store = useStore();
    const isEditing = ref(false);
    const editedTitle = ref(props.task.title);

    const toggleCompleted = async () => {
      try {
        await store.dispatch("updateTask", {
          id: props.task._id,
          completed: !props.task.completed,
        });
        emit("task-updated");
      } catch (err) {
        console.error("Błąd podczas aktualizacji zadania:", err);
      }
    };

    const editTask = () => {
      isEditing.value = true;
    };

    const updateTaskTitle = async () => {
      try {
        await store.dispatch("updateTask", {
          id: props.task._id,
          title: editedTitle.value,
        });
        isEditing.value = false;
        emit("task-updated");
      } catch (err) {
        console.error("Błąd podczas edycji zadania:", err);
      }
    };

    const deleteTask = async () => {
      if (confirm("Czy na pewno chcesz usunąć to zadanie?")) {
        try {
          await store.dispatch("deleteTask", props.task._id);
          emit("task-deleted");
        } catch (err) {
          console.error("Błąd podczas usuwania zadania:", err);
        }
      }
    };

    return {
      isEditing,
      editedTitle,
      toggleCompleted,
      editTask,
      updateTaskTitle,
      deleteTask,
    };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

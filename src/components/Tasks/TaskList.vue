<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Moje Zadania</h2>
    <TaskForm @task-added="fetchTasks" />
    <div class="mt-6">
      <div v-if="tasks.length === 0" class="text-center text-gray-500">
        Brak zadań do wyświetlenia. Dodaj nowe zadanie poniżej.
      </div>
      <!-- Lista Zadań -->
      <transition-group name="fade" tag="ul" class="space-y-4">
        <TaskItem
          v-for="task in tasks"
          :key="task._id"
          :task="task"
          @task-updated="fetchTasks"
          @task-deleted="fetchTasks"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TaskItem from "./TaskItem.vue";
import TaskForm from "./TaskForm.vue";

export default defineComponent({
  name: "TaskList",
  components: {
    TaskItem,
    TaskForm,
  },
  setup() {
    const store = useStore();

    const tasks = computed(() => store.getters.tasks || []);

    const fetchTasks = async () => {
      await store.dispatch("fetchTasks");
    };

    onMounted(() => {
      fetchTasks();
    });

    return {
      tasks,
      fetchTasks,
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

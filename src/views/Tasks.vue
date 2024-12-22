<template>
  <div class="min-h-screen bg-gray-100">
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskList from "@/components/Tasks/TaskList.vue";

export default defineComponent({
  name: "TasksView",
  components: {
    TaskList,
  },
});
</script>

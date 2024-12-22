<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <Register />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Register from "@/components/Auth/Register.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    Register,
  },
});
</script>

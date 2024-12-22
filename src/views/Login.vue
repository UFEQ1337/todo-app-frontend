<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "@/components/Auth/Login.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    Login,
  },
});
</script>

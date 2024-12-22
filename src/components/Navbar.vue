<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white font-bold text-xl"
        >Lista Zadań</router-link
      >
      <div>
        <template v-if="isAuthenticated">
          <router-link to="/tasks" class="text-gray-300 hover:text-white mr-4"
            >Moje Zadania</router-link
          >
          <button @click="logout" class="text-gray-300 hover:text-white">
            Wyloguj się
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-gray-300 hover:text-white mr-4"
            >Logowanie</router-link
          >
          <router-link to="/register" class="text-gray-300 hover:text-white"
            >Rejestracja</router-link
          >
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TodoNavbar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const logout = () => {
      store.dispatch("logout");
      router.push({ name: "Login" });
    };

    return {
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style scoped>
/* Dodaj dodatkowe style tutaj, jeśli potrzebujesz */
</style>

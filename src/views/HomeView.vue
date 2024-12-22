<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Witaj w Aplikacji Lista Zadań!</h1>
      <p v-if="isAuthenticated" class="text-lg text-gray-700">
        Witaj, {{ user.username }}!
      </p>
      <p v-else class="text-lg text-gray-700">
        Zaloguj się lub zarejestruj, aby rozpocząć zarządzanie swoimi zadaniami.
      </p>
      <div v-if="!isAuthenticated" class="mt-6">
        <router-link
          to="/login"
          class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
        >
          Logowanie
        </router-link>
        <router-link
          to="/register"
          class="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Rejestracja
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  setup() {
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const user = computed(() => store.getters.user);

    return {
      isAuthenticated,
      user,
    };
  },
});
</script>

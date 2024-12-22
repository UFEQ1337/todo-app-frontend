<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-6">Rejestracja</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block text-gray-700">Nazwa Użytkownika</label>
        <input
          type="text"
          v-model="username"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700">Hasło</label>
        <input
          type="password"
          v-model="password"
          class="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Zarejestruj się
      </button>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserRegister",
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");

    const register = async () => {
      try {
        await store.dispatch("register", {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        router.push({ name: "Tasks" });
      } catch (err: any) {
        error.value = err.response?.data?.message || "Błąd podczas rejestracji";
      }
    };

    return {
      username,
      email,
      password,
      register,
      error,
    };
  },
});
</script>

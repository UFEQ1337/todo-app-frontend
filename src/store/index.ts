import { createStore } from "vuex";
import api from "../services/api";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user: null as any,
    tasks: [] as any[],
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setUser(state, user: any) {
      state.user = user;
    },
    logout(state) {
      state.token = "";
      state.user = null;
      state.tasks = [];
    },
    setTasks(state, tasks: any[]) {
      state.tasks = tasks;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await api.post("/users/register", userData);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        commit("setToken", token);
        commit("setUser", user);
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Błąd podczas rejestracji"
        );
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await api.post("/users/login", credentials);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        commit("setToken", token);
        commit("setUser", user);
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "Błąd podczas logowania"
        );
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("logout");
    },
    async fetchUser({ commit }) {
      try {
        const response = await api.get("/users/me");
        commit("setUser", response.data);
      } catch (error) {
        commit("logout");
      }
    },
    async fetchTasks({ commit }) {
      try {
        const response = await api.get("/tasks");
        commit("setTasks", response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania zadań:", error);
      }
    },
    async createTask({ dispatch }, taskData) {
      try {
        await api.post("/tasks", taskData);
        dispatch("fetchTasks");
      } catch (error) {
        console.error("Błąd podczas tworzenia zadania:", error);
        throw error;
      }
    },
    async updateTask({ dispatch }, taskData) {
      try {
        await api.put(`/tasks/${taskData.id}`, taskData);
        dispatch("fetchTasks");
      } catch (error) {
        console.error("Błąd podczas aktualizacji zadania:", error);
        throw error;
      }
    },
    async deleteTask({ dispatch }, taskId) {
      try {
        await api.delete(`/tasks/${taskId}`);
        dispatch("fetchTasks");
      } catch (error) {
        console.error("Błąd podczas usuwania zadania:", error);
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
    tasks: (state) => state.tasks,
  },
  modules: {},
});

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser, getUser, logoutUser } from '@/api/authApi';
import { setUserToLocalStorage, getUserFromLocalStorage, deleteUserFromLocalStorage } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getUserFromLocalStorage());
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  // TO DO: Добавить метод актуализации данных пользователя с API
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.data);
      setUserToLocalStorage(result.data);
    }
  };

  const getCurrentUser = async () => {
    const result = await getUser();
    if (result.success) {
      setUser(result.data);
      setUserToLocalStorage(result.data);
    }
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      deleteUserFromLocalStorage();
    }
  };


  return {
    user,
    isAuthenticated,
    setUser,
    getCurrentUser,
    login,
    logout,
  };
});

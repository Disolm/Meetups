<template>
  <LayoutBase>
    <RouterView>
      <template #default='{ Component }'>
        <KeepAlive v-if='Component' :max='3'>
          <component :is='Component' />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
  </LayoutBase>
</template>

<script>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useAuthStore } from './stores/useAuthStore';
import { deleteUserFromLocalStorage } from './services/authService';
import { useToaster } from '@/plugins/toaster';
import { assignTitle } from '@/plugins/title';


export default {
  name: 'App',

  components: {
    UiAlert,
    LayoutBase,
  },

  setup() {
    const toaster = useToaster();

    // TO DO: Установить <title> - "Meetups"
    assignTitle("Meetups")


    // TO DO: для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      authStore.getCurrentUser();
    }

    httpClient.onUnauthenticated(() => {
      // TO DO: сессия пользователя больше не валидна - нужна обработка потери авторизации
      deleteUserFromLocalStorage();
      location.reload();
    });

    httpClient.onNetworkError(() => {
      // TO DO: проблема с сетью, стоит вывести тост пользователю
      toaster.error('проблема с сетью');
    });

    // TO DO: обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
    window.addEventListener('error', (event) => {
      toaster.error(event.message);
    });

    // TO DO: глобальные ошибки можно поймать событиями "error" и "unhandledrejection"
    window.addEventListener('unhandledrejection', (event) => {
      toaster.error(event.reason);
    });
  },
};
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>

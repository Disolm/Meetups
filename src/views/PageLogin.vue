<template>
  <LayoutAuth :title=title>
    <UiForm>
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" required />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block  @click="handleSubmit">Войти</UiButton>
      </template>

      <template #append> Нет аккаунта? <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink> </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
// TO DO: Task 05-vue-router/01-AuthPages
// TO DO: Добавить именованные маршруты
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '@/components/LayoutAuth.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useToaster } from '@/plugins/toaster/index.js';
import { useRouter, useRoute } from 'vue-router';
import { assignTitle } from '@/plugins/title';

export default {
  name: 'PageLogin',

  components: {
    LayoutAuth,
    UiForm,
    UiButton,
    UiInput,
    UiLink,
    UiFormGroup,
  },

  setup() {
    // TO DO: <title> "Вход | Meetups"
    const title = "Вход | Meetups"
    assignTitle(title)
    // TO DO: Добавить LayoutAuth

    /*
      TO DO: Добавить обработчик сабмита
            - В случае успешной аутентификации:
              - Перейти на главную страницу или from (Task 05-vue-router/01-AuthPages)
              - Вывести тост "Авторизация прошла успешно"
            - В случае неуспешной аутентификации:
              - Вывести тост "Неверные учётные данные..."
     */

    const email = ref('');
    const password = ref('');
    const toaster = useToaster();
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const handleSubmit = async () => {

      await authStore.login(email.value, password.value);
      if (authStore.isAuthenticated) {
        toaster.success('Авторизация прошла успешно');

        const queryParameters = route.query.from
        if(queryParameters) {
          await router.push({ path: queryParameters })
        } else {
          await router.push({ name: 'index' })
        }
      } else {
        toaster.error('Неверные учётные данные...');
      }
    };
    return {
      email,
      password,
      handleSubmit,
      title
    };
  },
};
</script>

<style scoped></style>

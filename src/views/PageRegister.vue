<template>
  <LayoutAuth :title=title>
    <UiForm>
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required />
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{name: 'login'}">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>

</template>

<script>
// TO DO: Task 05-vue-router/01-AuthPages
// TO DO: Добавить именованные маршруты
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '@/components/LayoutAuth.vue';

import { assignTitle } from '@/plugins/title';
import { useToaster } from '@/plugins/toaster';
import { useRouter } from 'vue-router';
import { registerUser } from '@/api/authApi';

export default {
  name: 'PageRegister',

  components: {
    LayoutAuth,
    UiForm,
    UiButton,
    UiLink,
    UiCheckbox,
    UiInput,
    UiFormGroup,
  },

  setup() {
    // TO DO: <title> "Регистрация | Meetups"
    const title = "Регистрация | Meetups"
    assignTitle(title)
    // TO DO: Добавить LayoutAuth

    const email = ref('');
    const fullname = ref('');
    const password = ref('');
    const password2 = ref('');
    const agree = ref(false);
    const toaster = useToaster();
    const router = useRouter();

    const validate = () => {
      if (password.value !== password2.value) {
        return 'Пароли не совпадают';
      }
      if (!agree.value) {
        return 'Требуется согласится с условиями';
      }
    };

    const handleSubmit = async () => {
      const validationError = validate();
      if (validationError) {
        // TO DO: Вывести тост с текстом ошибки
        toaster.error(validationError);
      }
      /*
        TO DO: Добавить обработчик сабмита
              - В случае успешной регистрации:
                - Перейти на страницу входа (Task 05-vue-router/01-AuthPages)
                - Вывести тост "Регистрация выполнена успешно"
              - В случае неуспешной регистрации:
                - Вывести тост с текстом ошибки с API
       */
      const user = {
        fullname: fullname.value,
        email: email.value,
        password: password.value
      }
      const result = await registerUser(user);
      if (result.success) {
         await router.push({ name: 'login' });
        toaster.success('Регистрация выполнена успешно');
      } else {
        toaster.error(result.error.message);
      }
    };

    return {
      email,
      fullname,
      password,
      password2,
      agree,
      handleSubmit,
      title
    };
  },
};
</script>

<style scoped></style>

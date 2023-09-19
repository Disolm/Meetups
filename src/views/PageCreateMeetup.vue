<template>
  <LayoutMeetupForm title='Создание митапа | Meetups'>
    <MeetupForm :meetup="meetup" />
  </LayoutMeetupForm>
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '@/components/MeetupForm.vue';
import LayoutMeetupForm from '@/components/LayoutMeetupForm.vue';
import { useRouter } from 'vue-router';
import { createMeetup } from '@/services/meetupService.js';
import { createToaster } from '@/plugins/toaster/index.js';
import { postMeetup } from '@/api/meetupsApi';
import { postImage } from '@/api/imageApi';
import { useApi } from '@/composables/useApi';

export default {
  name: 'PageCreateMeetup',

  components: {
    LayoutMeetupForm,
    MeetupForm,
  },

  setup() {
    // TO DO: title "Создание митапа | Meetups"
    // TO DO: Добавить LayoutMeetupForm
    const meetup = ref(createMeetup());
    const router = useRouter();

    // TODO: При сабмите формы создания митапа - добавить его через API и перейти на страницу созданного митапа
    const submit = async (data) => {
      if (data.imageToUpload) {
        const formData = new FormData();
        formData.append('file', data.imageToUpload);

        const result = ref(null);
        result.value = await postImage(formData);

        if (result.value.error) {
          const toaster = createToaster({ container: '#toaster' });
          return toaster.error(result.value.error.message);
        }
        data.image = result.value.data.image;
        data.imageId = result.value.data.id;
      }

      const { request, result } = useApi(postMeetup, {
        showProgress: true,
        successToast: 'Сохранено',
        errorToast: true,
      });
      await request(data);
      if (result.value.success) {
        return router.push({ name: 'meetup', params: { meetupId: result.value.data.id } });
      }
    };

    // TO DO: При нажатии на "Отмена" вернуться на главную страницу
    const cancel = () => {
      return router.push({ name: 'meetups' });
    };
    return {
      meetup,
      submit,
      cancel,
    };
  },
};
</script>

<style scoped></style>

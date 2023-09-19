<template>
  <LayoutMeetupForm :title=title>
    <MeetupForm v-if='meetup' :meetup='meetup' />
    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </LayoutMeetupForm>
</template>

<script>
import { ref, watch } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import LayoutMeetupForm from '@/components/LayoutMeetupForm.vue';
import { useRouter } from 'vue-router';
import { getMeetup, putMeetup } from '@/api/meetupsApi';
import { useApi } from '@/composables/useApi';
import { postImage } from '@/api/imageApi';
import { createToaster } from '@/plugins/toaster';
import { assignTitle } from '@/plugins/title';


export default {
  name: 'PageEditMeetup',

  components: {
    LayoutMeetupForm,
    UiAlert,
    UiContainer,
    MeetupForm,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  async beforeRouteEnter(to) {
    const result = await getMeetup(+to.params.meetupId);
    if (result.success) {
      return (vm) => {
        vm.setMeetup(result.data);
      };
    } else {
      return { name: 'meetups' };
    }
  },

  setup(props) {
    // TO DO: <title> "Редактирование митапа | Meetups"
    const title = "Редактирование митапа | Meetups"
    assignTitle(title)
    // TO DO: Добавить LayoutMeetupForm
    const meetup = ref(null);
    const error = ref(null);


    // TO DO: При сабмите формы редактирования митапа - обновить его через API и перейти на страницу изменённого митапа
    // TO DO: При нажатии на "Отмена" вернуться на страницу этого митапа

    const fetchMeetup = async () => {
      const result = await getMeetup(props.meetupId);
      if (result.success) {
        meetup.value = result.data;
      } else {
        error.value = result.error.message;
      }
    };
    watch(() => props.meetupId, fetchMeetup);
    const setMeetup = (value) => {
      meetup.value = value;
    };

    const submit = async (data) => {
      if (data.imageToUpload) {
        const formData = new FormData();
        formData.append('file', data.imageToUpload)

        const result = ref(null);
        result.value = await postImage(formData);

        if (result.value.error) {
          const toaster = createToaster({ container: '#toaster' });
          return toaster.error(result.value.error.message);
        }

        data.image = result.value.data.image;
        data.imageId = result.value.data.id;
      }

      const { request, result } = useApi(putMeetup, { showProgress: true, successToast: 'Сохранено' });
      await request(data);
      if (result.value.success) {
        goToMeetupPage();
      }
    };
    const cancel = () => {
      goToMeetupPage();
    };
    const goToMeetupPage = () => {
      const router = useRouter();
      router.push({ name: 'meetup', meetupId: props.meetupId });
    };

    return {
      meetup,
      error,
      setMeetup,
      submit,
      cancel,
      title
    };
  },
};
</script>

<style scoped></style>

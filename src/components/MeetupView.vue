<template>
  <div>
    <MeetupCover :title='meetup.title' :image='meetup.image' />

    <UiContainer>
      <div class='meetup'>
        <div class='meetup__content'>
          <slot />
        </div>
        <div class='meetup__aside'>
          <MeetupInfo :organizer='meetup.organizer' :place='meetup.place' :date='meetup.date' />
          <!-- TO DO: Добавить проверку на аутентификацию и является ли пользователь организатором митапа -->
          <!-- TO DO: Реализовать кнопки (некоторые должны быть ссылками) -->
          <div class='meetup__aside-buttons' v-if='isAuthenticated'>
            <!-- TO DO: Может добавить тут слот? -->
            <template v-if='meetup.organizing'>
              <UiButton
                tag='router-link'
                variant='primary'
                :to="{ name: 'meetup-edit', params: { meetupId: meetup.id } }"
                class='meetup__aside-button'
              >
                Редактировать
              </UiButton>
              <UiButton
                :disabled='disabledButton'
                variant='danger'
                class='meetup__aside-button'
                @click='handleDeleteMeetup'
              >
                Удалить
              </UiButton>
            </template>
            <template v-if='!meetup.organizing'>
              <UiButton
                v-if='attending'
                :disabled='disabledButton'
                variant='secondary'
                class='meetup__aside-button'
                @click='handleAttendMeetup'
              >
                Отменить участие
              </UiButton>
              <UiButton
                v-if='!attending'
                :disabled='disabledButton'
                variant='primary'
                class='meetup__aside-button'
                @click='handleAttendMeetup'
              >
                Участвовать {{attending}}
              </UiButton>
            </template>

          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script>
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useRouter } from 'vue-router';
import { ref, onUpdated } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useApi } from '@/composables/useApi';
import { attendMeetup, leaveMeetup, deleteMeetup } from '@/api/meetupsApi';
import { assignTitle } from '@/plugins/title';


export default {
  name: 'MeetupView',

  components: {
    UiButton,
    MeetupCover,
    MeetupInfo,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    assignTitle(`${props.meetup.title} | Meetups`)

    // TO DO: Добавить обработку кнопок, включая работу с API
    /*
      TO DO: Добавить тосты при успешных операциях
            - Митап удалён
            - Сохранено
            - Текст ошибки в случае ошибки на API
     */
    // TO DO: Будет плюсом блокировать кнопку на время загрузки
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    const disabledButton = ref(false);
    const attending = ref(props.meetup.attending);
    const router = useRouter();

    onUpdated(() => {
      attending.value = props.meetup.attending;
    });

    const handleDeleteMeetup = async () => {
      const { request, result, isLoading } = useApi(deleteMeetup, { showProgress: true, successToast: 'Митап удалён' });
      disabledButton.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        router.push({ name: 'meetups' });
        location.reload();
      }
      disabledButton.value = isLoading.value;
    };
    const handleAttendMeetup = async () => {
      const { request, result, isLoading } = useApi(attending.value ? leaveMeetup : attendMeetup, {
        showProgress: true,
        successToast: 'Сохранено',
      });
      disabledButton.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        attending.value = !props.meetup.attending;
      }
      disabledButton.value = isLoading.value;
    };

    return {
      isAuthenticated,
      handleDeleteMeetup,
      handleAttendMeetup,
      attending,
      disabledButton,
    };
  },
};
</script>

<style scoped>
.meetup {
    display: flex;
    flex-direction: column;
    margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
    margin: 40px 0;
}

.meetup__aside-buttons {
    padding: 0 0 0 34px;
    margin-top: 16px;
}

.meetup__aside-button {
    margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
    .meetup {
        flex-direction: row;
    }

    .meetup__content {
        flex: 1 0 calc(100% - 350px);
    }

    .meetup__aside {
        flex: 1 0 350px;
        padding: 50px 0 0 44px;
        margin: 0;
    }
}
</style>

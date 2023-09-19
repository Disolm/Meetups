<template>
  <fieldset class='agenda-item-form'>
    <button
      type='button'
      class='agenda-item-form__remove-button'
      @click="$emit('remove')"
    >
      <UiIcon icon='trash' />
    </button>

    <UiFormGroup>
      <UiDropdown
        title='Тип'
        name='type'
        v-model='localAgendaItem.type'
        :options='$options.agendaItemOptions'
      />
    </UiFormGroup>

    <div class='agenda-item-form__row'>
      <div class='agenda-item-form__col'>
        <UiFormGroup label='Начало'>
          <UiInput
            type='time'
            placeholder='00:00'
            name='startsAt'
            v-model='localAgendaItem.startsAt'
          />
        </UiFormGroup>
      </div>
      <div class='agenda-item-form__col'>
        <UiFormGroup label='Окончание'>
          <UiInput
            type='time'
            placeholder='00:00'
            name='endsAt'
            v-model='localAgendaItem.endsAt'
          />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup
      v-for='(agenda, key) in agendas'
      :key='key'
      :label='agenda.label'
    >
      <component
        :is='agenda.component'
        v-bind='agenda.props'
        v-model='localAgendaItem[key]'
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
// TO DO: Task 07-forms/04-GeneratedForm

import UiFormGroup from '@/components/UiFormGroup.vue';
import UiInput from '@/components/UiInput.vue';
import UiDropdown from '@/components/UiDropdown.vue';
import UiIcon from '@/components/UiIcon.vue';
import { agendaItemOptions, agendaItemFormSchemas } from '@/services/meetupService';


export default {
  name: 'MeetupAgendaItemForm',
  components: { UiIcon, UiDropdown, UiInput, UiFormGroup },
  agendaItemOptions,
  agendaItemFormSchemas,
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:agendaItem', 'remove'],
  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },
  watch: {
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },
    'localAgendaItem.startsAt'(newValue, oldValue) {
      const newMinStartAt = this.getMinutesFromTime(newValue);
      const oldMinStartAt = this.getMinutesFromTime(oldValue);
      const minEndAt = this.getMinutesFromTime(this.localAgendaItem.endsAt);
      const oldDeltaTimeAt = minEndAt - oldMinStartAt;

      let newDeltaTime = newMinStartAt + oldDeltaTimeAt;
      if (Math.sign(newDeltaTime) < 0) {
        newDeltaTime = newDeltaTime + 1440;
      }
      this.localAgendaItem.endsAt = this.getTimeFromMinutes(newDeltaTime);
    },
  },
  computed: {
    agendas() {
      return agendaItemFormSchemas[this.localAgendaItem.type];
    },
  },
  methods: {
    getMinutesFromTime(time) {
      const arrTime = time.split(':');
      return arrTime[0] * 60 + +arrTime[1];
    },
    getTimeFromMinutes(minute) {
      if (minute > 1400) minute -= 1440;
      const hours = String(Math.trunc(minute / 60));
      const minutes = String(minute % 60);
      return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0');
    },
  },
};
</script>

<style scoped>
/* _agenda-item-form.css */

.agenda-item-form {
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    position: relative;
    padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
    position: absolute;
    top: 4px;
    right: 0;
    box-shadow: none;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 4px;
    cursor: pointer;
    transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
    opacity: 0.6;
}

.agenda-item-form__row {
    display: flex;
    flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
    margin-top: 16px;
}

.agenda-item-form__col:first-child {
    margin-left: 0;
}

@media all and (min-width: 992px) {
    .agenda-item-form {
        padding: 28px 25% 4px 24px;
    }

    .agenda-item-form__remove-button {
        top: 20px;
        right: 20px;
    }

    .agenda-item-form__row {
        flex-direction: row;
        justify-content: space-between;
        margin: 0 -12px;
    }

    .agenda-item-form__col {
        flex: 1 1 auto;
        padding: 0 12px;
    }

    .agenda-item-form__col + .agenda-item-form__col {
        margin-top: 0;
    }

    .agenda-item-form__col:first-child {
        margin-left: 0;
    }
}
</style>

<template>
  <UiInput
    v-model='inputValue'
    :type='type'
    :step='step'
    ref='inputRef'
  >
    <template v-for='key in Object.keys($slots)' #[key]>
      <slot :name='key' />
    </template>
  </UiInput>
</template>

<script>
// TO DO: Task 06-wrappers/06-UiInputDate

import UiInput from '@/components/UiInput.vue';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  emits: ['update:modelValue'],
  props: {
    type: {
      type: String,
      required: false,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: [Number, null],
      required: false,
    },
    step: {
      type: [Number, String],
      required: false,
    },
  },
  computed: {
    inputValue: {
      get() {
        if (isNaN(this.modelValue)) return;

        const date = new Date(this.modelValue);
        const fullYear = String(date.getUTCFullYear());
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        if (this.type === 'date') return [fullYear, month, day].join('-');
        if (this.type === 'time') return [hours, minutes].join(':');
        return [fullYear, month, day].join('-') + 'T' + [hours, minutes].join(':');
      },

      set() {
        const date = this.$refs.inputRef.$refs.input.valueAsNumber;
        this.$emit('update:modelValue', date);
      },
    },
  },
};
</script>

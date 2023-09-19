<template>
  <div class='button-group' role='group'>
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'UiButtonGroup',
  props: {
    modelValue: {
      required: true,
    },
  },
  provide() {
    return {
      value: computed(() => this.modelValue),
      setValue: (value) => this.$emit('update:modelValue', value)
    }
  },
  emits: ['update:modelValue'],
};
</script>

<style scoped>
/* _button-group.css */
.button-group {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    white-space: nowrap;
}
</style>

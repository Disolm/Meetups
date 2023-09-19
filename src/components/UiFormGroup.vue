<template>
  <div
    :class="{'form-group_inline': inline}"
    class="form-group"
  >
    <label v-if="!!label" class="form-group__label">{{ label }}</label>
    <slot/>
  </div>
</template>

<script>
// TO DO: Task 04-vue-cli/01-UiFormGroup1

export default {
  name: 'UiFormGroup',
  props: {
    inline: {
      required: false,
      type: Boolean,
      default: () => false
    },
    label: {
      required: false,
      type: String,
      default: () => ''
    },
  }
};
</script>

<style scoped>
/* _form-group.css */

.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-group__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>

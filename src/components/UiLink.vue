<template>
  <component
    :is="tag"
    class="link"
  >
    <slot />
  </component>
</template>

<script>
// TO DO: Task 06-wrappers/01-UiLink

export default {
  name: 'UiLink',
  props: {
    tag: {
      type: [String, Object, Function],
      required: false,
      default: 'router-link'
    }
  }
};
</script>

<style scoped>
/* _link.css */
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>

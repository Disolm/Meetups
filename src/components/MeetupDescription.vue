<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<script>
// TO DO: Task 02-components/02-MeetupDescription

export default {
  name: 'MeetupDescription',
  props:{
    description:{
      type: String,
      required: false,
      default: ''
    }
  },
};
</script>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>

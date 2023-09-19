<template>
  <UiCalendarView v-slot="{date}">
    <UiCalendarEvent
      v-for="meetup in internationalMeetupsMap?.[date.fullYear]?.[date.month]?.[date.date]"
      tag="a"
      :key="meetup.id"
      :href="`/meetups/${meetup.id}`"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView></template>

<script>
// TO DO: Task 04-vue-cli/04-MeetupsCalendar + 10-slots/03-UiCalendarView

import UiCalendarEvent from '@/components/UiCalendarEvent.vue';
import UiCalendarView from '@/components/UiCalendarView.vue';

export default {
  name: 'MeetupsCalendar',
  components: { UiCalendarView, UiCalendarEvent },
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  computed: {
    internationalMeetupsMap() {
      let result = {}
      this.meetups.forEach(meetup => {
        const dateMeetups = new Date(meetup.date)
        const year = dateMeetups.getFullYear()
        const month = dateMeetups.getMonth()
        const date = dateMeetups.getDate()
        result = {...result}
        result[year] = {...result[year]}
        result[year][month] = {...result[year][month]}
        result[year][month][date] = {...result[year][month][date], [meetup.id]: meetup}
      })
      return result;
    },
  }
};
</script>

<style scoped></style>

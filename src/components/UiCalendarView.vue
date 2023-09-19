<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="backMonth()"
        />
        <div class="calendar-view__date">{{ showDateTitle }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="nextMonth()"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        class="calendar-view__cell"
        :class="{'calendar-view__cell_inactive': day.inactive}"
        tabindex="0"
        v-for="day in daysArray"
      >
        <div class="calendar-view__cell-day">
          {{ day.date }}
        </div>
        <div class="calendar-view__cell-content">
          <slot :date='day' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TO DO: Task 10-slots/03-UiCalendarView

export default {
  name: 'UiCalendarView',
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    showDateTitle() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    daysArray() {
      const daysInMonth = (date) => {
        return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
      }
      const arrayLength = daysInMonth(this.date)
      const days = [...Array(arrayLength).keys()].map(i => {
        return {
          date: i + 1,
          month: this.date.getMonth(),
          fullYear: this.date.getFullYear(),
          inactive: false
        }
      })

      const getDayStart = new Date(days[0].fullYear, days[0].month, days[0].date).getDay()
      const lastMount = new Date(this.date.getMonth() ? this.date.getFullYear() : this.date.getFullYear() - 1, this.date.getMonth(), 0)
      const getDayFinish = new Date(days[days.length - 1].fullYear, days[days.length - 1].month, days[days.length - 1].date).getDay()

      for (let i = 0; i < (getDayStart === 0 ? 6 : getDayStart - 1); i++) {
        days.unshift({
          date: daysInMonth(lastMount) - i,
          month: this.date.getMonth() ? this.date.getMonth() - 1 : 11,
          fullYear: this.date.getMonth() ? this.date.getFullYear() : this.date.getFullYear() - 1,
          inactive: true
        })
      }

      for (let i = 0; i < (getDayFinish === 0 ? 0 : 7 - getDayFinish); i++) {
        days.push({
          date: i + 1,
          month: this.date.getMonth() === 11 ? 0 : this.date.getMonth() + 1,
          fullYear: this.date.getMonth() === 11 ? this.date.getFullYear() + 1 : this.date.getFullYear(),
          inactive: true
        })
      }
      return days
    }
  },
  methods: {
    nextMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1, 1))
    },
    backMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1, 1))
    },
  },
};
</script>

<style scoped>
/* _calendar-view.css */
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>

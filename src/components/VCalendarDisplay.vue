<script setup lang="ts">
import { computed } from 'vue';
import { useLocaleStore } from '@/store/useLocaleStore';
import { setDate } from '@/utils/calendar';
import type { Dayjs } from 'dayjs';

interface Day {
  day: Dayjs;
  isSameMonth: boolean;
}

const props = defineProps<{
  calendarState: Dayjs;
  selectedDay?: string | Dayjs;
}>();

const emits = defineEmits<{
  click: [value: Dayjs];
}>();

const store = useLocaleStore();

const calendarDisplay = computed(() => {
  const week: Day[] = [];
  const display: Day[][] = [];
  const startDate = props.calendarState.startOf('month').startOf('week').subtract(1, 'day');
  const endDate = props.calendarState.endOf('month').endOf('week');
  const numberOfDays = endDate.diff(startDate, 'day') + 1;

  for (let index = 0; index < numberOfDays; index++) {
    const day = startDate.add(index, 'day');
    const isSameMonth = day.isSame(props.calendarState, 'month');

    week.push({
      day,
      isSameMonth,
    });

    if (week.length === 7) {
      display.push([...week.splice(0, 7)]);
    }
  }

  return display;
});

function isCurrentDay(day: Dayjs) {
  return day.isSame(setDate(props.selectedDay), 'day');
}
</script>

<template>
  <table :class="$style.calendarDisplay">
    <thead>
      <tr>
        <th v-for="dayWeek in store.dayWeeks" :key="dayWeek" :class="$style.tableCell">
          {{ dayWeek }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in calendarDisplay" :key="index">
        <td
          v-for="{ day, isSameMonth } in row"
          :key="day.date()"
          :class="[
            $style.tableCell,
            !isSameMonth && $style.grayText,
            isCurrentDay(day) && $style.currentDay,
          ]"
        >
          <button :class="[$style.displayButton]" @click="emits('click', day)">
            {{ day.date() }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module lang="scss">
.calendarDisplay {
  border-collapse: collapse;
  border-spacing: 5px;
}

.tableCell {
  padding: 2px;
  min-width: 40px;
  height: 1px;
  border-radius: 4px;
}

.currentDay {
  outline: 2px solid $current-day;
  outline-offset: -3px;
}

.grayText {
  color: lightgray;
}

.displayButton {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  color: inherit;
}
</style>

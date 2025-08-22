<script setup lang="ts">
import { setDate } from '@/libs/calendar';
import { useDayjsStore } from '@/store/useDayjsStore';
import type { Dayjs } from 'dayjs';
import type { Day } from './calendar.type';

const props = defineProps<{
  currentDay?: string;
  dateGrid: Day[][];
}>();

const emits = defineEmits<{
  click: [value: Dayjs];
}>();

const store = useDayjsStore();

function isCurrentDay(day: Dayjs) {
  return day.isSame(setDate(props.currentDay), 'day');
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
      <tr v-for="(row, index) in dateGrid" :key="index">
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

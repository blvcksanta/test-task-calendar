<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { setDate } from '@/utils/calendar';
import VCalendarHeader from './VCalendarHeader.vue';
import VCalendarDisplay from './VCalendarDisplay.vue';
import type { Dayjs } from 'dayjs';

const model = defineModel<string>();
const calendarState = ref<Dayjs>(setDate(model.value));

function onDayClick(day: Dayjs) {
  model.value = day.format('YYYY-MM-DD');
}

function changeMonth(value: 'next' | 'prev') {
  if (value === 'next') {
    calendarState.value = calendarState.value.add(1, 'month');
  } else {
    calendarState.value = calendarState.value.subtract(1, 'month');
  }
}

watchEffect(() => {
  calendarState.value = setDate(model.value);
});
</script>

<template>
  <div :class="$style.calendar">
    <VCalendarHeader
      :calendar-state="calendarState"
      @prev="changeMonth('prev')"
      @next="changeMonth('next')"
    />
    <VCalendarDisplay :selected-day="model" :calendar-state="calendarState" @click="onDayClick" />
  </div>
</template>

<style module lang="scss">
.calendar {
  padding: 8px;
}
</style>

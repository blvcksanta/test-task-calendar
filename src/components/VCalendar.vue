<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useLocaleStore } from '@/store/useLocaleStore';
import { setDate } from '@/libs/calendar';
import VCalendarHeader from './VCalendarHeader.vue';
import VCalendarDisplay from './VCalendarDisplay.vue';
import type { Dayjs } from 'dayjs';
import type { Day } from './calendar.type';
import dayjs from 'dayjs';

const store = useLocaleStore();
const model = defineModel<string>();

const date = ref<Dayjs>(setDate(model.value));

const calendarTitle = computed(() => {
  return dayjs(date.value).locale(store.currentLanguage).format('MMMM YYYY');
});

const calendarDisplay = computed(() => {
  const week: Day[] = [];
  const display: Day[][] = [];
  const startDate = date.value.startOf('month').startOf('week').subtract(1, 'day');
  const endDate = date.value.endOf('month').endOf('week');
  const numberOfDays = endDate.diff(startDate, 'day') + 1;

  for (let index = 0; index < numberOfDays; index++) {
    const day = startDate.add(index, 'day');
    const isSameMonth = day.isSame(date.value, 'month');

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

function onDayClick(day: Dayjs) {
  model.value = day.format('YYYY-MM-DD');
}

function changeMonth(value: 'next' | 'prev') {
  if (value === 'next') {
    date.value = date.value.add(1, 'month');
  } else {
    date.value = date.value.subtract(1, 'month');
  }
}

watchEffect(() => {
  date.value = setDate(model.value);
});
</script>

<template>
  <div :class="$style.calendar">
    <VCalendarHeader
      :title="calendarTitle"
      @prev="changeMonth('prev')"
      @next="changeMonth('next')"
    />
    <VCalendarDisplay :current-day="model" :date-grid="calendarDisplay" @click="onDayClick" />
  </div>
</template>

<style module lang="scss">
.calendar {
  padding: 8px;
}
</style>

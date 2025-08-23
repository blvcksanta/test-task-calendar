<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import { useLocaleStore } from '@/store/useLocaleStore';
import { setDate } from '@/libs/calendar';
import VCalendarHeader from './VCalendarHeader.vue';
import VCalendarDisplay from './VCalendarDisplay.vue';
import type { Dayjs } from 'dayjs';
import type { Day } from './calendar.type';

const props = defineProps<{
  modelValue?: string;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string];
}>();

const store = useLocaleStore();

const calendarState = ref<Dayjs>(setDate(props.modelValue));

const model = computed({
  get: () => setDate(props.modelValue),
  set: (v) => {
    calendarState.value = v;
    emits('update:modelValue', v.format('YYYY-MM-DD'));
  },
});

const calendarTitle = computed(() => {
  return dayjs(calendarState.value).locale(store.currentLanguage).format('MMMM YYYY');
});

const calendarDisplay = computed(() => {
  const week: Day[] = [];
  const display: Day[][] = [];
  const startDate = calendarState.value.startOf('month').startOf('week').subtract(1, 'day');
  const endDate = calendarState.value.endOf('month').endOf('week');
  const numberOfDays = endDate.diff(startDate, 'day') + 1;

  for (let index = 0; index < numberOfDays; index++) {
    const day = startDate.add(index, 'day');
    const isSameMonth = day.isSame(calendarState.value, 'month');

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
  model.value = day;
}

function changeMonth(value: 'next' | 'prev') {
  if (value === 'next') {
    calendarState.value = calendarState.value.add(1, 'month');
  } else {
    calendarState.value = calendarState.value.subtract(1, 'month');
  }
}
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

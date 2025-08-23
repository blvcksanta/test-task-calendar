<script setup lang="ts">
import { computed, ref } from 'vue';
import { setDate } from '@/libs/calendar';
import VCalendarHeader from './VCalendarHeader.vue';
import VCalendarDisplay from './VCalendarDisplay.vue';
import type { Dayjs } from 'dayjs';

const props = defineProps<{
  modelValue?: string;
}>();

const emits = defineEmits<{
  'update:modelValue': [value: string];
}>();

const calendarState = ref<Dayjs>(setDate(props.modelValue));

const model = computed({
  get: () => setDate(props.modelValue),
  set: (v) => {
    calendarState.value = v;
    emits('update:modelValue', v.format('YYYY-MM-DD'));
  },
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

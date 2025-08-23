<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import { useLocaleStore } from '@/store/useLocaleStore';
import type { Dayjs } from 'dayjs';

const props = defineProps<{
  calendarState: Dayjs;
}>();

const emits = defineEmits<{
  prev: [];
  next: [];
}>();

const store = useLocaleStore();

const title = computed(() => {
  return dayjs(props.calendarState).locale(store.currentLanguage).format('MMMM YYYY');
});
</script>

<template>
  <div :class="$style.calendarHeader">
    <button :class="$style.button" @click="emits('prev')">◀</button>
    <span :class="$style.title">{{ title }}</span>
    <button :class="$style.button" @click="emits('next')">▶</button>
  </div>
</template>

<style module lang="scss">
.calendarHeader {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.title {
  text-align: center;
  font-size: 16px;
}

.button {
  border-radius: 4px;
}
</style>

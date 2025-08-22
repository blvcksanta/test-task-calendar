<script setup lang="ts">
import { useDayjsStore } from '@/store/useDayjsStore';
import VCalendar from '@/components/VCalendar.vue';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

const store = useDayjsStore();

const date = ref(dayjs(new Date()).format('YYYY-MM-DD'));

const buttonText = computed(() => {
  const engText = 'Change lang';
  const ruText = 'Изменить язык';

  return store.isLanguageRu ? ruText : engText;
});
</script>

<template>
  <div :class="$style.container">
    <span :class="$style.tag">{{ date }}</span>
    <button :class="$style.button" @click="store.changeLanguage">{{ buttonText }}</button>
    <VCalendar v-model="date" />
  </div>
</template>

<style module lang="scss">
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.tag,
.button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid $current-day;
  background-color: #f5e9fe;
}
</style>

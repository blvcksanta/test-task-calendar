<script setup lang="ts">
import { useLocaleStore } from '@/store/useLocaleStore';
import VCalendar from '@/components/VCalendar.vue';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

const store = useLocaleStore();

const input = ref(dayjs(new Date()).format('YYYY-MM-DD'));

const buttonText = computed(() => {
  const engText = 'Change lang';
  const ruText = 'Изменить язык';

  return store.isLanguageRu ? ruText : engText;
});
</script>

<template>
  <div :class="$style.container">
    <input v-model="input" type="text" placeholder="YYYY-MM-DD" />
    <button :class="$style.button" @click="store.changeLanguage">{{ buttonText }}</button>
    <VCalendar v-model="input" />
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

.button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid $current-day;
  background-color: #f5e9fe;
}
</style>

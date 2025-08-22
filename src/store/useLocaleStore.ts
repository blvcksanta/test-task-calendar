import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

export const useLocaleStore = defineStore('locale', () => {
  const dayWeeks = ref<string[]>(dayjs.weekdaysShort());
  const isLanguageRu = ref(true);

  const currentLanguage = computed(() => {
    return isLanguageRu.value ? 'ru' : 'en';
  });

  function changeLanguage() {
    isLanguageRu.value = !isLanguageRu.value;
    dayjs.locale(currentLanguage.value);
    dayWeeks.value = dayjs.weekdaysShort();
  }

  return {
    dayWeeks,
    currentLanguage,
    isLanguageRu,
    changeLanguage,
  };
});

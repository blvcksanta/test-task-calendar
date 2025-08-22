import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const useDayjsStore = defineStore('dayjs', () => {
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

  function formattingDate(value: string | null | undefined | Dayjs, format: string) {
    if (!dayjs(value).isValid()) return '';

    return dayjs(value).locale(currentLanguage.value).format(format);
  }

  return {
    dayWeeks,
    currentLanguage,
    isLanguageRu,
    changeLanguage,
    formattingDate,
  };
});

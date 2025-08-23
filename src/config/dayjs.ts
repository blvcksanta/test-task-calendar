import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';

dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.locale('ru');

dayjs.updateLocale('ru', {
  weekStart: 0,
});

dayjs.updateLocale('en', {
  weekStart: 0,
});

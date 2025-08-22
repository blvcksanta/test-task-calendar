import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';

dayjs.locale('ru');
dayjs.extend(localeData);

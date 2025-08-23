import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export function setDate(day: Dayjs | string | undefined) {
  if (dayjs(day).isValid()) {
    return dayjs(day);
  }

  return dayjs(new Date()).startOf('day');
}

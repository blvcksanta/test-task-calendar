import type { Dayjs } from 'dayjs';

export interface Day {
  day: Dayjs;
  isSameMonth: boolean;
}

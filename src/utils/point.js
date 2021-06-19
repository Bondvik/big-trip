import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

export const getDuration = (from, to) => {
  dayjs.extend(durationPlugin);
  const diff = dayjs(to).diff(dayjs(from));
  const days = dayjs.duration(diff).days();
  const hours = dayjs.duration(diff).hours();
  const minutes = dayjs.duration(diff).minutes();

  if (days === 0 && hours === 0) {
    return dayjs().minute(minutes).format('mm[M]');
  }

  if (days === 0) {
    return dayjs().hour(hours).minute(minutes).format('HH[H] mm[M]');
  }

  return dayjs().date(days).hour(hours).minute(minutes).format('DD[D] HH[H] mm[M]');
};

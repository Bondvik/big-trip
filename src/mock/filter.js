import dayjs from 'dayjs';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points
    .filter((point) => {
      return dayjs(point.dateFrom).isAfter(dayjs(), 'minute') || dayjs(point.dateFrom).isSame(dayjs(), 'minute');
    }).length,
  past: (points) => points
    .filter((point) => {
      return dayjs(point.dateTo).isBefore(dayjs(), 'minute');
    }).length,
};

export const createFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};

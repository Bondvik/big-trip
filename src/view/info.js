import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const getPointsByDate = (points) => {
  return points.sort((prev, next) => prev.dateFrom.getTime() - next.dateFrom.getTime());
};

const getTotalPriceByTrip = (points) => {
  return points.reduce((accum, element) => accum + element.basePrice, 0);
};

const getCitiesByTrip = (points) => {
  const cities = getPointsByDate(points);
  if (cities.length > 3) {
    return `${cities[0].destination.name} &mdash; ... &mdash; ${cities[[cities.length - 1]].destination.name}`;
  }

  return cities.map((element) => element.destination.name).join(' &mdash; ');
};

const createInfoTemplate = (points) => {
  if (!points.length) {
    return ('<section class="trip-main__trip-info  trip-info"></section>');
  }

  const pointsByDate = getPointsByDate(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getCitiesByTrip(points)}</h1>

        <p class="trip-info__dates">${dayjs(pointsByDate[0].dateFrom).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(pointsByDate[pointsByDate.length - 1].dateTo).format('MMM DD')}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPriceByTrip(points)}</span>
      </p>
    </section>`
  );
};

export default class Info extends AbstractView{
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}

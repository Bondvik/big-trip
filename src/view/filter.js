import {getRandomNumber} from '../utils/common.js';
import AbstractView from './abstract.js';

const createFilterItemTemplate = ({name, count}) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-everything"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything" ${(getRandomNumber(0, 1)) ? 'checked' : ''}${count === 0 ? 'disabled' : ''}
    />
    <label
      class="trip-filters__filter-label"
      for="filter-${name}">${name}
      <span class="filter__${name}-count">${count}</span>
    </label>
  </div>`
);

const createFilterTemplate = (filters) => {
  const filterItem = filters.reduce((accum, element) => accum + createFilterItemTemplate(element), '');
  return (
    `<div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filterItem}
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>`
  );
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

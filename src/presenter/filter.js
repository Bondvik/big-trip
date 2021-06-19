import FilterView from '../view/filter.js';
import {RenderPosition, render} from '../utils/render';

export default class Filter {
  constructor(tripControlsFiltersContainer) {
    this._tripControlsFiltersContainer = tripControlsFiltersContainer;
  }

  init(filters) {
    this._filterComponent = new FilterView(filters);
    this._renderFilter();
  }

  _renderFilter() {
    render (this._tripControlsFiltersContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }
}

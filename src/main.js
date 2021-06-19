import {createPoint} from './mock/point.js';
import {createFilter} from './mock/filter.js';
import MenuView from './view/menu.js';
import {RenderPosition, render} from './utils/render';
import InfoPresenter from './presenter/info.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';

const POINT_COUNT = 4;

const points = new Array(POINT_COUNT).fill().map(createPoint);
const filters = createFilter(points);

const tripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render (tripControlsNavigationElement, new MenuView(), RenderPosition.BEFOREEND);

const infoPresenter = new InfoPresenter(tripMainElement);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement);
const tripPresenter = new TripPresenter(tripEventsElement);

infoPresenter.init(points);
filterPresenter.init(filters);
tripPresenter.init(points);

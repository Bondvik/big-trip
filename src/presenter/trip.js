import SortView from '../view/sort.js';
import ListView from '../view/list.js';
import ListEmptyView from '../view/list-empty.js';
import {RenderPosition, render} from '../utils/render';
//import {updateItem} from '../utils/common.js';
import PointPresenter from '../presenter/point.js';

export default class Trip {
  constructor(tripPointsContainer) {
    this._tripPointsContainer = tripPointsContainer;

    this._pointPresenter = {};

    this._sortComponent = new SortView();
    this._listComponent = new ListView();
    this._listEmptyComponent = new ListEmptyView();

    this._tripPointsListContainer = null;
  }

  init(points) {
    this._points = points.slice();
    this._renderPointsList();
    this._tripPointsListContainer = document.querySelector('.trip-events__list');
    this._renderPoints();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render (this._tripPointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  //('<ul class="trip-events__list"></ul>'
  _renderPointsList() {
    this._renderSort();
    render (this._tripPointsContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // Метод, куда уйдёт логика создания и рендеринга компонетов задачи,
    // текущая функция renderPoint в main.js
    // this._changeData ждёт обновленную задачу
    const pointPresenter = new PointPresenter(this._tripPointsListContainer);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    // Метод для рендеринга N-задач за раз
    if (this._points.length) {
      this._points.forEach((point) => this._renderPoint(point));
    } else {
      this._renderNoPoints();
    }

    render(this._tripPointsContainer, this._tripPointsListContainer, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
    render (this._tripPointsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}

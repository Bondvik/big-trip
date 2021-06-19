import PointFormView from '../view/point-form.js';
import PointView from '../view/point.js';
import {RenderPosition, render, replace, remove} from '../utils/render';

export default class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;

    this._pointComponent = null;
    this._pointFormComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new PointView(this._point);
    this._pointFormComponent = new PointFormView(this._point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render (this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._pointsListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsListContainer.getElement().contains(prevPointFormComponent.getElement())) {
      replace(this._pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);

  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  _replaceCardToForm() {
    replace (this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace (this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (['Escape', 'Esc'].includes(evt.key)) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}

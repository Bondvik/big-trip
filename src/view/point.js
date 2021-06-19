import {getDuration} from '../utils/point.js';
import dayjs from 'dayjs';
import AbstractView from './abstract.js';

const createOffer = ({title, price}) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
  );
};


const createPointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, id, destination, isFavorite, typeDestination, offers} = point;
  const {name} = destination;
  const pointSelectedOffers = () => {
    if (!offers.length) {
      return '';
    }
    return offers.reduce((accum, element) => accum + createOffer(element), '');
  };

  return (
    `<li class="trip-events__item" data-point-id=${id}>
      <div class="event">
        <time
          class="event__date"
          datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">
          ${dayjs(dateFrom).format('MMM DD')}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeDestination}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeDestination} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time
              class="event__start-time"
              datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">
              ${dayjs(dateFrom).format('HH:mm')}
            </time>
            &mdash;
            <time
              class="event__end-time"
              datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">
              ${dayjs(dateTo).format('HH:mm')}
            </time>
          </p>
          <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${pointSelectedOffers()}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point extends AbstractView{
  constructor(point) {
    super();
    this._point = point;
    //привязали контекст
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    //вызываем ту ф-ю, которую сохранили в setEditClickHandler
    //this._callback.editClick = callback;
    //но this здесь будет не объект класса Point, а кнопка и нам нужно
    //привязать контекст класса в конструкторе
    this._callback.editClick();
  }

  //метод позволяет установить оброботчик события
  //для действия редактирования
  //callback - ф-я, которая передаётся в main.js при наступлении события (что должно произойти, кликая на кнопку)
  //  pointComponent.setEditClickHandler(() => {
  //   replaceCardToForm();
  //   document.addEventListener('keydown', onEscKeyDown);
  // });

  // pointFormComponent.setFormSubmitkHandler(() => {
  //   replaceFormToCard();
  //   document.removeEventListener('keydown', onEscKeyDown);
  // });
  setEditClickHandler(callback) {
    //сохраняем переданную ф-ю в объекте колбэков под именем editClick
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}

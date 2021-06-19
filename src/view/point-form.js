import {types, cities, offersByType} from '../mock/point.js';
import AbstractView from './abstract.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const createEventTypeItem = (element) => {
  return (
    `<div class="event__type-item">
      <input
        id="event-type-${element}-1"
        class="event__type-input  visually-hidden"
        type="radio" name="event-type"
        value=${element}
      />
      <label
        class="event__type-label  event__type-label--${element}"
        for="event-type-${element}-1">
        ${element[0].toUpperCase() + element.slice(1)}
      </label>
    </div>`
  );
};

const createEventTypeGroup = () => {
  return types.reduce((accum, element) => accum + createEventTypeItem(element), '');
};

const createDestinationList = () => {
  return cities.reduce((accum, element) => accum + `<option value="${element}"></option>`);
};

const createPointFormTemplate = (point = {}) => {
  const {
    basePrice = null,
    dateFrom = dayjs(),
    dateTo = dayjs(dateFrom).add(1, 'hour'),
    destination = {},
    id = nanoid(),
    typeDestination = 'bus',
    offers = [],
  } = point;
  const {name, description, pictures} = destination;
  const createEventOffer = (element) => {
    let isChecked = false;
    if (offers.length) {
      for (const offer of offers) {
        if (offer.title === element.title) {
          isChecked = !isChecked;
        }
      }
    }
    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="${element.title}"
          type="checkbox"
          name="event-offer-${element.title}" ${isChecked ? 'checked' : ''}
        />
        <label
          class="event__offer-label"
          for="event-offer-${element.title}">
            <span class="event__offer-title">${element.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${element.price}</span>
        </label>
      </div>`
    );
  };

  const createEventOffers = () => {
    const eventOffers = offersByType.filter(({type}) => type === typeDestination);

    if (!eventOffers[0].offers.length) {
      return '';
    }

    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${eventOffers[0].offers.reduce((accum, element) => accum + createEventOffer(element), '')}
        </div>
      </section>`
    );
  };

  const createPictures = () => {
    if (!pictures.length) {
      return '';
    }
    return pictures.reduce((accum, element) => accum + `<img class="event__photo" src="${element.src}" alt="${element.description}">`, '');
  };

  const createDestination = () => {
    if (!name || !description) {
      return '';
    }
    return (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPictures()}
          </div>
        </div>
      </section>`
    );
  };

  return (
    `<li class="trip-events__item" data-id=${id}>
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeDestination}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeGroup()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${typeDestination}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${name}"
              list="destination-list-1"
            />
            <datalist id="destination-list-1">
              ${createDestinationList()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}"
            />
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}"
            />
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden"></span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${basePrice}"
            />
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>

        <section class="event__details">
          ${createEventOffers()}
          ${createDestination()}
        </section>
      </form>
    </li>`
  );
};

export default class PointForm extends AbstractView{
  constructor(point) {
    super();
    this._point = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formClickHandler = this._formClickHandler.bind(this);
  }

  getTemplate() {
    return createPointFormTemplate(this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }
}

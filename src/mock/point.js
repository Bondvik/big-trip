import {getRandomNumber} from '../utils/common.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';

const HOURS = 23;
const MINUTES = 59;
const DAYS = 6;

export const types = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 190,
      },
      {
        title: 'Choose the radio station',
        price: 30,
      },
      {
        title: 'Choose temperature',
        price: 170,
      },
      {
        title: 'Drive quickly, I\'m in a hurry',
        price: 100,
      },
      {
        title: 'Drive slowly',
        price: 110,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Infotainment system',
        price: 50,
      },
      {
        title: 'Order meal',
        price: 100,
      },
      {
        title: 'Choose seats',
        price: 190,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Book a taxi at the arrival point',
        price: 110,
      },
      {
        title: 'Order a breakfast',
        price: 80,
      },
      {
        title: 'Wake up at a certain time',
        price: 140,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Choose meal',
        price: 120,
      },
      {
        title: 'Choose seats',
        price: 90,
      },
      {
        title: 'Upgrade to comfort class',
        price: 120,
      },
      {
        title: 'Upgrade to business class',
        price: 120,
      },
      {
        title: 'Add luggage',
        price: 170,
      },
      {
        title: 'Business lounge',
        price: 160,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Choose the time of check-in',
        price: 70,
      },
      {
        title: 'Choose the time of check-out',
        price: 190,
      },
      {
        title: 'Add breakfast',
        price: 110,
      },
      {
        title: 'Laundry',
        price: 140,
      },
      {
        title: 'Order a meal from the restaurant',
        price: 30,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Choose meal',
        price: 130,
      },
      {
        title: 'Choose seats',
        price: 160,
      },
      {
        title: 'Upgrade to comfort class',
        price: 170,
      },
      {
        title: 'Upgrade to business class',
        price: 150,
      },
      {
        title: 'Add luggage',
        price: 100,
      },
      {
        title: 'Business lounge',
        price: 40,
      },
    ],
  },
  {
    type: 'transport',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Choose comfort class',
        price: 110,
      },
      {
        title: 'Choose business class',
        price: 180,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Choose live music',
        price: 150,
      },
      {
        title: 'Choose VIP area',
        price: 70,
      },
    ],
  },
];

export const cities = [
  'Amsterdam',
  'London',
  'Prague',
  'Paris',
  'Berlin',
  'St. Petersburg',
  'Barcelona',
  'Rome',
  'Budapest',
  'Florence',
  'Copenhagen',
  'Vein',
];

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat',
  'Nunc fermentum tortor ac porta dapibus',
  'In rutrum ac purus sit amet tempus',
];

const createDescription = () => {
  const randomIndex = getRandomNumber(0, description.length - 1);
  return `${description[randomIndex]}. `;
};

const createPicture = () => ({
  src: `http://picsum.photos/248/152?=${getRandomNumber(1, 1000)}`,
  description: `${createDescription()}`,
});

const createCityDescription = () => {
  let randomDescription = '';
  const randomIndex = getRandomNumber(0, description.length - 1);
  for (let i = randomIndex; i > 0; i--) {
    randomDescription += createDescription();
  }
  return randomDescription;
};


const createDestination = () => {
  const cityName = cities[getRandomNumber(0, cities.length - 1)];
  const destinationPictures = new Array(getRandomNumber(0, cities.length - 1)).fill().map(() =>
    createPicture());
  return ({
    name: cityName,
    description: createCityDescription(),
    pictures: destinationPictures,
  });
};

const createDateFrom = () => dayjs().add(getRandomNumber(0, DAYS), 'day').toDate();

const createDateTo = (date) => {
  return dayjs(date)
    .add(getRandomNumber(0, DAYS), 'day')
    .add(getRandomNumber(0, HOURS), 'hour')
    .add(getRandomNumber(0, MINUTES), 'minute')
    .toDate();
};

const createOffers = (typeByDestination) => {
  const offers = [];
  const isChecked = getRandomNumber(0, 1);
  const pointOffers = offersByType.filter(({type}) => type === typeByDestination);

  if (!pointOffers[0].offers.length) {
    return offers;
  }

  if (isChecked) {
    for (let i = 0; i < pointOffers[0].offers.length - 1; i++) {
      const randomIndex = getRandomNumber(0, pointOffers[0].offers.length - 1);
      offers.push(pointOffers[0].offers[randomIndex]);
    }
    return [...new Set(offers)];
  }

  return offers;

};

export const createPoint = () => {
  const dateFrom = createDateFrom();
  const dateTo = createDateTo(dateFrom);
  const typeDestination = types[getRandomNumber(0, types.length - 1)];
  const offers = createOffers(typeDestination);
  return {
    basePrice: getRandomNumber(1, 5000),
    dateFrom,
    dateTo,
    destination: createDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    typeDestination,
    offers,
  };
};

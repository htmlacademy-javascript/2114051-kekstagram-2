import { renderPhotos } from './render.js';
import { initBigPicture } from './bigPicture.js';
import { debounce } from './utils.js';

const DELAY = 500;
const PHOTOS_COUNT = 10;

let allPhotos = [];
let currentPhotos = [];

const picturesContainer = document.querySelector('.pictures');

const getRandomPhotos = () => {
  const photosCopy = [...allPhotos];
  const shuffled = photosCopy.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, PHOTOS_COUNT);
};

const getMostDiscussedPhotos = () => {
  const photosCopy = [...allPhotos];
  return photosCopy.sort((a, b) => b.comments.length - a.comments.length);
};

const applyFilter = (filterType) => {
  if (!picturesContainer) {
    return;
  }

  const photoItems = picturesContainer.querySelectorAll('.picture');
  photoItems.forEach((photo) => {
    photo.remove();
  });

  if (filterType === 'random') {
    currentPhotos = getRandomPhotos();
  } else if (filterType === 'discussed') {
    currentPhotos = getMostDiscussedPhotos();
  } else {
    currentPhotos = [...allPhotos];
  }

  renderPhotos(currentPhotos);
  initBigPicture(currentPhotos);
};

const initFilters = (photos) => {
  allPhotos = photos;
  currentPhotos = [...photos];

  const filters = document.querySelector('.img-filters');

  if (!filters) {
    return;
  }

  filters.classList.remove('img-filters--inactive');

  const debouncedFilter = debounce((filterType, button) => {
    applyFilter(filterType);

    document.querySelectorAll('.img-filters__button').forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });

    button.classList.add('img-filters__button--active');
  }, DELAY);

  const handleButtonClick = (filterType, button) => {
    if (button.classList.contains('img-filters__button--active')) {
      return;
    }
    debouncedFilter(filterType, button);
  };

  const defaultBtn = document.querySelector('#filter-default');
  const randomBtn = document.querySelector('#filter-random');
  const discussedBtn = document.querySelector('#filter-discussed');

  if (defaultBtn) {
    defaultBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleButtonClick('default', defaultBtn);
    });
  }

  if (randomBtn) {
    randomBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleButtonClick('random', randomBtn);
    });
  }

  if (discussedBtn) {
    discussedBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleButtonClick('discussed', discussedBtn);
    });
  }
};

export { initFilters };

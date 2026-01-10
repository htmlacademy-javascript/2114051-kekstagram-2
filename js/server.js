import { getData } from './api.js';
import { renderPhotos } from './render.js';
import { initBigPicture } from './bigPicture.js';
import { initFilters } from './filters.js';

const showLoadError = () => {
  const template = document.querySelector('#data-error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    if (errorElement) {
      errorElement.remove();
    }
  }, 5000);
};

const loadAndShowPhotos = async () => {
  try {
    const photos = await getData();

    renderPhotos(photos);
    initBigPicture(photos);
    initFilters(photos);

    return photos;

  } catch (error) {
    showLoadError();
    return [];
  }
};

export { loadAndShowPhotos };

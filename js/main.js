import { getData } from './api.js';
import { renderPhotos } from './render.js';
import { initBigPicture } from './bigPicture.js';
import { initFilters } from './filters.js';
import { initForm } from './form.js';
import { initEffects } from './effects.js';

const ERROR_TIMEOUT = 5000;

const showLoadError = () => {
  const template = document.querySelector('#data-error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  setTimeout(() => {
    const errorMessage = document.querySelector('.data-error');
    if (errorMessage) {
      errorMessage.remove();
    }
  }, ERROR_TIMEOUT);
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


const startApp = async () => {
  await loadAndShowPhotos();
  initForm();
  initEffects();
};

startApp();

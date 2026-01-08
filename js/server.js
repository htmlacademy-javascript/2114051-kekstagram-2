import { getData } from './api.js';
import { renderPhotos } from './render.js';
import { initBigPicture } from './bigPicture.js';


function showLoadError() {
  const template = document.querySelector('#data-error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    if (errorElement) {
      errorElement.remove();
    }
  }, 5000);
}

async function loadAndShowPhotos() {
  try {

    const photos = await getData();

    renderPhotos(photos);
    initBigPicture(photos);

    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');

    return photos;

  } catch (error) {
    showLoadError();
    return [];
  }
}

export { loadAndShowPhotos };

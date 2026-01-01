import { createPhotoDescriptions } from './createPhotoDescriptions.js';
import { renderPhotos } from './render.js';
import { initBigPicture } from './bigPicture.js';
import { initForm } from './form.js';

const photoDescriptions = createPhotoDescriptions();

renderPhotos(photoDescriptions);
initBigPicture(photoDescriptions);
initForm();

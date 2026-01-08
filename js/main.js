import { loadAndShowPhotos } from './server.js';
import { initForm } from './form.js';
import { initEffects } from './effects.js';

async function startApp() {

  await loadAndShowPhotos();

  initForm();

  initEffects();
}

startApp();

import {
  LIKES_MIN,
  LIKES_MAX,
  COMMENTS_MAX,
  DESCRIPTIONS,
} from './data.js';

import { creatureComments } from './creatureComments.js';

// СОЗДАНИЕ ВСЕХ ФОТОГРАФИЙ
const creaturePhotoDescriptions = function() {
  const photos = [];
  let commentIdCounter = 1;

  for (let i = 1; i <= 25; i++) {

    const RANDOM_DESCRIPTIONS = Math.floor(Math.random() * DESCRIPTIONS.length);
    const DESCRIPTION = DESCRIPTIONS[RANDOM_DESCRIPTIONS];

    const LIKES = Math.floor(Math.random() * (LIKES_MAX - LIKES_MIN + 1)) + LIKES_MIN;

    const COMMENTS_COUNTER = Math.floor(Math.random() * (COMMENTS_MAX + 1));

    const COMMENTS = [];
    for (let j = 0; j < COMMENTS_COUNTER; j++) {
      COMMENTS.push(creatureComments(commentIdCounter));
      commentIdCounter++;
    }

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTION,
      likes: LIKES,
      comments: COMMENTS,
    };
    photos.push(photo);
  }

  return photos;
};

export {creaturePhotoDescriptions};

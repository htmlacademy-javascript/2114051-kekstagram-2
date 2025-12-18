import {
  LIKES_MIN,
  LIKES_MAX,
  COMMENTS_MAX,
  DESCRIPTIONS,
} from './data.js';

import { createComments } from './createComments.js';

// СОЗДАНИЕ ВСЕХ ФОТОГРАФИЙ
const createPhotoDescriptions = function() {
  const photos = [];
  let commentIdCounter = 1;

  for (let i = 1; i <= 25; i++) {

    const randomDescriptions = Math.floor(Math.random() * DESCRIPTIONS.length);
    const description = DESCRIPTIONS[randomDescriptions];

    const likes = Math.floor(Math.random() * (LIKES_MAX - LIKES_MIN + 1)) + LIKES_MIN;

    const commentsCounter = Math.floor(Math.random() * (COMMENTS_MAX + 1));

    const comments = [];
    for (let j = 0; j < commentsCounter; j++) {
      comments.push(createComments(commentIdCounter));
      commentIdCounter++;
    }

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description:  description,
      likes: likes,
      comments: comments,
    };
    photos.push(photo);
  }

  return photos;
};

export {createPhotoDescriptions};

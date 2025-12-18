import {
  AVATAR_MIN,
  AVATAR_MAX,
  NAMES,
  COMMENTS_TEXT
} from './data.js';

// СОЗДАНИЕ ОДНОГО КОММЕНТАРИЯ
const createComments = function(commentId) {
  const avatarNumber = Math.floor(Math.random() * (AVATAR_MAX - AVATAR_MIN + 1)) + AVATAR_MIN;

  const NAME = NAMES[Math.floor(Math.random() * NAMES.length)];

  const counterMessage = Math.floor(Math.random() * 2) + 1;
  let message = '';

  for (let j = 0; j < counterMessage; j++) {
    const randomText = COMMENTS_TEXT[Math.floor(Math.random() * COMMENTS_TEXT.length)];
    message += randomText;
    message += ' ';
  }
  return {
    id: commentId,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: message.trim(),
    name: NAME
  };
};

export {createComments};

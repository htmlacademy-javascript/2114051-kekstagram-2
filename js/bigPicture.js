import { isEscapeKey } from './data.js';

const bigPicture = document.querySelector('.big-picture');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showComments = (comments) => {
  const commentsContainer = bigPicture.querySelector('.social__comments');

  commentsContainer.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    commentItem.appendChild(avatar);
    commentItem.appendChild(text);

    commentsContainer.appendChild(commentItem);
  }
};

const openBigPicture = (photo) => {

  const bigImage = bigPicture.querySelector('.big-picture__img img');
  bigImage.src = photo.url;
  bigImage.alt = photo.description;

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = photo.description;

  const likes = bigPicture.querySelector('.likes-count');
  likes.textContent = photo.likes;

  const commentsShown = bigPicture.querySelector('.social__comment-shown-count');
  const commentsTotal = bigPicture.querySelector('.social__comment-total-count');
  commentsShown.textContent = photo.comments.length;
  commentsTotal.textContent = photo.comments.length;

  showComments(photo.comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};


const initBigPicture = (allPhotos) => {

  const miniPictures = document.querySelectorAll('.picture');
  const closeButton = document.querySelector('.big-picture__cancel');

  for (let i = 0; i < miniPictures.length; i++) {
    const miniPicture = miniPictures[i];

    miniPicture.addEventListener('click', (evt) => {
      evt.preventDefault();

      const photo = allPhotos[i];

      openBigPicture(photo);
    });
  }

  closeButton.addEventListener('click', () => {
    closeBigPicture();
  });
};

export { initBigPicture };

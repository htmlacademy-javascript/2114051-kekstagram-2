import { isEscapeKey, COMMENTS_PER_CLICK } from './data.js';

const bigPicture = document.querySelector('.big-picture');

let currentComments = [];
let shownComments = 0;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
  shownComments = 0;
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const showMoreComments = () => {
  const commentsContainer = bigPicture.querySelector('.social__comments');

  const commentsToShow = Math.min(
    COMMENTS_PER_CLICK,
    currentComments.length - shownComments
  );


  for (let i = shownComments; i < shownComments + commentsToShow; i++) {
    const comment = currentComments[i];

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

  shownComments += commentsToShow;

  const commentsShown = bigPicture.querySelector('.social__comment-shown-count');
  const commentsTotal = bigPicture.querySelector('.social__comment-total-count');
  commentsShown.textContent = shownComments;
  commentsTotal.textContent = currentComments.length;

  const loadMoreButton = bigPicture.querySelector('.comments-loader');
  if (shownComments >= currentComments.length) {
    loadMoreButton.classList.add('hidden');
  }
};

const openBigPicture = (photo) => {

  currentComments = photo.comments;
  shownComments = 0;

  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';

  const bigImage = bigPicture.querySelector('.big-picture__img img');
  bigImage.src = photo.url;
  bigImage.alt = photo.description;

  const description = bigPicture.querySelector('.social__caption');
  description.textContent = photo.description;

  const likes = bigPicture.querySelector('.likes-count');
  likes.textContent = photo.likes;

  const commentCounter = bigPicture.querySelector('.social__comment-count');
  const loadMoreButton = bigPicture.querySelector('.comments-loader');
  commentCounter.classList.remove('hidden');
  loadMoreButton.classList.remove('hidden');

  showMoreComments();

  loadMoreButton.addEventListener('click', showMoreComments);

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

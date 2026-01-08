import { isEscapeKey } from './data.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './messages.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 5;

const fileInput = document.querySelector('.img-upload__input');
const showPicture = document.querySelector('.img-upload__overlay');
const buttonClose = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentInput,
  validateComment,
  `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`
);

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ');
  const nonEmptyHashtags = hashtags.filter((tag) => tag !== '');

  if (nonEmptyHashtags.length > HASHTAG_MAX_LENGTH) {
    return false;
  }

  for (let i = 0; i < nonEmptyHashtags.length; i++) {
    const tag = nonEmptyHashtags[i];

    if (tag === '#') {
      continue;
    }

    if (!regexp.test(tag)) {
      return false;
    }
  }

  const lowerCaseTags = nonEmptyHashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);

  if (uniqueTags.size !== nonEmptyHashtags.length) {
    return false;
  }

  return true;
};

const getHashtagError = (value) => {
  if (value.trim() === '') {
    return '';
  }

  const hashtags = value.trim().split(' ');
  const nonEmptyHashtags = hashtags.filter((tag) => tag !== '');

  if (nonEmptyHashtags.length > HASHTAG_MAX_LENGTH) {
    return `Нельзя указать больше ${HASHTAG_MAX_LENGTH} хэштегов`;
  }

  for (let i = 0; i < nonEmptyHashtags.length; i++) {
    const tag = nonEmptyHashtags[i];

    if (tag === '#') {
      continue;
    }

    if (tag[0] !== '#') {
      return 'Хэштег должен начинаться с #';
    }

    if (tag.length < 2) {
      return 'Хэштег не может состоять только из #';
    }

    if (!regexp.test(tag)) {
      return 'Хэштег должен содержать только буквы и цифры после #';
    }
  }

  const lowerCaseTags = nonEmptyHashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);

  if (uniqueTags.size !== nonEmptyHashtags.length) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

  return '';
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  getHashtagError
);

const openForm = () => {
  showPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  showPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const stopEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const resetForm = () => {
  fileInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
  resetScale();
  resetEffects();
};

const initForm = () => {
  hashtagInput.addEventListener('keydown', stopEscPropagation);
  commentInput.addEventListener('keydown', stopEscPropagation);

  buttonClose.addEventListener('click', () => {
    closeForm();
    resetForm();
  });

  fileInput.addEventListener('change', () => {
    openForm();
  });

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      const submitButton = document.querySelector('.img-upload__submit');
      submitButton.disabled = true;
      submitButton.textContent = 'Отправка...';

      const formData = new FormData(form);

      try {
        await sendData(formData);

        showSuccess();
        closeForm();
        resetForm();

      } catch (error) {
        showError();
      } finally {

        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      }
    }
  });
};

export { initForm };

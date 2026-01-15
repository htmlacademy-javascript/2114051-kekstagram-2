import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccess, showError } from './messages.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 5;
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

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

const validateHashtag = (value) => {
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return true;
  }

  const hashtags = trimmedValue.split(' ');
  const cleanHashtags = hashtags.filter((tag) => tag !== '');

  if (cleanHashtags.length > HASHTAG_MAX_LENGTH) {
    return false;
  }

  for (let i = 0; i < cleanHashtags.length; i++) {
    const tag = cleanHashtags[i];

    if (tag === '#') {
      return false;
    }

    if (!REGEXP.test(tag)) {
      return false;
    }
  }

  const lowerTags = cleanHashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = [...new Set(lowerTags)];

  return uniqueTags.length === cleanHashtags.length;
};

const getHashtagError = (value) => {
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    return '';
  }

  const hashtags = trimmedValue.split(' ');
  const cleanHashtags = hashtags.filter((tag) => tag !== '');

  if (cleanHashtags.length > HASHTAG_MAX_LENGTH) {
    return `Нельзя указать больше ${HASHTAG_MAX_LENGTH} хэштегов`;
  }

  for (let i = 0; i < cleanHashtags.length; i++) {
    const tag = cleanHashtags[i];

    if (tag === '#') {
      return 'Хэштег не может состоять только из #';
    }

    if (tag[0] !== '#') {
      return 'Хэштег должен начинаться с #';
    }

    if (tag.length < 2) {
      return 'Хэштег слишком короткий';
    }

    if (!REGEXP.test(tag)) {
      return 'Хэштег должен содержать только буквы и цифры';
    }
  }

  const lowerTags = cleanHashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = [...new Set(lowerTags)];

  if (uniqueTags.length !== cleanHashtags.length) {
    return 'Хэштеги не должны повторяться';
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
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  showPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    const hasOpenMessage = document.querySelector('.success') || document.querySelector('.error');
    if (!hasOpenMessage) {
      evt.preventDefault();
      closeForm();
      resetForm();
    }
  }
}

function resetForm() {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();

  fileInput.value = '';

  const image = document.querySelector('.img-upload__preview img');
  const effectPreviews = document.querySelectorAll('.effects__preview');

  image.src = 'img/upload-default-image.jpg';
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = 'url("img/upload-default-image.jpg")';
  });
}

const loadImageToForm = () => {
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (evt) => {
    const image = document.querySelector('.img-upload__preview img');
    const effectPreviews = document.querySelectorAll('.effects__preview');

    image.src = evt.target.result;

    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${evt.target.result})`;
    });
  };

  reader.readAsDataURL(file);
};

const initForm = () => {
  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  commentInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  buttonClose.addEventListener('click', () => {
    closeForm();
    resetForm();
  });

  const uploadLabel = document.querySelector('.img-upload__label');
  if (uploadLabel) {
    uploadLabel.addEventListener('click', () => {
      fileInput.value = '';
    });
  }

  fileInput.addEventListener('change', () => {
    openForm();
    loadImageToForm();
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

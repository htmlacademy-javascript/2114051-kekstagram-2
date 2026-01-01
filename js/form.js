import { isEscapeKey } from './data.js';

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

const validateComment = (value) => value.length <= 140;
const regexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

const validateHashtag = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(' ');
  const nonEmptyHashtags = hashtags.filter((tag) => tag !== '');

  if (nonEmptyHashtags.length > 5) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  for (let i = 0; i < nonEmptyHashtags.length; i++) {
    const tag = nonEmptyHashtags[i];
    if (!regexp.test(tag)) {
      return 'Хэштег должен начинаться с # и содержать только буквы и цифры';
    }
  }

  const lowerCaseTags = nonEmptyHashtags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);

  if (uniqueTags.size !== nonEmptyHashtags.length) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

  return true;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Не больше 5 хэштегов и каждый должен начинаться с #'
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
  fileInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
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

const initForm = () => {
  hashtagInput.addEventListener('keydown', stopEscPropagation);
  commentInput.addEventListener('keydown', stopEscPropagation);

  buttonClose.addEventListener('click', () => {
    closeForm();
  });

  fileInput.addEventListener('change', () => {
    openForm();
  });

  form.addEventListener('submit', (evt) => {
    const hashtagsOk = validateHashtag(hashtagInput.value);
    const commentOk = validateComment(commentInput.value);

    if (hashtagsOk !== true || commentOk !== true) {
      evt.preventDefault();

      alert(hashtagsOk !== true ? hashtagsOk : commentOk);
    }
  });
};

export { initForm };

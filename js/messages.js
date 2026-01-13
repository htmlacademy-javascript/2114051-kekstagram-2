import { isEscapeKey } from './utils.js';

const showSuccess = () => {
  const template = document.querySelector('#success');
  const success = template.content.cloneNode(true);
  document.body.appendChild(success);

  const message = document.querySelector('.success');
  const button = message.querySelector('.success__button');

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showError = () => {
  const template = document.querySelector('#error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  const message = document.querySelector('.error');
  const button = message.querySelector('.error__button');

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccess, showError };

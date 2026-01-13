import { isEscapeKey } from './data.js';

function showSuccess() {
  const template = document.querySelector('#success');
  const success = template.content.cloneNode(true);
  document.body.appendChild(success);

  const message = document.querySelector('.success');
  const button = message.querySelector('.success__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
}

function showError() {
  const template = document.querySelector('#error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  const message = document.querySelector('.error');
  const button = message.querySelector('.error__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);
}

export { showSuccess, showError };

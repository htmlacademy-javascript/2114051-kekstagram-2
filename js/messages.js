import { isEscapeKey } from './data.js';

function showSuccess() {
  const template = document.querySelector('#success');
  const success = template.content.cloneNode(true);
  document.body.appendChild(success);

  const message = document.querySelector('.success');
  const button = message.querySelector('.success__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClick);
  }

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  function onClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClick);
}

function showError() {
  const template = document.querySelector('#error');
  const error = template.content.cloneNode(true);
  document.body.appendChild(error);

  const message = document.querySelector('.error');
  const button = message.querySelector('.error__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClick);
  }

  function onEsc(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  function onClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClick);
}

export { showSuccess, showError };

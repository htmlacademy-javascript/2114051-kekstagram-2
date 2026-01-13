const renderPhotos = (photoDescriptions) => {
  const template = document.querySelector('#picture');
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  const existingPhotos = container.querySelectorAll('.picture');
  existingPhotos.forEach((photo) => {
    photo.remove();
  });

  for (let i = 0; i < photoDescriptions.length; i++) {
    const photo = photoDescriptions[i];
    const photoClone = template.content.cloneNode(true);

    const img = photoClone.querySelector('.picture__img');
    const likes = photoClone.querySelector('.picture__likes');
    const comments = photoClone.querySelector('.picture__comments');

    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    fragment.appendChild(photoClone);
  }

  container.appendChild(fragment);
};

export { renderPhotos };

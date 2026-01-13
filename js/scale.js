const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const SCALE_MINIMUM = 25;
let currentScale = SCALE_DEFAULT;

const scaleControlValue = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

smallerButton.addEventListener('click', () => {
  const newScale = currentScale - SCALE_STEP;

  if (newScale >= SCALE_MINIMUM) {
    currentScale = newScale;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  const newScale = currentScale + SCALE_STEP;

  if (newScale <= SCALE_MAX) {
    currentScale = newScale;
    updateScale();
  }
});

updateScale();

export { resetScale };

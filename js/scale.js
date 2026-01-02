const scaleСontrolValue = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const scaleStap = 25;
const scaleMax = 100;
const scaleDefault = 100;
let currentScale = scaleDefault;


const updateScale = () => {
  scaleСontrolValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const resetScale = () => {
  currentScale = scaleDefault;
  updateScale();
};

smallerButton.addEventListener('click', () => {
  const newScale = currentScale - scaleStap;

  if (newScale >= 25) {
    currentScale = newScale;
    updateScale();
  }
});

biggerButton.addEventListener('click', () => {
  const newScale = currentScale + scaleStap;

  if (newScale <= scaleMax) {
    currentScale = newScale;
    updateScale();
  }
});


updateScale();

export { resetScale };

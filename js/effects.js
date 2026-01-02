const sliderContainer = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectRadios = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');

const effects = {
  none: {
    name: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

let currentEffect = 'none';

const applyEffect = (value) => {
  effectValueInput.value = value;

  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  let filterString = '';

  if (currentEffect === 'chrome') {
    filterString = `grayscale(${value})`;
  } else if (currentEffect === 'sepia') {
    filterString = `sepia(${value})`;
  } else if (currentEffect === 'marvin') {
    filterString = `invert(${value}%)`;
  } else if (currentEffect === 'phobos') {
    filterString = `blur(${value}px)`;
  } else if (currentEffect === 'heat') {
    filterString = `brightness(${value})`;
  }

  imagePreview.style.filter = filterString;
};

const createSlider = () => {
  if (typeof noUiSlider === 'undefined') {
    return;
  }

  noUiSlider.create(sliderContainer, {
    start: 0,
    connect: 'lower',
    range: { min: 0, max: 100 },
    step: 1,
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  });

  sliderContainer.noUiSlider.on('update', (values) => {
    applyEffect(parseFloat(values[0]));
  });
};

const changeEffect = (effectName) => {
  currentEffect = effectName;
  const effect = effects[effectName];

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    applyEffect(0);
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  sliderContainer.noUiSlider.updateOptions({
    start: effect.max,
    range: { min: effect.min, max: effect.max },
    step: effect.step
  });

  applyEffect(effect.max);
};

const addEffectListeners = () => {
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      changeEffect(evt.target.value);
    });
  });
};

const resetEffects = () => {
  currentEffect = 'none';

  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  effectLevelContainer.classList.add('hidden');
  imagePreview.style.filter = 'none';
  effectValueInput.value = '';

  if (sliderContainer.noUiSlider) {
    sliderContainer.noUiSlider.set(0);
  }
};

const initEffects = () => {
  if (!sliderContainer || !imagePreview) {
    return;
  }

  createSlider();
  addEffectListeners();
  resetEffects();
};

export { initEffects, resetEffects };

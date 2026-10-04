'use strict';

const CALC_PRICES = {
  objectType: {
    apartment: 450,
    house: 900,
    office: 700,
  },
  workType: {
    new: 1.0,
    replace: 0.85,
    partial: 0.5,
  },
  extras: {
    shield: 12000,
    lighting: 8000,
    smart: 35000,
    floor: 1500,
  },
};

const Calculator = (() => {
  let currentStep = 1;
  const totalSteps = 4;

  const form = document.getElementById('calculator-form');
  const steps = document.querySelectorAll('.calc-step');
  const progressBar = document.querySelector('.calculator__progress-bar');
  const currentStepEl = document.getElementById('calc-current-step');
  const totalStepsEl = document.getElementById('calc-total-steps');
  const prevBtn = document.getElementById('calc-prev');
  const nextBtn = document.getElementById('calc-next');
  const nav = document.getElementById('calc-nav');
  const areaSlider = document.getElementById('calc-area-slider');
  const areaDisplay = document.getElementById('calc-area-display');

  const init = () => {
    if (!form) return;

    totalStepsEl.textContent = totalSteps;
    prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
    nextBtn.addEventListener('click', handleNext);

    areaSlider.addEventListener('input', (e) => { areaDisplay.textContent = e.target.value; });

    document.getElementById('calc-to-form')?.addEventListener('click', scrollToContactForm);
    document.getElementById('calc-restart')?.addEventListener('click', restart);

    form.querySelectorAll('input[type="radio"]').forEach(radio => { radio.addEventListener('change', () => updateProgressBar()); });

    showStep(1);
  };

  const showStep = (step) => {
    steps.forEach(s => s.classList.remove('calc-step--active'));
    const targetStep = document.querySelector(`.calc-step[data-step="${step}"]`);
    if (targetStep) targetStep.classList.add('calc-step--active');

    currentStep = step;
    currentStepEl.textContent = Math.min(step, totalSteps);
    updateProgressBar();
    updateNavButtons();
  };

  const goToStep = (step) => {
    if (step < 1 || step > totalSteps + 1) return;
    showStep(step);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    } else if (currentStep === totalSteps) {
      const result = calculate();
      showResult(result);
    }
  };

  const updateProgressBar = () => {
    const progress = (Math.min(currentStep, totalSteps) / totalSteps) * 100;
    if (progressBar) {
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
  };

  const updateNavButtons = () => {
    prevBtn.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
      nextBtn.textContent = 'Рассчитать ✓';
    } else if (currentStep > totalSteps) {
      nav.style.display = 'none';
    } else {
      nextBtn.textContent = 'Далее →';
    }
  };

  const getSelectedValue = (name) => {
    const selected = form.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
  };

  const getSelectedExtras = () => {
    const checked = form.querySelectorAll('input[name="extras"]:checked');
    return Array.from(checked).map(cb => cb.value);
  };

  const calculate = () => {
    const objectType = getSelectedValue('objectType');
    const workType = getSelectedValue('workType');
    const area = parseInt(areaSlider.value, 10);
    const extras = getSelectedExtras();
    const basePrice = CALC_PRICES.objectType[objectType] || 450;
    const coefficient = CALC_PRICES.workType[workType] || 1;
    const mainCost = basePrice * area * coefficient;

    let extrasCost = 0;
    extras.forEach(extra => {
      if (extra === 'floor') {
        extrasCost += CALC_PRICES.extras.floor * area;
      } else {
        extrasCost += CALC_PRICES.extras[extra] || 0;
      }
    });

    const total = mainCost + extrasCost;
    const min = Math.round(total * 0.9);
    const max = Math.round(total * 1.2);

    return { min, max, objectType, workType, area, extras };
  };

  const showResult = (result) => {
    document.getElementById('calc-result-min').textContent = result.min.toLocaleString('ru-RU');
    document.getElementById('calc-result-max').textContent = result.max.toLocaleString('ru-RU');
    form.dataset.calcResult = JSON.stringify(result);

    showStep(5);
  };

  const scrollToContactForm = () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const header = document.querySelector('.navbar, .header');
    const headerHeight = header ? header.offsetHeight : 0;
    const offset = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({ top: offset, behavior: 'smooth' });
    setTimeout(() => fillContactForm(), 600);
  };

  const fillContactForm = () => {
    const calcData = form.dataset.calcResult ? JSON.parse(form.dataset.calcResult) : null;
    if (!calcData) return;

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const serviceSelect = contactForm.querySelector('[name="service"]');
    const messageField = contactForm.querySelector('[name="message"]');

    const serviceMap = {
      apartment: 'wiring',
      house: 'wiring',
      office: 'other',
    };

    if (serviceSelect) {
      serviceSelect.value = serviceMap[calcData.objectType] || 'other';
    }

    if (messageField) {
      const extrasText = calcData.extras.length > 0 
        ? `\nДоп. работы: ${calcData.extras.join(', ')}` 
        : '';
      messageField.value = `Расчёт из калькулятора: ${calcData.area} м², ${calcData.objectType}, тип работ: ${calcData.workType}.${extrasText}\nПримерная стоимость: ${calcData.min.toLocaleString('ru-RU')} – ${calcData.max.toLocaleString('ru-RU')} ₽`;
    }
  };

  const restart = () => {
    form.reset();
    areaDisplay.textContent = '60';
    showStep(1);
  };

  return { init };
})();

export const initCalculator = () => Calculator.init();
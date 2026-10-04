'use strict';

import { slidesData } from '../data/slidesData.js';

const createSlideElement = (slide) => {
  const slideEl = document.createElement('div');
  slideEl.className = 'swiper-slide slide';

  const img = document.createElement('img');
  img.src = slide.img;
  img.className = 'slide__image';
  img.loading = 'lazy';
  img.alt = slide.title;
  slideEl.appendChild(img);

  const overlay = document.createElement('div');
  overlay.className = 'slide__overlay';
  slideEl.appendChild(overlay);

  const content = document.createElement('div');
  content.className = 'slide__content';

  const title = document.createElement('h2');
  title.textContent = slide.title;
  content.appendChild(title);

  const text = document.createElement('p');
  text.textContent = slide.text;
  content.appendChild(text);

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.dataset.action = slide.buttonAction;
  button.textContent = slide.buttonText;
  content.appendChild(button);

  slideEl.appendChild(content);
  return slideEl;
};

const renderSlides = () => {
  const swiperWrapper = document.querySelector('#main .swiper-wrapper');
  if (!swiperWrapper) {
    console.warn('❌ #main .swiper-wrapper не найден');
    return;
  }

  const fragment = document.createDocumentFragment();
  slidesData.forEach(slide => {
    fragment.appendChild(createSlideElement(slide));
  });

  swiperWrapper.appendChild(fragment);
};

const initSwiper = () => {
  const swiper = document.querySelector('.swiper');
  if (!swiper) return;

  if (swiper.dataset.swiperInitialized === 'true') return;
  swiper.dataset.swiperInitialized = 'true';

  if (typeof Swiper === 'undefined') {
    console.error('❌ Swiper не подключён');
    return;
  }

  new Swiper(swiper, {
    speed: 600,
    loop: true,
    allowTouchMove: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
};

const initSliderActions = () => {
  document.querySelectorAll('.slide [data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const actions = {
        'scroll': () => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }),
        'scroll-to-services': () => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }),
        'scroll-to-contact': () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
        'calculator': () => document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' }),
        'form': () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
        'call': () => window.location.href = 'tel:+79999999999',
      };
      actions[action]?.();
    });
  });
};

const initSlider = () => {
  renderSlides();
  requestAnimationFrame(() => {
    initSwiper();
    initSliderActions();
  });
};

export { initSlider };
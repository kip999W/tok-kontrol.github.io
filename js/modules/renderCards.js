'use strict';

import { servicesData } from '../data/servicesData.js';
import { advantagesData } from '../data/advantagesData.js';
import { portfolioData, categoryNames } from '../data/portfolioData.js';

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₽`;

const createElement = (tag, className, content = null) => {
  const element = document.createElement(tag);
  if (className) element.className = className;

  if (content != null) {
    if (typeof content === 'string') element.textContent = content;
    else element.appendChild(content);
  }

  return element;
};

const createPriceBlock = (item) => {
  return createElement('span', 'card__price', formatPrice(item.price));
};

const createCardElement = (item, mode) => {
  const card = createElement('div', 'card');

  if (item.img) {
    const img = createElement('img');
    img.src = item.img;
    img.alt = item.title;
    img.loading = 'lazy';
    card.appendChild(img);
  }

  const body = createElement('div', 'card__body');

  if (item.category) {
    body.appendChild(createElement('span', 'card__category', categoryNames[item.category] || item.category));
  }

  if (item.title) body.appendChild(createElement('h3', 'card__title', item.title));
  if (item.address) body.appendChild(createElement('p', 'card__address', item.address));
  if (item.desc) body.appendChild(createElement('p', 'card__text', item.desc));

  if (item.features && item.features.length > 0) {
    const ul = createElement('ul', 'card__list');
    item.features.forEach(feature => {
      ul.appendChild(createElement('li', 'card__list-item', feature));
    });
    body.appendChild(ul);
  }

  card.appendChild(body);

  const footer = createElement('div', 'card__footer');
  if (mode === 'price' && item.price) footer.appendChild(createPriceBlock(item));
  if (item.duration) footer.appendChild(createElement('span', 'card__duration', item.duration));

  if (item.btnText) {
    const button = createElement('button', 'card__btn btn btn-secondary', item.btnText);
    button.type = 'button';

    if (item.btnAction) button.dataset.action = item.btnAction;
    if (item.serviceId) button.dataset.service = item.serviceId;

    footer.appendChild(button);
  }

  if (footer.children.length > 0) card.appendChild(footer);

  return card;
};

const renderCardsToSection = (sectionSelector, items, mode, limit = items.length) => {
  const section = document.querySelector(sectionSelector);
  if (!section) {
    console.warn(`Секция "${sectionSelector}" не найдена`);
    return;
  }

  const grid = createElement('div', 'grid');
  const fragment = document.createDocumentFragment();
  fragment.appendChild(grid);

  items.slice(0, limit).forEach(item => {
    grid.appendChild(createCardElement(item, mode));
  });

  section.appendChild(fragment);
};

const renderPortfolio = (filter = 'all') => {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) {
    console.warn('❌ Grid #portfolio-grid не найден!');
    return;
  }

  const filteredData = filter === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === filter);

  grid.innerHTML = '';

  filteredData.forEach(item => {
    grid.appendChild(createCardElement(item, 'portfolio'));
  });
};

const initPortfolioFilters = () => {
  const filterBtns = document.querySelectorAll('.portfolio__filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('btn--active'));
      btn.classList.add('btn--active');
      renderPortfolio(btn.dataset.filter);
    });
  });
};

const initRenderCards = () => {
  renderCardsToSection('.services .container', servicesData, 'price');
  renderCardsToSection('.advantages .container', advantagesData, '');
  renderPortfolio('all');
  initPortfolioFilters();
};

export { initRenderCards };
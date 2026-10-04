'use strict';

const SCROLL_THRESHOLD = 80;
let isVisible = false;
let ticing = false;
let button = null;

const createButton = () => {
  if (document.getElementById('scrollTop'))
    return;

  button = document.createElement('button');
  button.type = 'button';
  button.className = 'scroll-top';
  button.id = 'scrollTop';
  button.setAttribute('aria-label', 'Вернуться наверх');

  button.innerHTML = `
    <svg class="scroll-top__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;

  document.body.appendChild(button);
  button.addEventListener('click', scrollToTop);
};

const checkScroll = () => {
  if (!button)
    return;

  const navbar = document.querySelector('.navbar');
  const shouldBeVisible = window.scrollY > SCROLL_THRESHOLD;

  if (shouldBeVisible !== isVisible) {
    if (navbar)
      navbar.classList.toggle('scrolled', shouldBeVisible);

    button.classList.toggle('scroll-top--visible', shouldBeVisible);
    isVisible = shouldBeVisible;
  }

  ticing = false;
};

const onScroll = () => {
  if (!ticing) {
    window.requestAnimationFrame(checkScroll);
    ticing = true;
  }
};

const scrollToTop = () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth',
  });
};

const initScrollTop = () => {
  createButton();

  if (button) {
    window.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();
  }
};

export { initScrollTop };
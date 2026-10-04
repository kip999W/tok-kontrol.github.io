import { initSlider } from './modules/mainSlider.js';
import { initScrollTop } from './modules/scroll.js';
import { initRenderCards } from './modules/renderCards.js';
import { initRenderReviews } from './modules/renderReviews.js';
import { initContactForm } from './modules/contactForm.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initCalculator } from './modules/calculator.js';

const initServiceCTA = () => {
  const ctaButtons = document.querySelectorAll('[data-action="form"]');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (!contactSection)
        return;

      const header = document.querySelector('.navbar, .header');
      const headerHeight = header ? header.offsetHeight : 0;
      const offset = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });

      setTimeout(() => {
        const nameInput = document.getElementById('contact-name');
        if (nameInput) nameInput.focus();
      }, 600);
    });
  });
};

const initServiceButtons = () => {
  document.querySelectorAll('.card__btn[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const serviceId = btn.dataset.service;

      if (action === 'call') {
        window.location.href = 'tel:+79999999999';
      } else if (action === 'order') {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const header = document.querySelector('.navbar, .header');
        const headerHeight = header ? header.offsetHeight : 0;
        const offset = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({ top: offset, behavior: 'smooth' });

        setTimeout(() => {
          const serviceSelect = document.querySelector('#contact-form [name="service"]');
          const messageField = document.querySelector('#contact-form [name="message"]');

          if (serviceSelect) serviceSelect.value = serviceId;
          if (messageField && !messageField.value) {
            const serviceName = btn.closest('.card').querySelector('.card__title')?.textContent || '';
            messageField.value = `Интересует услуга: ${serviceName}`;
          }
        }, 600);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initScrollTop();
  initRenderCards();
  initRenderReviews();
  initContactForm();
  initSmoothScroll();
  initCalculator();
  initServiceCTA();
  initServiceButtons();
});
'use strict';

import { reviewsData } from "../data/reviewsData.js";

const initRenderReviews = () => {
  const renderReviews = () => {
    const grid = document.getElementById('reviews__grid');
    if (!grid) {
      console.warn('❌ #reviews__grid не найден');
      return;
    }

    grid.innerHTML = reviewsData.map(item => `
      <div class="review-card">
              <div class="review-card__header">
                <div class="review-card__avatar">
                  <img src="${item.avatar}" alt="${item.name}" class="review-card__avatar" loading="lazy">
                </div>
                <div class="review-card__author-info">
                  <h4 class="review-card__name">${item.name}</h4>
                  <div class="review-card__rating">
                    <span class="review-card__star">★</span>
                    <span class="review-card__star">★</span>
                    <span class="review-card__star">★</span>
                    <span class="review-card__star">★</span>
                    <span class="review-card__star">★</span>
                  </div>
                </div>
              </div>
              <p class="review-card__text">"${item.text}"</p>
              <div class="review-card__footer">
                <span class="review-card__service">${item.service}</span>
                <span class="review-card__date">${item.date}</span>
              </div>
            </div>
    `).join('');
  };

  renderReviews();
};

export { initRenderReviews };
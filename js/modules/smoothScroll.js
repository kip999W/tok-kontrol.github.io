'use strict';

const initSmoothScroll = () => {
  const anchors = document.querySelectorAll('a[href*="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
      const href = anchor.getAttribute('href');
      const blockId = href && href.substring(1);
      const target = blockId && document.getElementById(blockId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      const offcanvasEl = document.getElementById('offcanvasNavbar');
      if (offcanvasEl) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) 
          offcanvasInstance.hide();
      }
    });
  });
};

export { initSmoothScroll };
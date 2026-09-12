document.querySelectorAll('.approach-diagram').forEach(diagram => {
  const buttons = [...diagram.querySelectorAll('button')];
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      diagram.dataset.active = index;
      const detail = document.getElementById(button.getAttribute('aria-controls'));
      detail.textContent = button.dataset.description;
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && detail.animate) {
        detail.getAnimations().forEach(animation => animation.cancel());
        detail.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
      }
    });
  });
});

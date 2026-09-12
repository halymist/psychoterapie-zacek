// Content stays visible without JavaScript. Each entrance plays only once.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const artwork = document.querySelector('.hero-art');
  let inView = true;
  const updateArtwork = () => {
    artwork.classList.toggle('is-still', !inView || document.hidden || preference.matches);
  };
  preference.addEventListener('change', updateArtwork);
  document.addEventListener('visibilitychange', updateArtwork);
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateArtwork(); }).observe(artwork);
  }
  updateArtwork();
  artwork.classList.add('motion-ready');
  if (preference.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const active = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      // Leave restored scroll positions and keyboard-focused content undisturbed.
      if (entry.boundingClientRect.top < 0 || entry.target.matches(':focus-within')) continue;
      const animation = entry.target.animate([
        { opacity: 0.55, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 1000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      active.add(animation);
      animation.onfinish = animation.oncancel = () => active.delete(animation);
    }
  }, { rootMargin: '0px 0px 24px 0px', threshold: 0 });

  // Booking, payment, navigation and the map are immediately usable and still.
  document.querySelectorAll([
    '.hero-copy', '.hero-art', '.about-grid > *',
    '.topics-section .section-intro', '.topic', '.approach-heading', '.approach',
    '.education-section .section-intro', '.education-timeline', '.course-group',
    '.contact-grid > div:first-child', '.site-footer p'
  ].join(',')).forEach(element => observer.observe(element));

  document.addEventListener('focusin', event => {
    for (const animation of active) {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    }
  });
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    for (const animation of active) animation.cancel();
  });
})();

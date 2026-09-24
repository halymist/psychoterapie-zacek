// Scroll immediately; update history only after a burst of section clicks.
// Native fragment navigation on every click can trigger Chromium's flood guard.
(() => {
  const header = document.querySelector('.site-header');
  let historyTimer;

  header.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    clearTimeout(historyTimer);
    target.scrollIntoView({ block: 'start' });

    // Match native anchor keyboard focus without starting a second scroll.
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });

    historyTimer = setTimeout(() => {
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    }, 300);
  });

  // A browser Back/Forward action takes priority over a pending click update.
  addEventListener('popstate', () => clearTimeout(historyTimer));
  addEventListener('hashchange', () => clearTimeout(historyTimer));
})();

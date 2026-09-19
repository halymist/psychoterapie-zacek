(() => {
  const root = document.documentElement;
  const enabled = matchMedia('(pointer: fine) and (forced-colors: none)');
  const rail = document.createElement('div');
  const thumb = document.createElement('div');
  rail.className = 'page-scrollbar';
  thumb.className = 'page-scrollbar-thumb';
  // A pointer alternative to the native scrollbar. Keyboard/AT still scroll
  // the document normally; no duplicate focus stop or scroll container.
  rail.setAttribute('aria-hidden', 'true');
  rail.append(thumb);
  document.body.append(rail);
  let travel = 0;
  let range = 0;
  let drag = null;
  let frame = 0;

  function update() {
    frame = 0;
    root.classList.toggle('has-scrollbar', enabled.matches);
    range = Math.max(0, root.scrollHeight - innerHeight);
    rail.hidden = !enabled.matches || range === 0;
    const height = Math.min(innerHeight, Math.max(32, innerHeight * innerHeight / root.scrollHeight));
    travel = innerHeight - height;
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${range ? scrollY / range * travel : 0}px)`;
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function scrollToThumb(top) {
    window.scrollTo({ top: travel ? Math.max(0, Math.min(travel, top)) / travel * range : 0, behavior: 'instant' });
  }
  rail.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    const bounds = thumb.getBoundingClientRect();
    const offset = event.target === thumb ? event.clientY - bounds.top : bounds.height / 2;
    drag = { id: event.pointerId, offset };
    rail.setPointerCapture(event.pointerId);
    scrollToThumb(event.clientY - offset);
  });
  rail.addEventListener('pointermove', event => {
    if (drag?.id === event.pointerId) scrollToThumb(event.clientY - drag.offset);
  });
  const endDrag = () => { drag = null; };
  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);
  rail.addEventListener('lostpointercapture', endDrag);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  enabled.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(document.body);
  update();
})();

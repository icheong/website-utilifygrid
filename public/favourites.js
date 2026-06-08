/**
 * UtilifyGrid — Favourites utility
 * Shared by BaseLayout, ToolLayout, category pages, and the favourites page.
 * Uses localStorage key "ug-favs" (JSON array of slugs).
 * Dispatches "ug:favs-changed" on window whenever the list changes.
 */

(function () {
  const KEY = 'ug-favs';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch (_) { return []; }
  }

  function save(slugs) {
    try { localStorage.setItem(KEY, JSON.stringify(slugs)); } catch (_) {}
    window.dispatchEvent(new CustomEvent('ug:favs-changed', { detail: { slugs } }));
  }

  window.UGFavs = {
    all()        { return load(); },
    has(slug)    { return load().includes(slug); },
    add(slug)    { const s = load(); if (!s.includes(slug)) save([...s, slug]); },
    remove(slug) { save(load().filter(x => x !== slug)); },
    toggle(slug) { window.UGFavs.has(slug) ? window.UGFavs.remove(slug) : window.UGFavs.add(slug); },
    count()      { return load().length; },
  };

  /* Sync all star button states + badge on this page */
  function syncStars() {
    const favs = load();

    /* Star buttons — any [data-fav-slug] element */
    document.querySelectorAll('[data-fav-slug]').forEach(btn => {
      const slug = btn.dataset.favSlug;
      const active = favs.includes(slug);
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('fav-active', active);
    });

    /* Tool title label update */
    document.querySelectorAll('.tool-fav-btn[data-fav-slug]').forEach(btn => {
      const label = btn.querySelector('.fav-btn-label');
      if (label) label.textContent = favs.includes(btn.dataset.favSlug) ? 'Saved' : 'Save';
    });

    /* Badge in header nav */
    const badge = document.getElementById('fav-badge');
    if (badge) {
      const n = favs.length;
      const wasVisible = badge.style.display === 'flex';
      badge.textContent = String(n);
      badge.style.display = n > 0 ? 'flex' : 'none';
      /* Pop animation when count changes */
      if (n > 0) {
        badge.classList.remove('badge-pop');
        void badge.offsetWidth;
        badge.classList.add('badge-pop');
        badge.addEventListener('animationend', () => badge.classList.remove('badge-pop'), { once: true });
      }
    }

    /* Nav trigger — tint icon when favourites exist */
    const trigger = document.getElementById('fav-nav-trigger');
    if (trigger) trigger.classList.toggle('fav-has-items', favs.length > 0);
  }

  document.addEventListener('DOMContentLoaded', syncStars);
  window.addEventListener('ug:favs-changed', syncStars);
})();

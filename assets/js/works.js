/* ==========================================================
   works.js — صفحة أعمالنا: فلترة حسب القسم + عارض صور (Swiper)
   الرابط يدعم الأقسام مباشرة: works.html#packaging
   ========================================================== */

(function () {
const { WORKS, CATEGORIES, imgPath, catName, ICONS, t } = window.JW;

const filtersEl = document.querySelector('.filters');
const gridEl = document.getElementById('works-output');
let current = 'all';
let visible = [];

/* ---------- أزرار الفلترة ---------- */
const chips = [{ id: 'all', name: t('كل الأعمال', 'All Work') }, ...CATEGORIES];
filtersEl.innerHTML = chips.map((c) => {
  const n = c.id === 'all' ? WORKS.length : WORKS.filter((w) => w.cat === c.id).length;
  return `<button type="button" class="chip" data-filter="${c.id}" aria-pressed="false">${c.name} <b>${String(n).padStart(2, '0')}</b></button>`;
}).join('');

filtersEl.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  setFilter(btn.dataset.filter, true);
});

function workCard(w, i, globalIndex) {
  return `<button type="button" class="work" data-index="${globalIndex}" style="--i:${i}" aria-label="${t('عرض', 'View')} ${w.title}">
    <div class="frame crop">
      <img src="${imgPath(w.img)}" alt="${w.title}" loading="lazy" width="900" height="781">
      <div class="zoom"><span>${ICONS.zoom}</span></div>
    </div>
    <div class="meta"><h3>${w.title}</h3><small>${catName(w.cat)}</small></div>
  </button>`;
}

/* ---------- العرض ---------- */
function render() {
  if (current === 'all') {
    // عرض كل قسم في مجموعة مستقلة بعنوانه
    visible = [];
    gridEl.innerHTML = CATEGORIES.map((c) => {
      const list = WORKS.filter((w) => w.cat === c.id);
      const cards = list.map((w, i) => { visible.push(w); return workCard(w, i, visible.length - 1); }).join('');
      return `<section class="cat-block" id="cat-${c.id}" aria-labelledby="h-${c.id}">
        <header class="cat-block-head">
          <h2 id="h-${c.id}">${c.name}</h2><span>${c.en}</span><p>${c.desc}</p>
        </header>
        <div class="works-grid">${cards}</div>
      </section>`;
    }).join('');
  } else {
    const c = CATEGORIES.find((x) => x.id === current);
    visible = WORKS.filter((w) => w.cat === current);
    gridEl.innerHTML = `<section class="cat-block" aria-labelledby="h-${c.id}">
      <header class="cat-block-head">
        <h2 id="h-${c.id}">${c.name}</h2><span>${c.en}</span><p>${c.desc}</p>
      </header>
      <div class="works-grid">${visible.map((w, i) => workCard(w, i, i)).join('')}</div>
    </section>`;
  }
}

function setFilter(id, pushHash) {
  if (!chips.some((c) => c.id === id)) id = 'all';
  current = id;
  filtersEl.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === id)));
  filtersEl.querySelector(`[data-filter="${id}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  render();
  if (pushHash) {
    history.replaceState(null, '', id === 'all' ? location.pathname : `#${id}`);
    const top = filtersEl.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }
}

setFilter(location.hash.replace('#', '') || 'all', false);
window.addEventListener('hashchange', () => setFilter(location.hash.replace('#', '') || 'all', false));

/* ---------- عارض الصور ---------- */
const lb = document.querySelector('.lightbox');
const lbWrap = lb.querySelector('.swiper-wrapper');
const lbTitle = lb.querySelector('.lb-title');
const lbCount = lb.querySelector('.lb-count');
let lbSwiper = null;
let lastFocus = null;

function updateMeta(i) {
  const w = visible[i];
  if (!w) return;
  lbTitle.innerHTML = `${w.title}<small>${catName(w.cat)}</small>`;
  lbCount.textContent = `${String(i + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
}

function openLightbox(index) {
  lastFocus = document.activeElement;
  lbWrap.innerHTML = visible.map((w) => `<div class="swiper-slide"><img src="${imgPath(w.img)}" alt="${w.title}" loading="lazy"></div>`).join('');
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (lbSwiper) lbSwiper.destroy(true, true);
  lbSwiper = new window.Swiper('.lb-swiper', {
    initialSlide: index,
    speed: 600,
    spaceBetween: 30,
    keyboard: { enabled: true },
    navigation: { nextEl: '.lb-next', prevEl: '.lb-prev' },
    on: { slideChange: (s) => updateMeta(s.activeIndex) },
  });
  updateMeta(index);
  lb.querySelector('.lb-close').focus();
}

function closeLightbox() {
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocus?.focus();
}

gridEl.addEventListener('click', (e) => {
  const card = e.target.closest('.work');
  if (card) openLightbox(Number(card.dataset.index));
});
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => { if (e.target.classList.contains('swiper-slide')) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox(); });
})();

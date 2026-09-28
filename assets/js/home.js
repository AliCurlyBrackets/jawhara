/* ==========================================================
   home.js — الصفحة الرئيسية: عدد الأعمال في كل قسم + سلايدر الأعمال
   ========================================================== */

(function () {
const { WORKS, CATEGORIES, imgPath, catName, t } = window.JW;

/* عدد الأعمال في بطاقات الأقسام */
document.querySelectorAll('[data-cat-count]').forEach((el) => {
  const n = WORKS.filter((w) => w.cat === el.dataset.catCount).length;
  el.textContent = String(n).padStart(2, '0');
});
const total = document.querySelector('[data-total-works]');
if (total) total.textContent = window.JW.LANG === 'en' ? `${WORKS.length}+` : `+${WORKS.length}`;
const totalCats = document.querySelector('[data-total-cats]');
if (totalCats) totalCats.textContent = CATEGORIES.length;

/* سلايدر مختارات الأعمال */
const featured = ['channel-letters', 'packaging-box', 'business-cards', 'popup', 'coffee-cups', 'graduation-shield', 'feather-flags', 'paper-bags', 'caps', 'name-plates', 'brochures', 'balloons'];
const wrap = document.querySelector('.works-swiper .swiper-wrapper');
if (wrap) {
  wrap.innerHTML = featured.map((key) => {
    const w = WORKS.find((x) => x.img === key);
    return `<div class="swiper-slide">
      <a class="slide-card crop" href="${t('works.html', 'works-en.html')}#${w.cat}">
        <figure style="margin:0">
          <img src="${imgPath(w.img)}" alt="${w.title} — ${t('من أعمال جواهر الشام', 'by Jawaher Alshaam')}" loading="lazy" width="900" height="781">
          <figcaption>${w.title}<small>${catName(w.cat)}</small></figcaption>
        </figure>
      </a>
    </div>`;
  }).join('');

  if (window.Swiper) {
    new window.Swiper('.works-swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      speed: 900,
      grabCursor: true,
      effect: 'coverflow',
      coverflowEffect: { rotate: 0, stretch: 0, depth: 140, modifier: 1, slideShadows: false },
      autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.works-progress', type: 'progressbar' },
      navigation: { nextEl: '.works-next', prevEl: '.works-prev' },
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { prevSlideMessage: t('العمل السابق', 'Previous work'), nextSlideMessage: t('العمل التالي', 'Next work') },
    });
  }
}
})();

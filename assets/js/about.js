/* ==========================================================
   about.js — صفحة من نحن: شريط صور متحرك باستمرار
   ========================================================== */

(function () {
const { WORKS, imgPath } = window.JW;

const wrap = document.querySelector('.strip-swiper .swiper-wrapper');
if (wrap) {
  wrap.innerHTML = WORKS.map((w) => `<div class="swiper-slide"><img src="${imgPath(w.img)}" alt="${w.title}" loading="lazy" width="900" height="781"></div>`).join('');
  if (window.Swiper) {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    new window.Swiper('.strip-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
      freeMode: true,
      speed: reduce ? 0 : 6000,
      allowTouchMove: true,
      autoplay: reduce ? false : { delay: 0, disableOnInteraction: false },
    });
  }
}
})();

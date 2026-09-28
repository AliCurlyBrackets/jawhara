/* ==========================================================
   main.js — سلوك مشترك في كل الصفحات
   الهيدر، قائمة الموبايل، ظهور العناصر، انتقال الصفحات
   ========================================================== */

const PHONES = ['0540880567', '0505972828', '0539268211', '0532446558'];
const WHATSAPP = '966532446558';

const header = document.querySelector('.site-header');
const body = document.body;

(function () {
/* ---------- اللغة: t('عربي', 'English') ---------- */
const LANG = document.documentElement.lang === 'en' ? 'en' : 'ar';
const t = (ar, en) => (LANG === 'en' ? en : ar);

/* ---------- الوضع الفاتح / الداكن ----------
   الاختيار الأولي يتحدد في <head> (قبل رسم الصفحة) من اختيار الزائر المحفوظ
   أو من إعداد جهازه. هنا فقط زرار التبديل. */
const root = document.documentElement;
function setTheme(mode) {
  root.dataset.theme = mode;
  try { localStorage.setItem('jw-theme', mode); } catch (e) { /* تجاهل */ }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'light' ? '#F5F0E6' : '#16130F');
  document.querySelectorAll('.theme-toggle').forEach((b) => {
    b.setAttribute('aria-label', mode === 'light' ? t('تفعيل الوضع الداكن', 'Switch to dark mode') : t('تفعيل الوضع الفاتح', 'Switch to light mode'));
    b.setAttribute('aria-pressed', String(mode === 'light'));
  });
  window.dispatchEvent(new CustomEvent('themechange', { detail: mode }));
}
document.querySelectorAll('.theme-toggle').forEach((b) => {
  b.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
});
setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

/* تذكر اللغة المختارة عند الضغط على زرار اللغة */
document.querySelectorAll('.lang').forEach((a) => a.addEventListener('click', () => {
  try { localStorage.setItem('jw-lang', a.getAttribute('hreflang')); } catch (e) { /* تجاهل */ }
}));

/* ---------- الهيدر عند التمرير ---------- */
let lastY = window.scrollY;
function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 30);
  // إخفاء الهيدر عند النزول وإظهاره عند الطلوع
  if (!body.classList.contains('menu-open')) {
    header?.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
    if (y < lastY - 4) header?.classList.remove('is-hidden');
  }
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- قائمة الموبايل ---------- */
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? t('إغلاق القائمة', 'Close menu') : t('فتح القائمة', 'Open menu'));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && body.classList.contains('menu-open')) toggle?.click();
});

/* ---------- ظهور العناصر عند التمرير ---------- */
function observeReveals(root = document) {
  const els = root.querySelectorAll('[data-reveal]:not(.is-in)');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}
observeReveals();
// ضمان: لو حصل أي تأخير، كل المحتوى يظهر بعد ثانيتين ونصف
setTimeout(() => document.querySelectorAll('[data-reveal]').forEach((el) => {
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight) el.classList.add('is-in');
}), 2500);

/* ---------- ستارة انتقال الصفحات ---------- */
const curtain = document.createElement('div');
curtain.className = 'curtain';
curtain.setAttribute('aria-hidden', 'true');
curtain.innerHTML = Array.from({ length: 5 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
body.appendChild(curtain);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && sessionStorageGet('jw-transition')) {
  curtain.classList.add('is-entering');
  sessionStorageSet('jw-transition', '');
  setTimeout(() => curtain.classList.remove('is-entering'), 1200);
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || reduce) return;
  const href = a.getAttribute('href');
  const internal = href && href.endsWith('.html') || /\.html#/.test(href || '');
  if (!internal || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
  // نفس الصفحة مع هاش → لا ستارة
  const url = new URL(a.href, location.href);
  if (url.pathname === location.pathname) return;
  e.preventDefault();
  sessionStorageSet('jw-transition', '1');
  curtain.classList.add('is-leaving');
  setTimeout(() => { location.href = a.href; }, 700);
});
// عند الرجوع بزر المتصفح
window.addEventListener('pageshow', (e) => { if (e.persisted) curtain.classList.remove('is-leaving'); });

function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* تجاهل */ } }

/* ---------- السنة في الفوتر ---------- */
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ---------- أيقونات مشتركة ---------- */
const ICONS = {
  // السهم يشير لاتجاه القراءة: يسار في العربي ويمين في الإنجليزي
  arrow: LANG === 'en'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>',
};

window.JW = Object.assign(window.JW || {}, { PHONES, WHATSAPP, ICONS, observeReveals, LANG, t, setTheme });
})();

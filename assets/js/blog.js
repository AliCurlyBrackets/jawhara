/* ==========================================================
   blog.js — المدونة: صفحة المقالات + صفحة المقال (السنجل)
   - صفحة المدونة: فلتر بالتصنيف (يدعم blog.html#tips)
   - صفحة المقال: post.html#slug
   - السايد بار في الصفحتين: التصنيفات، الأحدث، الأكثر قراءة
   ========================================================== */
(function () {
  const { POSTS, BLOG_CATS, fmtDate, blogCatName, imgPath, ICONS, t, observeReveals } = window.JW;
  const BLOG = t('blog.html', 'blog-en.html');
  const POST = t('post.html', 'post-en.html');
  const postUrl = (p) => `${POST}#${p.slug}`;
  const minRead = (n) => t(`${n} دقائق قراءة`, `${n} min read`);
  const I_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>';
  const I_X = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.2L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>';
  const I_IN = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z"/></svg>';
  const I_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ================= السايد بار ================= */
  function renderSidebar(activeCat, currentSlug) {
    const side = document.querySelector('.blog-sidebar');
    if (!side) return;

    const cats = BLOG_CATS.map((c) => {
      const n = POSTS.filter((p) => p.cat === c.id).length;
      const cur = c.id === activeCat ? ' aria-current="true"' : '';
      return `<li><a href="${BLOG}#${c.id}"${cur}><span>${c.name}</span><b>${String(n).padStart(2, '0')}</b></a></li>`;
    }).join('');

    const latest = POSTS.filter((p) => p.slug !== currentSlug).slice(0, 4).map((p) => `
      <li><a class="mini-post" href="${postUrl(p)}">
        <img src="${imgPath(p.img)}" alt="" loading="lazy" width="900" height="781">
        <span><b>${esc(p.title)}</b><time datetime="${p.date}">${fmtDate(p.date)}</time></span>
      </a></li>`).join('');

    // الأكثر قراءة: حسب حقل popular في blog-data.js
    const popular = POSTS.filter((p) => p.popular > 0).sort((a, b) => a.popular - b.popular).slice(0, 5).map((p, i) => `
      <li><a class="rank-post" href="${postUrl(p)}"><span class="rank">${String(i + 1).padStart(2, '0')}</span>
        <span><b>${esc(p.title)}</b><small>${blogCatName(p.cat)}</small></span></a></li>`).join('');

    side.innerHTML = `
      <section class="side-box">
        <h2 class="side-title">${t('التصنيفات', 'Categories')}</h2>
        <ul class="side-cats">
          <li><a href="${BLOG}"${!activeCat ? ' aria-current="true"' : ''}><span>${t('كل المقالات', 'All articles')}</span><b>${String(POSTS.length).padStart(2, '0')}</b></a></li>
          ${cats}
        </ul>
      </section>
      <section class="side-box">
        <h2 class="side-title">${t('الأحدث', 'Latest')}</h2>
        <ul class="side-list">${latest}</ul>
      </section>
      <section class="side-box">
        <h2 class="side-title">${t('الأكثر قراءة', 'Most read')}</h2>
        <ol class="side-list">${popular}</ol>
      </section>
      <section class="side-box side-cta">
        <h2>${t('عندك طلب طباعة؟', 'Need something printed?')}</h2>
        <p>${t('أرسل المقاس والكمية ونرد عليك بعرض سعر.', 'Send the size and quantity and we will reply with a quote.')}</p>
        <a class="btn btn-gold btn-sm" href="https://wa.me/966532446558" target="_blank" rel="noopener">${t('راسلنا واتساب', 'WhatsApp us')}</a>
      </section>`;
  }

  function card(p, featured) {
    return `<article class="post-card${featured ? ' featured' : ''}">
      <a class="post-thumb" href="${postUrl(p)}" tabindex="-1" aria-hidden="true">
        <img src="${imgPath(p.img)}" alt="" loading="lazy" width="900" height="781">
      </a>
      <div class="post-card-body">
        <div class="post-meta">
          <a class="post-cat" href="${BLOG}#${p.cat}">${blogCatName(p.cat)}</a>
          <time datetime="${p.date}">${fmtDate(p.date)}</time>
        </div>
        <h2><a href="${postUrl(p)}">${esc(p.title)}</a></h2>
        <p>${esc(p.excerpt)}</p>
        <a class="read-more" href="${postUrl(p)}">${t('اقرأ المقال', 'Read article')} ${ICONS.arrow}</a>
      </div>
    </article>`;
  }

  /* ================= صفحة المدونة ================= */
  const list = document.getElementById('posts');
  if (list) {
    const filters = document.querySelector('.filters');
    const opts = [{ id: 'all', name: t('كل المقالات', 'All articles') }, ...BLOG_CATS];
    filters.innerHTML = opts.map((c) => {
      const n = c.id === 'all' ? POSTS.length : POSTS.filter((p) => p.cat === c.id).length;
      return `<button type="button" class="chip" data-filter="${c.id}" aria-pressed="false">${c.name} <b>${String(n).padStart(2, '0')}</b></button>`;
    }).join('');

    function render(id) {
      if (!opts.some((o) => o.id === id)) id = 'all';
      filters.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === id)));
      const items = id === 'all' ? POSTS : POSTS.filter((p) => p.cat === id);
      list.innerHTML = items.length
        ? items.map((p, i) => card(p, id === 'all' && i === 0)).join('')
        : `<p class="empty">${t('لا توجد مقالات في هذا التصنيف بعد.', 'No articles in this category yet.')}</p>`;
      renderSidebar(id === 'all' ? '' : id);
    }

    filters.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter);
      render(b.dataset.filter);
    });
    addEventListener('hashchange', () => render(location.hash.slice(1) || 'all'));
    render(location.hash.slice(1) || 'all');
  }

  /* ================= صفحة المقال ================= */
  const single = document.getElementById('post');
  if (single) {
    function renderPost() {
      const slug = decodeURIComponent(location.hash.slice(1));
      const p = POSTS.find((x) => x.slug === slug) || (slug ? null : POSTS[0]);
      if (!p) {
        single.innerHTML = `<div class="empty"><h1>${t('المقال غير موجود', 'Article not found')}</h1>
          <p>${t('ربما تم تغيير الرابط.', 'The link may have changed.')}</p>
          <a class="btn btn-gold" href="${BLOG}">${t('كل المقالات', 'All articles')} ${ICONS.arrow}</a></div>`;
        renderSidebar('', '');
        return;
      }
      document.title = `${p.title} | ${t('جواهر الشام للطباعة', 'Jawaher Alshaam Printing')}`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', p.excerpt);

      const i = POSTS.indexOf(p);
      const newer = POSTS[i - 1];
      const older = POSTS[i + 1];
      const related = POSTS.filter((x) => x.slug !== p.slug && x.cat === p.cat)
        .concat(POSTS.filter((x) => x.slug !== p.slug && x.cat !== p.cat)).slice(0, 2);

      const shareUrl = encodeURIComponent(location.href);
      const shareText = encodeURIComponent(p.title);

      single.innerHTML = `
        <nav class="breadcrumb" aria-label="${t('مسار الصفحة', 'Breadcrumb')}">
          <a href="${t('index.html', 'index-en.html')}">${t('الرئيسية', 'Home')}</a><span aria-hidden="true">◆</span>
          <a href="${BLOG}">${t('المدونة', 'Blog')}</a><span aria-hidden="true">◆</span>
          <a href="${BLOG}#${p.cat}">${blogCatName(p.cat)}</a>
        </nav>
        <header class="post-head">
          <a class="post-cat" href="${BLOG}#${p.cat}">${blogCatName(p.cat)}</a>
          <h1>${esc(p.title)}</h1>
          <div class="post-meta">
            <span>${t('فريق جواهر الشام', 'Jawaher Alshaam team')}</span>
            <time datetime="${p.date}">${fmtDate(p.date)}</time>
            <span>${minRead(p.read)}</span>
          </div>
        </header>
        <figure class="post-cover crop"><img src="${imgPath(p.img)}" alt="${esc(p.title)}" width="900" height="781"></figure>
        <div class="post-body">${p.body}</div>
        <div class="share">
          <span>${t('شارك المقال', 'Share')}</span>
          <a class="icon-btn" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noopener" aria-label="WhatsApp">${I_WA}</a>
          <a class="icon-btn" href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener" aria-label="X">${I_X}</a>
          <a class="icon-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}" target="_blank" rel="noopener" aria-label="LinkedIn">${I_IN}</a>
          <button class="icon-btn copy-link" type="button" aria-label="${t('نسخ الرابط', 'Copy link')}">${I_COPY}</button>
        </div>
        <nav class="post-nav" aria-label="${t('مقالات أخرى', 'More articles')}">
          ${older ? `<a class="prev" href="${postUrl(older)}"><small>${t('المقال السابق', 'Previous')}</small><b>${esc(older.title)}</b></a>` : '<span></span>'}
          ${newer ? `<a class="next" href="${postUrl(newer)}"><small>${t('المقال التالي', 'Next')}</small><b>${esc(newer.title)}</b></a>` : '<span></span>'}
        </nav>
        <section class="related">
          <h2>${t('مقالات ذات صلة', 'Related articles')}</h2>
          <div class="posts-grid">${related.map((r) => card(r, false)).join('')}</div>
        </section>`;

      single.querySelector('.copy-link')?.addEventListener('click', async (e) => {
        const b = e.currentTarget;
        try { await navigator.clipboard.writeText(location.href); } catch (err) { /* المتصفح رفض النسخ */ }
        b.classList.add('copied');
        b.setAttribute('aria-label', t('تم نسخ الرابط', 'Link copied'));
        setTimeout(() => { b.classList.remove('copied'); b.setAttribute('aria-label', t('نسخ الرابط', 'Copy link')); }, 1500);
      });

      renderSidebar(p.cat, p.slug);
    }
    renderPost();
    addEventListener('hashchange', () => { renderPost(); scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  observeReveals?.();
})();

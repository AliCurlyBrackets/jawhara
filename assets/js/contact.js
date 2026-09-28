/* ==========================================================
   contact.js — صفحة تواصل معنا
   النموذج يجهّز رسالة واتساب جاهزة للإرسال لرقم الشركة
   ========================================================== */

(function () {
const { WHATSAPP, t } = window.JW;

/* ---------- نسخ الأرقام ---------- */
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // بديل: تحديد الرقم يدويًا
      const num = btn.closest('.phone-row')?.querySelector('.phone-num');
      if (num) {
        const range = document.createRange();
        range.selectNodeContents(num);
        const sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
      }
    }
    btn.classList.add('copied');
    btn.setAttribute('aria-label', t('تم النسخ', 'Copied'));
    setTimeout(() => { btn.classList.remove('copied'); btn.setAttribute('aria-label', t('نسخ الرقم', 'Copy number')); }, 1600);
  });
});

/* ---------- النموذج ---------- */
const form = document.getElementById('quote-form');
const status = document.getElementById('form-status');

function setError(field, msg) {
  const wrap = field.closest('.field');
  wrap.classList.toggle('invalid', !!msg);
  wrap.querySelector('.err').textContent = msg || '';
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.elements.name;
  const phone = form.elements.phone;
  const details = form.elements.details;
  let ok = true;

  if (name.value.trim().length < 2) { setError(name, t('اكتب اسمك من فضلك', 'Please enter your name')); ok = false; } else setError(name, '');
  const digits = phone.value.replace(/\D/g, '');
  if (digits.length < 9) { setError(phone, t('اكتب رقم جوال صحيح، مثال: 05xxxxxxxx', 'Enter a valid mobile number, e.g. 05xxxxxxxx')); ok = false; } else setError(phone, '');
  if (!ok) return;

  const services = [...form.querySelectorAll('input[name="service"]:checked')].map((i) => i.value);
  const qty = form.elements.qty.value.trim();

  const msg = [
    t('السلام عليكم، طلب عرض سعر من موقع جواهر الشام', 'Hello, a quote request from the Jawaher Alshaam website'),
    `${t('الاسم', 'Name')}: ${name.value.trim()}`,
    `${t('الجوال', 'Mobile')}: ${phone.value.trim()}`,
    services.length ? `${t('الخدمات', 'Services')}: ${services.join(t('، ', ', '))}` : '',
    qty ? `${t('الكمية التقريبية', 'Approx. quantity')}: ${qty}` : '',
    details.value.trim() ? `${t('التفاصيل', 'Details')}: ${details.value.trim()}` : '',
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  status.innerHTML = t(
    `طلبك جاهز. لو ما فتح واتساب تلقائيًا، <a href="${url}" target="_blank" rel="noopener">اضغط هنا لإرساله</a>.`,
    `Your request is ready. If WhatsApp didn't open, <a href="${url}" target="_blank" rel="noopener">tap here to send it</a>.`
  );
  status.classList.add('show');
  window.open(url, '_blank', 'noopener');
});
})();

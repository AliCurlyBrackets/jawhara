# موقع جواهر الشام للطباعة

موقع متعدد الصفحات (HTML / CSS / JS) مع Swiper وهيرو ثلاثي الأبعاد بـ Three.js.

## التشغيل
فك ضغط الملف أولًا، ثم افتح index.html بدبل كليك. (اختياري للتطوير:)
- VS Code: إضافة **Live Server** ← كليك يمين على index.html ← Open with Live Server
- أو من التيرمينال داخل المجلد: `python -m http.server 8000` ثم افتح http://localhost:8000

## الوضع الفاتح والداكن
- زرار الشمس/القمر في الهيدر جنب "اطلب عرض سعر".
- أول زيارة: الموقع ياخد وضع جهاز الزائر، وبعد كده يفتكر اختياره.
- الألوان كلها متغيرات في أول `assets/css/base.css`: الداكن في `:root` والفاتح في `[data-theme="light"]`.

## عربي / English
- الصفحات العربية: index.html, about.html, works.html, contact.html
- الصفحات الإنجليزية: index-en.html, about-en.html, works-en.html, contact-en.html
- زرار EN / ع في الهيدر ينقل لنفس الصفحة باللغة التانية.
- أسماء الأعمال بالإنجليزي في `data.js` (الحقل titleEn).

## المدونة
- `blog.html` (و `blog-en.html`): كل المقالات + فلتر بالتصنيف + سايد بار (التصنيفات، الأحدث، الأكثر قراءة).
- `post.html#اسم-المقال` (و `post-en.html#...`): صفحة المقال بنفس السايد بار، مع مشاركة ومقال سابق/تالي ومقالات ذات صلة.
- كل المقالات في `assets/js/blog-data.js`. لإضافة مقال: انسخ مقال موجود وغيّر slug والتاريخ والتصنيف والنصوص.
- "الأكثر قراءة" يترتب حسب الحقل `popular` في كل مقال (1 هو الأعلى، و0 يعني مش ضمن القائمة).

## هيكل الملفات
```
index.html      الرئيسية (index-en.html بالإنجليزي، وكذلك باقي الصفحات) (هيرو 3D + الأقسام + سلايدر الأعمال + مراحل العمل)
about.html      من نحن
works.html      أعمالنا (فلترة حسب القسم + عارض صور) — يدعم works.html#packaging
blog.html       المدونة + post.html صفحة المقال
contact.html    تواصل معنا (أرقام + نموذج يرسل الطلب على واتساب)

assets/css/
  base.css        ألوان البراند والخطوط والأساسيات (غيّر الألوان من :root)
  layout.css      الهيدر والقائمة والفوتر وانتقال الصفحات
  components.css  الأزرار والبطاقات والسلايدر والنماذج
  pages.css       أقسام كل صفحة (الهيرو، من نحن، التواصل)
assets/js/
  data.js         بيانات الأعمال والأقسام — أضف أي عمل جديد هنا
  main.js         سلوك مشترك (الهيدر، القائمة، ظهور العناصر، الستارة)
  hero3d.js       مشهد Three.js في الهيرو
  home.js / about.js / works.js / contact.js
assets/img/brand  اللوجو (SVG ذهبي/فاتح + PNG) والأيقونة
assets/img/works  صور الأعمال المستخرجة من البروفايل
assets/vendor     Swiper و Three.js (نسخ محلية)
```

## إضافة عمل جديد
1. ضع الصورة في `assets/img/works/اسم-الصورة.webp`
2. أضف سطرًا في `assets/js/data.js`:
   `{ title: 'اسم المنتج', titleEn: 'Product name', img: 'اسم-الصورة', cat: 'print' }`
   الأقسام: print, packaging, signage, displays, gifts

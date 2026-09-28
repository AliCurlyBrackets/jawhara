/* ==========================================================
   blog-data.js — مقالات المدونة وتصنيفاتها
   Blog posts & categories

   لإضافة مقال جديد: انسخ أي مقال وغيّر:
   - slug: اسم إنجليزي قصير بدون مسافات (يظهر في الرابط post.html#slug)
   - cat: واحد من معرفات التصنيفات بالأسفل
   - date: تاريخ النشر بصيغة YYYY-MM-DD
   - popular: ترتيب المقال في "الأكثر قراءة" (1 = الأعلى). اتركه 0 لو مش ضمنها
   - img: اسم صورة من assets/img/works (بدون الامتداد)
   - title / excerpt / body بالعربي، و titleEn / excerptEn / bodyEn بالإنجليزي
   ========================================================== */

(function () {
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'ar';

  const BLOG_CATS = [
    { id: 'tips',      name: 'نصائح الطباعة',      nameEn: 'Print Tips' },
    { id: 'branding',  name: 'الهوية التجارية',    nameEn: 'Branding' },
    { id: 'packaging', name: 'التغليف',            nameEn: 'Packaging' },
    { id: 'signage',   name: 'اللوحات والإعلانات', nameEn: 'Signage' },
    { id: 'events',    name: 'المعارض والفعاليات', nameEn: 'Events' },
  ];

  const POSTS = [
    {
      slug: 'prepare-print-files',
      cat: 'tips',
      date: '2026-09-14',
      read: 5,
      popular: 1,
      img: 'brochures',
      title: 'كيف تجهز ملف التصميم للطباعة بدون مفاجآت',
      titleEn: 'How to prepare your design file for print without surprises',
      excerpt: 'خمس نقاط تراجعها قبل إرسال ملفك للمطبعة: نظام الألوان، الدقة، هامش القص، الخطوط، وصيغة الملف.',
      excerptEn: 'Five things to check before sending your file to the printer: color mode, resolution, bleed, fonts and file format.',
      body: `
        <p>كثير من مشاكل الطباعة تبدأ من الملف نفسه، وليس من الماكينة. ألوان تطلع باهتة، أو نص مقصوص عند الحافة، أو صورة واضحة على الشاشة ومشوشة على الورق. هذه النقاط تختصر عليك وقت التعديل.</p>
        <h2>1. نظام الألوان CMYK وليس RGB</h2>
        <p>الشاشات تعرض الألوان بنظام RGB، والطباعة تعمل بأحبار CMYK. لو صممت بـ RGB ستتغير بعض الألوان عند الطباعة، خصوصًا الأزرق والأخضر الفاقع. حوّل الملف إلى CMYK قبل الإرسال، وراجع الألوان بعد التحويل.</p>
        <h2>2. دقة الصور 300 نقطة في البوصة</h2>
        <p>الصورة المأخوذة من الإنترنت غالبًا دقتها 72 نقطة، وتبدو جيدة على الجوال لكنها تطبع مشوشة. للمطبوعات القريبة من العين مثل الكروت والبروشورات استخدم صورًا بدقة 300 نقطة في البوصة بالمقاس الفعلي.</p>
        <h2>3. هامش القص (Bleed)</h2>
        <p>أضف 3 مم زيادة من كل جهة للخلفيات والصور التي تصل لحافة التصميم، وأبعد النصوص والشعار 5 مم على الأقل عن خط القص. هكذا لا يظهر خط أبيض عند الحافة ولا يُقص جزء من الكلام.</p>
        <h2>4. الخطوط</h2>
        <p>حوّل الخطوط إلى مسارات (Outlines) أو أرفق ملفات الخطوط مع التصميم، حتى لا يستبدلها جهاز المطبعة بخط آخر.</p>
        <h2>5. صيغة الملف</h2>
        <ul>
          <li>الأفضل: PDF للطباعة بجودة عالية.</li>
          <li>مقبول: AI أو PSD مع كل الصور والخطوط.</li>
          <li>تجنب: صور JPG منخفضة الجودة أو ملفات Word.</li>
        </ul>
        <blockquote>لو لست متأكدًا من ملفك، أرسله لنا وسنراجعه ونرسل لك بروفة قبل الطباعة.</blockquote>`,
      bodyEn: `
        <p>Many print problems start with the file, not the machine: dull colors, text cut off at the edge, or an image that looks sharp on screen and blurry on paper. These checks save you a round of corrections.</p>
        <h2>1. CMYK, not RGB</h2>
        <p>Screens show color in RGB; printing uses CMYK inks. If you design in RGB, some colors will shift in print, especially bright blues and greens. Convert your file to CMYK before sending it, and review the colors after converting.</p>
        <h2>2. 300 dpi images</h2>
        <p>Images taken from the web are often 72 dpi. They look fine on a phone but print blurry. For items viewed up close, such as business cards and brochures, use images at 300 dpi at their actual print size.</p>
        <h2>3. Bleed</h2>
        <p>Extend backgrounds and images that reach the edge by 3 mm on every side, and keep text and logos at least 5 mm inside the trim line. That way no white line appears at the edge and no text gets trimmed.</p>
        <h2>4. Fonts</h2>
        <p>Convert fonts to outlines or include the font files, so the print shop's computer does not swap them for another typeface.</p>
        <h2>5. File format</h2>
        <ul>
          <li>Best: a high-quality print PDF.</li>
          <li>Acceptable: AI or PSD with all images and fonts.</li>
          <li>Avoid: low-quality JPGs or Word files.</li>
        </ul>
        <blockquote>Not sure about your file? Send it to us and we will review it and send you a proof before printing.</blockquote>`,
    },
    {
      slug: 'business-card-guide',
      cat: 'branding',
      date: '2026-08-30',
      read: 4,
      popular: 2,
      img: 'business-cards',
      title: 'دليل اختيار الكرت الشخصي: الورق والتشطيب والمقاس',
      titleEn: 'Choosing a business card: paper, finish and size',
      excerpt: 'الكرت أول شيء يلمسه العميل من علامتك. هذه الخيارات التي تصنع الفرق بين كرت عادي وكرت يُحتفظ به.',
      excerptEn: 'A card is the first piece of your brand a client holds. These are the choices that separate an ordinary card from one people keep.',
      body: `
        <p>الكرت الشخصي صغير، لكنه يقول الكثير عن مشروعك. قبل الطباعة فكر في ثلاثة أشياء: الورق، والتشطيب، والمقاس.</p>
        <h2>الورق</h2>
        <p>كلما زاد وزن الورق زاد إحساس الجودة. الكروت الشائعة تُطبع على ورق مقوى بوزن 300 إلى 350 جرام، وهناك ورق فاخر بملمس خاص للهويات الراقية.</p>
        <h2>التشطيب</h2>
        <ul>
          <li><strong>سلوفان مطفي:</strong> ملمس ناعم وشكل هادئ، ويحمي الكرت من الخدوش.</li>
          <li><strong>سلوفان لامع:</strong> يبرز الألوان والصور.</li>
          <li><strong>يو في موضعي (Spot UV):</strong> لمعة على جزء محدد مثل الشعار.</li>
          <li><strong>بصمة ذهبية أو فضية:</strong> لمسة فخامة تناسب الهويات الداكنة.</li>
        </ul>
        <h2>المقاس والشكل</h2>
        <p>المقاس الشائع 9 × 5 سم ويناسب المحافظ وحاملات الكروت. يمكن أيضًا قص الزوايا بشكل دائري أو اختيار مقاس مربع لتمييز الكرت.</p>
        <h2>المحتوى</h2>
        <p>اكتب فقط ما يحتاجه العميل للتواصل: الاسم، والمسمى، ورقم الجوال، والبريد أو الموقع. المساحة الفارغة تجعل الكرت أوضح وأجمل.</p>`,
      bodyEn: `
        <p>A business card is small, but it says a lot about your business. Before printing, think about three things: paper, finish and size.</p>
        <h2>Paper</h2>
        <p>Heavier paper feels higher quality. Most cards are printed on 300–350 gsm card stock, and there are premium textured papers for upscale identities.</p>
        <h2>Finish</h2>
        <ul>
          <li><strong>Matte lamination:</strong> a soft touch and calm look, and it protects the card from scratches.</li>
          <li><strong>Gloss lamination:</strong> makes colors and photos pop.</li>
          <li><strong>Spot UV:</strong> a shine on one element, such as the logo.</li>
          <li><strong>Gold or silver foil:</strong> a premium touch that suits dark identities.</li>
        </ul>
        <h2>Size and shape</h2>
        <p>The common size is 9 × 5 cm, which fits wallets and card holders. Rounded corners or a square format help a card stand out.</p>
        <h2>Content</h2>
        <p>Include only what a client needs to reach you: name, title, mobile number, and email or website. White space makes a card clearer and more attractive.</p>`,
    },
    {
      slug: 'packaging-adds-value',
      cat: 'packaging',
      date: '2026-08-12',
      read: 4,
      popular: 3,
      img: 'packaging-box',
      title: 'كيف يرفع التغليف المطبوع قيمة منتجك',
      titleEn: 'How printed packaging raises the value of your product',
      excerpt: 'البوكس والكيس المطبوعان جزء من تجربة الشراء. إليك طرقًا عملية لجعل تغليفك يعمل لصالح علامتك.',
      excerptEn: 'A printed box or bag is part of the buying experience. Practical ways to make your packaging work for your brand.',
      body: `
        <p>العميل يرى التغليف قبل أن يرى المنتج. بوكس مطبوع بعناية يعطي انطباعًا بالجودة، ويجعل المنتج مناسبًا للإهداء، ويشجع العميل على تصويره ومشاركته.</p>
        <h2>ابدأ من طريقة الاستخدام</h2>
        <p>هل المنتج يُشحن أم يُسلَّم في المحل؟ هل هو ثقيل أم خفيف؟ هذه الأسئلة تحدد نوع الكرتون وسماكته قبل التفكير في التصميم.</p>
        <h2>اختر الخامة المناسبة</h2>
        <ul>
          <li><strong>كرتون كرافت:</strong> مظهر طبيعي يناسب المنتجات اليدوية والقهوة.</li>
          <li><strong>كرتون أبيض مطبوع بالكامل:</strong> مساحة كاملة لألوان علامتك.</li>
          <li><strong>أكياس قماش:</strong> يعاد استخدامها فتبقى علامتك مع العميل مدة أطول.</li>
        </ul>
        <h2>تفاصيل صغيرة تصنع الفرق</h2>
        <p>ستكر يغلق البوكس، أو ورق مناديل بلون الهوية، أو بطاقة شكر صغيرة داخل الطلب. تكلفتها قليلة وأثرها كبير على تجربة العميل.</p>
        <h2>وحّد الهوية</h2>
        <p>استخدم نفس الألوان والشعار على البوكس والكيس والكوب والستكر، حتى يتعرف العميل على علامتك من أول نظرة.</p>`,
      bodyEn: `
        <p>Customers see the packaging before the product. A carefully printed box signals quality, makes the product gift-ready and encourages customers to photograph and share it.</p>
        <h2>Start with how it is used</h2>
        <p>Is the product shipped or handed over in store? Is it heavy or light? These questions decide the board type and thickness before any design work.</p>
        <h2>Choose the right material</h2>
        <ul>
          <li><strong>Kraft board:</strong> a natural look that suits handmade goods and coffee.</li>
          <li><strong>Fully printed white board:</strong> a full canvas for your brand colors.</li>
          <li><strong>Fabric tote bags:</strong> reused again and again, so your brand stays with the customer longer.</li>
        </ul>
        <h2>Small details matter</h2>
        <p>A sticker to seal the box, tissue paper in your brand color, or a small thank-you card inside the order. They cost little and do a lot for the customer experience.</p>
        <h2>Keep the identity consistent</h2>
        <p>Use the same colors and logo on the box, bag, cup and sticker, so customers recognise your brand at a glance.</p>`,
    },
    {
      slug: 'rollup-or-popup',
      cat: 'events',
      date: '2026-07-21',
      read: 3,
      popular: 0,
      img: 'popup',
      title: 'رول أب أم بوب أب؟ أيهما يناسب مشاركتك في المعرض',
      titleEn: 'Roll-up or pop-up: which suits your exhibition stand?',
      excerpt: 'مقارنة سريعة بين أشهر استاندات المعارض من حيث المساحة وسهولة النقل والتأثير البصري.',
      excerptEn: 'A quick comparison of the two most popular exhibition stands by space, portability and visual impact.',
      body: `
        <p>المشاركة في معرض أو فعالية تحتاج خلفية واضحة تعرّف الزوار بعلامتك من بعيد. أشهر خيارين هما الرول أب والبوب أب.</p>
        <h2>الرول أب</h2>
        <p>ستاند عمودي يُفرد من علبة ألمنيوم في ثوانٍ. خفيف وسهل النقل، ومناسب للمساحات الصغيرة أو لوضعه بجانب مكتب الاستقبال. يمكن استخدام أكثر من رول أب جنبًا إلى جنب لتكوين خلفية أعرض.</p>
        <h2>البوب أب</h2>
        <p>جدار عرض كبير بهيكل قابل للطي، يأتي بمقاسات مثل 3×3 و4×3. يعطي حضورًا قويًا ويغطي خلفية الجناح بالكامل، ويمكن تحويل حقيبته إلى طاولة استقبال مطبوعة.</p>
        <h2>كيف تختار؟</h2>
        <ul>
          <li>مساحة صغيرة أو فعالية سريعة: رول أب.</li>
          <li>جناح كامل وتريد أن تُرى من بعيد: بوب أب.</li>
          <li>تشارك كثيرًا في معارض مختلفة: بوب أب مع رول أب إضافي للمداخل.</li>
        </ul>
        <p>وفي كل الحالات اجعل الشعار والرسالة في الثلث العلوي من التصميم، لأن الجزء السفلي يختفي خلف الطاولات والزوار.</p>`,
      bodyEn: `
        <p>Taking part in an exhibition or event needs a clear backdrop that introduces your brand from a distance. The two most popular options are the roll-up and the pop-up.</p>
        <h2>Roll-up</h2>
        <p>A vertical stand that unrolls from an aluminium base in seconds. It is light, easy to carry, and suits small spaces or a spot beside a reception desk. Several roll-ups side by side can form a wider backdrop.</p>
        <h2>Pop-up</h2>
        <p>A large display wall on a folding frame, in sizes such as 3×3 and 4×3. It makes a strong statement, covers the whole back of the booth, and its case can become a printed reception counter.</p>
        <h2>How to choose</h2>
        <ul>
          <li>Small space or a quick event: roll-up.</li>
          <li>A full booth that should be seen from afar: pop-up.</li>
          <li>Frequent exhibitor: a pop-up plus an extra roll-up for entrances.</li>
        </ul>
        <p>Either way, keep the logo and message in the top third of the design, because the bottom is hidden behind tables and visitors.</p>`,
    },
    {
      slug: 'channel-letters-guide',
      cat: 'signage',
      date: '2026-06-18',
      read: 4,
      popular: 4,
      img: 'channel-letters',
      title: 'الأحرف الضوئية: ما تحتاج معرفته قبل تنفيذ لوحة محلك',
      titleEn: 'Channel letters: what to know before making your shop sign',
      excerpt: 'أنواع الإضاءة والخامات والمقاسات، وأسئلة تجهزها قبل طلب لوحة الواجهة.',
      excerptEn: 'Lighting types, materials and sizes, plus the questions to prepare before ordering a shop-front sign.',
      body: `
        <p>لوحة الواجهة تعمل ليلًا ونهارًا، وهي غالبًا أول ما يراه العميل. الأحرف الضوئية من أكثر الخيارات وضوحًا وأناقة.</p>
        <h2>أنواع الإضاءة</h2>
        <ul>
          <li><strong>إضاءة أمامية:</strong> وجه الحرف من إكريلك يضيء بالكامل، وهو الأوضح للقراءة من بعيد.</li>
          <li><strong>إضاءة خلفية (هالة):</strong> الضوء يخرج من خلف الحرف على الجدار، وتعطي شكلًا راقيًا.</li>
          <li><strong>بدون إضاءة:</strong> أحرف بارزة من إكريلك أو معدن، مناسبة للمكاتب والمساحات الداخلية.</li>
        </ul>
        <h2>المقاس والمسافة</h2>
        <p>كلما بعدت مسافة القراءة احتجت حروفًا أكبر. قِس عرض الواجهة والمسافة التي سيُقرأ منها الاسم، وأرسل لنا صورة للواجهة لنقترح المقاس المناسب.</p>
        <h2>قبل الطلب جهّز</h2>
        <ul>
          <li>الشعار بصيغة مفتوحة (AI أو PDF).</li>
          <li>مقاسات الواجهة وصورة واضحة لها.</li>
          <li>مكان مصدر الكهرباء.</li>
          <li>مراجعة اشتراطات البلدية الخاصة بلوحات المحلات في منطقتك.</li>
        </ul>`,
      bodyEn: `
        <p>A shop-front sign works day and night, and it is often the first thing a customer sees. Channel letters are one of the clearest and most elegant options.</p>
        <h2>Lighting types</h2>
        <ul>
          <li><strong>Front-lit:</strong> the acrylic letter face lights up fully, the easiest to read from a distance.</li>
          <li><strong>Back-lit (halo):</strong> light glows from behind the letter onto the wall for a refined look.</li>
          <li><strong>Non-lit:</strong> raised acrylic or metal letters, suited to offices and interiors.</li>
        </ul>
        <h2>Size and viewing distance</h2>
        <p>The farther away people read the sign, the larger the letters need to be. Measure the facade width and the viewing distance, and send us a photo of the front so we can suggest the right size.</p>
        <h2>Prepare before ordering</h2>
        <ul>
          <li>Your logo as an editable file (AI or PDF).</li>
          <li>Facade measurements and a clear photo.</li>
          <li>The location of the power supply.</li>
          <li>Your municipality's requirements for shop signs in your area.</li>
        </ul>`,
    },
    {
      slug: 'promo-gifts-people-keep',
      cat: 'branding',
      date: '2026-05-27',
      read: 3,
      popular: 5,
      img: 'keychains',
      title: 'هدايا دعائية يحتفظ بها عملاؤك فعلًا',
      titleEn: 'Promotional gifts your clients will actually keep',
      excerpt: 'الهدية الدعائية الناجحة هي التي تُستخدم كل يوم. أفكار عملية تبقي شعارك أمام العميل.',
      excerptEn: 'A good promotional gift is one that gets used every day. Practical ideas that keep your logo in front of clients.',
      body: `
        <p>الهدية الدعائية تبقى إعلانًا لعلامتك طالما يستخدمها العميل. لذلك الأهم أن تكون مفيدة، وليس فقط رخيصة.</p>
        <h2>أفكار تُستخدم يوميًا</h2>
        <ul>
          <li><strong>الأقلام وأقلام الختم:</strong> تُستخدم في المكتب يوميًا وتنتقل من يد لأخرى.</li>
          <li><strong>الميداليات:</strong> تبقى مع المفاتيح لسنوات.</li>
          <li><strong>النوت بوك:</strong> مناسبة للاجتماعات والدورات.</li>
          <li><strong>الأكواب والكابات:</strong> تظهر علامتك في كل مكان يذهب إليه العميل.</li>
        </ul>
        <h2>اختر حسب المناسبة</h2>
        <p>في المعارض تناسب الهدايا الخفيفة والكميات الكبيرة. أما لكبار العملاء أو المناسبات الخاصة مثل حفلات التخرج، فالدروع والهدايا المغلفة بعناية تترك انطباعًا أعمق.</p>
        <h2>الشعار بحجم مناسب</h2>
        <p>لا تملأ الهدية بالنصوص. شعار واضح ولون الهوية يكفيان، وأضف رقم التواصل أو الموقع فقط عند الحاجة.</p>`,
      bodyEn: `
        <p>A promotional gift keeps advertising your brand for as long as the client uses it. So being useful matters more than being cheap.</p>
        <h2>Ideas people use every day</h2>
        <ul>
          <li><strong>Pens and stamp pens:</strong> used at the office daily and passed from hand to hand.</li>
          <li><strong>Keychains:</strong> stay on the key ring for years.</li>
          <li><strong>Notebooks:</strong> suited to meetings and training courses.</li>
          <li><strong>Cups and caps:</strong> take your brand everywhere the client goes.</li>
        </ul>
        <h2>Match the occasion</h2>
        <p>At exhibitions, light gifts in large quantities work best. For key clients or special occasions such as graduations, shields and carefully packed gifts leave a deeper impression.</p>
        <h2>Keep the logo right-sized</h2>
        <p>Do not crowd the gift with text. A clear logo and your brand color are enough; add a phone number or website only when needed.</p>`,
    },
  ];

  if (LANG === 'en') {
    BLOG_CATS.forEach((c) => { c.name = c.nameEn; });
    POSTS.forEach((p) => { p.title = p.titleEn; p.excerpt = p.excerptEn; p.body = p.bodyEn; });
  }
  // الأحدث أولًا
  POSTS.sort((a, b) => b.date.localeCompare(a.date));

  const fmtDate = (iso) => new Intl.DateTimeFormat(LANG === 'en' ? 'en-GB' : 'ar-EG', { day: 'numeric', month: 'long', year: 'numeric', calendar: 'gregory' }).format(new Date(iso + 'T00:00:00'));
  const blogCatName = (id) => (BLOG_CATS.find((c) => c.id === id) || {}).name || '';

  window.JW = Object.assign(window.JW || {}, { BLOG_CATS, POSTS, fmtDate, blogCatName });
})();

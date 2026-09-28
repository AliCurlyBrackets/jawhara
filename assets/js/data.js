/* ==========================================================
   بيانات الأعمال والأقسام — جواهر الشام للطباعة
   Works & categories data — Jawaher Alshaam Printing

   لإضافة عمل جديد: ضع الصورة في assets/img/works وأضف سطرًا هنا
   بالاسم العربي (title) والإنجليزي (titleEn).
   ========================================================== */

(function () {
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'ar';

  const CATEGORIES = [
    { id: 'print',     name: 'مطبوعات ورقية',   nameEn: 'Paper Print', en: 'Paper Print',
      desc: 'كروت، بروشورات، ستكر، نوت بوك وبطاقات تعريفية.',            descEn: 'Business cards, brochures, stickers, notebooks and ID cards.' },
    { id: 'packaging', name: 'تغليف وأكياس',     nameEn: 'Packaging & Bags', en: 'Packaging',
      desc: 'بوكسات، أكياس ورقية وقماش، وأكواب مطبوعة بهوية علامتك.',    descEn: 'Boxes, paper and fabric bags, and cups printed with your brand.' },
    { id: 'signage',   name: 'لوحات ولافتات',    nameEn: 'Signage', en: 'Signage',
      desc: 'أحرف ضوئية، إكريلك، لوحات تعريفية، بنرات واستنسل.',          descEn: 'Channel letters, acrylic, name plates, banners and stencils.' },
    { id: 'displays',  name: 'استاندات ومعارض',  nameEn: 'Displays & Exhibitions', en: 'Displays',
      desc: 'بوب أب، رول أب، أعلام ريشة وأعلام مكتبية.',                  descEn: 'Pop-up walls, roll-ups, feather flags and desk flags.' },
    { id: 'gifts',     name: 'هدايا دعائية',     nameEn: 'Promotional Gifts', en: 'Promo Gifts',
      desc: 'أقلام، ميداليات، كابات، بوالين، أختام ودروع.',               descEn: 'Pens, keychains, caps, balloons, stamps and shields.' },
  ];

  const WORKS = [
    // مطبوعات ورقية — Paper print
    { title: 'بزنس كارد',            titleEn: 'Business Cards',        img: 'business-cards',    cat: 'print' },
    { title: 'بطاقة ID',             titleEn: 'ID Cards',              img: 'id-cards',          cat: 'print' },
    { title: 'بروشور',               titleEn: 'Brochures',             img: 'brochures',         cat: 'print' },
    { title: 'طباعة ستكر',           titleEn: 'Stickers',              img: 'stickers',          cat: 'print' },
    { title: 'نوت بوك',              titleEn: 'Notebooks',             img: 'notebooks',         cat: 'print' },

    // تغليف وأكياس — Packaging
    { title: 'بوكس تغليف',           titleEn: 'Packaging Box',         img: 'packaging-box',     cat: 'packaging' },
    { title: 'طباعة بوكسات',         titleEn: 'Printed Boxes',         img: 'boxes',             cat: 'packaging' },
    { title: 'بوكسات مناديل',        titleEn: 'Tissue Boxes',          img: 'tissue-boxes',      cat: 'packaging' },
    { title: 'أكياس ورقية',          titleEn: 'Paper Bags',            img: 'paper-bags',        cat: 'packaging' },
    { title: 'أكياس قماش',           titleEn: 'Tote Bags',             img: 'tote-bags',         cat: 'packaging' },
    { title: 'أكياس قماش ملونة',     titleEn: 'Colored Tote Bags',     img: 'tote-bags-2',       cat: 'packaging' },
    { title: 'أكواب قهوة',           titleEn: 'Coffee Cups',           img: 'coffee-cups',       cat: 'packaging' },
    { title: 'طباعة أكواب',          titleEn: 'Printed Cups',          img: 'cups',              cat: 'packaging' },

    // لوحات ولافتات — Signage
    { title: 'أحرف ضوئية',           titleEn: 'Channel Letters',       img: 'channel-letters',   cat: 'signage' },
    { title: 'لوحات',                titleEn: 'Signboards',            img: 'signboards',        cat: 'signage' },
    { title: 'لوحات تعريفية',        titleEn: 'Name Plates',           img: 'name-plates',       cat: 'signage' },
    { title: 'إكريلك',               titleEn: 'Acrylic',               img: 'acrylic',           cat: 'signage' },
    { title: 'إستنسل مفرغ',          titleEn: 'Cut Stencils',          img: 'stencil',           cat: 'signage' },
    { title: 'بنر موقع',             titleEn: 'Site Banners',          img: 'site-banner',       cat: 'signage' },
    { title: 'طباعة بنر',            titleEn: 'Banner Printing',       img: 'banners',           cat: 'signage' },

    // استاندات ومعارض — Displays
    { title: 'بوب أب',               titleEn: 'Pop-up Display',        img: 'popup',             cat: 'displays' },
    { title: 'ستاند رول أب',         titleEn: 'Roll-up Stand',         img: 'rollup',            cat: 'displays' },
    { title: 'أعلام ريشة',           titleEn: 'Feather Flags',         img: 'feather-flags',     cat: 'displays' },
    { title: 'أعلام مكتبية',         titleEn: 'Desk Flags',            img: 'desk-flags',        cat: 'displays' },

    // هدايا دعائية — Promotional gifts
    { title: 'دروع تخرج',            titleEn: 'Graduation Shields',    img: 'graduation-shield', cat: 'gifts' },
    { title: 'أقلام',                titleEn: 'Pens',                  img: 'pens',              cat: 'gifts' },
    { title: 'أقلام ختم',            titleEn: 'Stamp Pens',            img: 'stamp-pens',        cat: 'gifts' },
    { title: 'أختام بجميع المقاسات', titleEn: 'Stamps in All Sizes',   img: 'stamps',            cat: 'gifts' },
    { title: 'ميداليات',             titleEn: 'Keychains',             img: 'keychains',         cat: 'gifts' },
    { title: 'طباعة كابات',          titleEn: 'Printed Caps',          img: 'caps',              cat: 'gifts' },
    { title: 'طباعة بوالين',         titleEn: 'Printed Balloons',      img: 'balloons',          cat: 'gifts' },
    { title: 'طباعة فيست سيفتي',     titleEn: 'Safety Vests',          img: 'safety-vests',      cat: 'gifts' },
  ];

  // في الصفحات الإنجليزية نستبدل الاسم والوصف بالنسخة الإنجليزية
  if (LANG === 'en') {
    WORKS.forEach((w) => { w.title = w.titleEn; });
    CATEGORIES.forEach((c) => { c.name = c.nameEn; c.desc = c.descEn; });
  }

  const imgPath = (name) => `assets/img/works/${name}.webp`;
  const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || '';

  window.JW = Object.assign(window.JW || {}, { LANG, CATEGORIES, WORKS, imgPath, catName });
})();

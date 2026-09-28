/* ==========================================================
   hero3d.js — مشهد الهيرو ثلاثي الأبعاد (Three.js)
   جوهرة ذهبية مقطوعة في المنتصف (من اسم "جواهر الشام")
   وحولها منتجات مطبوعة تدور: كارت، بوكس، كوب، شنطة، وصور من الأعمال.
   ========================================================== */


(function () {
if (!window.THREE) { document.querySelector('.hero')?.classList.add('no-webgl'); return; }
const RoomEnvironment = THREE.RoomEnvironment;
const TEX = window.JW_TEX || {};
const canvas = document.getElementById('hero-canvas');
const hero = document.querySelector('.hero');

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

if (canvas && hero && webglAvailable()) init();
else if (hero) hero.classList.add('no-webgl');

function init() {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GOLD = new THREE.Color('#CDA530');
  const CHARCOAL = new THREE.Color('#231F20');

  /* ---------- الأساسيات ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xfff1d0, 2.2);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xcda530, 30, 20);
  rim.position.set(-4, -2, 3);
  scene.add(rim);

  // كل المشهد داخل مجموعة واحدة نحركها حسب مقاس الشاشة
  const world = new THREE.Group();
  scene.add(world);

  /* ---------- الجوهرة ---------- */
  // مقطع جانبي لحجر كريم (قمة مسطحة، تاج، حزام، قاع مدبب) ثم دوران حول المحور
  const profile = [
    new THREE.Vector2(0.001, -1.35),
    new THREE.Vector2(1.05, -0.02),
    new THREE.Vector2(1.05, 0.1),
    new THREE.Vector2(0.64, 0.56),
    new THREE.Vector2(0.001, 0.56),
  ];
  const gemGeo = new THREE.LatheGeometry(profile, 12);
  gemGeo.computeVertexNormals();
  const gemMat = new THREE.MeshPhysicalMaterial({
    color: GOLD,
    metalness: 1,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5,
    flatShading: true,
  });
  const gem = new THREE.Mesh(gemGeo, gemMat);

  // حواف الأوجه بخط ذهبي فاتح — تعطي إحساس القَطع
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(gemGeo, 1),
    new THREE.LineBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.35 })
  );
  gem.add(edges);

  const gemPivot = new THREE.Group();
  gemPivot.add(gem);
  gemPivot.rotation.z = 0.12;
  world.add(gemPivot);

  // حلقات مدارية رفيعة
  const ringMat = new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35 });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.006, 8, 180), ringMat);
  ring1.rotation.x = Math.PI / 2.3;
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.004, 8, 220), ringMat.clone());
  ring2.material.opacity = 0.18;
  ring2.rotation.x = Math.PI / 2.15;
  ring2.rotation.y = 0.25;
  world.add(ring1, ring2);

  /* ---------- الخامات والنسيج ---------- */
  const loader = new THREE.TextureLoader();
  const loadTex = (url) => new Promise((resolve) => {
    if (!url) return resolve(null);
    loader.load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; resolve(t); }, undefined, () => resolve(null));
  });
  const loadImg = (url) => new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });

  // نسيج بهوية البراند: خلفية + لوجو في المنتصف
  function brandTexture(logoImg, bg, w = 512, h = 512, scale = 0.72) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    if (logoImg) {
      const lw = w * scale;
      const lh = lw * (logoImg.height / logoImg.width);
      g.drawImage(logoImg, (w - lw) / 2, (h - lh) / 2, lw, lh);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }

  const plain = (color, rough = 0.55, metal = 0) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
  const goldEdge = plain(GOLD, 0.3, 1);

  /* ---------- المنتجات المدارية ---------- */
  const orbit = new THREE.Group();
  orbit.rotation.x = 0.38;
  world.add(orbit);
  const items = [];

  function addToOrbit(mesh, angle, radius, y, spin) {
    const holder = new THREE.Group();
    holder.add(mesh);
    holder.userData = { angle, radius, y, spin, bob: Math.random() * Math.PI * 2 };
    orbit.add(holder);
    items.push(holder);
    return holder;
  }

  Promise.all([
    loadImg(TEX.logoGold),
    loadImg(TEX.logoDark),
    loadTex(TEX.letters),
    loadTex(TEX.rollup),
    loadTex(TEX.brochure),
    loadTex(TEX.banner),
  ]).then(([logoGold, logoDark, tLetters, tRollup, tBrochure, tBanner]) => {
    const cardFront = brandTexture(logoGold, '#231F20', 1024, 600, 0.7);
    const boxFace = brandTexture(logoGold, '#231F20', 512, 512, 0.8);
    const bagFace = brandTexture(logoDark, '#F3EBDA', 512, 640, 0.78);
    const cupWrap = brandTexture(logoDark, '#F3EBDA', 1024, 380, 0.34);

    // 1) كارت شخصي — أسود بلوجو ذهبي وحواف ذهبية
    const cardGeo = new THREE.BoxGeometry(1.5, 0.88, 0.018);
    const cardMats = [goldEdge, goldEdge, goldEdge, goldEdge,
      new THREE.MeshStandardMaterial({ map: cardFront, roughness: 0.35, metalness: 0.2 }),
      plain(CHARCOAL, 0.4)];
    addToOrbit(new THREE.Mesh(cardGeo, cardMats), 0.2, 3.35, 0.45, [0.4, 0.7, 0.1]);

    // 2) كارت ثاني بزاوية مختلفة
    const card2 = new THREE.Mesh(cardGeo, cardMats);
    card2.scale.setScalar(0.8);
    addToOrbit(card2, 3.4, 3.2, -0.6, [0.2, -0.5, 0.3]);

    // 3) بوكس تغليف بهوية البراند
    const boxMat = new THREE.MeshStandardMaterial({ map: boxFace, roughness: 0.5 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), boxMat);
    addToOrbit(box, 1.35, 3.4, -0.35, [0.3, 0.4, 0.2]);

    // 4) كوب مطبوع
    const cupGroup = new THREE.Group();
    const cupBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.27, 0.95, 40, 1, true),
      new THREE.MeshStandardMaterial({ map: cupWrap, roughness: 0.45, side: THREE.DoubleSide })
    );
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.38, 0.1, 40), plain(CHARCOAL, 0.35));
    lid.position.y = 0.52;
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.335, 0.305, 0.34, 40, 1, true), goldEdge);
    sleeve.position.y = -0.02;
    cupGroup.add(cupBody, lid, sleeve);
    addToOrbit(cupGroup, 2.4, 3.3, 0.7, [0.1, 0.8, 0.15]);

    // 5) شنطة ورقية بمقابض ذهبية
    const bag = new THREE.Group();
    const bagMats = [plain('#E8DFCB', 0.7), plain('#E8DFCB', 0.7), plain('#E8DFCB', 0.7), plain('#E8DFCB', 0.7),
      new THREE.MeshStandardMaterial({ map: bagFace, roughness: 0.7 }), new THREE.MeshStandardMaterial({ map: bagFace, roughness: 0.7 })];
    bag.add(new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.05, 0.36), bagMats));
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.018, 8, 30, Math.PI), goldEdge);
    handle.position.set(0, 0.52, 0.1);
    const handle2 = handle.clone(); handle2.position.z = -0.1;
    bag.add(handle, handle2);
    addToOrbit(bag, 4.5, 3.45, 0.25, [0.2, 0.5, 0.1]);

    // 6-9) مطبوعات من أعمال الشركة الحقيقية كأنها بروفات طباعة
    const prints = [tLetters, tRollup, tBrochure, tBanner];
    const angles = [0.75, 1.95, 3.95, 5.35];
    const ys = [-0.9, 1.05, 0.95, -0.85];
    prints.forEach((tex, i) => {
      if (!tex) return;
      const w = 1.25, h = w * 0.868;
      const plane = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, 0.012),
        [goldEdge, goldEdge, goldEdge, goldEdge,
          new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }),
          plain('#EDE6D6', 0.9)]
      );
      addToOrbit(plane, angles[i], 3.9, ys[i], [0.15, 0.35, 0.1]);
    });

    canvas.classList.add('is-ready');
  });

  /* ---------- غبار ذهبي ---------- */
  const COUNT = window.innerWidth < 700 ? 380 : 800;
  const pos = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const r = 2.2 + Math.random() * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = (Math.random() - 0.5) * 1.6;
    pos[i * 3] = Math.cos(th) * r;
    pos[i * 3 + 1] = Math.sin(ph) * r * 0.55;
    pos[i * 3 + 2] = Math.sin(th) * r - 1.5;
    seeds[i] = Math.random();
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dustGeo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));
  const dustMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#E3C56E') }, uPR: { value: renderer.getPixelRatio() } },
    vertexShader: `
      attribute float seed;
      uniform float uTime; uniform float uPR;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.6 + seed * 20.0) * 0.12;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2.0 + seed * 3.5) * uPR * (8.0 / -mv.z);
        vAlpha = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * 1.4 + seed * 40.0));
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(uColor, a * vAlpha * 0.8);
      }`,
  });
  const dust = new THREE.Points(dustGeo, dustMat);

  // الغبار الذهبي: توهج (Additive) في الداكن، ولون ذهبي غامق عادي في الفاتح
  function applyTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    dustMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    dustMat.uniforms.uColor.value.set(light ? '#9C7A1C' : '#E3C56E');
    dustMat.needsUpdate = true;
    renderer.toneMappingExposure = light ? 1.15 : 1.05;
  }
  applyTheme();
  window.addEventListener('themechange', applyTheme);
  world.add(dust);

  /* ---------- التفاعل ---------- */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let spinVel = 0;
  let dragging = false;
  let lastX = 0;

  window.addEventListener('pointermove', (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    if (dragging) {
      spinVel += (e.clientX - lastX) * 0.0009;
      lastX = e.clientX;
    }
  }, { passive: true });
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; });
  window.addEventListener('pointerup', () => { dragging = false; });

  let scrollP = 0;
  window.addEventListener('scroll', () => {
    scrollP = Math.min(1, window.scrollY / (hero.offsetHeight || 1));
  }, { passive: true });

  /* ---------- المقاس والتموضع ---------- */
  let layout = { x: 0, y: 0, s: 1 };
  function resize() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const visW = visH * camera.aspect;
    if (w > 900) {
      // الكتابة يمين (RTL) والجوهرة يسار
      // العربي: الكتابة يمين والجوهرة يسار — الإنجليزي: العكس
      const side = document.documentElement.dir === 'ltr' ? 1 : -1;
      layout = { x: side * visW * 0.22, y: -0.05, s: Math.min(0.86, visW / 18.5) };
    } else {
      layout = { x: 0, y: visH * 0.25, s: Math.min(0.66, visW / 9) };
    }
    world.position.set(layout.x, layout.y, 0);
    world.scale.setScalar(layout.s);
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---------- الحركة ---------- */
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

  const clock = new THREE.Clock();
  let raf = 0;
  let intro = 0; // حركة الدخول

  function loop() {
    cancelAnimationFrame(raf);
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const speed = reduceMotion ? 0.15 : 1;

    intro = Math.min(1, intro + dt * 0.45);
    const e = 1 - Math.pow(1 - intro, 3);

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    // الجوهرة: دوران مستمر + سحب بالماوس + ميل مع المؤشر
    spinVel *= 0.95;
    gem.rotation.y += (0.35 * dt * speed) + spinVel;
    gemPivot.rotation.x = pointer.y * 0.25 + Math.sin(t * 0.5) * 0.05;
    gemPivot.rotation.z = 0.12 - pointer.x * 0.15;
    gemPivot.position.y = Math.sin(t * 0.9) * 0.08 * speed;
    gemPivot.scale.setScalar(0.4 + 0.6 * e);

    // المدار
    orbit.rotation.y += 0.12 * dt * speed;
    orbit.rotation.x = 0.38 + pointer.y * 0.08;
    items.forEach((h) => {
      const d = h.userData;
      const r = d.radius * (0.6 + 0.4 * e);
      h.position.set(Math.cos(d.angle) * r, d.y + Math.sin(t * 0.8 + d.bob) * 0.12 * speed, Math.sin(d.angle) * r);
      h.rotation.x += d.spin[0] * dt * speed;
      h.rotation.y += d.spin[1] * dt * speed;
      h.rotation.z += d.spin[2] * dt * speed * 0.5;
      h.scale.setScalar(e);
    });

    ring1.rotation.z += 0.08 * dt * speed;
    ring2.rotation.z -= 0.05 * dt * speed;
    dust.rotation.y += 0.02 * dt * speed;
    dustMat.uniforms.uTime.value = t;

    // الكاميرا: تتبع المؤشر قليلاً وتبتعد مع التمرير
    camera.position.x = pointer.x * 0.5;
    camera.position.y = -pointer.y * 0.35 + scrollP * 1.5;
    camera.position.z = 11 + scrollP * 3;
    camera.lookAt(layout.x * 0.25, layout.y * 0.25 + scrollP * 0.8, 0);

    renderer.render(scene, camera);
  }
  loop();
}

})();

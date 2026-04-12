/* =============================================================================
   THE STONE MASTER — Main site logic (vanilla JS)
   Three.js r128, localStorage, admin portal, enquiries, animations
   ============================================================================= */

(function () {
    'use strict';

    // --- Storage keys ---
    var LS_ENQUIRIES = 'stonemaster_enquiries';
    var LS_GALLERY_IMG = 'stonemaster_gallery_images';
    var LS_GALLERY_VID = 'stonemaster_gallery_videos';
    var LS_COMPANY = 'stonemaster_company';
    var LS_LAST_LOGIN = 'stonemaster_last_login';
    var SS_ADMIN = 'sm_admin_session';

    // --- Default company (also used for reset) ---
    var DEFAULT_COMPANY = {
        companyName: 'THE STONE MASTER',
        tagline: 'WE CARVE YOUR VISION INTO ETERNITY',
        aboutText: "In the heart of Maharashtra, where the rugged Sahyadri mountains whisper tales of Maratha pride, we practice the ancient art of stone masonry. From intricate temple sanctums to modern architectural marvels, our chisels breathe life into the silent earth.",
        phone: '+91 7208324505',
        email: 'info@thestonemaster.com',
        whatsapp: '+91 7208324505',
        address: 'Old Raigad Road\nDistrict Raigad, Maharashtra\nIndia - 402103',
        hours: 'Mon - Sat: 9 AM - 7 PM | Sun: By Appointment Only',
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        youtube: 'https://youtube.com/',
        foundedYear: '2004'
    };

    // --- Obfuscated credentials (btoa) ---
    var _U = atob('c3RvbmVtYXN0ZXI=');
    var _P = atob('cmFpZ2FkQDIwMjQ=');

    // --- 12+ unique stone placeholder gradients (CSS) ---
    var PLACEHOLDER_GRADIENTS = [
        'linear-gradient(135deg, #3a3a38 0%, #1e1e1c 50%, #4a4845 100%)',
        'linear-gradient(160deg, #2a2a28 0%, #4d4d49 40%, #1a1a18 100%)',
        'linear-gradient(145deg, #e8e6e1 0%, #b8b5ad 45%, #f0f0ec 100%)',
        'linear-gradient(135deg, #c9a574 0%, #8b7355 50%, #d4b896 100%)',
        'linear-gradient(120deg, #1c1c1e 0%, #3d3d3f 50%, #0a0a0b 100%)',
        'linear-gradient(160deg, #5c5a56 0%, #2e2e2c 55%, #6e6c68 100%)',
        'linear-gradient(135deg, #d4cfc4 0%, #9a958a 50%, #ece8de 100%)',
        'linear-gradient(150deg, #8b7355 0%, #5c4a33 50%, #a68b6a 100%)',
        'linear-gradient(140deg, #2d2d2b 0%, #52504d 50%, #1a1a18 100%)',
        'linear-gradient(135deg, #6b6965 0%, #3d3d3a 50%, #8f8d88 100%)',
        'linear-gradient(160deg, #f2efe8 0%, #c8c4bc 45%, #dcd8d0 100%)',
        'linear-gradient(130deg, #4a3f2e 0%, #2a2218 50%, #6b5a45 100%)',
        'linear-gradient(145deg, #3d3d3a 0%, #1a1a18 60%, #5a5854 100%)',
        'linear-gradient(160deg, #a39e94 0%, #6e6a62 50%, #c4bfb5 100%)'
    ];

    var PLACEHOLDER_ICONS = ['🗿', '🛕', '✨', '🏛', '🕯', '📜', '⛰', '🪨', '🖼', '🏺', '⚒', '🌄', '🔱', '💎'];

    // --- Default gallery items (placeholders only; images added via admin) ---
    var DEFAULT_GALLERY_ITEMS = [
        { id: 'g1', type: 'placeholder', category: 'portrait', title: 'Classical Portrait', ph: 0 },
        { id: 'g2', type: 'placeholder', category: 'religious', title: 'Temple Detail', ph: 1 },
        { id: 'g3', type: 'placeholder', category: 'decor', title: 'Interior Panel', ph: 2 },
        { id: 'g4', type: 'placeholder', category: 'portrait', title: 'Relief Study', ph: 3 },
        { id: 'g5', type: 'placeholder', category: 'religious', title: 'Sacred Icon', ph: 4 },
        { id: 'g6', type: 'placeholder', category: 'decor', title: 'Abstract Stone', ph: 5 },
        { id: 'g7', type: 'placeholder', category: 'portrait', title: 'Marble Bust', ph: 6 },
        { id: 'g8', type: 'placeholder', category: 'decor', title: 'Garden Feature', ph: 7 },
        { id: 'g9', type: 'placeholder', category: 'portrait', title: 'Heritage Work', ph: 8 },
        { id: 'g10', type: 'placeholder', category: 'religious', title: 'Sanctum Pillar', ph: 9 },
        { id: 'g11', type: 'placeholder', category: 'decor', title: 'Wall Art', ph: 10 },
        { id: 'g12', type: 'placeholder', category: 'portrait', title: 'Monument Study', ph: 11 },
        { id: 'g13', type: 'placeholder', category: 'monuments', title: 'Heritage Monument', ph: 12 },
        { id: 'g14', type: 'placeholder', category: 'architecture', title: 'Architectural Façade', ph: 13 }
    ];

    function getGalleryImages() {
        try {
            var raw = localStorage.getItem(LS_GALLERY_IMG);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return DEFAULT_GALLERY_ITEMS.slice();
    }

    function setGalleryImages(arr) {
        localStorage.setItem(LS_GALLERY_IMG, JSON.stringify(arr));
    }

    function getGalleryVideos() {
        try {
            var raw = localStorage.getItem(LS_GALLERY_VID);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return [];
    }

    function setGalleryVideos(arr) {
        localStorage.setItem(LS_GALLERY_VID, JSON.stringify(arr));
    }

    function getEnquiries() {
        try {
            var raw = localStorage.getItem(LS_ENQUIRIES);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return [];
    }

    function saveEnquiries(arr) {
        localStorage.setItem(LS_ENQUIRIES, JSON.stringify(arr));
    }

    function getCompany() {
        try {
            var raw = localStorage.getItem(LS_COMPANY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return Object.assign({}, DEFAULT_COMPANY);
    }

    function setCompany(obj) {
        localStorage.setItem(LS_COMPANY, JSON.stringify(obj));
    }

    // --- Touch: disable tilt ---
    var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) document.documentElement.classList.add('no-tilt');

    // --- Mobile particle count ---
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    var particleCount = isMobile ? 50 : 200;

    // =============================================================================
    // Loading screen (2.5s): letter-by-letter title + crack SVG
    // =============================================================================
    function initLoadingScreen() {
        var el = document.getElementById('loading-screen');
        if (!el) return;
        var titleEl = el.querySelector('.loading-title');
        if (titleEl) {
            var text = 'THE STONE MASTER';
            titleEl.innerHTML = '';
            for (var i = 0; i < text.length; i++) {
                var ch = text[i];
                var span = document.createElement('span');
                span.className = 'lt-char';
                span.textContent = ch === ' ' ? '\u00A0' : ch;
                span.style.animationDelay = (i * 0.08) + 's';
                titleEl.appendChild(span);
            }
        }
        setTimeout(function () {
            el.classList.add('is-done');
        }, 2500);
    }

    // =============================================================================
    // Three.js — Hero scene (dodecahedron + fragments + parallax)
    // =============================================================================
    var heroScene, heroCamera, heroRenderer, heroMesh, heroFragGroup;
    var heroMouse = { x: 0, y: 0 };
    var heroAnimId = null;

    function initHeroThree() {
        var container = document.getElementById('hero-three-canvas');
        if (!container || typeof THREE === 'undefined') return;

        var w = container.clientWidth || window.innerWidth;
        var h = container.clientHeight || window.innerHeight;

        heroScene = new THREE.Scene();
        heroCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        heroCamera.position.set(0, 0, 6);

        heroRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        heroRenderer.setSize(w, h);
        heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(heroRenderer.domElement);

        var amb = new THREE.AmbientLight(0xffffff, 0.35);
        heroScene.add(amb);
        var dir = new THREE.DirectionalLight(0xc9a84c, 1.1);
        dir.position.set(4, 6, 8);
        heroScene.add(dir);

        var geo = new THREE.DodecahedronGeometry(1.2, 0);
        var mat = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            roughness: 0.9,
            metalness: 0.1
        });
        heroMesh = new THREE.Mesh(geo, mat);
        heroScene.add(heroMesh);

        heroFragGroup = new THREE.Group();
        var fragCount = isMobile ? 25 : 40;
        for (var i = 0; i < fragCount; i++) {
            var small = new THREE.DodecahedronGeometry(0.08 + Math.random() * 0.1, 0);
            var sm = new THREE.Mesh(small, mat.clone());
            var r = 2.2 + Math.random() * 2.2;
            var theta = Math.random() * Math.PI * 2;
            var phi = Math.random() * Math.PI;
            sm.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
            sm.userData.orbit = 0.05 + Math.random() * 0.15;
            sm.userData.phase = Math.random() * Math.PI * 2;
            heroFragGroup.add(sm);
        }
        heroScene.add(heroFragGroup);

        window.addEventListener('resize', onHeroResize);
        document.addEventListener('mousemove', onHeroMouseMove);

        function loop() {
            heroAnimId = requestAnimationFrame(loop);
            var home = document.getElementById('home');
            if (!home || !home.classList.contains('active')) return;

            var t = Date.now() * 0.001;
            if (heroMesh) {
                heroMesh.rotation.y += 0.003;
                heroMesh.rotation.x += 0.0015;
                heroMesh.rotation.x += heroMouse.y * 0.08;
                heroMesh.rotation.y += heroMouse.x * 0.08;
            }
            heroFragGroup.children.forEach(function (child, idx) {
                child.rotation.x += 0.01;
                child.rotation.y += 0.008;
                var p = child.userData.phase + t * child.userData.orbit;
                child.position.y += Math.sin(p) * 0.002;
            });
            heroRenderer.render(heroScene, heroCamera);
        }
        loop();
    }

    function onHeroResize() {
        var container = document.getElementById('hero-three-canvas');
        if (!container || !heroCamera || !heroRenderer) return;
        var w = container.clientWidth;
        var h = container.clientHeight;
        heroCamera.aspect = w / h;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(w, h);
    }

    function onHeroMouseMove(e) {
        heroMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        heroMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    // =============================================================================
    // Three.js — Sitewide particle dust (canvas #particle-canvas)
    // =============================================================================
    var pCtx, pCanvas, pParticles;

    function initParticleDust() {
        pCanvas = document.getElementById('particle-canvas');
        if (!pCanvas) return;
        pCtx = pCanvas.getContext('2d');
        pResize();
        pParticles = [];
        for (var i = 0; i < particleCount; i++) {
            pParticles.push({
                x: Math.random() * pCanvas.width,
                y: Math.random() * pCanvas.height,
                r: 0.8 + Math.random() * 0.8,
                vy: 0.15 + Math.random() * 0.35,
                vx: (Math.random() - 0.5) * 0.08
            });
        }
        var mx = -9999, my = -9999;
        window.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
        });
        window.addEventListener('resize', pResize);

        function pResize() {
            if (!pCanvas) return;
            pCanvas.width = window.innerWidth;
            pCanvas.height = window.innerHeight;
        }

        function pLoop() {
            requestAnimationFrame(pLoop);
            if (!pCtx || !pCanvas) return;
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            pCtx.fillStyle = 'rgba(200, 185, 154, 0.3)';
            pParticles.forEach(function (p) {
                p.y -= p.vy;
                p.x += p.vx;
                if (p.y < -5) p.y = pCanvas.height + 5;
                if (p.x < 0) p.x = pCanvas.width;
                if (p.x > pCanvas.width) p.x = 0;

                var dx = p.x - mx;
                var dy = p.y - my;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 100 && d > 0) {
                    var f = (100 - d) / 100;
                    p.x += (dx / d) * f * 3;
                    p.y += (dy / d) * f * 3;
                }

                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                pCtx.fill();
            });
        }
        pLoop();
    }

    // =============================================================================
    // Three.js — Custom order visualizer (box + materials + burst)
    // =============================================================================
    var customScene, customCamera, customRenderer, customMesh, customBurstGroup;
    var customStoneKey = 'granite';

    function initCustomThree() {
        var wrap = document.getElementById('custom-three-wrap');
        if (!wrap || typeof THREE === 'undefined') return;

        var w = wrap.clientWidth;
        var h = wrap.clientHeight || 280;

        customScene = new THREE.Scene();
        customCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        customCamera.position.set(0, 0, 5);

        customRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        customRenderer.setSize(w, h);
        customRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        var cv = document.getElementById('custom-three-canvas');
        if (cv) cv.remove();
        cv = customRenderer.domElement;
        cv.id = 'custom-three-canvas';
        wrap.appendChild(cv);

        var amb = new THREE.AmbientLight(0xffffff, 0.4);
        customScene.add(amb);
        var dir = new THREE.DirectionalLight(0xc9a84c, 1);
        dir.position.set(3, 5, 6);
        customScene.add(dir);

        var geo = new THREE.BoxGeometry(1.5, 1.6, 1.2);
        var mat = getStoneMaterial('granite');
        customMesh = new THREE.Mesh(geo, mat);
        customScene.add(customMesh);

        customBurstGroup = new THREE.Group();
        customScene.add(customBurstGroup);

        function cLoop() {
            requestAnimationFrame(cLoop);
            if (!customRenderer || !customMesh) return;
            var customPage = document.getElementById('custom');
            var onPage = customPage && customPage.classList.contains('active');
            if (onPage) customMesh.rotation.y += 0.008;
            if (onPage || (customBurstGroup && customBurstGroup.children.length)) {
                customRenderer.render(customScene, customCamera);
            }
        }
        cLoop();

        window.addEventListener('resize', function () {
            if (!wrap || !customCamera || !customRenderer) return;
            var nw = wrap.clientWidth;
            var nh = wrap.clientHeight || 280;
            customCamera.aspect = nw / nh;
            customCamera.updateProjectionMatrix();
            customRenderer.setSize(nw, nh);
        });
    }

    function getStoneMaterial(key) {
        var map = {
            granite: { color: 0x333333, roughness: 0.9, metalness: 0.1 },
            marble: { color: 0xe8e8e8, roughness: 0.35, metalness: 0.05 },
            sandstone: { color: 0xc4a574, roughness: 0.95, metalness: 0 },
            basalt: { color: 0x1a1a1c, roughness: 0.85, metalness: 0.15 }
        };
        var o = map[key] || map.granite;
        return new THREE.MeshStandardMaterial(o);
    }

    function stoneBurstEffect() {
        if (!customScene || !customMesh || typeof THREE === 'undefined') return;
        var mat = customMesh.material;
        for (var i = 0; i < 30; i++) {
            var g = new THREE.BoxGeometry(0.06, 0.06, 0.06);
            var m = new THREE.MeshStandardMaterial({
                color: mat.color,
                roughness: mat.roughness,
                metalness: mat.metalness
            });
            var mesh = new THREE.Mesh(g, m);
            mesh.position.copy(customMesh.position);
            mesh.position.x += (Math.random() - 0.5) * 0.5;
            mesh.position.y += (Math.random() - 0.5) * 0.5;
            mesh.position.z += (Math.random() - 0.5) * 0.5;
            mesh.userData.v = new THREE.Vector3(
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.15
            );
            mesh.userData.life = 40;
            customBurstGroup.add(mesh);
        }
        var burst = function () {
            for (var i = customBurstGroup.children.length - 1; i >= 0; i--) {
                var ch = customBurstGroup.children[i];
                ch.position.add(ch.userData.v);
                ch.userData.life--;
                if (ch.userData.life <= 0) customBurstGroup.remove(ch);
            }
            if (customBurstGroup.children.length) requestAnimationFrame(burst);
        };
        burst();
    }

    function spinCustomMesh() {
        if (!customMesh) return;
        var start = customMesh.rotation.y;
        var end = start + Math.PI * 2;
        var t0 = 0;
        function step(now) {
            if (!t0) t0 = now;
            var p = Math.min((now - t0) / 900, 1);
            customMesh.rotation.y = start + (end - start) * p;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // =============================================================================
    // Page navigation + clip-path transition
    // =============================================================================
    var currentPageId = 'home';

    function showPage(pageId, skipTransition) {
        if (pageId === currentPageId && !skipTransition) return;

        var pages = document.querySelectorAll('.page');
        var from = document.getElementById(currentPageId);
        var to = document.getElementById(pageId);
        if (!to) return;

        function swap() {
            pages.forEach(function (p) { p.classList.remove('active'); });
            to.classList.add('active');
            currentPageId = pageId;
            navHighlight(pageId);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            to.classList.remove('page-transition-in');
            void to.offsetWidth;
            to.classList.add('page-transition-in');
            setTimeout(function () {
                to.classList.remove('page-transition-in');
            }, 600);
        }

        if (skipTransition || !from) {
            swap();
            return;
        }

        from.classList.add('page-transition-out');
        setTimeout(function () {
            from.classList.remove('page-transition-out');
            swap();
        }, 280);
    }

    function navHighlight(pageId) {
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
        });
        var map = {
            home: 'Home',
            about: 'Our Story',
            services: 'Mastery',
            gallery: 'Gallery',
            custom: 'Custom Order',
            contact: 'Contact'
        };
        var label = map[pageId];
        document.querySelectorAll('.nav-link').forEach(function (link) {
            if (link.textContent.trim() === label) link.classList.add('active');
        });
    }

    window.showPage = function (id, evt) {
        if (evt) evt.preventDefault();
        showPage(id);
    };

    // =============================================================================
    // Hero parallax scroll (background 0.3x, particles 0.6x via canvas, title 1x)
    // =============================================================================
    function initHeroParallax() {
        var hero = document.querySelector('.hero');
        if (!hero) return;
        var title = document.querySelector('.hero-title');
        var bgLayer = hero.querySelector('.hero-bg-parallax');
        var particleCanvas = document.getElementById('particle-canvas');

        window.addEventListener('scroll', function () {
            var rect = hero.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            var y = window.scrollY;
            var int = document.documentElement.classList.contains('no-tilt') ? 0.5 : 1;
            if (title) heroParallaxLayer(title, y * 0.15 * int);
            if (bgLayer) bgLayer.style.transform = 'translateY(' + (y * 0.3) + 'px)';
            if (particleCanvas) particleCanvas.style.transform = 'translateY(' + (y * 0.6) + 'px)';
        }, { passive: true });
    }

    function heroParallaxLayer(el, y) {
        el.style.transform = 'translateY(' + y + 'px)';
    }

    // =============================================================================
    // IntersectionObserver — 3D reveals, stats count, section dividers
    // =============================================================================
    function initScrollReveals() {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    if (entry.target.classList.contains('section-divider')) {
                        entry.target.classList.add('is-drawn');
                    }
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal-3d, .reveal-card-3d, .section-divider').forEach(function (el) {
            if (el.dataset.smObserved) return;
            el.dataset.smObserved = '1';
            obs.observe(el);
        });

        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            if (el.dataset.smObserved) return;
            el.dataset.smObserved = '1';
            obs.observe(el);
        });

        var statObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseFloat(el.getAttribute('data-target')) || 0;
                var suffix = el.getAttribute('data-suffix') || '';
                if (el.dataset.animated) return;
                el.dataset.animated = '1';
                animateNumber(el, 0, target, 1200, suffix);
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('.stat-num').forEach(function (el) {
            if (el.dataset.smStatObs) return;
            el.dataset.smStatObs = '1';
            statObs.observe(el);
        });
    }

    function animateNumber(el, from, to, dur, suffix) {
        if (suffix === 'PAN') {
            el.textContent = 'PAN';
            return;
        }
        var start = performance.now();
        function frame(now) {
            var p = Math.min((now - start) / dur, 1);
            var ease = 1 - Math.pow(1 - p, 3);
            var val = from + (to - from) * ease;
            el.textContent = Math.round(val) + suffix;
            if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    // Stats: set data-target from text
    function initStatTargets() {
        document.querySelectorAll('.stat-num').forEach(function (el) {
            var t = el.textContent.trim();
            if (t.indexOf('+') >= 0) {
                el.setAttribute('data-target', parseInt(t, 10));
                el.setAttribute('data-suffix', '+');
            } else if (t === '100%') {
                el.setAttribute('data-target', 100);
                el.setAttribute('data-suffix', '%');
            } else if (t === 'PAN') {
                el.setAttribute('data-target', 0);
                el.setAttribute('data-suffix', 'PAN');
            }
        });
    }

    // About parallax image
    function initAboutParallax() {
        var img = document.querySelector('.about-image-parallax');
        if (!img) return;
        window.addEventListener('scroll', function () {
            var rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                var shift = (window.innerHeight - rect.top) * 0.08;
                img.style.transform = 'translateY(' + shift + 'px)';
            }
        }, { passive: true });
    }

    // =============================================================================
    // Tilt cards (services + gallery) — pointer relative
    // =============================================================================
    function initTiltCards() {
        if (document.documentElement.classList.contains('no-tilt')) return;

        function bind(el) {
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                var rx = -y * 12;
                var ry = x * 12;
                el.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(0)';
                var shine = el.querySelector('.tilt-shine');
                if (shine) {
                    var px = (0.5 + x) * 100;
                    var py = (0.5 + y) * 100;
                    shine.style.background = 'radial-gradient(circle at ' + px + '% ' + py + '%, rgba(255,255,255,0.22) 0%, transparent 55%)';
                    shine.style.opacity = '1';
                }
            });
            el.addEventListener('mouseleave', function () {
                el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
                var shine = el.querySelector('.tilt-shine');
                if (shine) shine.style.opacity = '0';
            });
        }

        document.querySelectorAll('.service-card, .gallery-item').forEach(bind);
    }

    // =============================================================================
    // Gallery: images + videos from localStorage (CSS placeholders, no broken imgs)
    // =============================================================================
    function phIndex(item) {
        return typeof item.ph === 'number' ? item.ph : (parseInt(item.id.replace(/\D/g, ''), 10) || 0) % PLACEHOLDER_GRADIENTS.length;
    }

    function buildPlaceholderEl(title, index) {
        var wrap = document.createElement('div');
        wrap.className = 'stone-placeholder';
        var i = index % PLACEHOLDER_GRADIENTS.length;
        wrap.style.background = PLACEHOLDER_GRADIENTS[i];
        var icon = document.createElement('div');
        icon.className = 'stone-placeholder-icon';
        icon.textContent = PLACEHOLDER_ICONS[i % PLACEHOLDER_ICONS.length];
        var lab = document.createElement('div');
        lab.className = 'stone-placeholder-label';
        lab.textContent = title;
        wrap.appendChild(icon);
        wrap.appendChild(lab);
        return wrap;
    }

    function initTiltOnNewCards() {
        if (document.documentElement.classList.contains('no-tilt')) return;
        document.querySelectorAll('.gallery-item').forEach(function (el) {
            if (el.dataset.tiltBound) return;
            el.dataset.tiltBound = '1';
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform = 'perspective(800px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg)';
                var shine = el.querySelector('.tilt-shine');
                if (shine) {
                    var px = (0.5 + x) * 100;
                    var py = (0.5 + y) * 100;
                    shine.style.background = 'radial-gradient(circle at ' + px + '% ' + py + '%, rgba(255,255,255,0.22) 0%, transparent 55%)';
                    shine.style.opacity = '1';
                }
            });
            el.addEventListener('mouseleave', function () {
                el.style.transform = '';
                var shine = el.querySelector('.tilt-shine');
                if (shine) shine.style.opacity = '0';
            });
        });
    }

    // =============================================================================
    // Company: apply to DOM
    // =============================================================================
    function applyCompanyToDOM() {
        var c = getCompany();
        var set = function (sel, val) {
            var nodes = document.querySelectorAll(sel);
            nodes.forEach(function (n) {
                if (n.tagName === 'INPUT' || n.tagName === 'TEXTAREA') n.value = val;
                else n.textContent = val;
            });
        };
        set('[data-company="name"]', c.companyName);
        set('[data-company="tagline"]', c.tagline);
        set('[data-company="about"]', c.aboutText);
        set('[data-company="phone"]', c.phone);
        set('[data-company="email"]', c.email);
        set('[data-company="whatsapp"]', c.whatsapp);
        document.querySelectorAll('[data-company="address"]').forEach(function (n) {
            n.innerHTML = String(c.address || '').replace(/\n/g, '<br>');
        });
        set('[data-company="hours"]', c.hours);
        set('[data-company="founded"]', c.foundedYear);

        var fb = document.querySelector('[data-company="facebook"]');
        if (fb) fb.setAttribute('href', c.facebook);
        var ig = document.querySelector('[data-company="instagram"]');
        if (ig) ig.setAttribute('href', c.instagram);
        var yt = document.querySelector('[data-company="youtube"]');
        if (yt) yt.setAttribute('href', c.youtube);

        document.title = c.companyName + ' | Ancient Craft. Modern Mastery.';

        var wa = document.querySelector('.whatsapp-btn');
        if (wa) {
            var num = String(c.whatsapp).replace(/\D/g, '');
            if (num.indexOf('91') !== 0) num = '91' + num;
            wa.href = 'https://wa.me/' + num;
        }
    }

    // =============================================================================
    // Enquiry modal + WhatsApp redirect
    // =============================================================================
    function openEnquiryModal() {
        var m = document.getElementById('enquiry-modal');
        if (m) m.classList.add('is-open');
    }

    function closeEnquiryModal() {
        var m = document.getElementById('enquiry-modal');
        if (m) m.classList.remove('is-open');
    }

    function submitEnquiry() {
        var name = document.getElementById('enquiry-name');
        var phone = document.getElementById('enquiry-phone');
        var msg = document.getElementById('enquiry-msg');
        if (!name || !phone) return;
        var n = name.value.trim();
        var p = phone.value.trim();
        if (!n || !p) {
            alert('Please enter your name and phone number.');
            return;
        }
        var message = msg ? msg.value.trim() : '';
        var enquiry = {
            id: Date.now(),
            name: n,
            phone: p,
            message: message,
            date: new Date().toLocaleString(),
            source: window.location.href + ' [' + (typeof currentPageId !== 'undefined' ? currentPageId : 'page') + ']',
            status: 'New'
        };
        var list = getEnquiries();
        list.push(enquiry);
        saveEnquiries(list);
        closeEnquiryModal();
        if (window.adminNotifyNewEnquiry) window.adminNotifyNewEnquiry(enquiry);

        var c = getCompany();
        var num = String(c.whatsapp).replace(/\D/g, '');
        if (num.indexOf('91') !== 0) num = '91' + num;
        var text = 'Hi, I am ' + n + ' and I would like to enquire about ' + (message || 'your stone carving services');
        window.location.href = 'https://wa.me/' + num + '?text=' + encodeURIComponent(text);
    }

    function bindEnquiryTriggers() {
        document.addEventListener('click', function (e) {
            var t = e.target.closest('.enquiry-trigger');
            if (!t) return;
            e.preventDefault();
            openEnquiryModal();
        });
    }

    // =============================================================================
    // Custom order steps (existing) + Three integration
    // =============================================================================
    var currentStep = 1;
    var totalSteps = 4;

    window.changeStep = function (n) {
        var prev = document.getElementById('step-' + currentStep);
        if (n > 0 && currentStep === totalSteps) {
            openEnquiryModal();
            return;
        }
        if (prev) prev.classList.remove('active');
        currentStep += n;
        if (currentStep < 1) currentStep = 1;
        if (currentStep > totalSteps) currentStep = totalSteps;
        var cur = document.getElementById('step-' + currentStep);
        if (cur) cur.classList.add('active');
        var bar = document.getElementById('progress-bar');
        if (bar) bar.style.width = (currentStep / totalSteps * 100) + '%';
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.disabled = currentStep === 1;
        if (nextBtn) nextBtn.textContent = currentStep === totalSteps ? 'Finish Request' : 'Next Step';
    };

    window.selectStone = function (el, name) {
        document.querySelectorAll('#step-1 .swatch').forEach(function (s) { s.classList.remove('selected'); });
        el.classList.add('selected');
        var container = document.getElementById('visualizer-container');
        var key = 'granite';
        if (name.indexOf('Granite') >= 0) key = 'granite';
        if (name.indexOf('Marble') >= 0) key = 'marble';
        if (name.indexOf('Sandstone') >= 0) key = 'sandstone';
        if (name.indexOf('Basalt') >= 0) key = 'basalt';
        customStoneKey = key;
        if (customMesh) {
            customMesh.material.dispose();
            customMesh.material = getStoneMaterial(key);
            spinCustomMesh();
            stoneBurstEffect();
        }
        if (container) {
            if (name.indexOf('Granite') >= 0) container.style.boxShadow = '0 0 50px rgba(0,0,0,1)';
            if (name.indexOf('Marble') >= 0) container.style.boxShadow = '0 0 50px rgba(255,255,255,0.1)';
            if (name.indexOf('Sandstone') >= 0) container.style.boxShadow = '0 0 50px rgba(210, 180, 140, 0.2)';
        }
    };

    window.selectStyle = function (el, name) {
        document.querySelectorAll('#step-2 .swatch').forEach(function (s) { s.classList.remove('selected'); });
        el.classList.add('selected');
    };

    window.filterGallery = function (category, evt) {
        if (evt && evt.target) {
            document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
            evt.target.classList.add('active');
        }
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // =============================================================================
    // Hero title: 3D depth class after load
    // =============================================================================
    function initHeroTitle() {
        var h = document.querySelector('.hero-title');
        if (!h) return;
        setTimeout(function () {
            h.classList.add('is-loaded');
        }, 400);
    }

    // =============================================================================
    // Admin: login, dashboard, lockout
    // =============================================================================
    var loginAttempts = 0;
    var lockUntil = 0;

    function openAdminLogin() {
        var m = document.getElementById('admin-login-modal');
        if (m) m.classList.add('is-open');
    }

    function closeAdminLogin() {
        var m = document.getElementById('admin-login-modal');
        if (m) m.classList.remove('is-open');
    }

    function attemptAdminLogin() {
        var err = document.getElementById('admin-login-error');
        var card = document.querySelector('#admin-login-modal .admin-modal-card');
        if (Date.now() < lockUntil) {
            if (err) err.textContent = 'Too many attempts. Try again in 5 minutes.';
            return;
        }
        var u = document.getElementById('admin-user');
        var p = document.getElementById('admin-pass');
        if (!u || !p) return;
        if (u.value === _U && p.value === _P) {
            loginAttempts = 0;
            sessionStorage.setItem(SS_ADMIN, '1');
            localStorage.setItem(LS_LAST_LOGIN, new Date().toLocaleString());
            closeAdminLogin();
            openAdminPanel();
            if (typeof window.refreshAdminDashboard === 'function') window.refreshAdminDashboard();
        } else {
            loginAttempts++;
            if (err) err.textContent = 'Access Denied';
            if (card) {
                card.classList.remove('admin-login-shake');
                void card.offsetWidth;
                card.classList.add('admin-login-shake');
            }
            if (loginAttempts >= 3) {
                lockUntil = Date.now() + 300000;
                if (err) err.textContent = 'Too many attempts. Try again in 5 minutes.';
                var form = document.getElementById('admin-login-form');
                if (form) form.querySelectorAll('input, button[type="submit"]').forEach(function (el) {
                    el.disabled = true;
                });
                setTimeout(function () {
                    lockUntil = 0;
                    loginAttempts = 0;
                    if (form) form.querySelectorAll('input, button[type="submit"]').forEach(function (el) {
                        el.disabled = false;
                    });
                    if (err) err.textContent = '';
                }, 300000);
            }
        }
    }

    function openAdminPanel() {
        var o = document.getElementById('admin-overlay');
        if (o) {
            o.classList.add('is-open');
            o.setAttribute('aria-hidden', 'false');
        }
    }

    function closeAdminPanel() {
        var o = document.getElementById('admin-overlay');
        if (o) {
            o.classList.remove('is-open');
            o.setAttribute('aria-hidden', 'true');
        }
    }

    function adminLogout() {
        sessionStorage.removeItem(SS_ADMIN);
        closeAdminPanel();
    }

    window.refreshAdminDashboard = function () {
        var enquiries = getEnquiries();
        var totalEl = document.getElementById('adm-total-enq');
        if (totalEl) totalEl.textContent = enquiries.length;
        var imgCount = getGalleryImages().length;
        var vidCount = getGalleryVideos().length;
        var elImg = document.getElementById('adm-gallery-img-count');
        var elVid = document.getElementById('adm-gallery-vid-count');
        if (elImg) elImg.textContent = imgCount;
        if (elVid) elVid.textContent = vidCount;
        var ll = document.getElementById('adm-last-login');
        if (ll) ll.textContent = localStorage.getItem(LS_LAST_LOGIN) || '—';

        var tbody = document.querySelector('#adm-recent-enquiries tbody');
        if (tbody) {
            tbody.innerHTML = '';
            enquiries.slice(-5).reverse().forEach(function (q) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + escapeHtml(q.name) + '</td><td>' + escapeHtml((q.message || '').slice(0, 40)) + '</td><td>' + escapeHtml(q.date) + '</td><td><span class="admin-badge admin-badge--new">' + escapeHtml(q.status) + '</span></td>';
                tbody.appendChild(tr);
            });
        }
        updateEnquiryBadge();
    };

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function updateEnquiryBadge() {
        var n = getEnquiries().filter(function (e) { return e.status === 'New'; }).length;
        var b = document.getElementById('enquiry-nav-badge');
        if (b) {
            if (n > 0) b.classList.add('is-visible');
            else b.classList.remove('is-visible');
        }
    }

    // Admin init — panels, tables, gallery CRUD (inline in initAdminFull)
    function initAdminFull() {
        var overlay = document.getElementById('admin-overlay');
        if (!overlay || !document.getElementById('admin-login-form')) return;

        document.querySelectorAll('.admin-nav-item').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var panel = btn.getAttribute('data-panel');
                document.querySelectorAll('.admin-nav-item').forEach(function (b) { b.classList.remove('is-active'); });
                btn.classList.add('is-active');
                document.querySelectorAll('.admin-panel').forEach(function (p) { p.classList.remove('is-active'); });
                var p = document.getElementById('panel-' + panel);
                if (p) p.classList.add('is-active');
                if (panel === 'gallery') window.renderAdminGallery();
                if (panel === 'company') window.fillCompanyForm();
                if (panel === 'enquiries') window.renderEnquiriesTable();
                if (panel === 'dashboard') window.refreshAdminDashboard();
            });
        });

        document.getElementById('admin-logout-btn').addEventListener('click', adminLogout);

        document.getElementById('admin-login-form').addEventListener('submit', function (e) {
            e.preventDefault();
            attemptAdminLogin();
        });

        document.getElementById('admin-login-close').addEventListener('click', closeAdminLogin);

        document.getElementById('company-save-btn').addEventListener('click', function () {
            var c = {
                companyName: document.getElementById('co-name').value,
                tagline: document.getElementById('co-tagline').value,
                aboutText: document.getElementById('co-about').value,
                phone: document.getElementById('co-phone').value,
                email: document.getElementById('co-email').value,
                whatsapp: document.getElementById('co-whatsapp').value,
                address: document.getElementById('co-address').value,
                hours: document.getElementById('co-hours').value,
                facebook: document.getElementById('co-fb').value,
                instagram: document.getElementById('co-ig').value,
                youtube: document.getElementById('co-yt').value,
                foundedYear: document.getElementById('co-founded').value
            };
            setCompany(c);
            applyCompanyToDOM();
            alert('Company details saved.');
        });

        document.getElementById('company-reset-btn').addEventListener('click', function () {
            if (!confirm('Reset all company fields to defaults?')) return;
            localStorage.removeItem(LS_COMPANY);
            if (typeof window.fillCompanyForm === 'function') window.fillCompanyForm();
            applyCompanyToDOM();
        });

        window.fillCompanyForm = function () {
            var c = getCompany();
            var keys = ['name', 'tagline', 'about', 'phone', 'email', 'whatsapp', 'address', 'hours', 'fb', 'ig', 'yt', 'founded'];
            var map = {
                name: 'companyName', tagline: 'tagline', about: 'aboutText', phone: 'phone', email: 'email',
                whatsapp: 'whatsapp', address: 'address', hours: 'hours', fb: 'facebook', ig: 'instagram', yt: 'youtube', founded: 'foundedYear'
            };
            keys.forEach(function (k) {
                var el = document.getElementById('co-' + k);
                if (el) el.value = c[map[k]] || '';
            });
        };

        window.renderAdminGallery = function () {
            var tab = document.querySelector('.admin-tab.is-active');
            var mode = tab && tab.getAttribute('data-tab') === 'videos' ? 'videos' : 'images';
            var grid = document.getElementById('admin-gallery-grid');
            if (!grid) return;
            grid.innerHTML = '';
            if (mode === 'images') {
                getGalleryImages().forEach(function (item) {
                    var card = document.createElement('div');
                    card.className = 'admin-g-item';
                    var prev = document.createElement('div');
                    prev.className = 'admin-g-item-preview';
                    if (item.type === 'image' && item.url) {
                        var img = document.createElement('img');
                        img.src = item.url;
                        prev.appendChild(img);
                    } else {
                        prev.appendChild(buildPlaceholderEl(item.title || 'Placeholder', phIndex(item)));
                    }
                    var meta = document.createElement('div');
                    meta.className = 'admin-g-item-meta';
                    meta.innerHTML = '<span>' + escapeHtml(item.title || '') + '</span><button type="button" class="admin-btn admin-btn--danger" data-del-img="' + item.id + '">🗑️</button>';
                    card.appendChild(prev);
                    card.appendChild(meta);
                    grid.appendChild(card);
                });
            } else {
                getGalleryVideos().forEach(function (item) {
                    var card = document.createElement('div');
                    card.className = 'admin-g-item';
                    var prev = document.createElement('div');
                    prev.className = 'admin-g-item-preview';
                    if (item.url && (item.url.indexOf('youtube') >= 0 || item.url.indexOf('youtu.be') >= 0)) {
                        var id = (item.url.match(/embed\/([^?]+)/) || item.url.match(/v=([^&]+)/)) || [];
                        if (id[1]) {
                            var im = document.createElement('img');
                            im.src = 'https://img.youtube.com/vi/' + id[1] + '/mqdefault.jpg';
                            prev.appendChild(im);
                        }
                    } else if (item.url) {
                        var v = document.createElement('video');
                        v.src = item.url;
                        v.muted = true;
                        prev.appendChild(v);
                    }
                    var meta = document.createElement('div');
                    meta.className = 'admin-g-item-meta';
                    meta.innerHTML = '<span>' + escapeHtml(item.title || '') + '</span><button type="button" class="admin-btn admin-btn--danger" data-del-vid="' + item.id + '">🗑️</button>';
                    card.appendChild(prev);
                    card.appendChild(meta);
                    grid.appendChild(card);
                });
            }
        };

        document.querySelectorAll('.admin-tab').forEach(function (t) {
            t.addEventListener('click', function () {
                document.querySelectorAll('.admin-tab').forEach(function (x) { x.classList.remove('is-active'); });
                t.classList.add('is-active');
                window.renderAdminGallery();
            });
        });

        var adminGrid = document.getElementById('admin-gallery-grid');
        if (adminGrid) adminGrid.addEventListener('click', function (e) {
            var di = e.target.getAttribute('data-del-img');
            var dv = e.target.getAttribute('data-del-vid');
            if (di && confirm('Delete this image?')) {
                setGalleryImages(getGalleryImages().filter(function (x) { return x.id !== di; }));
                window.renderAdminGallery();
                renderGallery();
            }
            if (dv && confirm('Delete this video?')) {
                setGalleryVideos(getGalleryVideos().filter(function (x) { return x.id !== dv; }));
                window.renderAdminGallery();
                renderGallery();
            }
        });

        document.getElementById('btn-add-image').addEventListener('click', function () {
            document.getElementById('modal-add-image').classList.add('is-open');
        });
        document.getElementById('btn-add-video').addEventListener('click', function () {
            document.getElementById('modal-add-video').classList.add('is-open');
        });
        document.getElementById('modal-add-image-close').addEventListener('click', function () {
            document.getElementById('modal-add-image').classList.remove('is-open');
        });
        document.getElementById('modal-add-video-close').addEventListener('click', function () {
            document.getElementById('modal-add-video').classList.remove('is-open');
        });
        document.getElementById('modal-add-image-confirm').addEventListener('click', function () {
            var url = document.getElementById('add-img-url').value.trim();
            var file = document.getElementById('add-img-file').files[0];
            var title = document.getElementById('add-img-title').value.trim() || 'Untitled';
            var cat = document.getElementById('add-img-cat').value;
            var finalUrl = url;
            if (file) {
                finalUrl = URL.createObjectURL(file);
            }
            if (!finalUrl) {
                alert('Provide URL or file.');
                return;
            }
            var item = {
                id: 'img-' + Date.now(),
                type: 'image',
                url: finalUrl,
                title: title,
                category: cat,
                ph: 0
            };
            var arr = getGalleryImages();
            arr.push(item);
            setGalleryImages(arr);
            document.getElementById('modal-add-image').classList.remove('is-open');
            window.renderAdminGallery();
            renderGallery();
        });
        document.getElementById('modal-add-video-confirm').addEventListener('click', function () {
            var url = document.getElementById('add-vid-url').value.trim();
            var title = document.getElementById('add-vid-title').value.trim() || 'Video';
            if (!url) {
                alert('Enter video URL');
                return;
            }
            var item = {
                id: 'vid-' + Date.now(),
                type: 'video',
                url: url,
                title: title,
                category: 'decor'
            };
            var arr = getGalleryVideos();
            arr.push(item);
            setGalleryVideos(arr);
            document.getElementById('modal-add-video').classList.remove('is-open');
            window.renderAdminGallery();
            renderGallery();
        });

        window.renderEnquiriesTable = function () {
            var tbody = document.getElementById('enquiries-full-tbody');
            var filter = document.getElementById('enq-filter') ? document.getElementById('enq-filter').value : 'all';
            var qsearch = (document.getElementById('enq-search') && document.getElementById('enq-search').value.toLowerCase()) || '';
            if (!tbody) return;
            tbody.innerHTML = '';
            var rowNum = 0;
            getEnquiries().forEach(function (enq) {
                if (filter !== 'all' && enq.status !== filter) return;
                var blob = (enq.name + ' ' + (enq.message || '')).toLowerCase();
                if (qsearch && blob.indexOf(qsearch) < 0) return;
                rowNum++;
                var tr = document.createElement('tr');
                var badgeClass = 'admin-badge--new';
                if (enq.status === 'In Progress') badgeClass = 'admin-badge--progress';
                if (enq.status === 'Resolved') badgeClass = 'admin-badge--resolved';
                tr.innerHTML =
                    '<td>' + rowNum + '</td>' +
                    '<td>' + escapeHtml(enq.name) + '</td>' +
                    '<td>' + escapeHtml(enq.phone) + '</td>' +
                    '<td>' + escapeHtml(enq.message || '') + '</td>' +
                    '<td>' + escapeHtml(enq.date) + '</td>' +
                    '<td>' + escapeHtml(enq.source || '') + '</td>' +
                    '<td><select data-enq-status="' + enq.id + '" class="admin-status-sel">' +
                    '<option' + (enq.status === 'New' ? ' selected' : '') + '>New</option>' +
                    '<option' + (enq.status === 'In Progress' ? ' selected' : '') + '>In Progress</option>' +
                    '<option' + (enq.status === 'Resolved' ? ' selected' : '') + '>Resolved</option>' +
                    '</select></td>' +
                    '<td><button type="button" class="admin-btn" data-resolve="' + enq.id + '">Resolve</button> ' +
                    '<button type="button" class="admin-btn admin-btn--danger" data-del-enq="' + enq.id + '">Delete</button></td>';
                tbody.appendChild(tr);
            });
        };

        var enqFilter = document.getElementById('enq-filter');
        var enqSearch = document.getElementById('enq-search');
        var enqTbody = document.getElementById('enquiries-full-tbody');
        if (enqFilter) enqFilter.addEventListener('change', window.renderEnquiriesTable);
        if (enqSearch) enqSearch.addEventListener('input', window.renderEnquiriesTable);
        if (enqTbody) enqTbody.addEventListener('change', function (e) {
            var id = e.target.getAttribute('data-enq-status');
            if (!id) return;
            var list = getEnquiries();
            var o = list.find(function (x) { return String(x.id) === String(id); });
            if (o) o.status = e.target.value;
            saveEnquiries(list);
            updateEnquiryBadge();
        });
        if (enqTbody) enqTbody.addEventListener('click', function (e) {
            var rid = e.target.getAttribute('data-resolve');
            var did = e.target.getAttribute('data-del-enq');
            var list = getEnquiries();
            if (rid) {
                var o = list.find(function (x) { return String(x.id) === String(rid); });
                if (o) o.status = 'Resolved';
                saveEnquiries(list);
                window.renderEnquiriesTable();
                updateEnquiryBadge();
            }
            if (did && confirm('Delete enquiry?')) {
                saveEnquiries(list.filter(function (x) { return String(x.id) !== String(did); }));
                window.renderEnquiriesTable();
                window.refreshAdminDashboard();
            }
        });
        var btnCsv = document.getElementById('btn-export-csv');
        if (btnCsv) btnCsv.addEventListener('click', function () {
            var rows = getEnquiries();
            var csv = 'ID,Name,Phone,Message,Date,Source,Status\n';
            rows.forEach(function (r) {
                csv += [r.id, r.name, r.phone, (r.message || '').replace(/,/g, ';'), r.date, r.source, r.status].join(',') + '\n';
            });
            var blob = new Blob([csv], { type: 'text/csv' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'stonemaster-enquiries.csv';
            a.click();
        });

        window.adminNotifyNewEnquiry = function (enq) {
            if (!sessionStorage.getItem(SS_ADMIN)) return;
            var t = document.getElementById('admin-toast');
            if (t) {
                t.textContent = 'New enquiry received from ' + enq.name;
                t.classList.add('is-visible');
                setTimeout(function () { t.classList.remove('is-visible'); }, 4000);
            }
        };
    }

    function renderGallery() {
        var grid = document.getElementById('gallery-grid');
        if (!grid) return;
        grid.innerHTML = '';
        var items = getGalleryImages();
        items.forEach(function (item, idx) {
            var div = document.createElement('div');
            div.className = 'gallery-item ' + (item.category || 'all');
            div.classList.add('reveal-card-3d');
            div.style.transitionDelay = (idx * 0.1) + 's';
            var shine = document.createElement('div');
            shine.className = 'tilt-shine';
            div.appendChild(shine);
            var inner = document.createElement('div');
            inner.className = 'gallery-item-inner';
            if (item.type === 'image' && item.url) {
                var img = document.createElement('img');
                img.src = item.url;
                img.alt = item.title || '';
                img.onerror = function () {
                    this.replaceWith(buildPlaceholderEl(item.title || 'Image', phIndex(item)));
                };
                inner.appendChild(img);
            } else {
                inner.appendChild(buildPlaceholderEl(item.title || 'Gallery', phIndex(item)));
            }
            div.appendChild(inner);
            grid.appendChild(div);
        });
        getGalleryVideos().forEach(function (v, vidx) {
            var div = document.createElement('div');
            div.className = 'gallery-item decor';
            div.classList.add('reveal-card-3d');
            div.style.transitionDelay = ((items.length + vidx) * 0.1) + 's';
            var shine = document.createElement('div');
            shine.className = 'tilt-shine';
            div.appendChild(shine);
            var inner = document.createElement('div');
            inner.className = 'gallery-item-inner';
            if (v.url && (v.url.indexOf('youtube') >= 0 || v.url.indexOf('youtu.be') >= 0)) {
                var iframe = document.createElement('iframe');
                var m = v.url.match(/v=([^&]+)/);
                var vid = m ? m[1] : (v.url.match(/embed\/([^?]+)/) || [])[1];
                if (v.url.indexOf('embed') >= 0) iframe.src = v.url;
                else if (vid) iframe.src = 'https://www.youtube.com/embed/' + vid;
                else iframe.src = v.url;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';
                iframe.setAttribute('allowfullscreen', '');
                inner.appendChild(iframe);
            } else if (v.url) {
                var video = document.createElement('video');
                video.src = v.url;
                video.controls = true;
                video.style.width = '100%';
                video.style.height = '100%';
                inner.appendChild(video);
            }
            div.appendChild(inner);
            grid.appendChild(div);
        });
        initTiltOnNewCards();
        initScrollReveals();
    }

    // =============================================================================
    // Audio toggle (no console noise)
    // =============================================================================
    window.toggleAudio = function () {
        var audioOn = window._smAudioState = !window._smAudioState;
        var icon = document.getElementById('audioIcon');
        if (icon) icon.textContent = audioOn ? '🔊' : '🔈';
    };

    // =============================================================================
    // Boot
    // =============================================================================
    document.addEventListener('DOMContentLoaded', function () {
        initLoadingScreen();
        initStatTargets();
        applyCompanyToDOM();
        initHeroTitle();
        initParticleDust();
        if (typeof THREE !== 'undefined') {
            initHeroThree();
            initCustomThree();
        }
        initHeroParallax();
        initScrollReveals();
        initAboutParallax();
        initTiltCards();
        renderGallery();
        bindEnquiryTriggers();
        initAdminFull();

        var fab = document.getElementById('footer-admin-btn');
        if (fab) fab.addEventListener('click', function (e) {
            e.preventDefault();
            if (sessionStorage.getItem(SS_ADMIN)) {
                openAdminPanel();
                window.refreshAdminDashboard();
            } else {
                openAdminLogin();
            }
        });

        var ec = document.getElementById('enquiry-close');
        var es = document.getElementById('enquiry-submit');
        if (ec) ec.addEventListener('click', closeEnquiryModal);
        if (es) es.addEventListener('click', submitEnquiry);

        var aboutBg = document.querySelector('.about-image-parallax');
        if (aboutBg) {
            aboutBg.style.backgroundImage =
                'linear-gradient(rgba(26,26,24,0.25), rgba(26,26,24,0.25)), ' +
                PLACEHOLDER_GRADIENTS[7];
        }
    });
})();

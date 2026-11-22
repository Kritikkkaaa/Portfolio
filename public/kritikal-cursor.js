/*
  kritikal.work · camera viewfinder cursor
  ------------------------------------------------------------
  How to use: add this one line before </body> on every page:
    <script src="/kritikal-cursor.js" defer></script>

  What it does (desktop only; phones and tablets keep their normal behaviour):
  - always         : a small dot sits exactly on the pointer and follows it with no delay.
  - empty paper    : four brackets around the dot. Still for 2s, they gently "breathe".
  - text           : the brackets soften; the dot stays clear so you never lose the pointer.
  - clickable      : small things get locked in by the brackets. Links that open a new tab say "Open on a new tab" on an ivory chip.
                     big things (cards, tiles, photos) are not boxed in: the brackets stay on the pointer.
  - typing         : steps away; the normal text cursor returns.
  - clicks         : instant. Only elements tagged data-cur="turn" (page turns) close the aperture first.
  - sound          : off by default. window.kritikalCursor.unmute() turns the soft camera click on.
  - "reduce motion": no breathing, no aperture.

  Optional: tag any element with data-cur="..." to choose its behaviour:
    photo | turn | pin | video | nav | ext | still | text | input
  Untagged elements are detected automatically.
*/
(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  // phone-sized windows (the mobile layout, under 768px) keep the normal cursor
  if (window.matchMedia('(max-width: 767px)').matches) return;

  var PLUM = '#5a1626', IVORY = '#f6f1e8', SOFT = '#7d6b6b';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var muted = true; // sound is opt-in
  var LABELS = { photo: '', still: '', pin: 'focus', video: 'rec ●', nav: '', ext: 'Open on a new tab', turn: 'turn' };
  // anything bigger than this is too large to box in; the brackets stay on the pointer instead
  var BIG_W = 320, BIG_H = 240;

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    'html.kc-on, html.kc-on *{cursor:none !important}' +
    'html.kc-on input, html.kc-on textarea, html.kc-on [contenteditable]{cursor:text !important}' +
    // the dot: always exactly on the pointer, ivory halo so it shows on dark and light
    '.kc-dot{position:fixed;left:0;top:0;width:6px;height:6px;border-radius:50%;background:' + PLUM + ';box-shadow:0 0 0 1.5px ' + IVORY + ';pointer-events:none;z-index:2147483647;opacity:0;will-change:transform;transition:opacity .15s ease}' +
    // the brackets
    '.kc-box{position:fixed;left:0;top:0;width:34px;height:34px;pointer-events:none;z-index:2147483646;opacity:0;will-change:transform;' +
      'transition:width .18s ease,height .18s ease,opacity .2s ease}' +
    '.kc-box.kc-lock{transition:transform .22s cubic-bezier(.3,1.2,.5,1),width .22s cubic-bezier(.3,1.2,.5,1),height .22s cubic-bezier(.3,1.2,.5,1),opacity .2s ease}' +
    '.kc-in{position:absolute;inset:0;filter:drop-shadow(0 0 1px rgba(246,241,232,.95));transition:transform .15s ease}' +
    '.kc-dk .kc-in{filter:drop-shadow(0 0 1px rgba(20,6,10,.7))}' +
    '.kc-b{position:absolute;width:10px;height:10px;border:0 solid ' + PLUM + ';transition:border-color .2s}' +
    '.kc-b1{left:0;top:0;border-left-width:1.5px;border-top-width:1.5px}' +
    '.kc-b2{right:0;top:0;border-right-width:1.5px;border-top-width:1.5px}' +
    '.kc-b3{left:0;bottom:0;border-left-width:1.5px;border-bottom-width:1.5px}' +
    '.kc-b4{right:0;bottom:0;border-right-width:1.5px;border-bottom-width:1.5px}' +
    // the label: a small ivory chip in the typewriter font
    '.kc-lab{position:absolute;left:0;top:100%;margin-top:8px;white-space:nowrap;padding:4px 9px;background:' + IVORY + ';color:' + PLUM + ';border:1px solid rgba(90,22,38,.35);font:500 12px/1.2 Cinzel,serif;letter-spacing:.08em}' +
    '.kc-lab:empty{display:none}' +
    '.kc-rec .kc-lab{animation:kc-rec 1.2s ease-in-out infinite}' +
    '.kc-idle .kc-in{animation:kc-breathe 1.6s ease-in-out infinite}' +
    '@keyframes kc-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}' +
    '@keyframes kc-rec{0%,100%{opacity:1}50%{opacity:.25}}' +
    '.kc-iris{position:fixed;left:50%;top:50%;width:0;height:0;transform:translate(-50%,-50%);border-radius:50%;' +
      'box-shadow:0 0 0 200vmax #1a0c10;pointer-events:none;z-index:2147483647;display:none}' +
    '@keyframes kc-iris-close{from{width:250vmax;height:250vmax}to{width:0;height:0}}' +
    '@keyframes kc-iris-open{from{width:0;height:0}to{width:250vmax;height:250vmax}}' +
    'html.kc-plain .kc-dot{opacity:0 !important}' +
    '@media (max-width: 767px){html.kc-on, html.kc-on *{cursor:auto !important}.kc-box,.kc-dot{display:none !important}}';
  document.head.appendChild(css);

  /* ---------- elements ---------- */
  var box = document.createElement('div');
  box.className = 'kc-box';
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<span class="kc-in"><span class="kc-b kc-b1"></span><span class="kc-b kc-b2"></span><span class="kc-b kc-b3"></span><span class="kc-b kc-b4"></span></span><span class="kc-lab"></span>';
  var lab = box.querySelector('.kc-lab'), inner = box.querySelector('.kc-in'), corners = box.querySelectorAll('.kc-b');
  var dot = document.createElement('div'); dot.className = 'kc-dot'; dot.setAttribute('aria-hidden', 'true');
  var iris = document.createElement('div'); iris.className = 'kc-iris'; iris.setAttribute('aria-hidden', 'true');
  document.body.appendChild(box); document.body.appendChild(dot); document.body.appendChild(iris);
  document.documentElement.classList.add('kc-on');

  /* if the page was reached through the aperture, open it again */
  if (!reduced && sessionStorage.getItem('kc-iris') === '1') {
    sessionStorage.removeItem('kc-iris');
    iris.style.display = 'block';
    iris.style.animation = 'kc-iris-open .35s cubic-bezier(.6,.05,.25,1) forwards';
    setTimeout(function () { iris.style.display = 'none'; iris.style.animation = ''; }, 380);
  }

  /* ---------- sound: a subtle synthesized camera click (off unless unmuted) ---------- */
  var ac = null;
  function snap(kind) {
    if (muted) return;
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      var vol = kind === 'soft' ? 0.05 : kind === 'iris' ? 0.12 : 0.1;
      var parts = kind === 'iris' ? [0, 0.11] : [0];
      parts.forEach(function (off, i) {
        var len = 0.035, buf = ac.createBuffer(1, Math.floor(ac.sampleRate * len), ac.sampleRate), d = buf.getChannelData(0);
        for (var j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / d.length, 5);
        var src = ac.createBufferSource(); src.buffer = buf;
        var bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = i ? 1800 : 2800; bp.Q.value = 0.8;
        var g = ac.createGain(); g.gain.value = vol;
        src.connect(bp); bp.connect(g); g.connect(ac.destination); src.start(ac.currentTime + off);
      });
    } catch (e) {}
  }

  /* ---------- deciding what is under the cursor ---------- */
  function kindOf(t) {
    if (!t || !t.closest) return { kind: '', el: null };
    var tagged = t.closest('[data-cur]');
    if (tagged) return { kind: tagged.getAttribute('data-cur'), el: tagged };
    var field = t.closest('input, textarea, select, [contenteditable]');
    if (field) return { kind: 'input', el: field };
    var a = t.closest('a[href], button, [role="button"], summary, label[for]');
    if (a) {
      if (a.tagName === 'A') {
        var external = a.host && a.host !== location.host;
        if (external || a.target === '_blank') return { kind: 'ext', el: a };
        if (a.querySelector('video')) return { kind: 'video', el: a };
        if (a.querySelector('img, picture, svg image')) return { kind: 'photo', el: a };
      }
      return { kind: 'nav', el: a };
    }
    var media = t.closest('img, picture, video, figure');
    if (media) return { kind: 'still', el: media };
    var text = t.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption, em, strong, mark, span');
    if (text) return { kind: 'text', el: text };
    return { kind: '', el: null };
  }

  var current = { kind: '', el: null }, idleT = null;
  var px = -100, py = -100, pt = null, raf = 0, seen = false;
  function color(c) { for (var i = 0; i < corners.length; i++) corners[i].style.borderColor = c; }
  // is the surface under the pointer dark? (walks up to the first solid background colour; a photo counts as light)
  var lastEl = null, lastDark = false;
  function isDark(el) {
    if (el === lastEl) return lastDark;
    lastEl = el; lastDark = false;
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      var cs = getComputedStyle(e), m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (cs.backgroundImage !== 'none' && cs.backgroundImage.indexOf('url(') >= 0) break;
      if (m) {
        var v = m[1].split(',').map(parseFloat), a = v.length > 3 ? v[3] : 1;
        if (a > 0.5) { lastDark = (0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]) / 255 < 0.45; break; }
      }
    }
    return lastDark;
  }
  function place(x, y, w, h) { box.style.width = w + 'px'; box.style.height = h + 'px'; box.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'; }

  // runs once per frame, not once per mouse event
  function update() {
    raf = 0;
    clearTimeout(idleT);
    box.classList.remove('kc-idle');
    dot.style.transform = 'translate3d(' + (px - 3) + 'px,' + (py - 3) + 'px,0)';
    current = kindOf(pt);
    var k = current.kind;
    var dark = isDark(pt);
    box.classList.toggle('kc-dk', dark);
    var ink = dark ? IVORY : PLUM;
    dot.style.opacity = k === 'input' ? 0 : 1;
    var r = current.el && k && k !== 'text' && k !== 'input' ? current.el.getBoundingClientRect() : null;
    var big = r && (r.width > BIG_W || r.height > BIG_H);
    var lockable = !!r && !big;
    box.classList.toggle('kc-lock', lockable);
    box.classList.toggle('kc-rec', k === 'video');
    if (lockable) {
      var pad = k === 'pin' ? 4 : 8;
      place(r.left - pad, r.top - pad, r.width + pad * 2, r.height + pad * 2);
      color(k === 'still' ? SOFT : ink); lab.textContent = LABELS[k] || '';
      box.style.opacity = 1;
      return;
    }
    place(px - 17, py - 17, 34, 34);
    color(big && k === 'still' ? SOFT : ink);
    lab.textContent = big ? (LABELS[k] || '') : '';
    box.style.opacity = k === 'input' ? 0 : k === 'text' ? 0.6 : 1;
    if (!k && !reduced) idleT = setTimeout(function () { box.classList.add('kc-idle'); }, 2000);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }

  function onMove(e) { px = e.clientX; py = e.clientY; pt = e.target; seen = true; schedule(); }

  function onClick(e) {
    var k = current.kind;
    if (k === 'pin') {
      snap('soft');
      inner.style.transform = 'scale(.82)'; setTimeout(function () { inner.style.transform = ''; }, 160);
      return;
    }
    // only the big page turns close the aperture; every other link goes straight away
    if (k === 'turn') {
      snap('iris');
      var link = current.el.closest ? current.el.closest('a[href]') : null;
      if (reduced) return;
      iris.style.display = 'block';
      iris.style.animation = 'kc-iris-close .22s cubic-bezier(.6,.05,.25,1) forwards';
      if (link && link.host === location.host && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        sessionStorage.setItem('kc-iris', '1');
        setTimeout(function () { location.href = link.href; }, 220);
      } else {
        setTimeout(function () { iris.style.animation = 'kc-iris-open .3s cubic-bezier(.6,.05,.25,1) forwards'; }, 260);
        setTimeout(function () { iris.style.display = 'none'; iris.style.animation = ''; }, 600);
      }
      return;
    }
    if (k === 'ext' || k === 'nav' || k === 'video' || k === 'photo') snap('normal');
  }

  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('click', onClick, true);
  document.addEventListener('mouseleave', function () { box.style.opacity = 0; dot.style.opacity = 0; });
  document.addEventListener('mouseenter', function () { if (seen) schedule(); });
  // when the page scrolls under a still pointer, look again at what is under it instead of hiding
  window.addEventListener('scroll', function () {
    if (!seen) return;
    pt = document.elementFromPoint(px, py) || pt;
    schedule();
  }, { passive: true });

  window.kritikalCursor = {
    mute: function () { muted = true; },
    unmute: function () { muted = false; }
  };
})();

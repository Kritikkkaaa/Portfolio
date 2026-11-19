/*
  kritikal.work · camera viewfinder cursor
  ------------------------------------------------------------
  How to use: add this one line before </body> on every page:
    <script src="/kritikal-cursor.js" defer></script>

  What it does (desktop only; phones and tablets keep their normal behaviour):
  - empty paper   : four brackets + a focus dot. Still for 2s, it gently "breathes".
  - text          : fades to 12% so people can read.
  - clickable     : locks onto the element's edges in terracotta, with a small label.
  - photo to look : frames it in soft grey ("look"), no click promised.
  - typing        : steps away; the normal text cursor returns.
  - clicks        : a subtle synthesized camera click, plus a shutter effect:
                      cutouts / page turns -> aperture closes, then the page changes
                      links inside the site -> soft blink
                      links leaving the site -> brighter flash
                      map pins -> half-press squeeze, no flash
  - respects "reduce motion": no breathing, no aperture, no flash (sound stays, soft).

  Optional: tag any element with data-cur="..." to choose its behaviour:
    photo | turn | pin | video | nav | ext | still | text | input
  Untagged elements are detected automatically.

  Mute from anywhere: window.kritikalCursor.mute()   unmute: .unmute()
*/
(function () {
  if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var TERRACOTTA = '#A9452A', INK = '#2a2724', GREY = '#9a948c';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var muted = false;
  var LABELS = { photo: 'open', still: 'look', pin: 'focus', video: 'rec ●', nav: '', ext: 'leaving the page', turn: 'turn' };

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent =
    'html.kc-on, html.kc-on *{cursor:none !important}' +
    'html.kc-on input, html.kc-on textarea, html.kc-on [contenteditable]{cursor:text !important}' +
    '.kc-box{position:fixed;left:0;top:0;width:34px;height:34px;pointer-events:none;z-index:2147483646;opacity:0;' +
      'transition:left .04s linear,top .04s linear,width .04s linear,height .04s linear,opacity .3s ease,transform .15s ease}' +
    '.kc-box.kc-lock{transition:left .24s cubic-bezier(.3,1.3,.5,1),top .24s cubic-bezier(.3,1.3,.5,1),width .24s cubic-bezier(.3,1.3,.5,1),height .24s cubic-bezier(.3,1.3,.5,1),opacity .3s ease,transform .15s ease}' +
    '.kc-b{position:absolute;width:10px;height:10px;border:0 solid ' + INK + ';transition:border-color .2s}' +
    '.kc-b1{left:0;top:0;border-left-width:1.5px;border-top-width:1.5px}' +
    '.kc-b2{right:0;top:0;border-right-width:1.5px;border-top-width:1.5px}' +
    '.kc-b3{left:0;bottom:0;border-left-width:1.5px;border-bottom-width:1.5px}' +
    '.kc-b4{right:0;bottom:0;border-right-width:1.5px;border-bottom-width:1.5px}' +
    '.kc-dot{position:absolute;left:50%;top:50%;width:4px;height:4px;margin:-2px 0 0 -2px;border-radius:50%;background:' + INK + ';transition:opacity .2s}' +
    '.kc-lab{position:absolute;left:0;top:100%;margin-top:6px;white-space:nowrap;font:11px/1 "Hanken Grotesk",system-ui,sans-serif;letter-spacing:.02em}' +
    '.kc-rec .kc-lab{animation:kc-rec 1.2s ease-in-out infinite}' +
    '.kc-idle{animation:kc-breathe 1.6s ease-in-out infinite}' +
    '@keyframes kc-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}' +
    '@keyframes kc-rec{0%,100%{opacity:1}50%{opacity:.25}}' +
    '.kc-flash{position:fixed;inset:0;background:#fff;pointer-events:none;z-index:2147483645;opacity:0;transition:opacity .35s}' +
    '.kc-iris{position:fixed;left:50%;top:50%;width:0;height:0;transform:translate(-50%,-50%);border-radius:50%;' +
      'box-shadow:0 0 0 200vmax #111311;pointer-events:none;z-index:2147483647;display:none}' +
    '@keyframes kc-iris-close{from{width:250vmax;height:250vmax}to{width:0;height:0}}' +
    '@keyframes kc-iris-open{from{width:0;height:0}to{width:250vmax;height:250vmax}}';
  document.head.appendChild(css);

  /* ---------- elements ---------- */
  var box = document.createElement('div');
  box.className = 'kc-box';
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<span class="kc-b kc-b1"></span><span class="kc-b kc-b2"></span><span class="kc-b kc-b3"></span><span class="kc-b kc-b4"></span><span class="kc-dot"></span><span class="kc-lab"></span>';
  var lab = box.querySelector('.kc-lab'), dot = box.querySelector('.kc-dot'), corners = box.querySelectorAll('.kc-b');
  var flash = document.createElement('div'); flash.className = 'kc-flash'; flash.setAttribute('aria-hidden', 'true');
  var iris = document.createElement('div'); iris.className = 'kc-iris'; iris.setAttribute('aria-hidden', 'true');
  document.body.appendChild(box); document.body.appendChild(flash); document.body.appendChild(iris);
  document.documentElement.classList.add('kc-on');

  /* if the page was reached through the aperture, open it again */
  if (!reduced && sessionStorage.getItem('kc-iris') === '1') {
    sessionStorage.removeItem('kc-iris');
    iris.style.display = 'block';
    iris.style.animation = 'kc-iris-open .45s cubic-bezier(.6,.05,.25,1) forwards';
    setTimeout(function () { iris.style.display = 'none'; iris.style.animation = ''; }, 480);
  }

  /* ---------- sound: a subtle synthesized camera click (no audio file needed) ---------- */
  var ac = null;
  function snap(kind) {
    if (muted) return;
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      var vol = kind === 'soft' ? 0.05 : kind === 'strong' ? 0.16 : kind === 'iris' ? 0.12 : 0.1;
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
  function color(c) { for (var i = 0; i < corners.length; i++) corners[i].style.borderColor = c; }

  function onMove(e) {
    clearTimeout(idleT);
    box.classList.remove('kc-idle');
    current = kindOf(e.target);
    var k = current.kind;
    var lockable = k && k !== 'text' && k !== 'input';
    box.classList.toggle('kc-lock', !!lockable);
    box.classList.toggle('kc-rec', k === 'video');
    if (lockable) {
      var r = current.el.getBoundingClientRect(), pad = k === 'pin' ? 4 : 8;
      box.style.left = (r.left - pad) + 'px'; box.style.top = (r.top - pad) + 'px';
      box.style.width = (r.width + pad * 2) + 'px'; box.style.height = (r.height + pad * 2) + 'px';
      var c = k === 'still' ? GREY : TERRACOTTA;
      color(c); dot.style.opacity = 0; lab.style.color = c; lab.textContent = LABELS[k] || '';
      box.style.opacity = 1;
      return;
    }
    box.style.left = (e.clientX - 17) + 'px'; box.style.top = (e.clientY - 17) + 'px';
    box.style.width = '34px'; box.style.height = '34px';
    color(INK); dot.style.opacity = 1; lab.textContent = '';
    box.style.opacity = k === 'input' ? 0 : k === 'text' ? 0.12 : 1;
    if (!k && !reduced) idleT = setTimeout(function () { box.classList.add('kc-idle'); }, 2000);
  }

  function blink(level) {
    if (reduced) return;
    flash.style.transition = 'none'; flash.style.opacity = level;
    requestAnimationFrame(function () { requestAnimationFrame(function () { flash.style.transition = 'opacity .35s'; flash.style.opacity = 0; }); });
  }

  function onClick(e) {
    var k = current.kind;
    if (k === 'pin') {
      snap('soft');
      box.style.transform = 'scale(.82)'; setTimeout(function () { box.style.transform = ''; }, 160);
      return;
    }
    if (k === 'photo' || k === 'turn') {
      snap('iris');
      var link = current.el.closest ? current.el.closest('a[href]') : null;
      if (reduced) return;
      iris.style.display = 'block';
      iris.style.animation = 'kc-iris-close .32s cubic-bezier(.6,.05,.25,1) forwards';
      if (link && link.host === location.host && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        sessionStorage.setItem('kc-iris', '1');
        setTimeout(function () { location.href = link.href; }, 340);
      } else {
        setTimeout(function () { iris.style.animation = 'kc-iris-open .4s cubic-bezier(.6,.05,.25,1) forwards'; }, 380);
        setTimeout(function () { iris.style.display = 'none'; iris.style.animation = ''; }, 800);
      }
      return;
    }
    if (k === 'ext') { snap('strong'); blink(0.6); return; }
    if (k === 'nav' || k === 'video') { snap('normal'); blink(0.3); return; }
  }

  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('click', onClick, true);
  document.addEventListener('mouseleave', function () { box.style.opacity = 0; });
  window.addEventListener('scroll', function () { if (current.el && box.classList.contains('kc-lock')) box.style.opacity = 0; }, { passive: true });

  window.kritikalCursor = {
    mute: function () { muted = true; },
    unmute: function () { muted = false; }
  };
})();

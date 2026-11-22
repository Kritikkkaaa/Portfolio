/*
  kritikal.work · stacked spreads for tall screens (iPad held upright, tall windows)
  The magazine spreads are 1512x982 (two 756x982 pages side by side). On a screen taller than it is wide
  (and at least 768px wide), the spread can't fit without empty bands, so the right page is moved under the
  left one: each page fills the width and the visitor scrolls from page 1 to page 2.
  Page scripts keep their own fit(); this runs after them and takes over while the screen is upright.
  Elements are moved by their position: anything starting on the right half moves down a page; full-width
  layers (backgrounds, sheens) are stretched over both stacked pages.
*/
(function () {
  var mq = matchMedia('(min-width: 768px) and (orientation: portrait)');
  var st = document.getElementById('stage') || document.querySelector('.stage');
  if (!st) return;
  var sp = st.children.length === 1 ? st.firstElementChild : st;
  var W = 756, H = 982, saved = null, chain = [];
  // data-stack-first="right" on the stage puts the right page on top (for spreads whose title is on the right)
  var rightFirst = st.getAttribute('data-stack-first') === 'right';

  function stack() {
    if (!saved) {
      saved = [];
      [].slice.call(sp.children).forEach(function (n) {
        var cs = getComputedStyle(n);
        if (cs.position !== 'absolute' && n.offsetWidth < 1400) return;
        var l = n.offsetLeft, t = n.offsetTop, w = n.offsetWidth, h = n.offsetHeight;
        saved.push([n, n.style.cssText]);
        if (w >= 1400) { n.style.left = '0px'; n.style.top = '0px'; n.style.width = W + 'px'; n.style.height = (2 * H) + 'px'; n.style.right = 'auto'; n.style.bottom = 'auto'; n.style.inset = 'auto'; n.style.left = '0px'; n.style.top = '0px'; return; }
        var right = l + w / 2 >= W;
        if (right || rightFirst) {
          n.style.inset = 'auto';
          n.style.left = (right ? l - W : l) + 'px';
          n.style.top = (right ? (rightFirst ? t : t + H) : t + H) + 'px';
          n.style.width = w + 'px'; n.style.height = h + 'px'; n.style.right = 'auto'; n.style.bottom = 'auto';
        }
      });
      saved.push([sp, sp.style.cssText]);
      sp.style.width = W + 'px'; sp.style.height = (2 * H) + 'px';
      if (sp !== st) saved.push([st, st.style.cssText]);
      // every ancestor up to body grows to the stacked height and stops clipping
      for (var a = st.parentElement; a && a !== document.documentElement; a = a.parentElement) { chain.push([a, a.style.cssText]); }
      document.documentElement.classList.add('stacked');
    }
    var s = innerWidth / W;
    st.style.transform = 'scale(' + s + ')'; st.style.left = '0px'; st.style.top = '0px';
    chain.forEach(function (c) { c[0].style.height = Math.ceil(2 * H * s) + 'px'; c[0].style.overflow = 'visible'; });
    document.documentElement.style.overflowY = 'auto'; document.documentElement.style.height = 'auto';
    var e = document.getElementById('edge'); if (e) e.style.display = 'none';
  }
  function unstack() {
    if (!saved) return;
    saved.forEach(function (x) { x[0].style.cssText = x[1]; });
    chain.forEach(function (c) { c[0].style.cssText = c[1]; });
    saved = null; chain = [];
    document.documentElement.classList.remove('stacked');
    document.documentElement.style.overflowY = ''; document.documentElement.style.height = '';
    if (typeof window.fit === 'function') window.fit();
  }
  function run() { if (mq.matches) stack(); else unstack(); }
  addEventListener('resize', run);
  run();
})();

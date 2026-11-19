/* Funtasha ad slots — Sponsored Smartlink line + text-element links, site-wide.
 * FINAL STATE 2026-11-18: Banner + Smartlink click-layer PERMANENTLY
 * OFF (both proven hijackers — see _ad-rules.md). Only the labelled
 * Sponsored line (deliberate tap, clearly marked) stays on.
 * 2026-11-19 (owner order): plain-text elements that do nothing on
 * click — the "Questions people ask" .faq cards, plain <li>
 * bullets with no link inside, and (sitewide extension, same day)
 * plain prose <p> points in the middle of the writing — become
 * Sponsored links too, with judgment (prose: at most 3 per page,
 * spaced out, intro skipped). These are NOT tool cards and NOT
 * navigation links, so nothing the visitor wanted is ever diverted.
 * Same one-ad-tab-per-session guard, every element visibly marked
 * "Sponsored". The first-click Smartlink layer stays disabled: it
 * fires on link clicks, which the owner banned. ONE slim bar
 * (2026-11-19, CineBari shape): srcdoc iframe + Sponsored card +
 * temporary 60s dismiss, Funtasha's OWN bar zones only (728x90
 * zone 32363749, 320x50 zone 32363834). Never re-enable the old
 * 300x250 banner or the click-layer.
 *
 * Adsterra site funtasha.github.io (site ID 6206009). The slim-bar
 * zones below are Funtasha's OWN, issued 2026-11-19 (728x90 zone
 * 32363749, 320x50 zone 32363834, adult OFF); their atOptions +
 * invoke URLs are byte-identical to Adsterra's issue — nothing
 * invented, nothing copied from another site (CineBari's keys are
 * never reused here). Tags are never sandboxed or altered without
 * Adsterra's prior written consent (ToS 4.7); the srcdoc iframe
 * is the CineBari mechanism the owner ordered, not a sandbox.
 * The old 300x250 unit (zone 32317565) stays BANNED — its code
 * has been removed from this file entirely.
 *
 * This ONE file owns ALL tag code for every guide/tool/hub page.
 * Pages carry only the empty slot div <div id="funtasha-ad-slot">
 * plus the loader tag <script src="/funtasha-ads.js" defer> before
 * </body>. Never paste raw Adsterra tags into page HTML.
 *
 * BANNED on Funtasha (proven harmful, never re-add):
 * - Popunder (zone 32317376): its script tag broke downloads on
 *   /video-downloader/ — the overlay covered the Download button.
 * - Native Banner (zone 32317586): the owner's isolation test proved
 *   it hijacked the whole screen to a survey lander.
 * - Social Bar (zone 32317620): same screen-hijack evidence.
 * Smartlink (zone 32317423) — FIRST-LINK-CLICK-PER-SESSION layer,
 * added 2026-11-18 on the owner's word: one document-level click
 * listener in THIS file only. The first <a> click of a tab session
 * opens the Smartlink URL in one extra tab; the clicked link itself
 * is never touched (no preventDefault, no href rewrite, no delay),
 * so it always opens exactly what it promises. Later clicks in the
 * same session open nothing extra (sessionStorage flag
 * 'funtasha_smartlink_fired', in-memory fallback). /video-downloader/
 * keeps its own settled Smartlink wiring and never loads this file.
 * Sponsored line (zone 32317423, same Smartlink URL) — ONE labelled
 * mid-article line, added 2026-11-18 on the owner's word: the loader
 * inserts a "Sponsored" label + link after the 2nd direct-child H2 of
 * .wrap, ONLY on article pages (gate: .wrap present, 4+ direct-child
 * H2s, at least one .faq, no .grid — the hub has no .faq and carries
 * .grid, so it never fires there). The label is plainly visible; the
 * line is NEVER disguised as a content/reference link. It has its own
 * enabled flag and can be killed the same way. A click on the
 * Sponsored link itself opens the Smartlink URL via its own href, so
 * the first-click layer skips links already pointing at that URL —
 * otherwise one tap would open two identical tabs.
 *
 * Display-slot rules: NO artificial delay and NO frequency cap —
 * display inventory, matching the downloader's proven static shape.
 * The loader fills the slot on DOM ready with ONE slim-bar card
 * (Sponsored label + temporary dismiss; guide pages carry no ad
 * CSS), no-ops when the slot is absent, and never injects twice.
 * To switch the slim bar off site-wide, set slimBar.enabled:false
 * below and republish this one file. Code stays byte-identical. The
 * Smartlink layer has its own enabled flag and can be killed the
 * same way.
 */
window.FUNTASHA_ADS = {
  slimBar: {
    enabled: true,
    key728: '1e834c96ad0944ca4a3e4c9ebdc15738',
    key320: 'f2ef53da18b580853743091a67d7330b',
    host: 'https://bellnewyork.org/22/'
  },
  smartlink: {
    enabled: false,
    url: 'https://ardance.org/4/9ae1a7e6c539e3ffe09395409dd351eb'
  },
  sponsoredLine: {
    enabled: true,
    url: 'https://ardance.org/4/9ae1a7e6c539e3ffe09395409dd351eb',
    label: 'Sponsored',
    text: 'Explore sponsored offers \u2192'
  },
  textLinks: {
    enabled: true,
    url: 'https://ardance.org/4/9ae1a7e6c539e3ffe09395409dd351eb',
    label: 'Sponsored'
  }
};

(function () {
  /* Guard against a double <script src> include on one page. */
  if (window.__funtashaAdsRan) return;
  window.__funtashaAdsRan = true;
  var smartlinkBound = false;
  var SMARTLINK_KEY = 'funtasha_smartlink_fired';
  var smartlinkFired = false;
  function smartlinkHasFired() {
    if (smartlinkFired) return true;
    try {
      return window.sessionStorage.getItem(SMARTLINK_KEY) === '1';
    } catch (e) {
      return false;
    }
  }
  function smartlinkMarkFired() {
    smartlinkFired = true;
    try {
      window.sessionStorage.setItem(SMARTLINK_KEY, '1');
    } catch (e) {
      /* sessionStorage unavailable — the in-memory flag stands. */
    }
  }
  /* First-link-click-per-session Smartlink layer. The listener is
   * document-level and never calls preventDefault, never rewrites
   * the href, never delays navigation: the link opens exactly what
   * it promises, and at most one extra ad tab opens per session. */
  function bindSmartlink() {
    if (smartlinkBound) return;
    smartlinkBound = true;
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.smartlink) || {};
    if (!cfg.enabled || !cfg.url) return;
    document.addEventListener('click', function (e) {
      if (smartlinkHasFired()) return;
      var t = e.target;
      var a = (t && typeof t.closest === 'function') ? t.closest('a') : null;
      if (!a) return;
      if (!a.getAttribute('href')) return;
      /* A link already pointing at the Smartlink URL (the Sponsored
       * line's own link) needs no extra tab — it opens that URL
       * itself. Without this guard one tap would open two tabs. */
      if (a.href === cfg.url) return;
      window.open(cfg.url, '_blank', 'noopener');
      smartlinkMarkFired();
    });
  }
  /* Labelled mid-article Sponsored line. Gate: article pages only —
   * .wrap present, 4+ direct-child H2s, at least one .faq, no .grid.
   * The hub fails the .faq/.grid checks, so it never fires there.
   * Direct-child H2s only: H2s nested inside a tool block are never
   * used as the anchor, so the line can never land inside a tool.
   * Inserted as a plain block sibling after the 2nd H2, with margins
   * separating it from content; it covers nothing and intercepts no
   * content clicks. Single injection per page, guarded by id. */
  function insertSponsoredLine() {
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.sponsoredLine) || {};
    if (!cfg.enabled || !cfg.url) return;
    if (document.getElementById('funtasha-sponsored-line')) return;
    var wrap = document.querySelector('.wrap');
    if (!wrap) return;
    if (wrap.querySelector('.grid')) return;
    if (!wrap.querySelector('.faq')) return;
    var h2s = [];
    for (var i = 0; i < wrap.children.length; i++) {
      if (wrap.children[i].tagName === 'H2') h2s.push(wrap.children[i]);
    }
    if (h2s.length < 4) return;
    var anchor = h2s[1];
    var line = document.createElement('p');
    line.id = 'funtasha-sponsored-line';
    line.style.margin = '18px 0';
    var label = document.createElement('span');
    label.textContent = cfg.label || 'Sponsored';
    label.style.fontSize = '11px';
    label.style.color = '#94a3b8';
    label.style.textTransform = 'uppercase';
    label.style.letterSpacing = '1.5px';
    label.style.marginRight = '8px';
    label.style.lineHeight = '1.4';
    var a = document.createElement('a');
    a.href = cfg.url;
    a.target = '_blank';
    a.rel = 'nofollow sponsored noopener';
    a.textContent = cfg.text || 'Explore sponsored offers \u2192';
    a.style.color = '#be185d';
    a.style.fontWeight = '600';
    line.appendChild(label);
    line.appendChild(a);
    anchor.parentNode.insertBefore(line, anchor.nextSibling);
  }
  /* Text-element ad links (owner order 2026-11-19): plain-text
   * elements that do nothing on click — the "Questions people ask"
   * .faq cards, plain <li> bullets (no <a> inside), and plain
   * prose <p> points in the middle of the writing (at most 3 per
   * page, spaced out — see below) — become Sponsored links.
   * These are NOT tool cards and NOT navigation links, so nothing
   * the visitor wanted is ever diverted: the page stays, at most
   * one extra ad tab opens per session (the same sessionStorage
   * guard as the Smartlink layer). Every element carries a small
   * visible "Sponsored" marker, so the link is never disguised.
   * Clicks on a real <a> inside an element are left alone — that
   * link opens exactly what it promises. The TOOL itself is never
   * touched: any element inside a .calc tool block is skipped, so
   * people can use the tool normally. Gate: article pages only
   * (.wrap present, no .grid); the hub (.grid) and
   * /video-downloader/ (never loads this file) are untouched. */
  function bindTextLinks() {
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.textLinks) || {};
    if (!cfg.enabled || !cfg.url) return;
    var wrap = document.querySelector('.wrap');
    if (!wrap) return;
    if (wrap.querySelector('.grid')) return;
    var targets = [];
    var faqs = wrap.querySelectorAll('.faq');
    for (var i = 0; i < faqs.length; i++) {
      if (faqs[i].closest && faqs[i].closest('.calc')) continue;
      targets.push(faqs[i]);
    }
    var lis = wrap.querySelectorAll('li');
    for (var j = 0; j < lis.length; j++) {
      if (lis[j].closest && lis[j].closest('.calc')) continue;
      if (!lis[j].querySelector('a')) targets.push(lis[j]);
    }
    /* Prose points in the middle of the writing (owner order
     * 2026-11-19, sitewide): plain <p> paragraphs people read
     * become Sponsored links too — with judgment. Only plain
     * paragraphs: no <a> inside, never inside .calc or .faq,
     * never the notice/tool paragraphs (.note/.warn/.answer/
     * .out/.steps), at least 40 characters of text (so short
     * labels like group names never qualify). Skip the first
     * eligible paragraph (the intro), then take at most 3
     * per page, spaced at least two eligible paragraphs apart
     * — the page never becomes a minefield. Same visible
     * marker, same one-ad-tab-per-session guard. */
    var paras = wrap.querySelectorAll('p');
    var eligible = [];
    var skipClasses = ['note', 'warn', 'answer', 'out', 'steps'];
    for (var m = 0; m < paras.length; m++) {
      var p = paras[m];
      if (p.closest && (p.closest('.calc') || p.closest('.faq'))) continue;
      if (p.querySelector('a')) continue;
      var cls = (p.className || '').split(' ');
      var skip = false;
      for (var n = 0; n < cls.length; n++) {
        if (skipClasses.indexOf(cls[n]) !== -1) { skip = true; break; }
      }
      if (skip) continue;
      var txt = (p.textContent || '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
      if (txt.length < 40) continue;
      eligible.push(p);
    }
    var taken = 0;
    var since = 99;
    for (var q = 1; q < eligible.length && taken < 3; q++) {
      if (since < 2) { since++; continue; }
      targets.push(eligible[q]);
      taken++;
      since = 0;
    }
    for (var k = 0; k < targets.length; k++) {
      (function (el) {
        if (el.getAttribute('data-funtasha-textlink') === '1') return;
        el.setAttribute('data-funtasha-textlink', '1');
        el.style.cursor = 'pointer';
        var mark = document.createElement('span');
        mark.textContent = cfg.label || 'Sponsored';
        mark.style.fontSize = '10px';
        mark.style.color = '#94a3b8';
        mark.style.textTransform = 'uppercase';
        mark.style.letterSpacing = '1.5px';
        mark.style.marginLeft = '6px';
        mark.style.lineHeight = '1.4';
        el.appendChild(mark);
        el.addEventListener('click', function (e) {
          var t = e.target;
          var a = (t && typeof t.closest === 'function') ? t.closest('a') : null;
          if (a) return;
          if (smartlinkHasFired()) return;
          window.open(cfg.url, '_blank', 'noopener');
          smartlinkMarkFired();
        });
      })(targets[k]);
    }
  }
  /* ONE slim bar, CineBari shape (owner order 2026-11-19): the ad
   * renders inside a srcdoc iframe (atOptions + invoke inside the
   * iframe, no sandbox), never injected directly into the page —
   * the direct-injected 300x250 was the unit that hijacked on
   * load. Viewport picks the size: >=760px -> 728x90, below ->
   * 320x50, using Funtasha's OWN zone keys (never CineBari's).
   * The bar lives in a Sponsored card with a dismiss button;
   * owner's rule (2026-10-30): dismiss is TEMPORARY — the card
   * is only hidden and reappears after 60 seconds, no storage
   * writes. One bar only, in the existing #funtasha-ad-slot
   * (present on every article page); the slot is the only
   * placement, so no page HTML ever changes for ads. */
  function bannerIframe() {
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.slimBar) || {};
    var wide = (window.innerWidth || 0) >= 760;
    var key = wide ? cfg.key728 : cfg.key320;
    var w = wide ? 728 : 320, h = wide ? 90 : 50;
    var fr = document.createElement('iframe');
    fr.width = w; fr.height = h;
    fr.style.cssText = 'border:0;max-width:100%;display:block;margin:0 auto';
    fr.setAttribute('scrolling', 'no');
    fr.setAttribute('loading', 'lazy');
    fr.setAttribute('srcdoc', '<html><body style="margin:0;padding:0;text-align:center"><scr' + 'ipt>var atOptions={"key":"' + key + '","format":"iframe","height":' + h + ',"width":' + w + ',"params":{}};</scr' + 'ipt><scr' + 'ipt src="' + cfg.host + key + '"></scr' + 'ipt></bo' + 'dy></ht' + 'ml>');
    return fr;
  }
  function sponsoredCard() {
    var box = document.createElement('div');
    box.id = 'funtasha-slimbar-card';
    box.style.cssText = 'margin:.9rem auto;max-width:728px;overflow:hidden;box-sizing:border-box;padding:.3rem .6rem;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff';
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;font-size:.72rem;color:#94a3b8;margin-bottom:.15rem';
    var lab = document.createElement('span');
    lab.textContent = 'Sponsored';
    var x = document.createElement('button');
    x.textContent = '✕';
    x.setAttribute('aria-label', 'Dismiss sponsored content');
    x.style.cssText = 'background:none;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;line-height:1';
    var reappearTimer = null;
    x.onclick = function () {
      box.style.display = 'none';
      if (reappearTimer) clearTimeout(reappearTimer);
      reappearTimer = setTimeout(function () {
        reappearTimer = null;
        if (!document.contains(box)) return;
        box.style.display = '';
      }, 60000);
    };
    bar.appendChild(lab);
    bar.appendChild(x);
    box.appendChild(bar);
    box.appendChild(bannerIframe());
    return box;
  }
  function renderSlimBar() {
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.slimBar) || {};
    if (!cfg.enabled || !cfg.key728 || !cfg.key320) return;
    var slot = document.getElementById('funtasha-ad-slot');
    if (!slot) return;
    if (slot.getAttribute('data-funtasha-ads-loaded') === '1') return;
    slot.setAttribute('data-funtasha-ads-loaded', '1');
    var card = sponsoredCard();
    slot.appendChild(card);
    setTimeout(function () {
      if (!slot.parentNode) return;
      if (!card.querySelector('iframe')) card.appendChild(bannerIframe());
    }, 4000);
  }
  function run() {
    bindSmartlink();
    insertSponsoredLine();
    bindTextLinks();
    renderSlimBar();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

/* Funtasha ad slots — Banner ONLY, site-wide.
 *
 * Adsterra site funtasha.github.io (site ID 6206009). The Banner
 * 300x250_1 code below (zone 32317565) is the EXACT code Adsterra
 * issued for this site — byte-identical to the static tag live on
 * /video-downloader/ since 2026-11-17. Nothing invented, nothing
 * copied from another site. Tags are never sandboxed, iframed, or
 * altered without Adsterra's prior written consent (ToS 4.7).
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
 *
 * Display-slot rules: NO artificial delay and NO frequency cap —
 * display inventory, matching the downloader's proven static shape.
 * The loader fills the slot on DOM ready, adds the "Advertisement"
 * label + centering itself (guide pages carry no ad CSS), no-ops
 * when the slot is absent, and never injects twice.
 * To switch the banner off site-wide, set enabled:false below and
 * republish this one file. Code stays byte-identical. The Smartlink
 * layer has its own enabled flag and can be killed the same way.
 */
window.FUNTASHA_ADS = {
  banner: {
    enabled: true,
    key: 'e20e1e6290f4c44ca541c648438aec5e',
    format: 'iframe',
    height: 250,
    width: 300,
    src: 'https://bellnewyork.org/22/e20e1e6290f4c44ca541c648438aec5e'
  },
  smartlink: {
    enabled: true,
    url: 'https://ardance.org/4/9ae1a7e6c539e3ffe09395409dd351eb'
  }
};

(function () {
  /* Guard against a double <script src> include on one page. */
  if (window.__funtashaAdsRan) return;
  window.__funtashaAdsRan = true;
  var loaded = false;
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
      window.open(cfg.url, '_blank', 'noopener');
      smartlinkMarkFired();
    });
  }
  function run() {
    bindSmartlink();
    if (loaded) return;
    loaded = true;
    var cfg = (window.FUNTASHA_ADS && window.FUNTASHA_ADS.banner) || {};
    if (!cfg.enabled) return;
    var slot = document.getElementById('funtasha-ad-slot');
    if (!slot) return;
    if (slot.getAttribute('data-funtasha-ads-loaded') === '1') return;
    slot.setAttribute('data-funtasha-ads-loaded', '1');
    /* Presentation: the slot div itself carries no page CSS, so the
     * loader styles it + labels it, mirroring the downloader's
     * .ad-slot / .ad-label shape. */
    slot.style.margin = '28px auto 4px';
    slot.style.textAlign = 'center';
    slot.style.maxWidth = '100%';
    slot.style.overflow = 'hidden';
    var label = document.createElement('div');
    label.textContent = 'Advertisement';
    label.style.fontSize = '11px';
    label.style.color = '#94a3b8';
    label.style.textTransform = 'uppercase';
    label.style.letterSpacing = '1.5px';
    label.style.margin = '0 0 6px';
    label.style.lineHeight = '1.4';
    slot.appendChild(label);
    /* Tag code, byte-identical to Adsterra's issue, injected as
     * created script elements (scripts set via innerHTML do not
     * execute). The inline atOptions script runs synchronously on
     * insertion, so it is set before the external script loads. */
    var s1 = document.createElement('script');
    s1.text = 'atOptions = {\n' +
      "  'key' : 'e20e1e6290f4c44ca541c648438aec5e',\n" +
      "  'format' : 'iframe',\n" +
      "  'height' : 250,\n" +
      "  'width' : 300,\n" +
      "  'params' : {}\n" +
      '};';
    slot.appendChild(s1);
    var s2 = document.createElement('script');
    s2.src = 'https://bellnewyork.org/22/e20e1e6290f4c44ca541c648438aec5e';
    slot.appendChild(s2);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

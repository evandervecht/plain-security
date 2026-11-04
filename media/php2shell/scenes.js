// Facts from the php2shell briefing (English) only.
// Question scenes share one layout: kicker, title, a row of boxes with captions, then up to three notes.
function page(s, kicker, title, boxes, notes) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  const xs = s.row(boxes.length, { width: s.safe.w * (boxes.length > 3 ? 0.8 : 0.62) });
  const cw = ((s.safe.w * 0.8) / Math.max(boxes.length, 3)) * 0.9;
  boxes.forEach(([t, icon, color, at, cap], i) => {
    const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color, at });
    if (cap) s.text(cap, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: cw, at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.68 + i * 0.075), size: u * 2.1, color, at }));
  return u;
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('server-crash', { y: s.cy - u * 9, size: u * 9, color: 'red', at: 0.3 });
    s.title('php2shell', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('two critical PHP flaws, no login needed', { y: s.cy + u * 11, color: 'muted', at: '#nologin' });
  },

  update(s) {
    page(s, 'QUESTION 1 OF 3', 'Are we updated?', [
      ['Attacker', 'hat-glasses', 'red', 0.5, 'one request, no login'],
      ['PHP', 'server', 'orange', '#itself', 'the flaw is in PHP itself'],
      ['Our website', 'globe', 'blue', '#itself', 'its code never runs first'],
    ], [
      ['code runs on the web server', 'yellow', '#one'],
      ['both flaws rated critical', 'muted', '#cvss'],
      ['settings are not a fix: only the update', 'red', '#only'],
    ]);
  },

  old(s) {
    page(s, 'QUESTION 2 OF 3', 'Is any PHP too old for a fix?', [
      ['PHP 8.5', 'package-check', 'green', 0.5, 'fixed'],
      ['PHP 8.4', 'package-check', 'green', 0.5, 'fixed'],
      ['PHP 8.3', 'package-check', 'green', 0.5, 'fixed'],
      ['PHP 8.2', 'package-check', 'green', 0.5, 'fixed'],
      ['8.1 and older', 'package-x', 'red', '#eol', 'no official release'],
    ], [
      ['Linux distributions may ship a patch', 'muted', '#distro'],
      ['not a one-day job: budget, owner, date', 'yellow', '#project'],
    ]);
  },

  suppliers(s) {
    page(s, 'QUESTION 3 OF 3', 'Where is PHP we do not manage?', [
      ['Hosted sites', 'globe', 'blue', 'websites', ''],
      ['Plugins', 'puzzle', 'blue', 'plugins', ''],
      ['Container images', 'container', 'blue', 'container', ''],
      ['Appliances', 'router', 'blue', 'appliances', ''],
    ], [
      ['often we wait for the vendor', 'yellow', '#wait'],
      ['which suppliers run PHP for us?', 'muted', '#ask'],
      ['have they confirmed the update?', 'red', 'confirmed'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['Version list', 'list', 'with end-of-support dates', '#list'], ['Upgrade plan', 'calendar-check', 'with a date', '#plan'], ['Supplier confirmation', 'mail-check', 'in writing', '#conf'], ['SBOM', 'package-search', 'in contracts', '#sbom']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('NIS2 Art. 21: vulnerability handling, supply chain security', { id: 'nis', y: s.H * 0.7, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'supply' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.8 });
    [['Where is PHP?', 'search', '#q1', 'incl. supplier systems'], ['Which has no fix?', 'package-x', '#q2', 'no official release'], ['Who confirms?', 'mail-check', '#q3', 'in writing, by when']].forEach(([t, icon, at, n], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 2.4, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.24, at });
    });
    s.box('Update now, then check for intruders', { x: s.cx, y: s.H * 0.68, size: u * 2.4, icon: 'shield-check', color: 'blue', at: '#now' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Update first.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'first' });
    s.subtitle('then list every PHP we run', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

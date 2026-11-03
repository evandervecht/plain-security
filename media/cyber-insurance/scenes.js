// Facts from the cyber-insurance briefing (English) only.
// Surprise scenes share one layout: header, a row of boxes at 34% height, notes below.
function surprise(s, n, title, items, notes) {
  const u = s.W / 100;
  const xs = s.row(items.length, { width: s.safe.w * (items.length > 3 ? 0.74 : 0.62) });
  s.text(`SURPRISE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  items.forEach(([label, icon, color, at], i) => {
    s.box(label, { id: `b${i}`, x: xs[i], y: s.H * 0.38, size: u * (items.length > 3 ? 1.8 : 2.2), icon, color, at });
    if (i && items.length < 4) s.arrow(`b${i - 1}`, `b${i}`, { color: 'muted', at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.62 + i * 0.07), size: u * 2.1, color, at }));
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('umbrella', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Cyber insurance', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four surprises at claim time', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  form(s) {
    surprise(s, 1, 'The form said "MFA everywhere"', [
      ['Questionnaire', 'clipboard-check', 'blue', '#form'],
      ['VPN without MFA', 'shield-off', 'red', '#vpn'],
      ['Cover reduced or void', 'ban', 'red', '#void'],
    ], [
      ['ticked yes in good faith, two years earlier', 'muted', '#form'],
      ['an adjuster arrives with the same form', 'muted', 'adjuster'],
      ['answers count as warranties in many policies', 'yellow', 'warranties'],
    ]);
  },

  excluded(s) {
    surprise(s, 2, 'Four things not covered', [
      ['War, state-backed', 'swords', 'red', '#war'],
      ['Known, unpatched', 'bug', 'red', '#patch'],
      ['Regulatory fines', 'landmark', 'red', '#fines'],
      ['Contract penalties', 'file-text', 'red', 'penalties'],
    ], [
      ['since 31 March 2023', 'yellow', 'since'],
      ["Lloyd's requires it in standalone cyber policies", 'muted', 'exclude'],
      ['exposure the board carries itself', 'muted', '#own'],
    ]);
  },

  limits(s) {
    surprise(s, 3, 'The money runs out early', [
      ['Headline limit', 'umbrella', 'blue', '#head'],
      ['Sub-limits', 'layers', 'red', '#sub'],
      ['Waiting period', 'clock', 'red', 'waiting'],
    ], [
      ['forensics and legal cap used up in the first days', 'yellow', '#cap'],
      ['everything above the cap is ours', 'muted', 'ours'],
    ]);
  },

  notify(s) {
    surprise(s, 4, 'You called the wrong people first', [
      ['Insurer panel', 'users', 'teal', '#hot'],
      ['Our own IT firm', 'wrench', 'red', '#own'],
      ['Insurer told, day 4', 'phone-call', 'blue', '#late'],
    ], [
      ['immediate notice to the insurer', 'muted', '#hot'],
      ['approved forensics and legal firms only', 'muted', 'approved'],
      ['invoices declined', 'yellow', 'declines'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    [['Evidence file', 'file-check', 'a document behind each answer', '#ev'], ['Exclusion register', 'list-checks', 'an amount on each line', '#reg'], ['Limit test', 'scale', 'against a costed worst case', '#lim'], ['Insurer first', 'phone-call', 'hotline on line one', '#ins']].forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.2, at });
    });
    s.text('NIS2: insurance does not replace the required measures', { id: 'nis', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'replace' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('Three questions at the next renewal', { y: s.H * 0.2, size: u * 2.4, color: 'muted', at: '#ask' });
    [['What exactly is excluded?', 'ban', '#q1'], ['How long is the waiting period?', 'clock', '#q2'], ['Are the answers still true today?', 'clipboard-check', '#q3']].forEach(([t, icon, at], i) => {
      s.box(t, { x: s.cx, y: s.H * (0.38 + i * 0.17), size: u * 2.4, icon, color: 'teal', at });
    });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('It transfers some of the cost.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.subtitle('never the responsibility', { id: 'r', y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.annotate('r', { type: 'underline', color: 'teal', at: 'responsibility' });
  },
};

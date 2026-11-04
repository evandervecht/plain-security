// Facts from the nis2-dora briefing (English) only.
// Surprise scenes share one layout: header, a row of boxes at 34% height, notes below.
function surprise(s, n, title, items, notes) {
  const u = s.W / 100;
  const xs = s.row(items.length, { width: s.safe.w * (items.length > 3 ? 0.74 : 0.62) });
  s.text(`CHANGE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('gavel', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('NIS2 and DORA', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('the law now names the board', { y: s.cy + u * 11, color: 'muted', at: '#two' });
  },

  board(s) {
    surprise(s, 1, 'The board is accountable', [
      ['Approves, oversees', 'users', 'blue', '#approve'],
      ['Can be held liable', 'scale', 'red', '#liable'],
      ['Cbw: 15 Aug 2026', 'flag', 'teal', '#nl'],
      ['DORA: 17 Jan 2025', 'landmark', 'teal', '#dora'],
    ], [
      ['the management body, not only IT', 'muted', 'management'],
      ['banks, insurers, investment firms', 'muted', 'insurers'],
      ['delegating the work: allowed', 'muted', 'allowed'],
      ['delegating the responsibility: not', 'yellow', 'responsibility'],
    ]);
  },

  clock(s) {
    surprise(s, 2, 'Reporting runs on a clock', [
      ['Early warning: 24 hours', 'alarm-clock', 'red', '#early'],
      ['Notification: 72 hours', 'siren', 'red', '#note'],
      ['Final report: 1 month', 'file-check', 'blue', '#final'],
    ], [
      ['NIS2, counted from becoming aware', 'muted', '#early'],
      ['DORA: initial notification, financial entities', 'yellow', '#dora2'],
      ['within 4 hours of classifying it as major', 'yellow', 'classifying'],
    ]);
  },

  suppliers(s) {
    surprise(s, 3, 'Suppliers are your duty', [
      ['Know them, assess risk', 'list-checks', 'blue', '#know'],
      ['Contract obligations', 'file-text', 'blue', '#contract'],
      ['Exit plan (DORA)', 'door-open', 'teal', '#exit'],
    ], [
      ['"it was the supplier" explains, it does not excuse', 'yellow', '#excuse'],
    ]);
  },

  prove(s) {
    surprise(s, 4, 'Prove it, do not assume it', [
      ['Board training', 'graduation-cap', 'blue', '#train'],
      ['Restore, incident tests', 'flask-conical', 'blue', '#test'],
      ['Threat-led testing', 'target', 'teal', '#tl'],
    ], [
      ['a policy document is not evidence', 'yellow', '#policy'],
      ['threat-led testing: financial entities under DORA', 'muted', '#tl'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    [['Named owner', 'user-check', 'one executive, by name', '#own'], ['Risk framework', 'file-check', 'written, dated, approved', '#frame'], ['Reporting drill', 'timer', 'rehearsed against the clock', '#drill'], ['Supplier register', 'list-checks', 'clauses and exit plans', '#reg'], ['Evidence', 'archive', 'minutes, tests, training', '#ev']].forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    [['Who owns it, by name?', 'user-check', '#q1'], ['When did we last see evidence?', 'file-check', '#q2'], ['Which regime applies? Ask legal', 'scale', '#legal']].forEach(([t, icon, at], i) => {
      s.box(t, { x: s.cx, y: s.H * (0.3 + i * 0.17), size: u * 2.4, icon, color: 'teal', at });
    });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Compliance is the floor.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.subtitle('name the owner, ask for evidence', { id: 'r', y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'floor' });
  },
};

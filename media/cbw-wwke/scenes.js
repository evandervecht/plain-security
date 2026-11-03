// Facts from the cbw-wwke briefing (English) only.
// Step scenes share one layout: header, a row of boxes at 38% height, notes below.
function step(s, n, title, items, notes, arrows = true) {
  const u = s.W / 100;
  const xs = s.row(items.length, { width: s.safe.w * (items.length > 3 ? 0.74 : 0.62) });
  s.text(`STEP ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  items.forEach(([label, icon, color, at], i) => {
    s.box(label, { id: `b${i}`, x: xs[i], y: s.H * 0.38, size: u * 2.2, icon, color, at });
    if (arrows && i) s.arrow(`b${i - 1}`, `b${i}`, { color: 'muted', at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.58 + i * (notes.length > 4 ? 0.055 : 0.065)), size: u * 2.1, color, at }));
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('scale', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Cbw and Wwke', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('one date, two kinds of resilience', { y: s.cy + u * 11, color: 'muted', at: '#date' });
  },

  scope(s) {
    step(s, 1, 'Which law applies to us?', [
      ['Cbw: about 8,000', 'shield', 'blue', '#cbw'],
      ['Wwke: about 500', 'building-2', 'teal', '#wwke'],
    ], [
      ['cyber: you assess yourself', 'muted', 'systems'],
      ['buildings, people, recovery', 'muted', 'buildings'],
      ['only if the minister designates you', 'muted', 'only'],
      ['critical under the Wwke', 'yellow', '#link'],
      ['= essential under the Cbw', 'yellow', 'essential'],
      ['not the reverse', 'yellow', 'reverse'],
    ], false);
  },

  building(s) {
    step(s, 2, 'The Wwke adds the building', [
      ['Flood, fire, sabotage', 'flame', 'red', '#flood'],
      ['Risk assessment: 9 months', 'clipboard-check', 'blue', '#months'],
      ['Measures: 10 months', 'shield-check', 'blue', 'ten'],
    ], [
      ['a supplier that stops delivering', 'muted', 'supplier'],
      ['from the date of designation', 'muted', 'designation'],
      ['background checks for critical roles', 'yellow', '#staff'],
    ]);
  },

  clocks(s) {
    step(s, 3, 'Two clocks', [
      ['Wwke: 24 hours', 'building-2', 'red', '#wwke24'],
      ['Cbw: 24 h, 72 h, 1 month', 'shield', 'red', '#cbw24'],
    ], [
      ['Wwke: competent authority for your sector', 'muted', 'authority'],
      ['Cbw: early warning first', 'muted', 'early'],
      ['then notification, then final report', 'muted', 'notification'],
      ['one incident can start both clocks', 'yellow', '#fire'],
    ], false);
  },

  gap(s) {
    step(s, 4, 'The gap between two programmes', [
      ['Cyber', 'shield', 'blue', '#two'],
      ['Physical', 'building-2', 'blue', 'half'],
      ['Gap nobody owns', 'circle-help', 'red', '#cost'],
    ], [
      ['two programmes cost more', 'muted', 'cost'],
      ['we suggest one board decision', 'yellow', '#one'],
    ], false);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    [['One owner', 'user-check', 'resilience, cyber and physical', '#own'], ['One risk assessment', 'clipboard-check', 'per essential service', '#risk'], ['One incident process', 'timer', 'two report templates', '#drill'], ['One evidence file', 'archive', 'for both supervisors', '#evid']].forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.18, at });
    });
    s.text('Cbw: board approves the measures and follows training', { id: 'cbw', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#law' });
    s.annotate('cbw', { type: 'underline', color: 'teal', at: 'training' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    [['Legal settles scope now', 'scale', '#scope'], ['Date and sign one decision', 'file-check', '#sign']].forEach(([t, icon, at], i) => {
      s.box(t, { x: s.cx, y: s.H * (0.34 + i * 0.2), size: u * 2.6, icon, color: 'teal', at });
    });
    s.text('before a designation letter arrives', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: 'letter' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Decide once.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.subtitle('and name the owner', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'once' });
  },
};

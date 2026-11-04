// Facts from the board-as-target briefing (English) only.
// Route scenes share one layout: header, a row of boxes at 38% height, notes below.
function route(s, n, title, items, notes, arrows = true) {
  const u = s.W / 100;
  const xs = s.row(items.length, { width: s.safe.w * (items.length > 3 ? 0.74 : 0.62) });
  s.text(`ROUTE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('crosshair', { y: s.cy - u * 9, size: u * 9, color: 'red', at: 0.3 });
    s.title('You are the target', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four routes in', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  home(s) {
    route(s, 1, 'The company is defended. Home is not.', [
      ['Work laptop: protected', 'laptop', 'teal', '#work'],
      ['Private mail, phone, tablet', 'smartphone', 'red', '#private'],
    ], [
      ['NCSC UK guidance', 'muted', '#ncsc'],
      ['for high-risk individuals', 'muted', 'individuals'],
      ['personal accounts are the easier door', 'yellow', 'easier'],
      ['strongest mail protection, free', 'muted', '#set'],
      ['Lockdown Mode on an iPhone', 'muted', 'Lockdown'],
    ], false);
  },

  voice(s) {
    route(s, 2, 'Your voice and face are public', [
      ['Keynote, podcast', 'mic', 'blue', '#keynote'],
      ['Deepfake video call', 'video', 'red', '#arup'],
      ['HK$200 million paid', 'banknote', 'red', 'participant'],
    ], [
      ['a few minutes of audio', 'muted', 'minutes'],
      ['Arup, Hong Kong, January 2024', 'muted', 'Hong'],
      ['no system hacked, only authority', 'yellow', '#nohack'],
    ]);
  },

  pack(s) {
    route(s, 3, 'The board pack', [
      ['One PDF, ten people', 'file-text', 'blue', '#pdf'],
      ['Private mail, print, tablet', 'mail', 'red', '#leak'],
      ['Privacy incident', 'siren', 'red', '#privacy'],
    ], [
      ['strategy, results, legal disputes', 'muted', 'strategy'],
      ['the leak rarely comes from the portal', 'yellow', 'rarely'],
      ['forwarded to a private mailbox', 'muted', 'forwarded'],
      ['printed for the train, on the family tablet', 'muted', 'printed'],
      ['personal data: 72-hour notification', 'yellow', 'personal'],
    ]);
  },

  road(s) {
    route(s, 4, 'On the road, the phone is the company', [
      ['Border: inspected', 'plane', 'red', '#border'],
      ['Hotel safe', 'lock-open', 'red', '#safe'],
      ['Loaner phone, laptop', 'smartphone', 'teal', '#aivd'],
    ], [
      ['the phone is the company', 'muted', '#phone'],
      ['mail, board pack, banking', 'muted', 'mail'],
      ['AIVD: temporary devices for espionage-risk countries', 'yellow', 'espionage'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    [['Private mail', 'shield-check', 'strongest protection, set up by the company', '#set2'], ['Call-back rule', 'phone-call', 'no money on a call alone', '#call'], ['Pack in the portal', 'lock', 'on a managed device', '#portal'], ['Travel kit', 'briefcase', 'loaner device, high-risk countries', '#kit']].forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.18, at });
    });
    s.text('NCSC UK: guidance for high-risk individuals', { id: 'ncsc', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#ncsc2' });
    s.annotate('ncsc', { type: 'underline', color: 'teal', at: 'guidance' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Strongest mail protection', { x: s.cx, y: s.H * 0.34, size: u * 2.4, icon: 'shield-check', color: 'teal', at: '#ask' });
    s.text('set up by the company, for each household', { y: s.H * 0.47, size: u * 2.1, color: 'muted', at: 'household' });
    s.box('Call back on a known number', { x: s.cx, y: s.H * 0.64, size: u * 2.4, icon: 'phone-call', color: 'teal', at: '#rule' });
    s.text('before any money moves', { y: s.H * 0.77, size: u * 2.1, color: 'muted', at: 'money' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('You are the target.', { id: 't', y: s.cy - u * 6, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'target' });
    const xs = s.row(3, { width: s.safe.w * 0.5 });
    [['A setting', 'settings', 'setting'], ['A rule', 'scroll-text', 'rule'], ['A kit', 'briefcase', 'kit']].forEach(([t, icon, at], i) => {
      s.box(t, { x: xs[i], y: s.cy + u * 4, size: u * 2.4, icon, color: 'teal', at });
    });
    s.subtitle('close most routes', { y: s.cy + u * 12, color: 'muted', at: '#keep' });
  },
};

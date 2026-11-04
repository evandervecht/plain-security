// Facts from the shadow-it briefing (English) only.
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
    s.icon('ghost', { y: s.cy - u * 9, size: u * 9, color: 'purple', at: 0.3 });
    s.title('Shadow IT', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('the data you don\u2019t know you have', { y: s.cy + u * 11, color: 'muted', at: '#gap' });
  },

  signup(s) {
    page(s, 'WAY 1 OF 4', 'A team signs up with a credit card', [
      ['Sales team', 'credit-card', 'blue', '#card', 'signs up, uploads the customer list'],
      ['Unknown SaaS', 'cloud', 'red', '#card', 'no contract, no review'],
      ['IT', 'shield', 'gray', '#ask', 'never asked, never heard of it'],
    ], [
      ['customer data with a supplier we have no contract with', 'yellow', '#none'],
      ['GDPR: we are still responsible', 'red', '#gdpr'],
    ]);
  },

  personal(s) {
    page(s, 'WAY 2 OF 4', 'Work happens on personal accounts', [
      ['Home laptop', 'laptop', 'blue', '#deck', 'key deck, late at night'],
      ['Personal mailbox', 'mail', 'orange', '#deck', 'contract forwarded'],
      ['Company data', 'files', 'red', '#none', 'outside our reach'],
    ], [
      ['no second factor, no backup, no wipe', 'yellow', '#none'],
      ['when the person leaves, the data leaves too', 'red', '#leave'],
    ]);
  },

  forgotten(s) {
    page(s, 'WAY 3 OF 4', 'The subscription nobody remembers', [
      ['Old pilot', 'archive-x', 'gray', '#pilot', 'still holds the data'],
      ['Still billing', 'credit-card', 'orange', '#bill', 'every month'],
      ['Admin who left', 'user-x', 'red', '#admin', 'two years ago'],
    ], [
      ['nobody owns it, so nobody secures it', 'yellow', '#admin'],
    ]);
  },

  consent(s) {
    page(s, 'WAY 4 OF 4', 'One click hands an app the mailbox keys', [
      ['Scheduling app', 'puzzle', 'orange', '#allow', 'calendar, all mail, all files'],
      ['Allow', 'mouse-pointer-click', 'red', '#click', 'one click'],
      ['Company mailbox', 'mail', 'blue', '#click', ''],
    ], [
      ['survives a password reset', 'yellow', '#survive'],
      ['not stopped by the second factor', 'red', 'stopped'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    const c = [['Single sign-on', 'log-in', 'the company login is the only door', '#sso'], ['Discovery', 'search', 'expense reports, login logs', '#disc'], ['Admin consent', 'user-check', 'no self-service mail access', '#consent']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.3, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.8, color: 'muted', maxWidth: s.safe.w * 0.24, at });
    });
    s.text('NIS2: inventory of assets and suppliers, supply chain security', { id: 'nis', y: s.H * 0.7, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'chain' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Tools holding our data', { x: xs[0], y: s.H * 0.36, size: u * 2.6, icon: 'layers', color: 'blue', at: '#count' });
    s.box('Tools IT can name', { x: xs[1], y: s.H * 0.36, size: u * 2.6, icon: 'tag', color: 'teal', at: '#name' });
    s.box('Supplier register, an owner for each', { x: s.cx, y: s.H * 0.62, size: u * 2.4, icon: 'book-user', color: 'teal', at: '#reg' });
    s.text('no owner, no tool', { y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: '#rule' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Bring it back into view.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'view' });
    s.subtitle('you cannot protect data you do not know you have', { y: s.cy + u * 6, color: 'muted', at: 0.8 });
  },
};

// Facts from the data briefing (English) only.
// Risk scenes share one layout: a chain of three boxes, then short lines below.
function risk(s, n, title, chain) {
  const u = s.W / 100;
  const y = s.H * 0.36;
  const xs = s.row(3, { width: s.safe.w * 0.7 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  chain.forEach(([label, icon, color, at], i) => {
    s.box(label, { id: `c${i}`, x: xs[i], y, size: u * 2.4, icon, color, at });
    if (i) s.arrow(`c${i - 1}`, `c${i}`, { color: i === 2 ? 'red' : undefined, at });
  });
  return u;
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('database', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Knowing what to protect', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways we lose track', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  crown(s) {
    const u = risk(s, 1, 'Nobody can name the crown jewels', [['Canteen menu', 'utensils', 'blue', 0.4], ['Same permissions', 'lock', 'yellow', '#same'], ['M&A data room', 'handshake', 'red', 'room']]);
    s.text('equal protection: the average for everything', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#thin' });
    s.text('five datasets', { y: s.H * 0.70, size: u * 2.1, color: 'teal', at: 'datasets' });
    s.text('each with an owner', { y: s.H * 0.78, size: u * 2.1, color: 'teal', at: 'owner' });
    s.text('it changes every decision after it', { y: s.H * 0.86, size: u * 2.1, color: 'muted', at: 'decision' });
  },

  sprawl(s) {
    const u = risk(s, 2, 'One file, forty copies', [['CRM', 'database', 'blue', 0.4], ['Exports, mailboxes, backups', 'copy', 'yellow', '#copies'], ['Test system, real data', 'flask-conical', 'red', '#test']]);
    s.text('1 system secured, 40 copies not', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#one' });
  },

  sharing(s) {
    const u = risk(s, 3, 'Shared with anyone with the link', [['Shared folder', 'folder', 'blue', 0.4], ['Anyone with the link', 'link', 'yellow', '#click'], ['One phished account', 'hat-glasses', 'red', '#phish']]);
    s.text('sharing is one click, nobody revisits it', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'revisits' });
    s.text('internal by default, links that expire', { y: s.H * 0.70, size: u * 2.1, color: 'teal', at: '#default' });
  },

  retention(s) {
    const u = risk(s, 4, 'Kept for fifteen years, needed for two', [['Archive since 2011', 'archive', 'blue', 0.4], ['Nothing deleted', 'trash', 'yellow', '#never'], ['All of it leaks', 'triangle-alert', 'red', '#leak']]);
    s.text('keeping it too long is itself a GDPR violation', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#gdpr' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['Labels + owners', 'tag', 'teal', '#class'], ['Sharing defaults', 'share-2', 'teal', '#share'], ['No prod in test', 'flask-conical', 'teal', '#test'], ['Retention schedule', 'calendar-x', 'teal', '#ret']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color, at }));
    s.text('GDPR Art. 5: limited storage. Art. 30: a record of what we hold', { id: 'g', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#gdpr2' });
    s.annotate('g', { type: 'underline', color: 'teal', at: 'record' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('One page', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'file-text', color: 'teal', at: '#ask' });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    [['Five datasets, each with an owner', '#five'], ['Where each lives', 'lives'], ['When it is deleted', '#del']].forEach(([t, at], i) => s.text(t, { x: xs[i], y: s.H * 0.5, size: u * 2.1, color: 'yellow', maxWidth: s.safe.w * 0.22, at }));
    s.text('no page = that is the finding', { y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#none' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways we lose track.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'track' });
    s.subtitle('you cannot protect what you cannot name', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

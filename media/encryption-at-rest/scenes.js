// Facts from the encryption at rest briefing (English) only.
// Content scenes: kicker + title on top, a row of boxes at 40%, notes below, one yellow line at 78-80%.
function head(s, kicker, title) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return u;
}
const row3 = (s) => s.row(3, { width: s.safe.w * 0.7 });
const row2 = (s) => s.row(2, { width: s.safe.w * 0.5 });

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('lock', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Encrypted at rest', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('so who can still read it?', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  login(s) {
    const u = head(s, 'QUESTION 1 OF 4', 'Locked on the disk, open at login');
    const xs = row2(s);
    const y = s.H * 0.4;
    s.box('Disk stolen', { id: 'd', x: xs[0], y, size: u * 2.4, icon: 'hard-drive', color: 'blue', at: '#disk' });
    s.box('Login stolen', { id: 'l', x: xs[1], y, size: u * 2.4, icon: 'key-round', color: 'red', at: '#login' });
    s.text('nothing readable', { x: xs[0], y: s.H * 0.57, size: u * 2.1, color: 'teal', at: 'readable' });
    s.text('everything in plain text', { x: xs[1], y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: 'plain' });
    s.text('"Encrypted at rest" answers the disk question, not the login question', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#q' });
  },

  keys(s) {
    const u = head(s, 'QUESTION 2 OF 4', 'Whoever holds the key holds the data');
    const xs = row3(s);
    const y = s.H * 0.4;
    const c = [['Key beside the data', 'database', 'one theft gets both', 'red', '#taped'], ['Provider-managed key', 'cloud', 'admin rights in our account can use it', 'blue', '#admin'], ['Our own key', 'key-round', 'different people manage keys and data', 'teal', '#kms']];
    c.forEach(([t, icon, n, color, at]) => {
      const i = c.findIndex((r) => r[0] === t);
      s.box(t, { x: xs[i], y, size: u * 2.2, icon, color, maxWidth: s.safe.w * 0.22, at });
      s.text(n, { x: xs[i], y: s.H * 0.6, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    });
    s.text('Lose the key, and we lose the data too', { y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: '#lose' });
  },

  copies(s) {
    const u = head(s, 'QUESTION 3 OF 4', 'The copy nobody encrypted');
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const y = s.H * 0.4;
    const c = [['Database', 'database', 'teal', '#sys'], ['Export', 'file-text', 'red', 'nightly'], ['USB stick', 'usb', 'red', 'stick'], ['Old laptop', 'laptop', 'red', 'laptop'], ['Test copy', 'flask-conical', 'red', 'test']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y, size: u * 1.9, icon, color, at }));
    s.text('encrypted', { x: xs[0], y: s.H * 0.55, size: u * 1.7, color: 'teal', at: '#sys' });
    s.text('may not be', { x: (xs[1] + xs[4]) / 2, y: s.H * 0.55, size: u * 1.7, color: 'yellow', at: 'may' });
    s.text('One readable copy is enough', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#one' });
  },

  quantum(s) {
    const u = head(s, 'QUESTION 4 OF 4', 'The quantum question');
    const xs = row2(s);
    const y = s.H * 0.4;
    s.box('AES-256', { x: xs[0], y, size: u * 2.4, icon: 'database', color: 'teal', at: '#aes' });
    s.box('RSA, ECC', { x: xs[1], y, size: u * 2.4, icon: 'key-round', color: 'red', at: '#pk' });
    s.text('stored data: not the weak spot', { x: xs[0], y: s.H * 0.57, size: u * 1.8, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#aes' });
    s.text('public-key encryption: a large quantum computer would break it', { x: xs[1], y: s.H * 0.57, size: u * 1.8, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#pk' });
    s.text('Recorded traffic · archives encrypted to a public key', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#where' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Access first', 'shield-check', 'multi-factor, least privilege, alerts on bulk reading', '#access'], ['Keys apart', 'key-round', 'every use logged', '#apart'], ['Coverage', 'search-check', 'checked per location', '#cov'], ['DORA RTS', 'landmark', 'Art. 6 and 7: encryption policy, key lifecycle', '#dora']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.17, at });
    });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = row3(s);
    s.box('Who can read it while it runs?', { x: xs[0], y: s.H * 0.38, size: u * 1.9, icon: 'eye', color: 'blue', maxWidth: s.safe.w * 0.22, at: '#who' });
    s.box('Where are the keys?', { x: xs[1], y: s.H * 0.38, size: u * 1.9, icon: 'key-round', color: 'blue', maxWidth: s.safe.w * 0.22, at: '#keys2' });
    s.box('Which copies are not encrypted?', { x: xs[2], y: s.H * 0.38, size: u * 1.9, icon: 'file-text', color: 'teal', maxWidth: s.safe.w * 0.22, at: '#copies2' });
    s.text('three questions', { y: s.H * 0.62, size: u * 2.1, color: 'yellow', at: '#ask' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Not "is it encrypted?"', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'wrong' });
    s.subtitle('ask who can read it', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

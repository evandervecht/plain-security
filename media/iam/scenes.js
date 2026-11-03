// Facts from the IAM briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row, lines of text below.
function risk(s, n, title) {
  const u = s.W / 100;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return { u, xs, y: s.H * 0.38 };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('id-card', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('IAM', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('who may do what, and who checks: four ways it goes wrong', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  orphans(s) {
    const { u, xs, y } = risk(s, 1, 'The account nobody owns');
    s.box('Service account', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'cog', color: 'blue', at: '#most' });
    s.box('Nobody owns it', { id: 'o', x: xs[2], y, size: u * 2.4, icon: 'user-x', color: 'red', at: '#left' });
    s.arrow('a', 'o', { label: 'creator left, password never changes', labelFont: 'body', labelSize: u * 1.6, at: '#left' });
    s.text('most identities are not people: accounts, keys, scripts', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#most' });
    s.text('rights set generously, once', { y: s.H * 0.67, size: u * 2.1, color: 'yellow', at: '#rights' });
    s.text('nobody notices when one is abused', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#abuse' });
  },

  wildcards(s) {
    const { u, xs, y } = risk(s, 2, 'Roles designed too wide');
    s.box('Developer role', { id: 'r', x: xs[0], y, size: u * 2.4, icon: 'code', color: 'blue', at: '#star' });
    s.box('Every database', { id: 'd', x: xs[2], y, size: u * 2.4, icon: 'database', color: 'red', at: '#estate' });
    s.arrow('r', 'd', { label: '"Resource": "*"', labelFont: 'mono', labelSize: u * 1.6, at: '#star' });
    s.text('a wildcard, because the precise list was long', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#star' });
    s.text('role copied to the next team', { y: s.H * 0.66, size: u * 2.1, color: 'muted', at: '#copy' });
    s.text('one phished laptop = the entire data estate', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#estate' });
  },

  hats(s) {
    const { u, xs, y } = risk(s, 3, 'One person, both signatures');
    s.box('Create vendor', { id: 'v', x: xs[0], y, size: u * 2.4, icon: 'receipt-text', color: 'blue', at: '#vendor' });
    s.box('Release payment', { id: 'p', x: xs[2], y, size: u * 2.4, icon: 'banknote', color: 'blue', at: '#pay' });
    s.box('One account', { id: 'a', x: xs[1], y: s.H * 0.58, size: u * 2.4, icon: 'user-round', color: 'red', at: '#both' });
    s.arrow('a', 'v', { dashed: true, color: 'red', at: '#both' });
    s.arrow('a', 'p', { dashed: true, color: 'red', at: '#both' });
    s.text('each right is fine alone, dangerous together', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: '#both' });
    s.text('logged, and looks legitimate', { y: s.H * 0.83, size: u * 2.1, color: 'muted', at: '#log' });
  },

  shared(s) {
    const { u, xs, y } = risk(s, 4, 'The login everybody shares');
    s.box('Team of four', { id: 't', x: xs[0], y, size: u * 2.4, icon: 'users', color: 'blue', at: '#four2' });
    s.box('One admin login', { id: 'a', x: xs[2], y, size: u * 2.4, icon: 'key-round', color: 'red', at: '#four2' });
    s.arrow('t', 'a', { label: 'password in a spreadsheet', labelFont: 'body', labelSize: u * 1.6, at: '#sheet' });
    s.text('nobody changes it', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: 'changes' });
    s.text('the log says "admin" did it', { y: s.H * 0.66, size: u * 2.1, color: 'muted', at: '#who' });
    s.text("last summer's intern can still log in", { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#leaver' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['Inventory', 'clipboard-list', 'a named owner each', '#inv'], ['Vault', 'vault', 'holds the secrets', '#vault'], ['Narrow roles', 'scan-line', 'no wildcards', '#least'], ['SoD matrix', 'split', 'rights not combined', '#sod'], ['PAM', 'key-round', 'checked out per task', '#pam']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('business owners, not IT, confirm access every quarter', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cert' });
    s.text('NIS2 Art. 21: access control policies', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'Article' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Who owns the list of who may do what?', { x: s.cx, y: s.H * 0.34, size: u * 2.6, icon: 'list-checks', color: 'teal', at: '#ask' });
    s.box('When did a business owner last sign it off?', { x: s.cx, y: s.H * 0.52, size: u * 2.6, icon: 'pen-line', color: 'teal', at: '#when' });
    s.text('a shrug: rights are whatever they have grown into', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#shrug' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways rights go wrong.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'rights' });
    s.subtitle('name an owner, have the business sign it off', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

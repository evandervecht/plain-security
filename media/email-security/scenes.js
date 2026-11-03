// Facts from the email-security briefing (English) only.
// Risk scenes share one layout: the two mail servers on a row, the attacker below the line.
function risk(s, n, title, { left, right, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: 'server', color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: 'server', color: 'blue', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  s.box(atk, { id: 'a', x: xs[1], y: s.H * 0.54, size: u * 2.4, icon: atkIcon, color: 'red', at: atkAt });
  s.arrow('a', { x: xs[1], y: y + u * 1.2 }, { dashed: true, color: 'red', at: atkAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('mail', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Email security', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways it breaks', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  listen(s) {
    const { u } = risk(s, 1, 'Someone listens in', { left: 'Our server', right: 'Their server', atk: 'Listener', atkIcon: 'eye', atkAt: '#plain', lineAt: '#hop', lineLabel: 'several networks' });
    s.text('plaintext hop = readable by whoever sits there', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#plain' });
    s.text('no alert fires, can go unnoticed for years', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#quiet' });
  },

  rewrite(s) {
    const { u, xs } = risk(s, 2, 'Someone rewrites the message', { left: 'Supplier', right: 'Finance', atk: 'Hacked mailbox', atkIcon: 'pencil-line', atkAt: '#iban', lineAt: '#iban', lineLabel: 'invoice' });
    s.text('one bank account number changed', { y: s.H * 0.80, size: u * 2.1, color: 'yellow', at: '#iban' });
    s.text('looks like a normal thread, found weeks later', { y: s.H * 0.86, size: u * 2.1, color: 'muted', at: '#late' });
    s.box('Call-back', { x: xs[2], y: s.H * 0.54, size: u * 2.1, icon: 'phone-call', color: 'teal', at: '#call' });
    s.text('confirm by phone, on a number you already have', { x: xs[2], y: s.H * 0.71, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: s.cue('number', 2) });
  },

  pretend(s) {
    const { u, xs } = risk(s, 3, 'Someone pretends to be us', { left: 'Our domain', right: 'Customers, staff', atk: 'Stranger', atkIcon: 'hat-glasses', atkAt: 0.6, lineAt: '#from', lineLabel: 'From: our CFO' });
    s.text('nothing in the protocol stops it', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: 'protocol' });
    const items = [['CEO fraud', 'ceo'], ['Customer phishing', 'phishing'], ['Our mail in spam', 'spam']];
    items.forEach(([t, at], i) => s.text(t, { x: xs[i], y: s.H * 0.76, size: u * 2.2, color: 'yellow', at }));
  },

  middle(s) {
    const { u } = risk(s, 4, 'Someone sits in the middle', { left: 'Us', right: 'Partner', atk: 'Relays both sides', atkIcon: 'drama', atkAt: 'optional', lineAt: 0.6, lineLabel: 'encrypted?' });
    s.text('encryption offer stripped', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#strip' });
    s.text('both servers fall back to plaintext', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: 'fall' });
    s.text('reads everything, changes anything', { y: s.H * 0.80, size: u * 2.1, color: 'muted', at: '#both' });
    s.text('"We have encryption" no longer holds', { y: s.H * 0.87, size: u * 2.1, color: 'red', at: '#board' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['SPF', 'list', 'who may send', '#spf'], ['DKIM', 'signature', 'signs each message', 'dkim'], ['DMARC', 'shield-check', 'only reject blocks', '#dmarc'], ['MTA-STS', 'lock', 'encryption mandatory', '#sts'], ['DANE', 'key-round', 'forged cert fails', 'dane']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: i < 3 ? 'teal' : 'blue', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('DNS records and mail server settings: engineering hours', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#dns' });
    s.text('NIS2 Art. 21: cyber hygiene and encryption', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'both' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('DMARC to reject', { id: 'd', x: xs[0], y: s.H * 0.36, size: u * 2.6, icon: 'shield-check', color: 'teal', at: '#ask' });
    s.box('MTA-STS to enforce', { id: 'm', x: xs[1], y: s.H * 0.36, size: u * 2.6, icon: 'lock', color: 'teal', at: '#ask' });
    s.text('monitoring modes: same effort, block nothing', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#modes' });
    s.box('internet.nl: free test', { x: s.cx, y: s.H * 0.72, size: u * 2.4, icon: 'search-check', color: 'blue', at: '#test' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Enforce the records.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'records' });
    s.subtitle('keep the call-back for payments', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

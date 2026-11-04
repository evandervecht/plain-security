// Facts from the expiry briefing (English) only.
// Risk scenes share one layout: the thing we rely on and what it serves on a row, the failure below the line.
function risk(s, n, title, { left, leftIcon, right, rightIcon, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`EXPIRY ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: leftIcon, color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: rightIcon, color: 'blue', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  s.box(atk, { id: 'a', x: xs[1], y: s.H * 0.54, size: u * 2.4, icon: atkIcon, color: 'red', at: atkAt });
  s.arrow('a', { x: xs[1], y: y + u * 1.2 }, { dashed: true, color: 'red', at: atkAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('calendar-clock', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Things that expire', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('domains, DNS and certificates', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  domain(s) {
    const { u } = risk(s, 1, 'The domain', { left: 'Our domain', leftIcon: 'globe', right: 'Email and web', rightIcon: 'mail', atk: 'Renewal fails', atkIcon: 'credit-card', atkAt: '#fail', lineAt: '#rent', lineLabel: 'rented, a year at a time' });
    s.text('card expired, contact mailbox of a leaver', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#fail' });
    s.text('a stranger registers the name, our email goes to them', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#stranger' });
  },

  dns(s) {
    const { u } = risk(s, 2, 'DNS and its signatures', { left: 'One DNS provider', leftIcon: 'book-open', right: 'Web, email, logins', rightIcon: 'server', atk: 'Signature expired', atkIcon: 'file-x', atkAt: '#sig', lineAt: '#one', lineLabel: 'answers for everything' });
    s.text('servers fine, nobody can find them', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#one' });
    s.text('5 May 2026: faulty key rollover, German domains unreachable about 3 hours', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#denic' });
  },

  cert(s) {
    const { u } = risk(s, 3, 'A certificate', { left: 'Browser, system', leftIcon: 'monitor', right: 'Our service', rightIcon: 'server', atk: 'Certificate expired', atkIcon: 'shield-x', atkAt: '#date', lineAt: '#warn', lineLabel: 'refused' });
    s.text('browsers warn, systems refuse each other', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#warn' });
    s.text('2018: Ericsson certificate, networks offline most of a day', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#erics' });
    s.text('internal ones nobody watches', { y: s.H * 0.86, size: u * 2.1, color: 'red', at: '#sunday' });
  },

  short(s) {
    const u = s.W / 100;
    s.text('EXPIRY 4 OF 4', { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
    s.text('Shorter lifetimes', { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.45 });
    s.box('398 days', { id: 'a', x: xs[0], y: s.H * 0.4, size: u * 3, icon: 'calendar', color: 'blue', at: '#days' });
    s.box('47 days', { id: 'b', x: xs[1], y: s.H * 0.4, size: u * 3, icon: 'calendar-clock', color: 'red', at: 'maximum' });
    s.arrow('a', 'b', { label: 'from 15 Mar 2029', labelFont: 'body', labelSize: u * 1.8, at: 'maximum' });
    s.text('industry rule, not a law', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#forum' });
    s.text('renewing by hand will not keep up', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#hand' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.72 });
    const c = [['Expiry inventory', 'list-checks', 'owner by name', '#list'], ['Auto-renew + lock', 'refresh-cw', 'company account', '#auto'], ['Alerts 30 days out', 'bell-ring', 'to a team', '#alert'], ['ACME', 'repeat', 'certificates renew themselves', '#acme']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('NCSC UK guidance: auto-renewal, shared mailbox, two-step verification', { id: 'nc', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#ncsc' });
    s.annotate('nc', { type: 'underline', color: 'teal', at: 'guidance' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('One list of everything', { id: 'a', x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'list-checks', color: 'teal', at: '#make' });
    s.box('Expiry date + owner', { id: 'b', x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'user-check', color: 'teal', at: '#owner' });
    s.arrow('a', 'b', { at: '#owner' });
    s.text('what stops if our busiest link expires tonight?', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#test' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Nobody hacked anything.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'hacked' });
    s.subtitle('a date passed; a name on a list prevents it', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

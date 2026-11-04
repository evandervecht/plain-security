// Facts from the passwords and identity briefing (English) only.
// Risk scenes share one layout: the person or system on the left, the intruder on the right, the control below.
function risk(s, n, title, { left, leftIcon, right = 'Intruder', rightIcon = 'hat-glasses', lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: leftIcon, color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: rightIcon, color: 'red', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('id-card', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Passwords and identity', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('who can get in, and who can do anything', { y: s.cy + u * 11, color: 'muted', at: '#badge' });
  },

  reuse(s) {
    const { u } = risk(s, 1, 'Their breach becomes our break-in', { left: 'Breached webshop', leftIcon: 'shopping-cart', right: 'Our login', rightIcon: 'log-in', lineAt: '#leak', lineLabel: 'leaked password list' });
    s.text('same password, signed in, looks like a colleague', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#same' });
    s.box('Single sign-on with passkeys', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'key-round', color: 'teal', at: '#sso' });
  },

  code(s) {
    const { u } = risk(s, 2, 'The second factor that is not one', { left: 'Employee', leftIcon: 'user', right: 'Caller: "IT here"', lineAt: '#call', lineLabel: 'read me the code' });
    s.text('code read out in one call, second factor passed', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#read' });
    s.box('Passkeys or hardware keys, no SMS, no shared logins', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'key-round', color: 'teal', at: '#keys' });
  },

  leavers(s) {
    const u = s.W / 100;
    s.text('RISK 3 OF 4', { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
    s.text('They left. Their account did not.', { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('4 people left', { x: xs[0], y: s.H * 0.38, size: u * 2.4, icon: 'user-minus', color: 'blue', at: '#six' });
    s.box('4 accounts still work', { x: xs[1], y: s.H * 0.38, size: u * 2.4, icon: 'user-check', color: 'red', at: 'accounts' });
    s.text('six months later, nobody owns them', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#own' });
    s.box('HR-driven joiner, mover, leaver process', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'users', color: 'teal', at: '#hr' });
  },

  admins(s) {
    const u = s.W / 100;
    s.text('RISK 4 OF 4', { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
    s.text('Too many people can do anything', { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('2 admins', { x: xs[0], y: s.H * 0.38, size: u * 2.6, icon: 'user', color: 'blue', at: 0.5 });
    s.box('10 admins', { id: 'ten', x: xs[1], y: s.H * 0.38, size: u * 2.6, icon: 'users', color: 'red', at: '#ten' });
    s.text('last review: never', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: 'never' });
    s.box('Just-in-time admin, quarterly access review', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'clipboard-check', color: 'teal', at: '#jit' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('identity is the perimeter now, not the firewall', { y: s.H * 0.2, size: u * 2.2, color: 'muted', at: '#perim' });
    const qx = s.row(2, { width: s.safe.w * 0.6 });
    s.box('Who can do anything?', { x: qx[0], y: s.H * 0.4, size: u * 2.4, icon: 'users', color: 'teal', at: '#q1' });
    s.box('List last read?', { x: qx[1], y: s.H * 0.4, size: u * 2.4, icon: 'list-checks', color: 'teal', at: '#q2' });
    s.text('longer than a page, or "not sure": that is the finding', { y: s.H * 0.62, size: u * 2.1, color: 'yellow', at: '#finding' });
    s.text('GDPR Art. 33: notify within 72 hours', { id: 'g', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#gdpr' });
    s.annotate('g', { type: 'underline', color: 'teal', at: 'hours' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the CIO and HR for four numbers', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('% of logins through SSO with a passkey', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#a' });
    s.text('accounts active 24 hours after leaving', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: '#b' });
    s.text('standing admin accounts', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#c' });
    s.text('% of rights confirmed last quarter', { y: s.H * 0.71, size: u * 2.1, color: 'yellow', at: 'confirmed' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Identity is the perimeter.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'perimeter' });
    s.subtitle('close the doors, read the list', { y: s.cy + u * 8, color: 'muted', at: '#keep' });
  },
};

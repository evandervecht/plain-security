// Facts from the TLS cipher suites briefing (English) only.
// Risk scenes share one layout: client and server on a row, the weak spot below the line.
function risk(s, n, title, { left = 'Client', right = 'Server', atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 3`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: 'laptop', color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: 'server', color: 'blue', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  s.box(atk, { id: 'a', x: xs[1], y: s.H * 0.54, size: u * 2.4, icon: atkIcon, color: 'red', at: atkAt });
  s.arrow('a', { x: xs[1], y: y + u * 1.2 }, { dashed: true, color: 'red', at: atkAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('lock', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('TLS cipher suites', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('a layer deeper into encryption in transit', { y: s.cy + u * 11, color: 'muted', at: '#suites' });
    s.text('wrong choices = readable by design', { y: s.cy + u * 17, size: u * 2.1, color: 'yellow', at: '#readable' });
  },

  weak(s) {
    const { u } = risk(s, 1, 'Weak cipher suites', { atk: '3DES, CBC suites', atkIcon: 'history', atkAt: '#agreed', lineAt: 0.6, lineLabel: 'TLS 1.3 agreed' });
    s.text('kept "for compatibility"', { y: s.H * 0.65, size: u * 2.1, color: 'yellow', at: '#compat' });
    s.text('invisible in logs', { y: s.H * 0.71, size: u * 2.1, color: 'muted', at: '#log' });
    s.box('AEAD suites only', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#aead' });
  },

  downgrade(s) {
    const { u } = risk(s, 2, 'A downgrade', { left: 'Custom client', atk: 'Falls back to TLS 1.0', atkIcon: 'arrow-down', atkAt: '#retry', lineAt: '#both', lineLabel: 'both support TLS 1.3' });
    s.text('its own retry logic', { y: s.H * 0.65, size: u * 2.1, color: 'yellow', at: '#retry' });
    s.text('silent negotiation, forces a weak protocol', { y: s.H * 0.71, size: u * 2.1, color: 'muted', at: '#silent' });
    s.box('Fail on a weak version, no fallback below TLS 1.2', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#fail' });
  },

  keys(s) {
    const { u } = risk(s, 3, 'The key exchange', { atk: 'Eavesdropper', atkIcon: 'eye', atkAt: '#forward', lineAt: '#static', lineLabel: 'static private key' });
    s.text('no forward secrecy: old traffic can be decrypted', { y: s.H * 0.65, size: u * 2.1, color: 'yellow', at: '#forward' });
    s.text('harvest now, decrypt later', { y: s.H * 0.71, size: u * 2.1, color: 'red', at: '#harvest' });
    s.box('Ephemeral key exchange, hybrid post-quantum', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#ephem' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('not a one-time checklist', { y: s.H * 0.2, size: u * 2.4, color: 'muted', at: '#once' });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    const c = [['Scan continuously', 'search-check', 'configurations drift', '#scan'], ['Owner per red finding', 'user-check', 'not left open', 'owner'], ['Hybrid post-quantum', 'key-round', 'plan for key exchange', '#pq']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.42, size: u * 2.2, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.9, color: 'muted', maxWidth: s.safe.w * 0.3, at });
    });
    s.text('old versions are often a default', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#drift' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the CIO or CISO for four numbers', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('% of systems with only TLS 1.2+ and AEAD', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#a' });
    s.text('systems still accepting TLS 1.0, 1.1 or 3DES', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: '#b' });
    s.text('% of key exchanges with forward secrecy', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#c' });
    s.text('% of connections with hybrid post-quantum', { y: s.H * 0.71, size: u * 2.1, color: 'yellow', at: 'using' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Encryption settings drift.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'drift' });
    s.subtitle('scan continuously, give every finding an owner', { y: s.cy + u * 8, color: 'muted', at: '#keep' });
  },
};

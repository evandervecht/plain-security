// Facts from the auth-protocols briefing (English) only.
// Risk scenes share one layout: header, a row of boxes at 38% height, notes below.
function risk(s, n, title, items, notes, arrows = true) {
  const u = s.W / 100;
  const xs = s.row(items.length, { width: s.safe.w * (items.length > 3 ? 0.74 : 0.62) });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  items.forEach(([label, icon, color, at], i) => {
    s.box(label, { id: `b${i}`, x: xs[i], y: s.H * 0.38, size: u * (items.length > 3 ? 1.8 : 2.2), icon, color, at });
    if (arrows && i) s.arrow(`b${i - 1}`, `b${i}`, { color: 'muted', at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.58 + i * (notes.length > 4 ? 0.055 : 0.065)), size: u * 2.1, color, at }));
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('key-round', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Eight ways to prove who you are', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('and how each one fails', { y: s.cy + u * 11, color: 'muted', at: '#eight' });
  },

  tokens(s) {
    risk(s, 1, 'Tokens and consent', [
      ['App asks for access', 'app-window', 'blue', '#oauth'],
      ['User clicks Allow', 'mouse-pointer-click', 'red', '#consent'],
      ['Token works for anyone', 'key-round', 'red', '#bearer'],
    ], [
      ['OAuth2: access without sharing your password', 'muted', 'password'],
      ['consent is the attack surface', 'yellow', 'broad'],
      ['a stolen refresh token keeps working for weeks', 'yellow', 'weeks'],
    ]);
  },

  legacy(s) {
    risk(s, 2, 'The legacy estate', [
      ['Kerberos, NTLM', 'server', 'blue', '#kerb'],
      ['Cracked, replayed', 'lock-open', 'red', '#roast'],
      ['LDAP, RADIUS', 'wifi', 'red', '#vpn'],
      ['NTLM off by default', 'power-off', 'teal', '#off'],
    ], [
      ['service account passwords cracked, hashes replayed', 'muted', 'offline'],
      ['VPN and Wi-Fi logins', 'muted', 'Wi-Fi'],
      ['a password is often all it takes', 'yellow', 'takes'],
      ['network NTLM off by default (planned)', 'muted', 'default'],
      ['next major Windows Server release', 'muted', 'release'],
    ], false);
  },

  keys(s) {
    risk(s, 3, 'API keys', [
      ['API key', 'key-round', 'blue', '#key'],
      ['Code, tickets, chat', 'message-square', 'red', '#leak'],
      ['Whoever finds it', 'eye', 'red', '#find'],
    ], [
      ['a password with no owner', 'yellow', 'owner'],
      ['rarely expires', 'muted', 'expires'],
      ['works from anywhere until someone rotates it', 'yellow', 'rotates'],
    ]);
  },

  agents(s) {
    risk(s, 4, 'AI agents', [
      ['Agent: credentials, no MFA', 'bot', 'blue', '#agent'],
      ['Injected text', 'file-text', 'red', '#inject'],
      ['Valid token', 'file-check', 'red', '#valid'],
    ], [
      ['not a person', 'muted', 'person'],
      ['a line of text in a document can redirect it', 'yellow', 'redirect'],
      ['every log entry looks legitimate', 'yellow', 'legitimate'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    [['Passkeys', 'fingerprint', 'people: FIDO2, bound to the real domain', '#pass', 'teal'], ['Mutual TLS', 'badge-check', 'services: certificates', '#mtls', 'teal'], ['Agent identity', 'bot', 'one owner, a kill switch', '#agentid', 'teal'], ['Not these', 'ban', 'passwords, SMS codes, static keys', '#pw', 'red']].forEach(([t, icon, n, at, color], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color, at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.18, at });
    });
    s.text('bound to the real domain: a fake site gets nothing', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: 'domain' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Passkeys for administrators', { x: s.cx, y: s.H * 0.34, size: u * 2.4, icon: 'fingerprint', color: 'teal', at: '#admin' });
    s.text('and anyone who can move money', { y: s.H * 0.47, size: u * 2.1, color: 'muted', at: 'money' });
    s.box('Recovery without SMS or helpdesk', { x: s.cx, y: s.H * 0.64, size: u * 2.4, icon: 'life-buoy', color: 'teal', at: '#recov' });
    s.text('not SMS, not a helpdesk call', { y: s.H * 0.77, size: u * 2.1, color: 'yellow', at: 'SMS' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Passwords do not hold up.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.subtitle('passkeys and certificates do', { id: 'r', y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.annotate('r', { type: 'underline', color: 'teal', at: 'certificates' });
  },
};

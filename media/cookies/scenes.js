// Facts from the cookies briefing (English) only.
// Risk scenes share one layout: browser and app on a row, the attacker below the line.
function risk(s, n, title, { left = 'Browser', right = 'Our app', atk, atkIcon, atkAt, lineAt, lineLabel = 'cookie' }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 5`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('cookie', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Cookie hijacking', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('a stolen cookie skips the password', { y: s.cy + u * 11, color: 'muted', at: '#stolen' });
    s.text('multi-factor check already passed', { y: s.cy + u * 17, size: u * 2.1, color: 'yellow', at: '#mfa' });
  },

  xss(s) {
    const { u } = risk(s, 1, 'A script reads the cookie', { atk: 'Injected script', atkIcon: 'code', atkAt: '#xss', lineAt: 0.6 });
    s.text('no HttpOnly flag = readable by JavaScript', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: 'without' });
    s.text('invisible, multi-factor check already passed', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#quiet' });
    s.box('HttpOnly flag', { x: s.cx, y: s.H * 0.88, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#flag' });
  },

  network(s) {
    const { u } = risk(s, 2, 'Someone catches the cookie', { atk: 'Phishing proxy', atkIcon: 'eye', atkAt: '#proxy', lineAt: 0.6 });
    s.text('or plain HTTP, or Wi-Fi sniffing', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#wifi' });
    s.box('Phishing-resistant MFA, Secure flag, HSTS', { x: s.cx, y: s.H * 0.86, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#fix' });
  },

  session(s) {
    const { u } = risk(s, '3 AND 4', 'The session itself is abused', { atk: 'Attacker', atkIcon: 'hat-glasses', atkAt: '#fixation', lineAt: 0.6, lineLabel: 'session ID' });
    s.text('fixation: a weak ID the attacker knew first', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#fixation' });
    s.text('forged request: sent along with a click the user never made', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: '#csrf' });
    s.text('strong randomness, new ID at login, SameSite Lax, CSRF tokens', { y: s.H * 0.86, size: u * 2.1, color: 'teal', at: '#fix2' });
  },

  agent(s) {
    const u = s.W / 100;
    const xs = s.row(3, { width: s.safe.w * 0.62 });
    s.text('RISK 5 OF 5', { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
    s.text('A local AI agent reads the file', { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Coding agent', { id: 'ag', x: xs[0], y: s.H * 0.38, size: u * 2.4, icon: 'bot', color: 'red', at: 0.4 });
    s.box("Browser's profile files", { id: 'f', x: xs[2], y: s.H * 0.38, size: u * 2.4, icon: 'cookie', color: 'blue', at: '#read' });
    s.arrow('ag', 'f', { label: 'direct read', labelFont: 'body', labelSize: u * 1.8, at: '#read' });
    s.text('no JavaScript, no network', { y: s.H * 0.56, size: u * 2.1, color: 'muted', at: '#read' });
    s.text('HttpOnly, Secure, SameSite do not help', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#flags' });
    s.box('Sandboxed agent, device-bound sessions, outbound allowlist', { x: s.cx, y: s.H * 0.8, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#box' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('Defence in depth: several layers', { y: s.H * 0.2, size: u * 2.4, color: 'muted', at: '#layers' });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    const c = [['HttpOnly', 'code', 'stops script theft', '#httponly'], ['Secure', 'lock', 'stops interception', '#secure'], ['SameSite', 'shield-check', 'stops forged requests', '#samesite']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.42, size: u * 2.6, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.9, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    });
    s.text('none alone is enough: the weakest link breaks the chain', { id: 'w', y: s.H * 0.74, size: u * 2.3, color: 'yellow', at: '#weak' });
    s.annotate('w', { type: 'underline', color: 'teal', at: 'chain' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the security lead for five numbers', { id: 'q', x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('% of cookies with HttpOnly and Secure', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#kri' });
    s.text('% of sign-ins with phishing-resistant MFA', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: 'phishingresistant' });
    s.text('open XSS and CSRF findings from testing', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#open' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('A stolen cookie is a stolen identity.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'identity' });
    s.subtitle('layer the controls, track the numbers', { y: s.cy + u * 8, color: 'muted', at: '#keep' });
  },
};

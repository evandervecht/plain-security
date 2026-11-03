// Facts from the phishing briefing (English) only.
// Trick scenes share one layout: the person on the left, the attacker on the right, the control below.
function trick(s, n, title, { left, leftIcon, right = 'Attacker', rightIcon = 'hat-glasses', lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`TRICK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: leftIcon, color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: rightIcon, color: 'red', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('fish', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Phishing', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways a person gets played', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  page(s) {
    const { u } = trick(s, 1, 'A login page that is not ours', { left: 'Employee', leftIcon: 'user', lineAt: '#fake', lineLabel: 'password typed' });
    s.text('then the real site loads, nobody notices', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#real' });
    s.box('Passkeys or hardware keys refuse the wrong site', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'key-round', color: 'teal', at: '#key' });
  },

  code(s) {
    const { u } = trick(s, 2, 'The second factor gets talked out', { left: "Employee's phone", leftIcon: 'smartphone', lineAt: '#push', lineLabel: 'approve sign-in from Amsterdam?' });
    s.text('22:40: the third prompt is approved', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#third' });
    s.box('Phishing-resistant second factor, number matching, prompt limit', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#cap' });
  },

  request(s) {
    const { u } = trick(s, 3, 'A request from the CEO', { left: 'Finance', leftIcon: 'landmark', right: '"The CEO"', lineAt: '#ceo', lineLabel: 'pay 240,000 euros today' });
    s.text('Friday 16:50, gone in hours, no filter catches it', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#gone' });
    s.box('Call-back on a known number, four eyes on bank changes', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'phone-call', color: 'teal', at: '#call' });
  },

  channels(s) {
    const u = s.W / 100;
    s.text('TRICK 4 OF 4', { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
    s.text('Beyond email', { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    [['Text message', 'message-square', 'text'], ['Phone call', 'phone', 'calls'], ['QR code', 'qr-code', 'codes'], ['Chat app', 'messages-square', 'chat']]
      .forEach(([t, icon, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'red', at: at === 'text' ? '#chan' : at }));
    s.text('outside our mail filters, often a private phone', { y: s.H * 0.56, size: u * 2.1, color: 'yellow', at: '#out' });
    s.box('Controls on any channel, a report button people use', { x: s.cx, y: s.H * 0.76, size: u * 2.1, icon: 'flag', color: 'teal', at: '#report' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('someone will click: arithmetic, not a training failure', { y: s.H * 0.2, size: u * 2.2, color: 'muted', at: '#click' });
    s.text('Can one click move our money or open our network?', { id: 'q', y: s.H * 0.38, size: u * 2.6, color: 'yellow', at: '#q' });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Passkey', { x: xs[0], y: s.H * 0.62, size: u * 2.6, icon: 'key-round', color: 'teal', at: '#fixes' });
    s.box('Call-back procedure', { x: xs[1], y: s.H * 0.62, size: u * 2.6, icon: 'phone-call', color: 'teal', at: '#fixes' });
    s.text('not another awareness poster', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: 'poster' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the CFO and CIO for four numbers', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('report rate within one hour of a simulation', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#a' });
    s.text('click rate, as a trend not a verdict', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: 'click' });
    s.text('% of staff on phishing-resistant second factor', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#b' });
    s.text('% of payments verified by call-back', { y: s.H * 0.71, size: u * 2.1, color: 'yellow', at: '#c' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('One click should not move money.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'money' });
    s.subtitle('passkeys, and a call-back', { y: s.cy + u * 8, color: 'muted', at: '#keep' });
  },
};

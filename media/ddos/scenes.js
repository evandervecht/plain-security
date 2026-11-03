// Facts from the DDoS briefing (English) only.
// Risk scenes share one layout: attacker target row, the pressure point below the line.
function risk(s, n, title, { left, leftIcon, right, rightIcon, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`WAY ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('wifi-off', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('DDoS', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('offline without a break-in', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  flood(s) {
    const { u } = risk(s, 1, 'The pipe fills up', { left: 'Customers', leftIcon: 'shopping-cart', right: 'Our connection', rightIcon: 'globe', atk: 'Hijacked devices', atkIcon: 'bot', atkAt: '#crowd', lineAt: 0.6, lineLabel: 'blocked' });
    s.text('fixed-size line, full of junk', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#full' });
    s.text('only bigger capacity in front of us absorbs it', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#only' });
  },

  exhaust(s) {
    const { u } = risk(s, 2, 'Expensive requests', { left: 'Bots', leftIcon: 'bot', right: 'Our web servers', rightIcon: 'server', atk: 'Search, login, reset', atkIcon: 'search', atkAt: '#bots', lineAt: '#bots', lineLabel: 'looks legitimate' });
    s.text('up on every dashboard, unusable for customers', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#up' });
    s.text('cap the expensive actions, not more servers', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#cap' });
  },

  dns(s) {
    const { u } = risk(s, 3, 'One address book for everything', { left: 'Customers', leftIcon: 'users', right: 'Website, email, app', rightIcon: 'globe', atk: 'One DNS provider', atkIcon: 'book-open', atkAt: '#dns', lineAt: '#dns', lineLabel: 'where are you?' });
    s.text('provider down, everything unreachable at once', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#all' });
    s.text('rarely on the risk register', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#reg' });
  },

  timed(s) {
    const { u } = risk(s, 4, 'Timed for our busiest day', { left: 'Attacker', leftIcon: 'drama', right: 'Our board', rightIcon: 'users', atk: 'Peak day', atkIcon: 'calendar-clock', atkAt: '#peak', lineAt: '#demo', lineLabel: 'pay, or it continues' });
    s.text('short demo attack, then a demand', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#demo' });
    s.text('paying proves we pay, invites the next one', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#pays' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.72 });
    const c = [['CDN + scrubbing', 'cloud', 'in front of all public services', '#cdn'], ['Two DNS providers', 'book-copy', 'one goes dark, we stay found', '#dns2'], ['Rate limits, bot tools', 'gauge', 'protect expensive pages', '#rate'], ['Failover + runbook', 'life-buoy', 'tested, not assumed', '#fail']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('NIS2: business continuity and crisis management', { id: 'nis', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'crisis' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Cost of one hour offline?', { id: 'c', x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'clock', color: 'teal', at: '#cost' });
    s.box('Who switches it on?', { id: 'w', x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'user-check', color: 'teal', at: '#who' });
    s.text('longer than a minute to answer = the gap', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#minute' });
    s.box('Decide in advance: we do not pay', { x: s.cx, y: s.H * 0.74, size: u * 2.2, icon: 'ban', color: 'blue', at: '#nopay' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Availability is revenue per hour.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'revenue' });
    s.subtitle('capacity in front of us', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.subtitle('decide before the demand arrives', { y: s.cy + u * 11, color: 'muted', at: 'decide' });
  },
};

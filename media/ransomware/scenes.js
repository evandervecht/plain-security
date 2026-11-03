// Facts from the ransomware briefing (English) only.
// Step scenes share one layout: two parties on a row, the weak spot below the line.
function step(s, n, title, { left, right, leftIcon = 'laptop', rightIcon = 'server', atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`STEP ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('lock-keyhole', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Ransomware', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four steps to a standstill', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  entry(s) {
    const { u } = step(s, 1, 'Someone walks in the front door', { left: 'Attacker', leftIcon: 'hat-glasses', right: 'Our network', atk: 'Unpatched edge device', atkIcon: 'router', atkAt: 'edge', lineAt: '#vpn', lineLabel: 'VPN, no second factor' });
    s.text('signed in like an employee, no alarm', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#quiet' });
    s.box('Phishing-resistant second factor, small patched edge', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#fix' });
  },

  spread(s) {
    const { u } = step(s, 2, 'One laptop becomes the company', { left: 'One laptop', right: 'Whole company', rightIcon: 'building-2', atk: 'Domain admin', atkIcon: 'key-round', atkAt: '#flat', lineAt: 0.6, lineLabel: 'flat network' });
    s.text('shared admin, everything reachable', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#all' });
    s.box('Segmentation, tiered admin, endpoint detection', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#seg' });
  },

  steal(s) {
    const { u } = step(s, 3, 'They copy everything first', { left: 'Our file servers', right: "Attacker's server", atk: 'Leak site', atkIcon: 'globe', atkAt: '#leak', lineAt: '#copy', lineLabel: 'the night before' });
    s.text('"pay, or we publish"', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#leak' });
    s.text('a data breach, not just downtime', { y: s.H * 0.72, size: u * 2.1, color: 'red', at: '#breach' });
    s.box('Egress monitoring, least-privilege data access', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#egress' });
  },

  backups(s) {
    const { u, xs } = step(s, 4, 'The backups go first', { left: 'Domain admin', leftIcon: 'key-round', right: 'Online backup', rightIcon: 'database', atk: 'Ransom demanded', atkIcon: 'octagon-alert', atkAt: '#ransom', lineAt: '#friday', lineLabel: 'deleted, Friday 02:00' });
    s.box('Immutable offline copy', { x: xs[2], y: s.H * 0.54, size: u * 2.1, icon: 'hard-drive', color: 'teal', at: '#immutable' });
    s.text('plus a tested full restore', { y: s.H * 0.72, size: u * 2.1, color: 'muted', at: 'restore' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Days we can be down', { x: xs[0], y: s.H * 0.32, size: u * 2.4, icon: 'timer', color: 'teal', at: '#two' });
    s.box('Data we can lose', { x: xs[1], y: s.H * 0.32, size: u * 2.4, icon: 'database', color: 'teal', at: 'data' });
    s.text('every control is priced against these two', { y: s.H * 0.5, size: u * 2.1, color: 'muted', at: '#price' });
    s.text('decide now whether we would ever pay', { y: s.H * 0.59, size: u * 2.1, color: 'yellow', at: '#pay' });
    s.text('paying a sanctioned group can be unlawful', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: 'sanctioned' });
    s.text('report to the police, check No More Ransom', { y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#police' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the CIO for four numbers', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('% of external logins without a second factor', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#a' });
    s.text('days to patch a critical internet-facing flaw', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: 'days' });
    s.text('date of the last full restore test', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#b' });
    s.text('% of endpoints with detection', { y: s.H * 0.71, size: u * 2.1, color: 'yellow', at: 'share' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Break the chain.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'standstill' });
    s.subtitle('and test the restore', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

// Facts from the patching briefing (English) only.
// Risk scenes share one layout: the exposed thing and the outside world on a row, the gap below the line.
function risk(s, n, title, { left, leftIcon, right, rightIcon, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`GAP ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('server-crash', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('The unpatched server', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('known hole, published fix, still open', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  wait(s) {
    const { u } = risk(s, 1, 'The fix waits', { left: 'Internet scanners', leftIcon: 'radar', right: 'Our server', rightIcon: 'server', atk: 'Change window in 3 weeks', atkIcon: 'calendar-clock', atkAt: '#queue', lineAt: '#pub', lineLabel: 'scanned within hours' });
    s.text('hole public, fix available, not applied', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#queue' });
    s.text('measure days from fix published to fix applied', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#days' });
  },

  eol(s) {
    const { u } = risk(s, 2, 'Software that cannot be patched', { left: 'Payroll', leftIcon: 'wallet', right: 'New holes', rightIcon: 'bug', atk: 'Support ended', atkIcon: 'circle-slash', atkAt: '#old', lineAt: '#perm', lineLabel: 'no fixes exist' });
    s.text('every new hole stays open for good', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#perm' });
    s.text('Windows 10: support ended 14 Oct 2025', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#win' });
  },

  edge(s) {
    const { u } = risk(s, 3, 'The box at the edge', { left: 'Internet', leftIcon: 'globe', right: 'Our office', rightIcon: 'building-2', atk: 'VPN appliance, owner: ?', atkIcon: 'shield-question', atkAt: '#vpn', lineAt: '#vpn', lineLabel: 'faces the internet' });
    s.text('critical notice goes to a mailbox nobody reads', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#mail' });
    s.text('one unowned box undoes every control behind it', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#undo' });
  },

  unknown(s) {
    const { u } = risk(s, 4, 'Systems we did not know we had', { left: 'Our inventory', leftIcon: 'list', right: 'Everything with our name', rightIcon: 'network', atk: 'Test server, agency site', atkIcon: 'ghost', atkAt: '#forgot', lineAt: '#scan', lineLabel: 'attackers scan it all' });
    s.text('not on the inventory, so never patched', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#list' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.72 });
    const c = [['Asset inventory', 'list-checks', 'kept current automatically', '#inv'], ['Patch deadlines', 'timer', 'days for internet-facing', '#dead'], ['Emergency path', 'siren', 'outside the change window', '#emerg'], ['Edge owner', 'user-check', 'named, gets vendor notices', '#owner']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('NIS2: vulnerability handling is a risk-management measure', { id: 'nis', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'handling' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Days a critical fix waits?', { id: 'a', x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'timer', color: 'teal', at: '#days2' });
    s.box('On a board dashboard?', { id: 'b', x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'gauge', color: 'teal', at: '#dash' });
    s.arrow('a', 'b', { at: '#dash' });
    s.text('if nobody can answer the first, the second is the problem', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#fail' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Known hole, published fix.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'published' });
    s.subtitle('measure the days, name an owner', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

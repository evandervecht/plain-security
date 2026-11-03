// Facts from the blast radius briefing (English) only.
// Risk scenes share one layout: the breach on the left, the rest of the company on the right, the weak spot below.
function risk(s, n, title, { left = 'One breach', right = 'The company', atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 3`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  s.box(left, { id: 'l', x: xs[0], y, size: u * 2.4, icon: 'laptop', color: 'blue', at: 0.4 });
  s.box(right, { id: 'r', x: xs[2], y, size: u * 2.4, icon: 'building-2', color: 'blue', at: 0.4 });
  s.arrow('l', 'r', { label: lineLabel, labelFont: 'body', labelSize: u * 1.8, at: lineAt });
  s.box(atk, { id: 'a', x: xs[1], y: s.H * 0.54, size: u * 2.4, icon: atkIcon, color: 'red', at: atkAt });
  s.arrow('a', { x: xs[1], y: y + u * 1.2 }, { dashed: true, color: 'red', at: atkAt });
  return { u, xs };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('radius', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Blast radius', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('an incident or a crisis', { y: s.cy + u * 11, color: 'muted', at: '#much' });
  },

  flat(s) {
    const { u } = risk(s, 1, 'One system reaches everything', { atk: 'Flat network', atkIcon: 'network', atkAt: '#flat', lineAt: 0.6, lineLabel: 'spreading undetected' });
    s.text('one hacked system stays an isolated problem', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: 'isolated' });
    s.box('Network segmentation, zero trust architecture', { x: s.cx, y: s.H * 0.86, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#wall' });
  },

  password(s) {
    const { u } = risk(s, 2, 'One password becomes total access', { atk: 'Shared admin credentials', atkIcon: 'key-round', atkAt: '#shared', lineAt: '#domain', lineLabel: 'domain admin' });
    s.text('in minutes, everything readable', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: 'minutes' });
    s.box('Tiered admin, separate devices, no shared passwords', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#tier' });
  },

  permission(s) {
    const { u } = risk(s, 3, 'No one asks for permission', { left: 'Compromised account', atk: 'Permission creep', atkIcon: 'users', atkAt: '#creep', lineAt: 0.6, lineLabel: 'inherits everything' });
    s.text('forgotten access stays', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: 'forgotten' });
    s.box('Least privilege, role-based access, periodic reviews', { x: s.cx, y: s.H * 0.85, size: u * 2.1, icon: 'shield-check', color: 'teal', at: '#least' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.text('a design choice, not a consequence', { y: s.H * 0.2, size: u * 2.4, color: 'muted', at: '#design' });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    const c = [['Segmentation', 'network', 'walls between', 'segmentation'], ['Tiered admin', 'key-round', 'admin kept apart', 'tiered'], ['Least privilege', 'user-check', 'only what is needed', 'least']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.42, size: u * 2.4, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.9, color: 'muted', maxWidth: s.safe.w * 0.3, at });
    });
    s.text('breach spreads company-wide: orders of magnitude more', { y: s.H * 0.7, size: u * 2.1, color: 'yellow', at: '#order' });
    s.text('with controls: one department, hours not weeks', { y: s.H * 0.77, size: u * 2.1, color: 'muted', at: '#hours' });
    s.text('can we afford not to?', { y: s.H * 0.84, size: u * 2.4, color: 'teal', at: '#afford' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask the CIO or CISO for four numbers', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'list-checks', color: 'blue', at: '#ask' });
    s.text('segments with firewalled boundaries', { y: s.H * 0.5, size: u * 2.1, color: 'yellow', at: '#a' });
    s.text('high-privilege accounts kept apart', { y: s.H * 0.57, size: u * 2.1, color: 'yellow', at: '#b' });
    s.text('data classified and access restricted', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#c' });
    s.text('access reviews completed', { y: s.H * 0.71, size: u * 2.1, color: 'yellow', at: 'completed' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('A design choice.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'design' });
    s.subtitle('isolate before you have to', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

// Facts from the edge-devices briefing (English) only.
// Risk scenes share one layout: the box and its surroundings on a row, the weak point below the line.
function risk(s, n, title, { left, leftIcon, right, rightIcon, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`QUESTION ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('router', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('The box at the edge', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('who owns it, and is it patched?', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  owner(s) {
    const { u } = risk(s, 1, 'Who owns it?', { left: 'Internet', leftIcon: 'globe', right: 'Our network', rightIcon: 'building-2', atk: 'VPN / firewall, owner: ?', atkIcon: 'shield-question', atkAt: '#box', lineAt: '#own', lineLabel: 'servers have an owner' });
    s.text('installed by a supplier, outside the patch cycle', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#box' });
    s.text('Mandiant 2026: exploits the top way in, sixth year running', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#m' });
  },

  speed(s) {
    const { u } = risk(s, 2, 'How fast is it patched?', { left: 'Attacker', leftIcon: 'drama', right: 'Our box', rightIcon: 'router', atk: 'Fix published', atkIcon: 'calendar-clock', atkAt: '#ncsc', lineAt: '#days', lineLabel: 'inside within days' });
    s.text('Verizon: 26% fully fixed, median 43 days', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#v' });
    s.text('end-of-life: never gets a fix', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#eol' });
  },

  expose(s) {
    const { u } = risk(s, 3, 'What does it expose?', { left: 'Anyone online', leftIcon: 'globe', right: 'The device', rightIcon: 'router', atk: 'Password only, no MFA', atkIcon: 'key-round', atkAt: '#pw', lineAt: '#admin', lineLabel: 'admin page open' });
    s.text('one leaked password hands over the device', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#pw' });
    s.text('both are settings, not purchases', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#set' });
  },

  door(s) {
    const { u } = risk(s, 4, 'How much does one login open?', { left: 'Stolen login', leftIcon: 'key-round', right: 'Whole network', rightIcon: 'network', atk: 'Classic VPN', atkIcon: 'door-open', atkAt: '#vpn', lineAt: '#stolen', lineLabel: 'reaches everything' });
    s.text('zero trust: access per application', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#zt' });
    s.text('a stolen login reaches one application', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: s.cue('reaches', 2) });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.6 });
    const c = [['Edge inventory', 'list-checks', 'owner, version, support date', '#inv'], ['Emergency patch lane', 'siren', 'for edge advisories', '#lane'], ['Admin off, MFA on', 'lock-keyhole', 'every remote login', '#mfa']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.2, at });
    });
    s.text('Five Eyes guidance, Feb 2025: inventory with support dates', { y: s.H * 0.62, size: u * 1.9, color: 'muted', at: 'Five' });
    s.text('NIS2 Art. 21: vulnerability handling in maintenance', { id: 'nis', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'handling' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('One list of internet-facing devices', { id: 'a', x: xs[0], y: s.H * 0.36, size: u * 2, icon: 'list-checks', color: 'teal', at: '#list' });
    s.box('Owner, version, end-of-support', { id: 'b', x: xs[1], y: s.H * 0.36, size: u * 2, icon: 'user-check', color: 'teal', at: '#name' });
    s.arrow('a', 'b', { at: '#name' });
    s.text('days from advisory to our patch?', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#q' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('A list, a setting and a date.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'setting' });
    s.subtitle('that closes most of the door', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

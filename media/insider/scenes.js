// Facts from the insider-threat briefing (English) only.
// Risk scenes share one layout: the person and the data on a row, the pressure point below the line.
function risk(s, n, title, { left, leftIcon, right, rightIcon, atk, atkIcon, atkAt, lineAt, lineLabel }) {
  const u = s.W / 100;
  const y = s.H * 0.34;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`PERSON ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.icon('key-round', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Insider threat', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four people who already have the keys', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  leaver(s) {
    const { u } = risk(s, 1, 'The leaver', { left: 'Our CRM', leftIcon: 'database', right: 'Personal drive', rightIcon: 'hard-drive', atk: 'Salesperson on notice', atkIcon: 'log-out', atkAt: '#notice', lineAt: '#notice', lineLabel: 'customer list' });
    s.text('access stays fully open until the last day', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#open' });
    s.text('looks like normal work, found months later', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#normal' });
  },

  mistake(s) {
    const { u } = risk(s, 2, 'The colleague who meant well', { left: 'HR colleague', leftIcon: 'user', right: 'Wrong recipient', rightIcon: 'mail-warning', atk: 'Autocomplete', atkIcon: 'text-cursor-input', atkAt: '#auto', lineAt: '#auto', lineLabel: 'salary overview' });
    s.text('or a folder shared with "anyone with the link"', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#link' });
    s.text('no intent, same breach, same regulator', { y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#same' });
  },

  admin(s) {
    const { u } = risk(s, 3, 'The administrator nobody reviews', { left: 'Administrator', leftIcon: 'user-cog', right: 'Crown jewels', rightIcon: 'gem', atk: 'No second person', atkIcon: 'eye-off', atkAt: 0.6, lineAt: '#can', lineLabel: 'export database' });
    s.text('creates a spare account', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#log' });
    s.text('clears the log', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: 'clear' });
    s.text('no evidence left', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#none' });
  },

  pressure(s) {
    const { u } = risk(s, 4, 'The employee under pressure', { left: 'Employee', leftIcon: 'user', right: 'Our systems', rightIcon: 'server', atk: 'Outside party', atkIcon: 'drama', atkAt: '#offer', lineAt: '#offer', lineLabel: 'a login for sale' });
    s.text('pushed with debt or threats', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#debt' });
    s.text('trusted account, hardest to detect', { y: s.H * 0.8, size: u * 2.1, color: 'red', at: '#hard' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.72 });
    const c = [['Need-to-know', 'lock-keyhole', 'only the data the job needs', '#need'], ['Leaver process', 'log-out', 'shrinks at notice', '#leave'], ['Four-eyes', 'users', 'second approver', '#eyes'], ['Tamper-proof logs', 'scroll-text', 'admin cannot erase', '#logs']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('Speak-up culture: reporting an approach is safe', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#speak' });
    s.text('NIS2 Art. 21: access control, HR security, asset management', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: 'asset' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'asset' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Which 5 datasets hurt most?', { id: 'd', x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'gem', color: 'teal', at: '#five' });
    s.box('Who can reach each one?', { id: 'm', x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'users', color: 'teal', at: '#many' });
    s.arrow('d', 'm', { at: '#many' });
    s.text('"We don\'t know" is the whole insider programme', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#answer' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Trust is not a control.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'control' });
    s.subtitle('limit access', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
    s.subtitle('keep the evidence complete', { y: s.cy + u * 11, color: 'muted', at: 'evidence' });
  },
};

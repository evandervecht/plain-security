// Facts from the secure-development briefing (English) only.
// Risk scenes share one layout: a chain of three boxes, then short lines below.
function risk(s, n, title, chain) {
  const u = s.W / 100;
  const y = s.H * 0.36;
  const xs = s.row(3, { width: s.safe.w * 0.7 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  chain.forEach(([label, icon, color, at], i) => {
    s.box(label, { id: `c${i}`, x: xs[i], y, size: u * 2.4, icon, color, at });
    if (i) s.arrow(`c${i - 1}`, `c${i}`, { color: i === 2 ? 'red' : undefined, at });
  });
  return u;
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('code', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Building software that holds', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways it fails before anyone attacks', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  keys(s) {
    const u = risk(s, 1, 'Keys typed into the code', [['Key in code', 'key-round', 'blue', 0.4], ['Copied everywhere', 'copy', 'yellow', '#copy'], ['Bots find it', 'bug', 'red', '#bots']]);
    s.text('laptops, build server, backups, agencies', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'agencies' });
    s.text('years-old keys usually still work', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#old' });
  },

  pipeline(s) {
    const u = risk(s, 2, 'The build pipeline', [['Build pipeline', 'workflow', 'blue', '#chain'], ['A few lines added', 'file-plus', 'yellow', '#lines'], ['Signed and trusted', 'badge-check', 'red', '#signed']]);
    s.text('unattended, with broad rights', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'unattended' });
    s.text('every customer installs it', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: 'trust' });
  },

  testing(s) {
    const u = risk(s, 3, 'Security tested once, after the fact', [['Release', 'rocket', 'blue', 0.4], ['Pentest months later', 'calendar', 'yellow', '#pen'], ['Flaws were live', 'bug', 'red', '#live']]);
    s.text('cheap to fix in design, expensive now', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'cheap' });
  },

  owner(s) {
    const u = risk(s, 4, 'Software behaves like a pet', [['Agency delivers', 'package', 'blue', 0.4], ['Nobody assigned', 'user-x', 'yellow', '#contract'], ['Records still held', 'database', 'red', '#records']]);
    s.text('components age, advisories pile up unread', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#age' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Secret scanning', 'vault', 'teal', '#vault'], ['Protected pipeline', 'shield-check', 'teal', '#pipe'], ['Security in "done"', 'list-checks', 'teal', '#done'], ['Owner + budget', 'user-check', 'teal', '#own']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.7, icon, color, at }));
    s.text('NIS2: security in development and maintenance', { id: 'nis', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'development' });
    s.text('OWASP Top 10: the yardstick for the checks', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: 'yardstick' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Applications in production', { x: xs[0], y: s.H * 0.36, size: u * 2.4, icon: 'layout-list', color: 'blue', at: '#ask' });
    s.box('No owner, no budget', { x: xs[1], y: s.H * 0.36, size: u * 2.4, icon: 'user-x', color: 'red', at: '#neither' });
    s.text('that list is the real risk register', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#risk' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways software fails.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.icon('user-check', { y: s.cy + u * 14, size: u * 4, color: 'teal', at: '#keep' });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'fails' });
    s.subtitle('every application needs an owner and a budget', { y: s.cy + u * 6, color: 'muted', at: 'budget' });
  },
};

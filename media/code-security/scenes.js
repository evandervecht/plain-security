// Facts from the code-security briefing (English) only.
// Risk scenes share one layout: a chain of three boxes, then short lines below.
function risk(s, n, title, chain) {
  const u = s.W / 100;
  const y = s.H * 0.36;
  const xs = s.row(3, { width: s.safe.w * 0.7 });
  s.text(`PLACE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
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
    s.title('Code security', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four places flaws hide', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  own(s) {
    const u = risk(s, 1, 'The code we write', [['Request', 'form-input', 'blue', 0.4], ['No access check', 'lock-open', 'yellow', '#top'], ['Invoice 1043, other customer', 'file-text', 'red', '#logic']]);
    s.text('OWASP Top 10:2025: broken access control is number one', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'number' });
    s.text('scanners know patterns, not business logic', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#scan' });
  },

  oss(s) {
    const u = risk(s, 2, 'The open-source parts', [['Reused component', 'package', 'blue', '#reuse'], ['Flaw published', 'megaphone', 'yellow', '#publish'], ['Our app has it too', 'bug', 'red', 'too']]);
    s.text('SBOM: the list of components in a release', { y: s.H * 0.62, size: u * 2.1, color: 'teal', at: '#sbom' });
    s.text('matched against public vulnerability databases', { y: s.H * 0.70, size: u * 2.1, color: 'muted', at: 'databases' });
  },

  config(s) {
    const u = risk(s, 3, 'How things are configured', [['Template line', 'file-code', 'blue', '#iac'], ['Bucket open', 'cloud', 'yellow', '#bucket'], ['Copied to every environment', 'copy', 'red', 'environment']]);
    s.text('an image built two years ago: two-year-old libraries', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#image' });
  },

  findings(s) {
    const u = risk(s, 4, 'Too many findings', [['Reachable?', 'route', 'blue', '#reach'], ['Exploited now? KEV', 'flame', 'yellow', '#kev'], ['Likely soon? EPSS', 'chart-line', 'teal', '#epss']]);
    s.text('every flaw, used or not: a list too long to fix', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#list' });
    s.text('severity score alone keeps it long', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: 'severity' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Access review', 'user-check', 'teal', '#access'], ['Dependencies + SBOM', 'package-check', 'teal', '#dep'], ['Template scan', 'file-code', 'teal', '#tmpl'], ['Exploited first', 'flame', 'teal', '#triage']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.7, icon, color, at }));
    s.text('NIS2 Art. 21: security in development and maintenance', { id: 'nis', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'maintenance' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.55 });
    s.box('Known-exploited and reachable', { x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'flame', color: 'red', at: '#kevn' });
    s.box('Days the oldest is open', { x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'calendar', color: 'yellow', at: '#days' });
    s.text('two numbers, not the total count', { y: s.H * 0.6, size: u * 2.1, color: 'muted', at: '#ask' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four places flaws hide.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'hide' });
    s.subtitle('count what is exploited and reachable', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

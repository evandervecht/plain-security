// Facts from the supply chain briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row, lines of text below.
function risk(s, n, title) {
  const u = s.W / 100;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`RISK ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return { u, xs, y: s.H * 0.38 };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('link', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Supply chain attacks', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('breached through someone we trust: four ways', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  updates(s) {
    const { u, xs, y } = risk(s, 1, 'The trusted update carried it in');
    s.box('Software vendor', { id: 'v', x: xs[0], y, size: u * 2.4, icon: 'factory', color: 'blue', at: 0.4 });
    s.box('Our servers', { id: 'o', x: xs[2], y, size: u * 2.4, icon: 'server', color: 'blue', at: 0.4 });
    s.arrow('v', 'o', { label: 'signed update', labelFont: 'body', labelSize: u * 1.6, at: '#signed' });
    s.box('Attacker inside', { id: 'a', x: xs[0], y: s.H * 0.58, size: u * 2.1, icon: 'skull', color: 'red', at: '#signed' });
    s.arrow('a', 'v', { dashed: true, color: 'red', at: '#signed' });
    s.text('real certificate, real channel, installed on schedule', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#auto' });
    s.text('one vendor reaches every customer at once', { y: s.H * 0.79, size: u * 2.1, color: 'red', at: '#all' });
    s.text('deepest access, most abused: monitoring, backup, remote tools', { y: s.H * 0.86, size: u * 2.1, color: 'muted', at: '#deep' });
  },

  access(s) {
    const { u, xs, y } = risk(s, 2, "Our supplier's key opens our door");
    s.box('IT supplier', { id: 's', x: xs[0], y, size: u * 2.4, icon: 'wrench', color: 'blue', at: '#login' });
    s.box('Our systems', { id: 'o', x: xs[2], y, size: u * 2.4, icon: 'building-2', color: 'blue', at: '#login' });
    s.arrow('s', 'o', { label: 'standing login', labelFont: 'body', labelSize: u * 1.6, at: '#login' });
    s.text('one shared account, always on, more rights than needed', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#shared' });
    s.text('one supplier broken, dozens of companies open', { y: s.H * 0.68, size: u * 2.1, color: 'red', at: '#steal' });
    s.text('every login looks like routine maintenance', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#look' });
  },

  code(s) {
    const { u, xs, y } = risk(s, 3, "Our software is built from strangers' code");
    s.box('Our app', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'app-window', color: 'blue', at: '#parts' });
    s.box('Hundreds of components', { id: 'c', x: xs[2], y, size: u * 2.4, icon: 'package', color: 'blue', at: '#parts' });
    s.arrow('a', 'c', { label: 'open source', labelFont: 'body', labelSize: u * 1.6, at: '#parts' });
    s.text('maintainer tricked or hands over: next version carries malware', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#owner' });
    s.text('it runs under our name', { y: s.H * 0.68, size: u * 2.1, color: 'red', at: '#name' });
    s.text('no component list, no answer to "are we affected?"', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#list' });
  },

  saas(s) {
    const { u, xs, y } = risk(s, 4, 'Their breach, our data');
    s.box('Us', { id: 'u', x: xs[0], y, size: u * 2.4, icon: 'building-2', color: 'blue', at: '#where' });
    s.box('SaaS vendor', { id: 'v', x: xs[2], y, size: u * 2.4, icon: 'cloud', color: 'red', at: '#where' });
    s.arrow('u', 'v', { label: 'payroll, customer list', labelFont: 'body', labelSize: u * 1.6, at: '#where' });
    s.text('vendors run on other vendors', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#chain' });
    s.text('data leaks, no packet touches our network', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#leak' });
    s.text('GDPR: the 72-hour clock is still ours', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#clock' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['Supplier list', 'list-checks', 'who reaches what', '#inv'], ['Contracts', 'file-signature', 'notice and audit', '#clauses'], ['Named access', 'user-round-check', 'logins that expire', '#access'], ['Staged updates', 'flask-conical', 'test group first', '#staged'], ['SBOM', 'package-search', 'alert on a bad part', '#sbom']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('mostly a list, a contract and a habit', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cost' });
    s.text('NIS2: supply chain security is a named measure', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'measure' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Which suppliers can reach what?', { x: s.cx, y: s.H * 0.34, size: u * 2.6, icon: 'list-checks', color: 'teal', at: '#ask' });
    s.box('Who owns that list?', { x: s.cx, y: s.H * 0.52, size: u * 2.6, icon: 'user-round', color: 'teal', at: 'owns' });
    s.text('nobody can produce it within the hour: that is the finding', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#hour' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways trust gets abused.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'abused' });
    s.subtitle('know the list, write the clauses before you sign', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

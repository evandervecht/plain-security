// Facts from the cloud misconfiguration briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row, lines of text below.
function risk(s, n, title) {
  const u = s.W / 100;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`MISTAKE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return { u, xs, y: s.H * 0.38 };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('cloud', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Cloud misconfiguration', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('the cloud is secure, our settings are not: four mistakes', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  bucket(s) {
    const { u, xs, y } = risk(s, 1, 'A storage bucket open to the internet');
    s.box('Our storage', { id: 'b', x: xs[0], y, size: u * 2.4, icon: 'archive', color: 'blue', at: '#share' });
    s.box('The internet', { id: 'i', x: xs[2], y, size: u * 2.4, icon: 'globe', color: 'red', at: '#share' });
    s.arrow('b', 'i', { label: 'access: public', labelFont: 'body', labelSize: u * 1.6, at: '#share' });
    s.text('quickest fix: one setting, never changed back', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#back' });
    s.text('scanners find it within hours', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#scan' });
    s.text('nobody attacked us, we published it ourselves', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#own' });
  },

  key(s) {
    const { u, xs, y } = risk(s, 2, 'An access key in the source code');
    s.box('Code repository', { id: 'r', x: xs[0], y, size: u * 2.4, icon: 'git-branch', color: 'blue', at: '#static' });
    s.box('Bots', { id: 'b', x: xs[2], y, size: u * 2.4, icon: 'bot', color: 'red', at: '#repo' });
    s.arrow('r', 'b', { label: 'key copied in minutes', labelFont: 'body', labelSize: u * 1.6, at: '#repo' });
    s.text('static key: no person, no password, no second factor', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#static' });
    s.text('used before anyone removes it', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#six' });
    s.text('hundreds of servers on our bill', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#bill' });
  },

  role(s) {
    const { u, xs, y } = risk(s, 3, 'One role that can do everything');
    s.box('Separate accounts', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'layers', color: 'blue', at: '#split' });
    s.box('One admin role', { id: 'r', x: xs[2], y, size: u * 2.4, icon: 'crown', color: 'red', at: '#bridge' });
    s.arrow('r', 'a', { label: 'bridges every account', labelFont: 'body', labelSize: u * 1.6, at: '#bridge' });
    s.text('production, test, finance, HR, backups', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#split' });
    s.text('an administrator, or a pipeline that "needs everything"', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#bridge' });
    s.text('one credential holds the entire company', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#all' });
  },

  region(s) {
    const { u, xs, y } = risk(s, 4, 'A region where nobody is watching');
    s.box('Region we use', { id: 'w', x: xs[0], y, size: u * 2.4, icon: 'eye', color: 'blue', at: 0.4 });
    s.box('Region nobody opens', { id: 'n', x: xs[2], y, size: u * 2.4, icon: 'eye-off', color: 'red', at: '#regions' });
    s.arrow('w', 'n', { label: 'no logs', labelFont: 'body', labelSize: u * 1.6, at: '#nolog' });
    s.text('nothing raises an alert', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#nolog' });
    s.text('found by the invoice, not the security team', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#invoice' });
    s.text('no evidence for a regulator', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#proof' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['Landing zone', 'layout-template', 'guardrails built in', '#zone'], ['Org policy', 'ban', 'no public storage', '#policy'], ['No static keys', 'key-round', 'workload identity', '#nokeys'], ['Least privilege', 'lock', 'one role per job', '#least'], ['Central logs', 'scroll-text', 'every account, region', '#logs']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('settings, not products', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cost' });
    s.text('NIS2: access control is a named measure', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'configuration' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Who can make customer data public?', { x: s.cx, y: s.H * 0.34, size: u * 2.6, icon: 'users', color: 'teal', at: '#ask' });
    s.box('Would anyone notice the same day?', { x: s.cx, y: s.H * 0.52, size: u * 2.6, icon: 'bell', color: 'teal', at: '#same' });
    s.text('several dozen people, probably not: that is the risk', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#risk' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('The provider secures the building.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'building' });
    s.subtitle('we lock our own doors', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

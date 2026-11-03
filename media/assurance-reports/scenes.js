// Facts from the assurance reports briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row, lines of text below.
function risk(s, n, title) {
  const u = s.W / 100;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`PAGE ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return { u, xs, y: s.H * 0.38 };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('file-check', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('The 90-page report', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('what a clean opinion does and does not tell you', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  type(s) {
    const { u, xs, y } = risk(s, 1, 'Type and period');
    s.box('Type 1: one day', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'calendar', color: 'blue', at: '#one' });
    s.box('Type 2: a period', { id: 'b', x: xs[2], y, size: u * 2.4, icon: 'calendar-range', color: 'blue', at: '#two' });
    s.text('the period ended months before you read it', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#two' });
    s.text('ISAE 3402: a Type 2 ordinarily covers at least six months', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#six' });
    s.text('a photograph of the past, not a guarantee', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#photo' });
  },

  scope(s) {
    const { u, xs, y } = risk(s, 2, 'The scope');
    s.box("Supplier's platform", { id: 'p', x: xs[0], y, size: u * 2.4, icon: 'layout-grid', color: 'green', at: '#line' });
    s.box('Their cloud provider', { id: 'c', x: xs[2], y, size: u * 2.4, icon: 'cloud', color: 'red', at: '#carve' });
    s.text('in scope: tested', { x: xs[0], y: s.H * 0.5, size: u * 1.8, color: 'muted', at: '#line' });
    s.text('carved out: not tested', { x: xs[2], y: s.H * 0.5, size: u * 1.8, color: 'muted', at: '#carve' });
    s.text('your module or region may not be in it', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#module' });
    s.text('a clean opinion on the wrong scope is no assurance', { y: s.H * 0.76, size: u * 2.1, color: 'red', at: '#none' });
  },

  part(s) {
    const { u, xs, y } = risk(s, 3, 'Your part');
    s.box("Supplier's controls", { id: 's', x: xs[0], y, size: u * 2.4, icon: 'shield-check', color: 'green', at: '#cuec' });
    s.box('Your controls', { id: 'y', x: xs[2], y, size: u * 2.4, icon: 'user-round', color: 'yellow', at: '#cuec' });
    s.text('tested by the auditor', { x: xs[0], y: s.H * 0.5, size: u * 1.8, color: 'muted', at: '#cuec' });
    s.text('assumed, not tested', { x: xs[2], y: s.H * 0.5, size: u * 1.8, color: 'yellow', at: '#untested' });
    s.text('who gets access, who removes leavers, who reviews logs', { y: s.H * 0.64, size: u * 2.1, color: 'muted', at: '#names' });
    s.text('rarely reaches the people who run our side', { y: s.H * 0.76, size: u * 2.1, color: 'red', at: '#owner' });
  },

  exceptions(s) {
    const { u, xs, y } = risk(s, 4, 'The exceptions');
    s.box('Page 3: opinion', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'badge-check', color: 'green', at: '#p3' });
    s.box('Page 60: exceptions', { id: 'b', x: xs[2], y, size: u * 2.4, icon: 'triangle-alert', color: 'yellow', at: '#p60' });
    s.text('clean opinion with exceptions is normal', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#normal' });
    s.text('read each one for what it means for our service', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#read' });
    s.text('configuration, access and data use: never tested', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#never' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Four fields', 'clipboard-check', 'type, period, date, auditor', '#four2'], ['Scope map', 'map', 'in, carved out, not covered', '#map'], ['Owner list', 'user-round-check', 'for assumed controls', '#list'], ['Exception review', 'search-check', 'rated for our service', '#review']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.18, at });
    });
    s.text('an afternoon per report', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cost' });
    s.text('NIS2 Art. 21: supply chain security measures', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'Article' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('In scope, Type 2, under a year old?', { x: s.cx, y: s.H * 0.34, size: u * 2.6, icon: 'file-check', color: 'teal', at: '#ask' });
    s.box('Who owns our list of assumed controls?', { x: s.cx, y: s.H * 0.52, size: u * 2.6, icon: 'user-round-check', color: 'teal', at: '#who' });
    s.text('a weaker report can be fine, if it is a decision', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#decide' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four pages.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'pages' });
    s.subtitle('what it covers, and what it leaves to us', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

// Facts from the shared responsibility briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row, lines of text below.
function risk(s, n, title) {
  const u = s.W / 100;
  const xs = s.row(3, { width: s.safe.w * 0.62 });
  s.text(`MISUNDERSTANDING ${n} OF 4`, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return { u, xs, y: s.H * 0.38 };
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('split', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Shared responsibility', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('whose job is it? four misunderstandings', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  certified(s) {
    const { u, xs, y } = risk(s, 1, '"The provider is certified"');
    s.box('Provider', { id: 'p', x: xs[0], y, size: u * 2.4, icon: 'building-2', color: 'blue', at: '#below' });
    s.box('Us', { id: 'u', x: xs[2], y, size: u * 2.4, icon: 'user-round', color: 'yellow', at: '#above' });
    s.arrow('p', 'u', { label: 'the line', labelFont: 'body', labelSize: u * 1.6, dashed: true, head: 'none', at: '#real' });
    s.text('their certificate: real, and it stops at the line', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#real' });
    s.text('above the line: our data, users, configuration', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#above' });
    s.text('identity and data are ours in every model', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#every' });
  },

  patched(s) {
    const { u, xs, y } = risk(s, 2, '"It is in the cloud, so it is patched"');
    s.box('Provider host', { id: 'h', x: xs[0], y, size: u * 2.4, icon: 'cloud', color: 'blue', at: '#host' });
    s.box('Our rented server', { id: 'v', x: xs[2], y, size: u * 2.4, icon: 'server', color: 'yellow', at: '#vm' });
    s.arrow('h', 'v', { label: 'patched up to here', labelFont: 'body', labelSize: u * 1.6, dashed: true, at: '#host' });
    s.text('the operating system inside is ours', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#vm' });
    s.text('status page: green throughout', { y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#green' });
    s.text('a database open to the world: still our hole', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#db' });
  },

  vendor(s) {
    const { u, xs, y } = risk(s, 3, '"The vendor takes care of everything"');
    s.box('Vendor', { id: 'v', x: xs[0], y, size: u * 2.4, icon: 'cloud', color: 'blue', at: '#runs' });
    s.box('Our admin', { id: 'a', x: xs[2], y, size: u * 2.4, icon: 'user-round', color: 'yellow', at: '#users' });
    s.arrow('a', 'v', { label: 'deletes a mailbox', labelFont: 'body', labelSize: u * 1.6, at: '#delete' });
    s.text('vendor runs the app, recovers its own failures', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#runs' });
    s.text('we own the users, rights and settings', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#users' });
    s.text('their backup does not bring it back', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#gone' });
  },

  sla(s) {
    const { u, xs, y } = risk(s, 4, '"It is in the contract"');
    s.box('Uptime', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'activity', color: 'green', at: '#up' });
    s.box('Breach notice', { id: 'b', x: xs[2], y, size: u * 2.4, icon: 'timer', color: 'red', at: '#late' });
    s.arrow('a', 'b', { label: '"reasonable time"', labelFont: 'body', labelSize: u * 1.6, at: '#late' });
    s.text('a service level agreement covers uptime', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#up' });
    s.text('we read about our own breach in the news', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#news' });
    s.text('our clock starts when we become aware', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#clock' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['Matrix', 'table-2', 'one page per service', '#matrix'], ['CUEC list', 'file-search', 'our side, in the audit report', '#cuec'], ['Owner', 'user-round-check', 'every workload', '#owner'], ['Own backup', 'database-backup', 'for software data', '#backup'], ['Contract', 'file-signature', 'notice in hours', '#contract']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('mostly paperwork and ownership', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cost' });
    s.text('NIS2: outsourcing a layer does not outsource the obligation', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'obligation' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Matrix for our top five services', { x: s.cx, y: s.H * 0.34, size: u * 2.6, icon: 'table-2', color: 'teal', at: '#ask' });
    s.box('Who signed each one?', { x: s.cx, y: s.H * 0.52, size: u * 2.6, icon: 'pen-line', color: 'teal', at: '#who' });
    s.text('either one missing: that is the finding', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#find' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four misunderstandings.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'misunderstandings' });
    s.subtitle('a division of labour, our part written down', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

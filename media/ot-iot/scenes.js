// Facts from the ot-iot briefing (English) only.
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
    s.icon('factory', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Factory, building, cameras', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways the plant stops', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  reach(s) {
    const u = risk(s, 1, 'The office network reaches the plant', [['Office laptop', 'laptop', 'blue', 0.4], ['Same network', 'network', 'yellow', '#same'], ['Production line', 'factory', 'red', '#line']]);
    s.text('plugged into whatever cable was nearest', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#cable' });
    s.text('an office incident becomes a production incident', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: 'reach' });
  },

  patch(s) {
    const u = risk(s, 2, 'These devices cannot be patched', [['Controller', 'cpu', 'blue', 0.4], ['No updates', 'refresh-cw-off', 'yellow', '#never'], ['Factory password', 'key-round', 'red', '#factory']]);
    s.text('vendor gone, or an update stops production', { y: s.H * 0.54, size: u * 2.1, color: 'muted', at: 'vendor' });
    const xs = s.row(3, { width: s.safe.w * 0.6 });
    [['isolate', 'isolate'], ['replace early', 'replace'], ['accept it is open', 'accept']].forEach(([t, at], i) => s.text(t, { x: xs[i], y: s.H * 0.64, size: u * 2.1, color: 'teal', at }));
    s.text('a business decision with a price tag', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: 'price' });
  },

  vendor(s) {
    const u = risk(s, 3, "The vendor's back door", [['Vendor engineer', 'wrench', 'blue', 0.4], ['One shared password', 'key-round', 'yellow', '#shared'], ['Controllers', 'cpu', 'red', 'controllers']]);
    s.text('remote access set up years ago, and it stayed', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#remote' });
    s.text('the contract usually says nothing', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#contract' });
  },

  safety(s) {
    const u = risk(s, 4, 'The damage is physical', [['Changed setpoint', 'gauge', 'blue', '#set'], ['Screen shows normal', 'monitor', 'yellow', '#screen'], ['Equipment, product, people', 'triangle-alert', 'red', '#nobackup']]);
    s.text('not restored from a backup', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'backup' });
    s.text('Machinery Regulation', { y: s.H * 0.69, size: u * 2.1, color: 'yellow', at: '#reg' });
    s.text('from 20 January 2027', { y: s.H * 0.77, size: u * 2.1, color: 'yellow', at: 'January' });
    s.text('connected devices must not make new machinery unsafe', { y: s.H * 0.85, size: u * 2.1, color: 'muted', at: 'unsafe' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Device inventory', 'list-checks', 'teal', '#inv'], ['IT/OT wall', 'network', 'teal', '#seg'], ['Vendor on request', 'key-round', 'teal', '#jump'], ['Monitoring', 'eye', 'teal', '#mon']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.7, icon, color, at }));
    s.text('IEC 62443: zones and conduits', { id: 'iec', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#iec' });
    s.annotate('iec', { type: 'underline', color: 'teal', at: 'yardstick' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.55 });
    s.box('Can an office laptop reach the line?', { x: xs[0], y: s.H * 0.36, size: u * 2.2, icon: 'laptop', color: 'blue', maxWidth: s.safe.w * 0.3, at: '#ask' });
    s.box('Who would notice?', { x: xs[1], y: s.H * 0.36, size: u * 2.2, icon: 'eye', color: 'teal', at: '#who' });
    s.text('"probably" and "nobody"', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: 'probably' });
    s.text('the first control: a line on a network diagram', { y: s.H * 0.68, size: u * 2.1, color: 'teal', at: 'diagram' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways the plant stops.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'stops' });
    s.subtitle('draw the line between office and plant', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

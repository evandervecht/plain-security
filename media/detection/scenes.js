// Facts from the detection briefing (English) only.
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
    s.icon('eye', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Would we even notice?', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways an attack stays invisible', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  logs(s) {
    const u = risk(s, 1, 'Evidence deleted before anyone looked', [['Breach', 'triangle-alert', 'blue', 0.4], ['Logs overwritten', 'file-x', 'yellow', 'erased'], ['"We do not know"', 'circle-question-mark', 'red', '#max']]);
    s.text('median 14 days before noticed, Mandiant M-Trends 2026',{ y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#median' });
    s.text('logs never kept, or erased after two weeks', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: 'kept' });
    s.text('every customer record possibly affected', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: 'record' });
  },

  alarm(s) {
    const u = risk(s, 2, 'The alarm went off. Nobody was listening', [['Monitoring tool', 'bell', 'blue', '#tool'], ['New admin, 02:40 Saturday', 'moon', 'yellow', '#night'], ['Read on Monday', 'calendar', 'red', 'Monday']]);
    s.text('alerts, not attention', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'attention' });
    s.text('a weekend is enough to encrypt everything', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#weekend' });
  },

  blind(s) {
    const u = risk(s, 3, 'We watch where it is easy', [['Office network', 'network', 'blue', 0.4], ['Cloud, SaaS, old controllers', 'cloud', 'yellow', '#cloud'], ['Not watched', 'eye-off', 'red', '#half']]);
    s.text('"we see about half"', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'half' });
    s.text('one page: per system, watched or not', { y: s.H * 0.70, size: u * 2.1, color: 'teal', at: '#map' });
    s.text('and who signed off on the "not"', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: 'signed' });
  },

  response(s) {
    const u = risk(s, 4, 'Detected on Friday. Handled on Monday', [['Alert', 'bell', 'blue', 0.4], ['Ticket waits', 'ticket', 'yellow', '#queue'], ['Attacker had the weekend', 'clock', 'red', '#perm']]);
    s.text('two decisions for this room:', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: '#decide' });
    s.text('someone on duty, and written permission to act', { y: s.H * 0.70, size: u * 2.1, color: 'teal', at: 'permission' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['Central logs', 'database', 'teal', '#logs'], ['Ten detections, 24/7', 'bell', 'teal', '#ten'], ['Coverage map', 'map', 'teal', '#map2'], ['Playbooks', 'list-checks', 'teal', '#play']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color, at }));
    s.text('NIS2 Art. 21: incident handling', { id: 'nis', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'incident' });
    s.text('cannot report in 24 hours what you cannot detect', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: 'detect' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('Ask one thing', { x: s.cx, y: s.H * 0.3, size: u * 2.6, icon: 'message-circle-question-mark', color: 'teal', at: '#ask' });
    s.text('What was our mean time to detect last quarter?', { y: s.H * 0.5, size: u * 2.6, color: 'yellow', at: '#mttd' });
    s.text('no answer = that is the answer', { y: s.H * 0.66, size: u * 2.1, color: 'muted', at: '#none' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways it stays invisible.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'invisible' });
    s.subtitle('measure how fast we notice', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

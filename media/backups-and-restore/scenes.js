// Facts from the backups-and-restore briefing (English) only.
// Question scenes share one layout: kicker, title, a row of boxes with captions, then up to three notes.
function page(s, kicker, title, boxes, notes) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  const xs = s.row(boxes.length, { width: s.safe.w * (boxes.length > 3 ? 0.8 : 0.62) });
  const cw = ((s.safe.w * 0.8) / Math.max(boxes.length, 3)) * 0.9;
  boxes.forEach(([t, icon, color, at, cap], i) => {
    const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color, at });
    if (cap) s.text(cap, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: cw, at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.68 + i * 0.075), size: u * 2.1, color, at }));
  return u;
}


export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('hard-drive', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Could we restore?', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('two numbers decide the next weeks', { y: s.cy + u * 11, color: 'muted', at: '#two' });
  },

  targets(s) {
    page(s, 'QUESTION 1 OF 4', 'Do we know our recovery targets?', [
      ['Last good backup', 'hard-drive', 'blue', 0.5, ''],
      ['RPO', 'history', 'orange', '#rpo', 'work we accept losing'],
      ['RTO', 'timer', 'orange', '#rto', 'time we accept being down'],
    ], [
      ['IT set both by default', 'yellow', '#it'],
      ['ten systems that matter most, two numbers each', 'muted', '#biz'],
    ]);
  },

  copies(s) {
    page(s, 'QUESTION 2 OF 4', 'Can an attacker reach the backups?', [
      ['Live data', 'database', 'blue', 0.5, ''],
      ['Online backup', 'hard-drive', 'red', '#same', 'same admin login'],
      ['Offline or immutable copy', 'lock-keyhole', 'green', '#offline', 'no login can delete it'],
    ], [
      ['attackers look for the backup server first', 'yellow', '#first'],
      ['3 copies, 2 kinds of storage, 1 off-site', 'muted', '#three'],
    ]);
  },

  restore(s) {
    page(s, 'QUESTION 3 OF 4', 'Has anyone restored everything?', [
      ['Backup job', 'circle-check', 'green', '#green', 'green every night'],
      ['Restore', 'circle-help', 'red', '#tried', 'never tried'],
      ['Key', 'key-round', 'orange', '#key', 'on the encrypted server'],
    ], [
      ['a report shows the copy was written, not that it reads back', 'yellow', '#tried'],
      ['a timed restore test turns hope into a fact', 'teal', '#timed'],
    ]);
  },

  cloud(s) {
    page(s, 'QUESTION 4 OF 4', 'Who backs up our cloud applications?', [
      ['Provider', 'cloud', 'blue', '#up', 'keeps the service running'],
      ['SharePoint, OneDrive', 'trash-2', 'red', '#days', 'recycle bin 93 days, longer by policy'],
      ['Our data', 'database', 'teal', '#own', 'our job to protect'],
    ], [
      ['available is not backed up', 'yellow', '#up'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    const c = [['NIST SP 800-34', 'ruler', 'recovery targets', '#nist'], ['NCSC UK', 'copy', 'three copies', '#ncsc'], ['GDPR Art. 32', 'scale', 'restore, and test it', '#gdpr']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.3, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.8, color: 'muted', maxWidth: s.safe.w * 0.24, at });
    });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Ten systems', { x: xs[0], y: s.H * 0.36, size: u * 2.6, icon: 'list-ordered', color: 'teal', at: '#ten' });
    s.box('Restored end to end', { x: xs[1], y: s.H * 0.36, size: u * 2.6, icon: 'timer-reset', color: 'teal', at: '#stop' });
    s.text('hours each could be down', { x: xs[0], y: s.H * 0.5, size: u * 2, color: 'muted', at: '#ten' });
    s.text('from a copy an attacker could not reach', { x: xs[1], y: s.H * 0.5, size: u * 2, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#stop' });
    s.text('how much downtime to accept: the board\u2019s call', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#call' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('A backup is a hope.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.subtitle('A restore is a fact.', { y: s.cy + u * 6, color: 'teal', at: '#fact' });
  },
};

// Facts from the connectwise-cloud-backup briefing (English) only.
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
    s.icon('key-round', { y: s.cy - u * 9, size: u * 9, color: 'red', at: 0.3 });
    s.title('The trusted app that let them in', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('ConnectWise Cloud Backup, October 2026', { y: s.cy + u * 11, color: 'muted', at: '#cw' });
  },

  app(s) {
    page(s, 'QUESTION 1 OF 3', 'Whose key opens the door?', [
      ['Stolen key', 'key-round', 'red', '#key', 'app credentials'],
      ['Supplier app', 'puzzle', 'orange', '#key', 'signs in as itself'],
      ['Our Microsoft 365', 'cloud', 'blue', '#rights', 'rights stay until removed'],
    ], [
      ['no user, no MFA prompt', 'yellow', '#nouser'],
      ['approved once, standing rights', 'muted', '#rights'],
      ['one app gave itself Global Administrator', 'red', '#admin'],
    ]);
  },

  speed(s) {
    page(s, 'QUESTION 2 OF 3', 'How fast do they move?', [
      ['AI agents', 'bot', 'red', '#agents', 'open-source framework'],
      ['2,250+ tenants', 'building', 'orange', '#tenants', 'sign-in attempts'],
      ['Under 3 hours', 'timer', 'red', '#hours', 'to privileged access'],
    ], [
      ['a monthly review is too slow', 'yellow', 'monthly'],
      ['alert on new app keys and admin roles', 'muted', '#alert'],
      ['day and night', 'teal', 'night'],
    ]);
  },

  backup(s) {
    page(s, 'QUESTION 3 OF 3', 'What if the backup supplier is the incident?', [
      ['Cloud Backup', 'cloud-off', 'red', '#paused', 'suspended'],
      ['Two more services', 'cloud-off', 'orange', '#paused', 'suspended as a precaution'],
      ['Archives', 'archive', 'green', '#kept', 'encrypted, preserved'],
    ], [
      ['23 Oct 2026: no firm date to return', 'yellow', '#nodate'],
      ['did our MSP use these tools for us?', 'muted', '#msp'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['App list', 'list', 'rights and an owner', '#list'], ['Logs by app ID', 'search', 'not by name', '#appid'], ['Alerts', 'bell-ring', 'handled within the hour', '#alerts'], ['Second copy', 'copy', 'critical mail and files', '#second']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('NIS2 Art. 21: supply chain security, access control', { id: 'nis', y: s.H * 0.7, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'access' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.8 });
    [['Which apps?', 'puzzle', '#q1', 'mail, files, admin roles'], ['Would we notice?', 'bell-ring', '#q2', 'a new admin role, in hours'], ['Tenant review', 'mail-check', '#q3', 'in writing, from our MSP']].forEach(([t, icon, at, n], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 2.4, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.24, at });
    });
    s.box('Keep affected apps disabled, not deleted', { x: s.cx, y: s.H * 0.68, size: u * 2.4, icon: 'shield-check', color: 'blue', at: '#keep' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Trim outside apps.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'trim' });
    s.subtitle('this attack used trust we had already given', { y: s.cy + u * 6, color: 'muted', at: 'trust' });
  },
};

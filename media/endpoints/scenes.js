// Facts from the endpoints briefing (English) only.
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
    s.icon('laptop', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Endpoints', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways a device fails us', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  lost(s) {
    const u = risk(s, 1, 'A laptop is left in a taxi', [['Lost laptop', 'laptop', 'blue', 0.4], ['No encryption', 'lock-open', 'yellow', '#disk'], ['Readable in minutes', 'triangle-alert', 'red', 'minutes']]);
    s.text('the password protects the screen, not the disk', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'screen' });
    s.text('GDPR Art. 33: notify within 72 hours', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#breach' });
    s.text('encrypted: a hardware replacement and a form', { y: s.H * 0.78, size: u * 2.1, color: 'teal', at: '#fine' });
  },

  personal(s) {
    const u = risk(s, 2, 'Mail on a phone we never saw', [['Personal phone', 'smartphone', 'blue', 0.4], ['Company mail', 'mail', 'blue', s.cue('mail', 1)], ['No wipe', 'eraser', 'red', '#nowipe']]);
    s.text('no screen lock, no update policy, no encryption check', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: s.cue('lock', 1) });
    s.text('sold or lost: nobody can wipe it', { y: s.H * 0.54, size: u * 2.1, color: 'yellow', at: 'lost' });
    s.text('downloaded files outlive the employee', { y: s.H * 0.70, size: u * 2.1, color: 'yellow', at: '#data' });
    s.text('wipe, update, lock: welcome', { y: s.H * 0.78, size: u * 2.1, color: 'teal', at: 'welcome' });
    s.text('the rest: mail in the browser only', { y: s.H * 0.86, size: u * 2.1, color: 'muted', at: 'browser' });
  },

  admin(s) {
    const u = risk(s, 3, 'Everyone is their own administrator', [['Fake PDF tool', 'download', 'blue', 0.4], ['Admin laptop', 'laptop', 'yellow', '#click'], ['Security tools off', 'shield-off', 'red', '#off']]);
    s.text('one click, no questions asked', { y: s.H * 0.62, size: u * 2.1, color: 'muted', at: 'system-wide' });
    s.text('removing admin rights: a few weeks of helpdesk friction', { y: s.H * 0.70, size: u * 2.1, color: 'teal', at: '#cost' });
    s.text('keeping them: the first incident', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#keep' });
  },

  browser(s) {
    const u = risk(s, 4, 'The browser is the new operating system', [['Late updates', 'refresh-cw', 'blue', 'updates'], ['Fake update banner', 'triangle-alert', 'yellow', 'fake'], ['Resold extension', 'puzzle', 'red', 'extension']]);
    s.text('inside the logged-in session, after MFA', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#mfa' });
    s.text('no admin rights needed', { y: s.H * 0.74, size: u * 2.1, color: 'muted', at: 'admin' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['Encryption', 'lock', 'blue', '#enc'], ['Remote wipe', 'eraser', 'blue', 'wipe'], ['No local admin', 'user-x', 'teal', '#admin'], ['Auto-update', 'refresh-cw', 'teal', '#update'], ['Allow-list', 'list-checks', 'teal', 'allow-list']];
    c.forEach(([t, icon, color, at], i) => s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color, at }));
    s.text('settings in the device management we already pay for', { y: s.H * 0.64, size: u * 2.1, color: 'yellow', at: '#cheap' });
    s.text('NIS2: cyber hygiene, encryption, access control', { id: 'nis', y: s.H * 0.72, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'access' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Devices with company data', { x: xs[0], y: s.H * 0.36, size: u * 2.4, icon: 'smartphone', color: 'blue', at: '#ask' });
    s.box('Could we wipe tonight?', { x: xs[1], y: s.H * 0.36, size: u * 2.4, icon: 'eraser', color: 'teal', at: '#wipe' });
    s.text('the gap is the risk, counted in devices, not policies', { y: s.H * 0.6, size: u * 2.1, color: 'yellow', at: '#gap' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways a device fails.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'fails' });
    s.subtitle('count the devices we cannot wipe', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

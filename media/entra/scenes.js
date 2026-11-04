// Facts from the Entra ID briefing (English) only.
// Risk scenes share one layout: header, three boxes on a row (actor, target, effect), lines of text below.
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
    s.icon('key-round', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Entra ID', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('the keys to Microsoft 365: four ways it breaks', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  admins(s) {
    const { u, xs, y } = risk(s, 1, 'Too many people own the tenant');
    s.box('Global Admin', { id: 'g', x: xs[0], y, size: u * 2.4, icon: 'crown', color: 'yellow', at: '#key' });
    s.box('Our tenant', { id: 't', x: xs[2], y, size: u * 2.4, icon: 'cloud', color: 'blue', at: '#key' });
    s.arrow('g', 't', { label: 'every mailbox, every password', labelFont: 'body', labelSize: u * 1.6, at: 'mailbox' });
    s.box('Phished', { id: 'p', x: xs[1], y: s.H * 0.58, size: u * 2.4, icon: 'fish-symbol', color: 'red', at: '#phish' });
    s.arrow('p', { x: xs[1], y: y + u * 1.2 }, { dashed: true, color: 'red', at: '#phish' });
    s.text('master key, held permanently by far more people than we think', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: '#perm' });
    s.text('one phished admin, whole tenant taken', { y: s.H * 0.83, size: u * 2.1, color: 'red', at: '#phish' });
  },

  gate(s) {
    const { u, xs, y } = risk(s, 2, 'The gate is open');
    s.box('Anywhere', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'globe', color: 'blue', at: 0.4 });
    s.box('Mail, SharePoint', { id: 'm', x: xs[2], y, size: u * 2.4, icon: 'mail', color: 'blue', at: 0.4 });
    s.arrow('a', 'm', { label: 'Conditional Access', labelFont: 'body', labelSize: u * 1.6, at: 0.6 });
    s.text('legacy sign-in: bare password, no second factor', { y: s.H * 0.58, size: u * 2.1, color: 'yellow', at: '#legacy' });
    s.text('admins exempt from MFA, unmanaged personal phones', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#exempt' });
    s.text('"We have MFA", but not where it counts', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#count' });
  },

  guests(s) {
    const { u, xs, y } = risk(s, 3, 'The guests never left');
    s.box('Outside guest', { id: 'g', x: xs[0], y, size: u * 2.4, icon: 'user-round', color: 'red', at: '#invite' });
    s.box('Teams and files', { id: 'f', x: xs[2], y, size: u * 2.4, icon: 'folder-open', color: 'blue', at: '#keep' });
    s.arrow('g', 'f', { label: 'still reading', labelFont: 'body', labelSize: u * 1.6, at: '#keep' });
    s.text('invite: one click', { y: s.H * 0.58, size: u * 2.1, color: 'muted', at: '#invite' });
    s.text('removal: a decision nobody owns', { y: s.H * 0.65, size: u * 2.1, color: 'yellow', at: 'removing' });
    s.text('board material readable by people we no longer work with', { y: s.H * 0.78, size: u * 2.1, color: 'red', at: '#read' });
  },

  hybrid(s) {
    const { u, xs, y } = risk(s, 4, 'The back door between two worlds');
    s.box('Our directory', { id: 'd', x: xs[0], y, size: u * 2.4, icon: 'building-2', color: 'blue', at: 0.4 });
    s.box('Entra ID', { id: 'e', x: xs[2], y, size: u * 2.4, icon: 'cloud', color: 'blue', at: 0.4 });
    s.box('Entra Connect', { id: 'c', x: xs[1], y: s.H * 0.58, size: u * 2.4, icon: 'refresh-cw', color: 'yellow', at: '#sync' });
    s.arrow('d', 'e', { label: 'one login everywhere', labelFont: 'body', labelSize: u * 1.6, at: '#sync' });
    s.text('sync server holds credentials that can change cloud accounts', { y: s.H * 0.76, size: u * 2.1, color: 'yellow', at: '#keys' });
    s.text('a breach in either world is a breach of both', { y: s.H * 0.83, size: u * 2.1, color: 'red', at: '#both' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.8 });
    const c = [['PIM', 'user-lock', 'five admins or fewer', '#pim'], ['Access baseline', 'door-closed-locked', 'block legacy, MFA for all', '#ca'], ['Passkeys', 'key-round', 'for administrators', '#key2'], ['Guest expiry', 'timer', 'an owner for each guest', '#guest'], ['Tier-0 sync', 'server', 'isolated sync server', '#tier']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 1.9, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('settings in a licence we already pay for', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#cost' });
    s.text('NIS2: access control and MFA are named measures', { id: 'nis', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#nis2' });
    s.annotate('nis', { type: 'underline', color: 'teal', at: 'among' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    s.box('How many can take over the tenant today?', { id: 'q', x: s.cx, y: s.H * 0.36, size: u * 2.6, icon: 'users', color: 'teal', at: '#ask' });
    s.box('How many should?', { x: s.cx, y: s.H * 0.54, size: u * 2.6, icon: 'target', color: 'teal', at: 'should' });
    s.text('above five, or nobody knows: that is the finding', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#five' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Four ways to lose the tenant.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'tenant' });
    s.subtitle('fewer standing administrators, a closed gate', { y: s.cy + u * 6, color: 'muted', at: '#keep2' });
  },
};

// Facts from the cloud sovereignty briefing (English) only.
// Content scenes: kicker + title on top, a row of boxes at 40%, notes below, one yellow line at 78%.
function head(s, kicker, title) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return u;
}
const row3 = (s) => s.row(3, { width: s.safe.w * 0.7 });

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('cloud', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Sovereign cloud', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('a level for each of four questions', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  level(s) {
    const u = head(s, 'QUESTION 1 OF 4', 'Which level?');
    s.text('EU Cloud Sovereignty Framework: 8 objectives', { y: s.H * 0.28, size: u * 2.1, color: 'muted', at: '#eight' });
    const xs = s.row(5, { width: s.safe.w * 0.75 });
    const names = ['SEAL-0', 'SEAL-1', 'SEAL-2', 'SEAL-3', 'SEAL-4'];
    const notes = ['no sovereignty', 'EU law applies on paper', 'data sovereignty', 'EU actors in control', 'full digital sovereignty'];
    names.forEach((t, i) => {
      const b = s.box(t, { id: `l${i}`, x: xs[i], y: s.H * 0.42, size: u * 2.1, color: i === 2 ? 'teal' : 'blue', at: s.mark('scale') + i * 0.25 });
      s.text(notes[i], { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.15, at: s.mark('scale') + i * 0.25 });
    });
    s.text('the lowest objective sets the level', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: 'lowest' });
    s.annotate('l2', { type: 'circle', color: 'teal', at: '#two' });
    s.text('a procurement tool, not a law', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#law' });
  },

  law(s) {
    const u = head(s, 'QUESTION 2 OF 4', 'Jurisdiction follows the company');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Foreign order', { id: 'f', x: xs[0], y, size: u * 2.4, icon: 'gavel', color: 'red', at: '#cloud' });
    s.box('Head office, non-EU', { id: 'h', x: xs[1], y, size: u * 2.4, icon: 'flag', color: 'blue', at: '#cloud' });
    s.box('EU data centre', { id: 'd', x: xs[2], y, size: u * 2.4, icon: 'server', color: 'blue', at: 0.5 });
    s.arrow('f', 'h', { at: '#cloud' });
    s.arrow('h', 'd', { at: 'outside' });
    s.text('US CLOUD Act: data in its control, inside or outside the US', { x: xs[1], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#cloud' });
    s.text('GDPR Art. 48: enforceable in the EU only with an international agreement', { x: xs[2], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.24, at: '#gdpr' });
    s.text('The provider sits between two laws', { id: 'tl', y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#between' });
    s.annotate('tl', { type: 'underline', color: 'yellow', at: 'laws' });
  },

  saas(s) {
    const u = head(s, 'QUESTION 3 OF 4', 'European infrastructure, SaaS outside it');
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Our sovereign estate', { id: 'e', x: xs[0], y: s.H * 0.32, size: u * 2.2, icon: 'server', color: 'teal', at: 0.5 });
    s.box('SaaS, non-EU parent', { id: 'p', x: xs[1], y: s.H * 0.32, size: u * 2.2, icon: 'cloud', color: 'blue', at: '#sets' });
    s.arrow('e', 'p', { at: '#sets' });
    const fx = s.row(6, { width: s.safe.w * 0.85 });
    const f = [['Content', 'yellow', '#leave'], ['Identities', 'yellow', 'identities'], ['Metadata', 'yellow', 'metadata'], ['Support', 'blue', '#cond'], ['AI', 'blue', 'processing'], ['Our keys', 'teal', '#keys']];
    f.forEach(([t, color, at], i) => s.box(t, { x: fx[i], y: s.H * 0.56, size: u * 1.8, color, at }));
    s.text('leave', { x: (fx[0] + fx[2]) / 2, y: s.H * 0.68, size: u * 1.7, color: 'yellow', at: '#leave' });
    s.text('on conditions', { x: (fx[3] + fx[4]) / 2, y: s.H * 0.68, size: u * 1.7, color: 'muted', at: '#cond' });
    s.text('stay', { x: fx[5], y: s.H * 0.68, size: u * 1.7, color: 'teal', at: '#keys' });
    s.text('The SaaS sets our level', { y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: '#sets' });
  },

  exit(s) {
    const u = head(s, 'QUESTION 4 OF 4', 'Could we leave?');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Service stops', { id: 's', x: xs[0], y, size: u * 2.4, icon: 'power-off', color: 'red', at: '#stop' });
    s.box('Mail, logins, records', { id: 'r', x: xs[1], y, size: u * 2.4, icon: 'database', color: 'blue', at: '#stop' });
    s.box('Days until we work again: ?', { id: 'q', x: xs[2], y, size: u * 2.0, icon: 'timer', color: 'yellow', at: 'again' });
    s.arrow('s', 'r', { at: '#stop' });
    s.arrow('r', 'q', { at: 'again' });
    s.text('sanction, court order, bankruptcy', { x: xs[0], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#stop' });
    s.text('EU Data Act: switching notice at most two months. DORA: exit strategies', { x: xs[2], y: s.H * 0.6, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.24, at: '#act' });
    s.text('Export everything, open it elsewhere, time it', { id: 'ex', y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: '#test' });
    s.annotate('ex', { type: 'underline', color: 'teal', at: 'time' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Score', 'clipboard-check', 'suppliers on the eight objectives', '#score'], ['Own keys', 'key-round', 'an order yields ciphertext', '#own'], ['Flow map', 'map', 'per SaaS, what leaves', '#map'], ['Tested exit', 'log-out', 'once a year, per critical service', '#exit2']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('Framework: EU Cloud Sovereignty Framework, SEAL-2 and up', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#score' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = row3(s);
    s.box('Never reachable by a foreign order', { x: xs[0], y: s.H * 0.38, size: u * 1.9, icon: 'gavel', color: 'red', maxWidth: s.safe.w * 0.22, at: '#never' });
    s.box('Level we accept for the rest', { x: xs[1], y: s.H * 0.38, size: u * 1.9, icon: 'layers', color: 'blue', maxWidth: s.safe.w * 0.22, at: '#accept' });
    s.box('Tested exit, every critical service', { x: xs[2], y: s.H * 0.38, size: u * 1.9, icon: 'log-out', color: 'teal', maxWidth: s.safe.w * 0.22, at: '#tested' });
    s.text('three decisions', { y: s.H * 0.62, size: u * 2.1, color: 'yellow', at: '#three' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('A level, not a yes or no.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'level' });
    s.subtitle('ask which level, for which data', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

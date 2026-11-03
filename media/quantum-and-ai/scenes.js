// Facts from the quantum and AI briefing (English) only.
// Content scenes: kicker + title on top, a row of boxes at 40%, notes below, one yellow line at 78%.
function head(s, kicker, title) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return u;
}
const row3 = (s) => s.row(3, { width: s.safe.w * 0.7 });
const row2 = (s) => s.row(2, { width: s.safe.w * 0.5 });

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('atom', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Quantum and AI', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('when two threats converge', { y: s.cy + u * 11, color: 'muted', at: '#two' });
  },

  harvest(s) {
    const u = head(s, 'RISK 1 OF 4', 'Encrypted today, decrypted tomorrow');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Our traffic', { id: 't', x: xs[0], y, size: u * 2.4, icon: 'globe', color: 'blue', at: 0.4 });
    s.box('Recorded, stored', { id: 'r', x: xs[1], y, size: u * 2.4, icon: 'hourglass', color: 'red', at: '#store' });
    s.box('Quantum computer', { id: 'q', x: xs[2], y, size: u * 2.4, icon: 'atom', color: 'yellow', at: '#wait' });
    s.arrow('t', 'r', { at: '#store' });
    s.arrow('r', 'q', { at: '#wait' });
    s.text('a hostile party, today', { x: xs[1], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: 'hostile' });
    s.text('reads it later', { x: xs[2], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#wait' });
    s.text('Still valuable in ten years? The risk is today', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#ten' });
  },

  shortcut(s) {
    const u = head(s, 'RISK 2 OF 4', 'AI may find shortcuts');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('AI', { id: 'a', x: xs[0], y, size: u * 2.4, icon: 'bot', color: 'blue', at: '#pattern' });
    s.box('Encrypted data', { id: 'e', x: xs[1], y, size: u * 2.4, icon: 'lock', color: 'blue', at: '#pattern' });
    s.box('Test it', { id: 'x', x: xs[2], y, size: u * 2.4, icon: 'search-check', color: 'teal', at: '#test' });
    s.arrow('a', 'e', { label: 'patterns', labelFont: 'body', labelSize: u * 1.6, at: 'spot' });
    s.arrow('e', 'x', { at: '#test' });
    s.text('not a known attack yet, a category of risk', { y: s.H * 0.66, size: u * 2.1, color: 'yellow', at: '#notyet' });
    s.text('safe only until proven otherwise', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: 'assume' });
  },

  both(s) {
    const u = head(s, 'RISK 3 OF 4', 'Quantum and AI together');
    const xs = row2(s);
    const y = s.H * 0.4;
    s.box('RSA, ECC', { x: xs[0], y, size: u * 2.4, icon: 'key-round', color: 'red', at: '#shor' });
    s.box('AES-256', { x: xs[1], y, size: u * 2.4, icon: 'lock', color: 'teal', at: '#aes' });
    s.text('broken by a large quantum computer (Shor)', { x: xs[0], y: s.H * 0.57, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#shor' });
    s.text('stays strong', { x: xs[1], y: s.H * 0.57, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#aes' });
    s.text('AI speeds up quantum research and finds flaws faster', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#ai' });
  },

  lag(s) {
    const u = head(s, 'RISK 4 OF 4', 'We are not ready');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Quantum, from 2030', { x: xs[0], y, size: u * 2.2, icon: 'atom', color: 'yellow', at: '#aivd' });
    s.box('Migration is long', { x: xs[1], y, size: u * 2.2, icon: 'hourglass', color: 'blue', at: '#long' });
    s.box('Data encrypted today', { x: xs[2], y, size: u * 2.2, icon: 'database', color: 'red', at: '#late' });
    s.text('possible, says the Dutch AIVD', { x: xs[0], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#aivd' });
    s.text('every system that holds secrets', { x: xs[1], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: 'every' });
    s.text('stays exposed if we switch late', { x: xs[2], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#late' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(5, { width: s.safe.w * 0.85 });
    const c = [['Inventory', 'list-checks', 'where encryption is used', '#inv'], ['NIST', 'landmark', 'post-quantum standards, FIPS 203 to 205', '#std'], ['Hybrid', 'key-round', 'post-quantum key exchange', '#hyb'], ['HSM', 'hard-drive', 'keys in hardware', '#hsm'], ['Agility', 'refresh-cw', 'switch algorithms quickly', '#flex']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.0, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.15, at });
    });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = row3(s);
    const y = s.H * 0.38;
    s.box('Inventory and plan', { id: 'a', x: xs[0], y, size: u * 2.2, icon: 'list-checks', color: 'teal', at: '#inv2' });
    s.box('Most sensitive data', { id: 'b', x: xs[1], y, size: u * 2.2, icon: 'shield-check', color: 'teal', at: '#sens' });
    s.box('Migration finished', { id: 'c', x: xs[2], y, size: u * 2.2, icon: 'flag', color: 'teal', at: 'finish' });
    s.arrow('a', 'b', { at: '#sens' });
    s.arrow('b', 'c', { at: 'finish' });
    s.text('by end of 2027', { x: xs[0], y: s.H * 0.55, size: u * 1.8, color: 'muted', at: '#inv2' });
    s.text('by 2030', { x: xs[1], y: s.H * 0.55, size: u * 1.8, color: 'muted', at: '#sens' });
    s.text('by 2035', { x: xs[2], y: s.H * 0.55, size: u * 1.8, color: 'muted', at: 'finish' });
    s.text('a suggested timeline, not a legal deadline', { y: s.H * 0.74, size: u * 2.1, color: 'yellow', at: '#rec' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('It will outlive both threats.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'outlive' });
    s.subtitle('start the migration now', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

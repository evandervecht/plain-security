// Facts from the web security briefing (English) only.
// Content scenes: kicker + title on top, a row of boxes at 40%, notes below, one yellow line at 78%.
function head(s, kicker, title) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  return u;
}
const row3 = (s) => s.row(3, { width: s.safe.w * 0.7 });

// Three boxes joined by two arrows, each with a note, then one yellow line.
function chain(s, u, items, line) {
  const xs = row3(s);
  const y = s.H * 0.4;
  items.forEach(([t, icon, color, note, at], i) => {
    s.box(t, { id: `b${i}`, x: xs[i], y, size: u * 2.3, icon, color, maxWidth: s.safe.w * 0.22, at });
    s.text(note, { x: xs[i], y: s.H * 0.6, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    if (i) s.arrow(`b${i - 1}`, `b${i}`, { at });
  });
  s.text(line[0], { y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: line[1] });
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('door-open', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Your website', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('a front door anyone can knock on', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  inject(s) {
    const u = head(s, 'WAY IN 1 OF 4', 'A search box that talks to the database');
    chain(s, u, [
      ['Stranger', 'hat-glasses', 'red', 'types text into a form', '#form'],
      ['Search box', 'text-cursor-input', 'blue', 'typed text mixed with commands', '#type'],
      ['Customer database', 'database', 'blue', 'every record, one request', '#all'],
    ], ['GDPR: notify the regulator within 72 hours', 'regulator']);
  },

  plugin(s) {
    const u = head(s, 'WAY IN 2 OF 4', 'The plugin everyone forgot');
    chain(s, u, [
      ['Forgotten plugin', 'puzzle', 'yellow', 'content system, plugins, theme, libraries', '#many'],
      ['Hole and fix published', 'bug', 'red', 'fix and description together', '#pub'],
      ['Scanners', 'radar', 'red', 'sweep the internet for the old version', '#scan'],
    ], ['Found in hours', 'hours']);
  },

  stuffing(s) {
    const u = head(s, 'WAY IN 3 OF 4', 'Accounts opened with someone else\'s leak');
    chain(s, u, [
      ['Bot network', 'bot', 'red', 'tries leaked pairs, millions a night', '#bots'],
      ['Our login page', 'lock', 'blue', 'people reuse passwords', '#reuse'],
      ['Customer accounts', 'user-lock', 'blue', 'now open to the attacker', '#fraud'],
    ], ['Fraud on our site, refunds we pay, a headline about us', 'headline']);
  },

  skim(s) {
    const u = head(s, 'WAY IN 4 OF 4', 'Our page, their code');
    chain(s, u, [
      ['Customer', 'credit-card', 'blue', 'types card and password', '#third'],
      ['Our checkout', 'shopping-cart', 'blue', 'loads scripts from other companies', '#third'],
      ['Swapped script', 'file-code', 'red', 'reads every field on the page', '#read'],
    ], ['Payments still succeed, card numbers also go elsewhere', '#swap']);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['PCI DSS 4.0.1', 'credit-card', '6.4.3 and 11.6.1: script inventory, tamper detection', '#pci', 'inventory'], ['Safe code', 'file-code', 'and a yearly pentest', '#code'], ['Patching', 'refresh-cw', 'within days', '#patch'], ['Passkeys, MFA', 'key-round', 'for customer logins', '#pass']];
    c.forEach(([t, icon, n, at, nat], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.17, at: nat || at });
    });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('When was the last test?', { x: xs[0], y: s.H * 0.38, size: u * 2.2, icon: 'search-check', color: 'blue', at: '#ask' });
    s.box('Who is paged, by name?', { x: xs[1], y: s.H * 0.38, size: u * 2.2, icon: 'phone-call', color: 'teal', at: '#paged' });
    s.text('someone tried to break the site on our behalf', { x: xs[0], y: s.H * 0.55, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: 'behalf' });
    s.text('when it breaks for real', { x: xs[1], y: s.H * 0.55, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: 'real' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Test it on purpose.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'test' });
    s.subtitle('the one system every attacker can reach', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

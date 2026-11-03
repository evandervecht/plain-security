// Facts from the acquisitions briefing (English) only.
// Content scenes share one layout: kicker and title on top, cards on a row, yellow/muted lines below.
function cards(s, kicker, title, items, lines) {
  const u = s.W / 100;
  if (kicker) s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  const wide = items.length > 3;
  const xs = s.row(items.length, { width: s.safe.w * (wide ? 0.8 : 0.66) });
  items.forEach(([t, icon, note, at, color], i) => {
    const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 2.3, icon, color: color || 'blue', at });
    if (note) s.text(note, { x: xs[i], y: b.bottom + u * 2.2, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * (wide ? 0.17 : 0.24), at });
  });
  lines.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.68 + i * 0.07), size: u * 2.1, color, at }));
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('handshake', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Buying a company, buying its breaches', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('five questions before the deal', { y: s.cy + u * 11, color: 'muted', at: '#five' });
  },

  inside(s) {
    cards(s, 'QUESTION 1 OF 5', 'Is an attacker already inside?', [
      ['2014: way in', 'bug', 'Starwood systems, UK ICO', '#in', 'red'],
      ['2016: deal closes', 'handshake', 'Marriott buys Starwood', '#sw'],
      ['Sep 2018: found', 'search', 'the attacker stayed', '#found', 'yellow'],
    ], [['ICO fine: £18.4 million', 'yellow', '#fine'], ['for not securing the systems it had acquired', 'muted', 'securing']]);
  },

  estate(s) {
    cards(s, 'QUESTION 2 OF 5', 'What are we really buying?', [
      ['Asset list', 'list', 'what the IT team runs', '#list'],
      ['Agency website', 'globe', 'built by an agency', '#shadow', 'yellow'],
      ['Cloud account', 'cloud', 'opened on a company card', 'card', 'yellow'],
      ['Old VPN box', 'router', 'nobody patched', 'patched', 'yellow'],
    ], [['what nobody listed, nobody patches', 'red', '#owner']]);
  },

  connect(s) {
    cards(s, 'QUESTION 3 OF 5', 'When do we connect?', [
      ['Day one link', 'link', 'their weaknesses become ours', '#link', 'red'],
      ['Bridge period', 'door-open', 'controlled gateways', '#bridge', 'teal'],
      ['After the checks', 'list-checks', 'assessment, admin reset, MFA', '#after', 'teal'],
    ], [['connect in stages, not on day one', 'yellow', '#bridge'], ['their incident becomes yours the day you connect', 'red', 'MFA']]);
  },

  paper(s) {
    cards(s, 'QUESTION 4 OF 5', 'Who pays if it started before closing?', [
      ['Warranty', 'file-text', '"no known breach", only if someone looked', '#warr'],
      ['Cyber indemnity', 'file-check', 'pays for a pre-closing breach', '#indem', 'teal'],
      ['W&I insurance', 'shield', 'usually excludes what was known', '#wi', 'yellow'],
    ], [['a breach found late can fall between contract and policy', 'yellow', '#wi']]);
  },

  data(s) {
    cards(s, 'QUESTION 5 OF 5', 'Which personal data comes along?', [
      ['Customer records', 'users', 'on what basis?', '#recs'],
      ['Staff files', 'folder', 'kept how long?', 'staff'],
      ['Old breach', 'clock', 'reported 72 hours after awareness', '#clock', 'red'],
    ], [['their data history becomes yours', 'yellow', '#clock'], ['found after closing, it can still need reporting', 'muted', 'reporting'], ['GDPR Art. 33: 72 hours', 'muted', 'Article'], ['the clock starts when you become aware', 'muted', 'aware']]);
  },

  good(s) {
    cards(s, '', 'What good looks like', [
      ['Look inside', 'search', 'compromise assessment', '#look', 'teal'],
      ['Inventory', 'list', 'an owner for each system', '#inv', 'teal'],
      ['Staged connection', 'door-open', 'after the checks', '#stage', 'teal'],
      ['Cyber indemnity', 'file-check', 'insurer’s answer in writing', '#ind', 'teal'],
      ['Data inventory', 'folder', 'before systems merge', '#dat', 'teal'],
    ], [['NIS2 Art. 21(2)(i): asset management', 'muted', 'Article']]);
  },

  first(s) {
    cards(s, '', 'A suggested first step', [
      ['Who decides', 'user-round', 'when the networks connect', '#ask', 'teal'],
      ['On what terms', 'list-checks', 'the conditions', '#cond', 'teal'],
      ['Look inside', 'search', 'a compromise assessment first', '#ca', 'teal'],
    ], []);
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Security is part of the price.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'price' });
    s.subtitle('look before you connect', { y: s.cy + u * 6, color: 'muted', at: '#look2' });
  },
};

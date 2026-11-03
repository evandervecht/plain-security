// Facts from the incident-response briefing (English) only.
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
    s.icon('siren', { y: s.cy - u * 9, size: u * 9, color: 'red', at: 0.3 });
    s.title('The first 72 hours', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways they go wrong', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  decide(s) {
    cards(s, 'WRONG 1 OF 4', 'Nobody knows who decides', [
      ['Sunday 03:00', 'phone-call', 'encryption spreading', '#sun', 'red'],
      ['Network off?', 'power', 'stops the factory and the webshop too', '#off'],
      ['Whose call?', 'user-round', 'engineer, CIO or CEO', '#nobody', 'yellow'],
    ], [['every minute spent finding out, the incident grows', 'yellow', 'minute']]);
  },

  evidence(s) {
    cards(s, 'WRONG 2 OF 4', 'The evidence is gone within the hour', [
      ['Reboot, wipe', 'refresh-cw', 'the instinct to fix', '#reboot', 'red'],
      ['Destroyed', 'trash-2', 'memory, logs, timestamps', '#lost', 'yellow'],
      ['Insurer', 'file-x', 'may refuse the claim', '#claim', 'red'],
    ], [['isolate, don’t wipe', 'teal', 'wipe']]);
  },

  comms(s) {
    cards(s, 'WRONG 3 OF 4', 'Five audiences, five stories', [
      ['Staff', 'users', '', '#five'],
      ['Customers', 'user-round', '', 'customers'],
      ['Press', 'newspaper', '', 'press'],
      ['Regulator', 'landmark', '', 'regulator'],
      ['Insurer', 'shield', '', 'insurer'],
    ], [['"no data was affected", before anyone knows', 'yellow', '#contra'], ['the legal clocks started when we became aware', 'muted', '#clock'], ['NIS2: 24-hour early warning', 'yellow', 'early'], ['GDPR: 72 hours', 'yellow', 'GDPR']]);
  },

  help(s) {
    cards(s, 'WRONG 4 OF 4', 'Day one spent looking for help', [
      ['Us', 'building', 'no contract signed', '#firms', 'red'],
      ['Forensics firm', 'search', 'fully booked', 'booked', 'yellow'],
      ['Retainer', 'file-check', 'signed in peacetime', '#proc', 'teal'],
    ], [['everyone is calling at once', 'muted', 'calling'], ['without a retainer, day one is procurement', 'yellow', '#proc'], ['with the attacker still inside', 'red', 'inside']]);
  },

  good(s) {
    cards(s, '', 'What good looks like', [
      ['Plan', 'file-text', 'decision rights, deputies', '#plan', 'teal'],
      ['Phone list', 'phone', 'printed', '#phone', 'teal'],
      ['Isolate', 'shield-off', 'don’t wipe', '#isolate', 'teal'],
      ['Templates', 'mail', 'and a deadline list', '#tmpl', 'teal'],
      ['Retainer', 'file-check', 'signed in peacetime', '#ret', 'teal'],
    ], [['out-of-band channel, yearly tabletop exercise', 'muted', '#oob'], ['NIS2 Art. 23: the incident clocks', 'muted', '#art']]);
  },

  first(s) {
    cards(s, '', 'A suggested first step', [
      ['Rehearsal', 'clipboard-check', 'when did we last rehearse?', '#q1', 'teal'],
      ['Phone list', 'phone', 'printed, off the network?', '#q2', 'teal'],
    ], [['two questions for the board', 'yellow', '#ask']]);
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Nothing on this list is technology.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'technology' });
    const xs = s.row(3, { width: s.safe.w * 0.7 });
    [['paper', 'paper'], ['phone numbers', 'numbers'], ['one rehearsal a year', 'rehearsal']].forEach(([t, at], i) => s.text(t, { x: xs[i], y: s.cy + u * 11, size: u * 2.4, color: 'muted', at }));
  },
};

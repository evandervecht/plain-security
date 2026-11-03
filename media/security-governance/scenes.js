// Facts from the security-governance briefing (English) only.
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
    s.icon('gauge', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('How much security is enough?', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('five questions a board can govern', { y: s.cy + u * 11, color: 'muted', at: '#five' });
  },

  budget(s) {
    cards(s, 'QUESTION 1 OF 5', 'The budget', [
      ['EU median: 9%', 'chart-column', 'of the IT budget, ENISA 2024', '#median'],
      ['Benchmark', 'ruler', 'not a target', '#bench', 'yellow'],
      ['Risk appetite', 'target', 'first, then the budget', '#risk', 'teal'],
    ], [['ENISA: what others spend, not what you need', 'muted', 'percent'], ['spending the average buys the average', 'yellow', '#bench']]);
  },

  line(s) {
    cards(s, 'QUESTION 2 OF 5', 'The reporting line', [
      ['Security lead', 'user-round', 'can they say no to their boss?', '#ciso'],
      ['CIO', 'user', 'also owns the deadlines', '#cio', 'yellow'],
      ['Board', 'users-round', 'or its audit or risk committee', '#direct', 'teal'],
    ], [['the owner of the deadline decides what the board hears', 'yellow', '#cio']]);
  },

  numbers(s) {
    cards(s, 'QUESTION 3 OF 5', 'Five numbers a quarter', [
      ['Flaws fixed', 'wrench', 'critical, on time', '#n1'],
      ['Admin MFA', 'key-round', 'strong, on admin accounts', '#n2'],
      ['Restore', 'database-backup', 'last tested', '#n3'],
      ['Alert to action', 'bell-ring', 'out of hours', '#n4'],
      ['Overdue', 'alarm-clock', 'risks and findings', '#n5'],
    ], [['a tolerance each, the same five every quarter', 'yellow', '#tol']]);
  },

  review(s) {
    cards(s, 'QUESTION 4 OF 5', 'An outside view', [
      ['Marked by us', 'clipboard-check', 'the team marks its own homework', '#own'],
      ['Internal audit', 'search-check', 'DORA, financial entities', '#ia'],
      ['External review', 'telescope', 'after an incident, before a merger', '#ext', 'teal'],
    ], [['a dashboard that is always green is a question', 'yellow', '#own']]);
  },

  law(s) {
    cards(s, 'QUESTION 5 OF 5', 'What the law asks of the board', [
      ['Approve', 'stamp', 'the measures', '#d1'],
      ['Oversee', 'eye', 'their implementation', '#d2'],
      ['Be trained', 'graduation-cap', 'follow training', '#d3'],
      ['Be liable', 'scale', 'can be held liable', '#d4', 'red'],
    ], [['NIS2 Art. 20: management bodies', 'muted', 'Article'], ['the work can be delegated, the accountability cannot', 'yellow', '#d4']]);
  },

  good(s) {
    cards(s, '', 'What good looks like', [
      ['Risk appetite', 'target', 'written, budget follows', '#app', 'teal'],
      ['Direct line', 'route', 'security lead to board', '#dl', 'teal'],
      ['Five numbers', 'gauge', 'with tolerances', '#fn', 'teal'],
      ['Outside view', 'telescope', 'at set moments', '#out', 'teal'],
      ['Minutes', 'file-check', 'approval and training record', '#min', 'teal'],
    ], [['NIS2 Art. 20: the board approves, oversees, is trained', 'muted', '#min']]);
  },

  first(s) {
    cards(s, '', 'A suggested first step', [
      ['Risk appetite', 'target', 'the written one', '#q1', 'teal'],
      ['Direct line', 'route', 'reach us without permission', '#q2', 'teal'],
      ['Minuted approval', 'file-check', 'of the measures', '#q3', 'teal'],
    ], [['ask for three things', 'yellow', '#ask']]);
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Enough is the risk the board accepted.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'accept' });
    s.subtitle('write it down, and record it', { y: s.cy + u * 6, color: 'muted', at: '#rec' });
  },
};

// Facts from the cra briefing (English) only.
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
    s.icon('cpu', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Cyber Resilience Act', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('what it means for what you sell', { y: s.cy + u * 11, color: 'muted', at: '#four' });
    s.text('connected hardware and software, sold in the EU', { y: s.cy + u * 17, size: u * 2.2, color: 'yellow', at: 'makers' });
  },

  maker(s) {
    cards(s, 'QUESTION 1 OF 4', 'Are we a maker? Which class?', [
      ['Connected product', 'cpu', 'sold in the EU', '#sell'],
      ['Own brand', 'tag', 'makes us the manufacturer', '#brand', 'teal'],
      ['Product class', 'layers', 'default, I, II, critical', '#class', 'yellow'],
    ], [['connects to a device or a network', 'muted', 'network'], ['the class decides self-assessment or outside assessor', 'muted', 'critical']]);
  },

  report(s) {
    cards(s, 'QUESTION 2 OF 4', 'The 24-hour alarm', [
      ['Exploited', 'bug', 'actively, in the wild', '#since', 'red'],
      ['Hour 24', 'bell-ring', 'early warning', 'warning', 'yellow'],
      ['Hour 72', 'send', 'notification', '#72', 'yellow'],
    ], [['the clock starts when you become aware', 'muted', 'aware'], ['already in force, also for products sold before Dec 2027', 'muted', '#old'], ['late: up to €15 million', 'yellow', '#fine'], ['or 2.5% of worldwide turnover', 'yellow', 'worldwide']]);
  },

  design(s) {
    cards(s, 'QUESTION 3 OF 4', 'From 11 December 2027', [
      ['Secure by design', 'shield-check', 'risk assessment', '#sec'],
      ['SBOM', 'list-tree', 'component list', '#sbom'],
      ['Support period', 'calendar-clock', 'updates', '#sup'],
      ['CE mark', 'badge-check', 'conformity file', '#ce', 'teal'],
    ], [['no CE mark = no EU market', 'red', '#no']]);
  },

  import(s) {
    cards(s, 'QUESTION 4 OF 4', 'Importers and resellers', [
      ['Importer', 'ship', 'checks the file and the CE mark', '#imp'],
      ['Reseller', 'store', 'verifies the mark, passes on warnings', '#res'],
      ['Own brand', 'tag', 'you are the manufacturer', '#own', 'red'],
    ], []);
  },

  good(s) {
    cards(s, '', 'What good looks like', [
      ['Product list', 'list', 'with a class each', '#list', 'teal'],
      ['Reporting route', 'bell-ring', 'one named person, platform account', '#route', 'teal'],
      ['SBOM', 'list-tree', 'and vulnerability process', '#sbom2', 'teal'],
      ['Conformity file', 'file-check', 'for the CE mark', '#cefile', 'teal'],
    ], [['CRA Annex I: the essential requirements', 'muted', '#annex']]);
  },

  first(s) {
    cards(s, '', 'A suggested first step', [
      ['Product list', 'list', 'one class for each', '#ask', 'teal'],
      ['Rehearse', 'bell-ring', 'one 24-hour report', '#rehearse', 'teal'],
      ['SBOM', 'list-tree', 'and vulnerability process', '#sbomfirst', 'teal'],
    ], []);
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Know the list.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'list' });
    s.subtitle('keep the clock', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

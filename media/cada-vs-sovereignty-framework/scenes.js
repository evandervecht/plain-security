// Facts from the CADA vs framework briefing (English) only.
// Framework = left column, proposal (CADA) = right column, in every scene that compares them.
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
    s.icon('scale', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('CADA or the framework?', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('same ladder, different rules', { y: s.cy + u * 11, color: 'muted', at: '#two' });
  },

  two(s) {
    const u = head(s, 'STEP 1 OF 4', 'Two yardsticks, one word');
    const xs = row2(s);
    const y = s.H * 0.38;
    s.box('Framework', { id: 'f', x: xs[0], y, size: u * 2.4, icon: 'clipboard-check', color: 'teal', at: '#fw' });
    s.box('Cloud and AI Development Act', { id: 'c', x: xs[1], y, size: u * 2.0, icon: 'landmark', color: 'yellow', maxWidth: s.safe.w * 0.3, at: '#cada' });
    s.text('procurement tool, SEAL-0 to SEAL-4', { x: xs[0], y: s.H * 0.55, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#fw' });
    s.text('a proposal, four assurance levels', { x: xs[1], y: s.H * 0.55, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#cada' });
    s.text('would bind every public buyer in the EU', { y: s.H * 0.7, size: u * 2.1, color: 'yellow', at: '#bind' });
    s.text('guidance today  ·  not yet law', { y: s.H * 0.78, size: u * 2.1, color: 'muted', at: '#law' });
  },

  how(s) {
    const u = head(s, 'STEP 2 OF 4', 'How the levels work');
    const xs = row2(s);
    const y = s.H * 0.38;
    s.box('Framework', { x: xs[0], y, size: u * 2.4, icon: 'clipboard-check', color: 'teal', at: 0.4 });
    s.box('Proposal', { x: xs[1], y, size: u * 2.4, icon: 'landmark', color: 'yellow', at: 0.4 });
    s.text('the lowest of eight objectives sets the SEAL level', { x: xs[0], y: s.H * 0.55, size: u * 1.7, color: 'yellow', maxWidth: s.safe.w * 0.3, at: '#low' });
    s.text('level 1: self-assessed', { x: xs[1], y: s.H * 0.55, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: 'selfassessed' });
    s.text('levels 2 to 4: independent audit', { x: xs[1], y: s.H * 0.62, size: u * 1.7, color: 'yellow', maxWidth: s.safe.w * 0.3, at: 'independent' });
    s.text('national authority recognises, EU repository lists', { x: xs[1], y: s.H * 0.71, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.3, at: '#auth' });
  },

  who(s) {
    const u = head(s, 'STEP 3 OF 4', 'Who would have to comply');
    const xs = row3(s);
    const y = s.H * 0.4;
    const c = [['Public bodies', 'landmark', 'public-order activities: level 2, 3 or 4. The rest: level 1', 'yellow', '#public'], ['Private companies', 'building', 'not bound', 'blue', '#private'], ['Providers', 'server', 'recognition is voluntary, but no recognition means no public contract', 'blue', '#prov']];
    c.forEach(([t, icon, n, color, at], i) => {
      s.box(t, { x: xs[i], y, size: u * 2.4, icon, color, at });
      s.text(n, { x: xs[i], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    });
    s.text('everything else needs level 1 at least', { y: s.H * 0.8, size: u * 2.1, color: 'yellow', at: '#rest' });
  },

  examples(s) {
    const u = head(s, 'STEP 4 OF 4', 'The level follows the activity');
    const xs = row3(s);
    const y = s.H * 0.4;
    const c = [['Municipality', 'building', 'HR, finance: level 1', '#muni'], ['Hospital', 'hospital', 'patient care: level 2 or 3', '#hosp'], ['Court', 'gavel', 'case files: level 3', '#court']];
    c.forEach(([t, icon, n, at], i) => {
      s.box(t, { x: xs[i], y, size: u * 2.4, icon, color: i === 2 ? 'teal' : 'blue', at });
      s.text(n, { x: xs[i], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    });
    s.text('wrong level: the clock would be 12 months', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#clock' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Activity map', 'map', 'a level per activity', '#map'], ['Both scores', 'clipboard-check', 'SEAL and assurance level, per supplier', '#both'], ['Contract', 'file-text', 'level 2 clauses', '#clause'], ['Tested exit', 'log-out', 'for critical services', '#exit']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('Framework SEAL levels today, proposal levels 1 to 4 next', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#both' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = row3(s);
    s.box('Which activities are public order?', { x: xs[0], y: s.H * 0.38, size: u * 1.9, icon: 'map', color: 'blue', maxWidth: s.safe.w * 0.22, at: '#acts' });
    s.box('Which level from each supplier?', { x: xs[1], y: s.H * 0.38, size: u * 1.9, icon: 'layers', color: 'blue', maxWidth: s.safe.w * 0.22, at: '#lvl' });
    s.box('Run the voluntary assessment?', { x: xs[2], y: s.H * 0.38, size: u * 1.9, icon: 'clipboard-check', color: 'teal', maxWidth: s.safe.w * 0.22, at: '#vol' });
    s.text('three decisions', { y: s.H * 0.62, size: u * 2.1, color: 'yellow', at: '#three' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('One ladder to use today.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'ladder' });
    s.subtitle('one proposal to watch', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

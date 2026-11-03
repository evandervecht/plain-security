// Facts from the ai-sandboxing briefing (English) only.
// Question scenes share one layout: kicker, title, a row of boxes with captions, then up to three notes.
function page(s, kicker, title, boxes, notes) {
  const u = s.W / 100;
  s.text(kicker, { y: s.H * 0.1, size: u * 1.9, font: 'mono', color: 'teal', at: 0.2 });
  s.text(title, { y: s.H * 0.18, size: u * 3.8, font: 'display', at: 0.3 });
  const xs = s.row(boxes.length, { width: s.safe.w * (boxes.length > 3 ? 0.8 : 0.62) });
  const cw = ((s.safe.w * 0.8) / Math.max(boxes.length, 3)) * 0.9;
  boxes.forEach(([t, icon, color, at, cap], i) => {
    const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color, at });
    if (cap) s.text(cap, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: cw, at });
  });
  notes.forEach(([t, color, at], i) => s.text(t, { y: s.H * (0.68 + i * 0.075), size: u * 2.1, color, at }));
  return u;
}

export default {
  intro(s) {
    const u = s.W / 100;
    s.icon('box', { y: s.cy - u * 9, size: u * 9, color: 'purple', at: 0.3 });
    s.title('A sandbox for AI', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('where should an agent be allowed to run?', { y: s.cy + u * 11, color: 'muted', at: '#follow' });
  },

  laptop(s) {
    page(s, 'WAY 1 OF 4', 'The agent runs as you', [
      ['Agent', 'bot', 'orange', 0.5, 'on a work laptop'],
      ['Your rights', 'key-round', 'red', '#rights', 'files, passwords, cloud keys'],
      ['One hidden line', 'eye-off', 'red', '#hidden', 'in a page or ticket'],
    ], [
      ['safeguards outside the model (NCSC UK)', 'teal', '#ncsc'],
      ['one vendor’s sandbox is off by default', 'yellow', '#off'],
    ]);
  },

  wall(s) {
    page(s, 'WAY 2 OF 4', 'A container is a thin wall', [
      ['Container', 'box', 'red', '#kernel', 'shares the kernel'],
      ['gVisor', 'layers', 'orange', '#own', 'own kernel layer'],
      ['microVM or VM', 'server', 'green', '#own', 'its own kernel'],
    ], [
      ['AI-written code: consider a stronger wall', 'yellow', '#match'],
    ]);
  },

  door(s) {
    page(s, 'WAY 3 OF 4', 'The door is open, the keys are inside', [
      ['Sandbox', 'box', 'blue', 0.5, 'agent and real key'],
      ['Any website', 'globe', 'red', '#leave', 'not on any list'],
      ['Short-lived token', 'timer', 'green', '#broker', 'for one task'],
    ], [
      ['block outbound by default, allow a short list', 'yellow', '#block'],
      ['real keys stay outside', 'teal', '#broker'],
    ]);
  },

  pilot(s) {
    page(s, 'WAY 4 OF 4', 'The pilot that never ended', [
      ['Week 1', 'flask-conical', 'green', '#test', 'test data, end date'],
      ['Real data copied in', 'database', 'orange', '#real', 'to make it convincing'],
      ['Month 7', 'ghost', 'red', '#month', 'daily use, no owner, no logs'],
    ], [
      ['personal data in a pilot is still personal data', 'yellow', '#gdpr'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['Throwaway machine', 'trash-2', 'nothing of value inside', '#throw'], ['Matched wall', 'layers', 'to what runs inside', '#wallc'], ['Blocked by default', 'shield-ban', 'no standing keys', '#default'], ['Person at each exit', 'user-check', 'merge, deploy, send, pay', '#person']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('OWASP: unexpected code execution is a top ten agent risk', { id: 'ow', y: s.H * 0.7, size: u * 2.1, color: 'muted', at: '#owasp' });
    s.annotate('ow', { type: 'underline', color: 'teal', at: 'agents' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(3, { width: s.safe.w * 0.8 });
    [['Check the setting', 'search-check', '#check', 'sandboxed today?'], ['Machine of their own', 'server', '#own2', 'not someone’s laptop'], ['Three pilot rules', 'list-checks', '#rules', 'fake data, end date, one route']].forEach(([t, icon, at, n], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.36, size: u * 2.4, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.24, at });
    });
    s.text('where to start is your call', { y: s.H * 0.68, size: u * 2.1, color: 'yellow', at: '#call' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Nothing of value inside.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'value' });
    s.subtitle('and nowhere to send it', { y: s.cy + u * 6, color: 'muted', at: 'nowhere' });
  },
};

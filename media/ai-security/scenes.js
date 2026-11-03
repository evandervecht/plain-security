// Facts from the ai-security briefing (English) only.
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
    s.icon('bot', { y: s.cy - u * 9, size: u * 9, color: 'purple', at: 0.3 });
    s.title('AI at work', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('four ways it turns on us', { y: s.cy + u * 11, color: 'muted', at: '#four' });
  },

  leak(s) {
    page(s, 'RISK 1 OF 4', 'Our secrets go in', [
      ['Employee', 'laptop', 'blue', '#paste', 'pastes a contract'],
      ['Public AI tool', 'bot', 'red', '#keep', 'may train on it'],
      ['No log', 'eye-off', 'orange', '#nolog', 'no alert, no recall'],
    ], [
      ['forbidding the tools does not work', 'yellow', '#ban'],
      ['the paste moves to a personal phone', 'muted', 'phone'],
    ]);
  },

  hijack(s) {
    page(s, 'RISK 2 OF 4', 'Our assistant takes orders from a stranger', [
      ['Attacker\u2019s email', 'mail', 'red', '#mail', 'hidden white text'],
      ['Our assistant', 'bot', 'orange', '#obeys', 'cannot tell the difference'],
      ['Our files', 'files', 'blue', '#rights', 'send, delete, pay'],
    ], [
      ['one email, the full access of the assistant', 'yellow', '#rights'],
    ]);
  },

  deepfake(s) {
    page(s, 'RISK 3 OF 4', 'The CFO on the phone is not the CFO', [
      ['Public audio', 'mic', 'blue', '#clone', 'a few minutes is enough'],
      ['Cloned voice', 'phone-call', 'red', '#fri', 'Friday, late, urgent'],
      ['Finance', 'banknote', 'orange', '#fri', ''],
    ], [
      ['urgency is the weapon', 'yellow', 'weapon'],
      ['voice and video are no longer proof of identity', 'red', '#proof'],
    ]);
  },

  made(s) {
    page(s, 'RISK 4 OF 4', 'It sounded right. It was made up.', [
      ['AI assistant', 'bot', 'blue', '#fluent', 'fluent, confident'],
      ['Legal memo', 'file-text', 'orange', '#ruling', 'cites a ruling that does not exist'],
      ['Board decision', 'clipboard-check', 'red', '#ruling', 'nobody checked'],
    ], [
      ['AI output is a draft', 'yellow', '#draft'],
    ]);
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.8 });
    const c = [['Approved tool', 'badge-check', 'no training on our data', '#tool'], ['Least privilege', 'user-lock', 'a person approves actions', '#least'], ['Call-back', 'phone-call', 'known number for money', '#call'], ['Inventory', 'list', 'where AI is used', '#act']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 3.2, size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.19, at });
    });
    s.text('OWASP LLM Top 10: prompt injection ranked first', { id: 'ow', y: s.H * 0.68, size: u * 2.1, color: 'muted', at: '#owasp' });
    s.text('AI Act Art. 4: support staff\u2019s AI literacy', { id: 'ai', y: s.H * 0.75, size: u * 2.1, color: 'muted', at: '#act' });
    s.annotate('ow', { type: 'underline', color: 'teal', at: 'first' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Inventory of AI use', { x: xs[0], y: s.H * 0.36, size: u * 2.6, icon: 'list', color: 'teal', at: '#inv' });
    s.box('One approved tool', { x: xs[1], y: s.H * 0.36, size: u * 2.6, icon: 'badge-check', color: 'teal', at: '#one' });
    s.text('data and rights for each', { x: xs[0], y: s.H * 0.5, size: u * 2, color: 'muted', at: '#inv' });
    s.text('plus a one-page usage policy', { x: xs[1], y: s.H * 0.5, size: u * 2, color: 'muted', at: '#one' });
    s.text('where to start is your call', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#call' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Output is a draft.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'draft' });
    s.subtitle('what AI reads is untrusted', { y: s.cy + u * 6, color: 'muted', at: 'untrusted' });
  },
};

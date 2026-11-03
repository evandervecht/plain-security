// Facts from the AI agents briefing (English) only.
// Every content scene: kicker + title on top, a row of boxes at 38-40%, notes below.
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
    s.icon('bot', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('AI agents', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('five things decide: gain or new way in', { y: s.cy + u * 11, color: 'muted', at: '#five' });
    s.note('Claude · Codex · Hermes', { y: s.cy + u * 16, size: u * 1.8, at: '#names' });
  },

  model(s) {
    const u = head(s, 'THING 1 OF 5', 'The model writes, the harness acts');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Model', { id: 'm', x: xs[0], y, size: u * 2.4, icon: 'brain', color: 'blue', at: '#model' });
    s.box('Harness', { id: 'h', x: xs[1], y, size: u * 2.4, icon: 'cog', color: 'teal', at: '#harness' });
    s.box('Our systems', { id: 'o', x: xs[2], y, size: u * 2.4, icon: 'laptop', color: 'blue', at: '#harness' });
    s.arrow('m', 'h', { at: '#harness' });
    s.arrow('h', 'o', { at: 'commands' });
    s.text('reads and writes text', { x: xs[0], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#model' });
    s.text('runs commands, asks for approval', { x: xs[1], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: 'approval' });
    s.text('files · commands · network', { x: xs[2], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: 'approval' });
    s.text('Which model? Which harness? Where does our data go?', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#ask' });
  },

  parts(s) {
    const u = head(s, 'THING 2 OF 5', 'Agents, skills, MCP servers');
    const xs = row3(s);
    const y = s.H * 0.4;
    const c = [['Agent', 'bot', 'model + harness in a loop', '#agent'], ['Skill', 'file-text', 'folder of instructions for one task', '#skill'], ['MCP server', 'plug', 'plug into mail, tickets, a database', '#mcp']];
    c.forEach(([t, icon, n, at], i) => {
      s.box(t, { x: xs[i], y, size: u * 2.4, icon, color: i ? 'blue' : 'teal', at });
      s.text(n, { x: xs[i], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at });
    });
    s.text('each one adds power, and a way to misuse it', { y: s.H * 0.78, size: u * 2.1, color: 'yellow', at: '#power' });
  },

  software(s) {
    const u = head(s, 'THINGS 3 AND 4 OF 5', 'Skills and servers are software');
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    const y = s.H * 0.38;
    s.box('Skill', { x: xs[0], y, size: u * 2.4, icon: 'file-text', color: 'blue', at: '#hidden' });
    s.box('MCP server', { x: xs[1], y, size: u * 2.4, icon: 'plug', color: 'blue', at: '#laptop' });
    s.text('invisible characters, readable by the model', { x: xs[0], y: s.H * 0.54, size: u * 1.7, color: 'yellow', maxWidth: s.safe.w * 0.4, at: 'characters' });
    s.text('scripts are run, not read', { x: xs[0], y: s.H * 0.64, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.4, at: '#scripts' });
    s.text('runs with the same rights as the AI application', { x: xs[1], y: s.H * 0.54, size: u * 1.7, color: 'yellow', maxWidth: s.safe.w * 0.4, at: 'rights' });
    s.text('OWASP Top 10 for AI applications (2025): prompt injection is number 1', { id: 'ow', y: s.H * 0.8, size: u * 2.1, color: 'muted', at: '#owasp' });
    s.annotate('ow', { type: 'underline', color: 'red', at: 'injection' });
  },

  limits(s) {
    const u = head(s, 'THING 5 OF 5', 'Limits outside the model');
    const xs = row3(s);
    const y = s.H * 0.4;
    s.box('Model', { id: 'm', x: xs[0], y, size: u * 2.4, icon: 'brain', color: 'blue', at: 0.4 });
    s.box('Sandbox', { id: 'sb', x: xs[1], y, size: u * 2.4, icon: 'folder-lock', color: 'teal', at: '#sandbox' });
    s.box('A person', { id: 'p', x: xs[2], y, size: u * 2.4, icon: 'user-check', color: 'teal', at: '#person' });
    s.arrow('m', 'sb', { at: '#sandbox' });
    s.arrow('sb', 'p', { at: '#person' });
    s.text('can be talked into things', { x: xs[0], y: s.H * 0.58, size: u * 1.7, color: 'yellow', maxWidth: s.safe.w * 0.22, at: '#talk' });
    s.text('reaches only the project folder', { x: xs[1], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: 'folder' });
    s.text('risky actions wait here', { x: xs[2], y: s.H * 0.58, size: u * 1.7, color: 'muted', maxWidth: s.safe.w * 0.22, at: '#person' });
  },

  good(s) {
    const u = s.W / 100;
    s.text('What good looks like', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(4, { width: s.safe.w * 0.7 });
    const c = [['Approved list', 'list-checks', 'agents, skills, servers, an owner', '#list'], ['Review', 'search-check', 'read every file before install', '#review'], ['Narrow tokens', 'key-round', 'one per server', '#narrow'], ['Sandbox', 'folder-lock', 'every action logged', '#sandbox2']];
    c.forEach(([t, icon, n, at], i) => {
      const b = s.box(t, { x: xs[i], y: s.H * 0.38, size: u * 2.1, icon, color: 'teal', at });
      s.text(n, { x: xs[i], y: b.bottom + u * 1.5, valign: 'top', size: u * 1.6, color: 'muted', maxWidth: s.safe.w * 0.16, at });
    });
    s.text('Sandbox, approvals and narrow rights as the default', { y: s.H * 0.72, size: u * 2.1, color: 'yellow', at: '#sandbox2' });
  },

  first(s) {
    const u = s.W / 100;
    s.text('A suggested first step', { y: s.H * 0.1, size: u * 3.8, font: 'display', at: 0.3 });
    const xs = s.row(2, { width: s.safe.w * 0.5 });
    s.box('Which agents, who chose them?', { id: 'w', x: xs[0], y: s.H * 0.38, size: u * 2.3, icon: 'bot', color: 'blue', at: '#who' });
    s.box('One approved list', { id: 'l', x: xs[1], y: s.H * 0.38, size: u * 2.3, icon: 'list-checks', color: 'teal', at: '#list2' });
    s.arrow('w', 'l', { at: '#list2' });
    s.text('settings fixed centrally', { x: xs[1], y: s.H * 0.56, size: u * 1.8, color: 'muted', at: 'centrally' });
  },

  outro(s) {
    const u = s.W / 100;
    s.title('Limits around the model.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'limits' });
    s.subtitle('approve the harness, not only the model', { y: s.cy + u * 6, color: 'muted', at: '#keep' });
  },
};

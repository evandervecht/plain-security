// Facts from the terraform-state briefing (English) only.
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
    s.icon('map', { y: s.cy - u * 9, size: u * 9, color: 'blue', at: 0.3 });
    s.title('Terraform state', { y: s.cy + u * 4, at: 0.3 });
    s.subtitle('the map of everything you run', { y: s.cy + u * 11, color: 'muted', at: '#map' });
    s.text('asset or liability?', { y: s.cy + u * 17, size: u * 2.4, color: 'yellow', at: 'liability' });
  },

  what(s) {
    cards(s, 'THING 1 OF 5', 'What state is', [
      ['The code', 'file-code', 'what you want', '#code'],
      ['The state', 'map', 'what was built, and its ID', '#state', 'teal'],
      ['The cloud', 'cloud', 'what actually runs', '#cloud'],
    ], [['lose the state, the tool forgets what it owns', 'yellow', '#lose']]);
  },

  secrets(s) {
    cards(s, 'THING 2 OF 5', 'Secrets in the state', [
      ['Secret in the config', 'key-round', 'stored in the state too', '#plain', 'red'],
      ['Encrypted at rest', 'lock', 'protects a stolen disk', '#enc'],
      ['Read access', 'users', 'decrypted for every reader', 'everyone', 'yellow'],
    ], [['encrypted at rest, plain text to every reader', 'yellow', '#who']]);
  },

  lock(s) {
    cards(s, 'THING 3 OF 5', 'Two writers, one file', [
      ['Pipeline', 'workflow', 'writes the state', '#two'],
      ['Engineer', 'laptop', 'writes the state', 'engineer'],
      ['Lock', 'lock', 'the first one in holds it', '#lock', 'teal'],
      ['Versions', 'history', 'a bad write can be undone', '#ver', 'teal'],
    ], [['S3: locking is off unless you turn it on', 'yellow', '#s3']]);
  },

  boot(s) {
    cards(s, 'THING 4 OF 5', 'Who builds where state lives?', [
      ['Start local', 'laptop', 'a small separate setup', '#start'],
      ['Build storage', 'database', 'locked, versioned, encrypted', '#build'],
      ['Move in', 'arrow-right-to-line', 'the local copy goes', '#move', 'teal'],
    ], [['the storage must exist before Terraform can use it', 'yellow', '#chick']]);
  },

  where(s) {
    cards(s, 'THING 5 OF 5', 'Where state lives', [
      ['HCP Terraform', 'cloud', 'hosted: account and tokens', '#four'],
      ['GitLab', 'git-branch', 'per project: Developer and up', 'GitLab'],
      ['Amazon S3', 'database', 'your bucket: IAM and KMS', 'Amazon'],
      ['Azure Storage', 'hard-drive', 'your account: Entra ID', 'Azure'],
    ], [['all encrypt at rest, the difference is who can read', 'yellow', '#diff']]);
  },

  good(s) {
    cards(s, '', 'What good looks like', [
      ['Remote state', 'cloud', 'never in Git', '#remote', 'teal'],
      ['Short reader list', 'users', 'reviewed', '#short', 'teal'],
      ['No secrets', 'key-round', 'kept out of state', '#nosec', 'teal'],
      ['Lock + versions', 'lock', 'on', '#lv', 'teal'],
      ['Bootstrap', 'file-check', 'documented, with an owner', '#boot', 'teal'],
    ], [['NIS2 Art. 21 lists', 'muted', '#nis'], ['backup, access control, asset management', 'muted', 'backup'], ['well run state can support all three', 'muted', 'support']]);
  },

  first(s) {
    cards(s, '', 'A suggested first step', [
      ['Reader list', 'users', 'not the encryption setting', '#ask', 'teal'],
      ['Restore', 'history', 'has anyone tried one?', '#rest', 'teal'],
    ], []);
  },

  outro(s) {
    const u = s.W / 100;
    s.title('The state is a crown jewel.', { id: 't', y: s.cy - u * 2, at: 0.2 });
    s.annotate('t', { type: 'underline', color: 'teal', at: 'crown' });
    s.subtitle('give it an owner', { y: s.cy + u * 6, color: 'muted', at: '#own' });
  },
};

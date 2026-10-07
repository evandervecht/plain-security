@AGENTS.md

## Development workflow

### GitHub Actions version pinning

All action versions in `.github/workflows/*.yml` use v7.0.x (actions/checkout@v7.0.1, actions/setup-node@v7.0.0). These are SHA-pinned in the workflow files to avoid accidental downgrades. If you see a workflow with v4.x or v6.x actions, correct it to v7.0.x and verify against the main branch before committing.

**Why:** Browser startup in CI depends on v7.0.0+ to properly report the DevTools port. v4.x causes timeouts ("failed to find open port for DevTools"). A pre-commit hook prevents regressions; if blocked, check that your changes don't downgrade action versions.

### UTF-8 encoding validation

All HTML, SVG, and Python files (especially briefing pages and diagram generators) must be UTF-8 encoded. A pre-commit hook in `.githooks/pre-commit` validates this before each commit. After the first clone or branch switch, enable the hook:

```bash
git config core.hooksPath .githooks
```

The hook checks staged `.html`, `.svg`, and `.py` files for correct UTF-8 encoding and prevents commit if any file has mojibake or mixed encoding. If you hit the error:

```bash
iconv -f iso-8859-1 -t utf-8 <file> > <file>.tmp && mv <file>.tmp <file>
```

or re-save the file as UTF-8 in your editor, then stage and commit again.

**Why:** Character-encoding corruption (mojibake) in briefing pages breaks Dutch accents and special characters for readers. PR #63 shipped with undetected UTF-8 corruption; this hook prevents recurrence.

### Worktree cleanup after merge

When a PR merges, its worktree (e.g., `C:/Work/ps-issue42` for issue-42) becomes stale and should be deleted. After a successful merge:

```bash
git worktree remove /path/to/worktree
```

Stale worktrees accumulate over time and can cause "already used by worktree at" errors if you reuse a branch name. Run `git worktree list` to see active worktrees, and `git worktree prune` to remove dead references.

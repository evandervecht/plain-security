@AGENTS.md

## Development workflow

### GitHub Actions version pinning

All action versions in `.github/workflows/*.yml` use v7.0.x (actions/checkout@v7.0.1, actions/setup-node@v7.0.0). These are SHA-pinned in the workflow files to avoid accidental downgrades. If you see a workflow with v4.x or v6.x actions, correct it to v7.0.x and verify against the main branch before committing.

**Why:** Browser startup in CI depends on v7.0.0+ to properly report the DevTools port. v4.x causes timeouts ("failed to find open port for DevTools"). A pre-commit hook prevents regressions; if blocked, check that your changes don't downgrade action versions.

### Worktree cleanup after merge

When a PR merges, its worktree (e.g., `C:/Work/ps-issue42` for issue-42) becomes stale and should be deleted. After a successful merge:

```bash
git worktree remove /path/to/worktree
```

Stale worktrees accumulate over time and can cause "already used by worktree at" errors if you reuse a branch name. Run `git worktree list` to see active worktrees, and `git worktree prune` to remove dead references.

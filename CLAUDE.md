@AGENTS.md

## Development workflow

### GitHub Actions version pinning

All action versions in `.github/workflows/*.yml` use v7.0.x (actions/checkout@v7.0.1, actions/setup-node@v7.0.0). These are SHA-pinned in the workflow files to avoid accidental downgrades. If you see a workflow with v4.x or v6.x actions, correct it to v7.0.x and verify against the main branch before committing.

**Why:** Browser startup in CI depends on v7.0.0+ to properly report the DevTools port. v4.x causes timeouts ("failed to find open port for DevTools").

**Setup:**
```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```
The pre-commit hook automatically validates version pins and prevents regressions. If blocked, the hook message explains what went wrong; common causes are loose version tags (e.g., `v7.0` without SHA) or accidental downgrades (e.g., bumping back to v4.x).

**Verification process for maintenance:**
1. Check the release notes of each action for breaking changes to inputs, outputs, or defaults.
2. Cross-reference against this workflow's usage: does it use `pull_request_target`? Does it pass custom inputs to setup-node?
3. Note any functional tests skipped (e.g., workflow not run in CI) and how they'll be confirmed (e.g., "first briefing PR will confirm").
4. Document findings in the PR body under a "Risk" section.

### Worktree cleanup after merge

When a PR merges, its worktree (e.g., `C:/Work/ps-issue42` for issue-42) becomes stale and should be deleted. After a successful merge:

```bash
git worktree remove /path/to/worktree
```

Stale worktrees accumulate over time and can cause "already used by worktree at" errors if you reuse a branch name. Run `git worktree list` to see active worktrees, and `git worktree prune` to remove dead references.

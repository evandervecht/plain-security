# Review rules

What the review lanes hold a PR in this repo to. AGENTS.md is the briefing standard and CLAUDE.md has the workflow rules; this file says what is worth raising.

## Important (blocker or major)
- A visible string with an `.en` span but no matching `.nl` span (or the reverse), or two languages that say different things. Dutch must use formal "u" and Dutch legal names (Cyberbeveiligingswet, AVG, Autoriteit Persoonsgegevens).
- A date, deadline, figure, version or product name that is unverified, or a statistic without its source and year. The sources line under the compliance table must be updated to match the change.
- Regulatory wording that differs from the "Canonical regulatory text" table in AGENTS.md (NIS2/DORA/CRA clocks, Cbw, AI Act, PQC dates), or an incident classification stated as "is" instead of "can count as".
- Mandatory tone: a `FIX:`/`OPLOSSING:` pill instead of `SUGGESTED:`/`AANBEVOLEN:`, or "must" without naming the law.
- A timeline or deadline list without the "suggested, not a legal deadline" disclaimer, or a date not labelled as law, recommendation, draft or guidance.
- Visible text growing more than 10% (`node tools/check.mjs <slug> --baseline main`), or more than one diagram on a page.
- A workflow action not SHA-pinned or downgraded below v7.0.x (CLAUDE.md, `.githooks/pre-commit`).
- A `.html`, `.svg` or `.py` file that is not UTF-8 (mojibake in Dutch accents).
- A change to `main` directly, or a PR touching more than the page concerned (shared canonical text gets its own PR).

## Minor
- An acronym without a tooltip on first use in a section, or a tip over 160 characters.
- A diagram missing its tooltips, legend, `role="img"` with title and desc, prefixed SVG classes, or the mobile scroll rule.
- A PR description that skips the AGENTS.md template (What changed, Verified against, Checks, Left out on purpose).

## Skip
- Layout, colour and wording taste that does not break the rules above.
- Asking for a build step, framework, tracking or script: the site is static on purpose.
- More than three nits per lane.

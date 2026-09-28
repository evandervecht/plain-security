# Plain Security

Security, explained for the board. Plain-language briefings on the risks that matter and the controls worth considering for each one, in English and Dutch. The tone is advisory: we explain and suggest, the reader decides.

Live: https://plain-security.fyi

## What a briefing is

Every topic is one self-contained HTML file with the same shape:

1. Hero with the topic in one sentence.
2. Three to five steps or risks (usually four). Each has a CSS-only animation, a plain-language explanation, a business-impact paragraph, a "What AI changes here" row, and a risk pill and a `SUGGESTED:` pill.
3. Optional **In practice** section: at most one reference-architecture diagram with hover/tap tooltips, only where it replaces explanation.
4. A controls table: one line per control, which step it contains.
5. A board-level callout: the decision the board owns, phrased as advice.
6. Risk and compliance: a six-tile risk register card (likelihood, impact, residual, owner, key risk indicators, one-sentence register entry) and a table for NIS2, DORA, SOC 2 and ISAE 3402 with three columns: what it requires of you, what to look for when a supplier hands you their report, and what happens when this incident hits you. Directly under it, a one-line **sources** note: what was checked, against which primary source, and when.
7. Optional **related** line (at most three links) above the "Missing anything?" buttons.

Acronyms carry a short tooltip on first use per section. Timelines and deadlines carry a "suggested, not a legal deadline" note.

**The content rules, reusable components and definition of done are in [AGENTS.md](AGENTS.md).** Read it before writing or changing a briefing; agents do too (`CLAUDE.md` points to it).

Everything is bilingual. The EN/NL toggle is CSS radio buttons; one small script remembers the choice in `localStorage` across pages. No build step, no framework, no tracking, no cookies.

## Repository layout

```
index.html              landing page: search, cards, topic request, sponsor
<slug>/index.html       one folder per briefing
AGENTS.md               briefing standard: rules, components, canonical regulatory text
CLAUDE.md               points agents at AGENTS.md
tools/                  dev-only: checks, tooltip + diagram generators (pages stay static)
sponsors/index.html     sponsors page ($100/month tier)
logo.svg  logo-nl.svg   wordmark, English and Dutch tagline
favicon.svg
CNAME                   custom domain for GitHub Pages
.github/                issue forms (EN/NL), issue auto-labeler
```

Hosted on GitHub Pages from the `main` branch root. HTTPS is enforced.

## Adding a briefing

1. Copy an existing briefing folder to `<slug>/`. `quantum-and-ai/` is the most complete reference (tooltips, diagrams, sources line, related line).
2. Keep the generic CSS and the structure. Replace the scenes, the text, the controls table, the callout and the risk and compliance content. Every visible string needs both an `.en` and an `.nl` span. Follow [AGENTS.md](AGENTS.md): advisory tone, verified facts, disclaimer on timelines, tooltips, sources line.
3. Add a card to `index.html` inside `.cards`, with a `data-k` attribute holding search keywords in both languages.
4. Add a `page: <slug>` entry to `.github/labeler.yml` and create the matching label.
5. Run `node tools/check.mjs <slug>`, commit, push. Pages deploys in about a minute. For a change to an existing page, add `--baseline main` to enforce the 10% text budget.

## Checks before pushing

`node tools/check.mjs` runs all of them (Node 22+, a local Chrome or Edge; `CHROME=` overrides the path, `--static` skips the browser). These caught real defects during the build:

- **Tag balance**: every opened tag closed, per file.
- **Brace balance**: `{` and `}` counts inside `<style>` equal. A missing brace in the mobile media block silently swallows everything after it.
- **Required parts**: `id="risk"`, `href="#risk"` in the nav, `href="../"` on the brand, the favicon link.
- **Language visibility**: in headless Edge, force Dutch and count English elements still visible, then the reverse. Both must be zero. A rule with its own `display` value that is later or more specific than the hide rule will leak.
- **Mobile overflow**: at phone width, `scrollWidth` must equal `clientWidth`. Tables stack into blocks below 820px. Hidden tooltip bubbles must use `display:none`, not `opacity:0`, or they widen the page.
- **Standard** (AGENTS.md): no `FIX:`/`OPLOSSING:` pills, tooltips non-empty and at most 160 characters, at most one diagram, a disclaimer where dates are shown, a sources line, and with `--baseline <ref>` visible text grows at most 10%.
- **Diagram classes**: every class inside an inline SVG is prefixed (`tools/tips.py` `scope_classes`). Page CSS such as `.bar` otherwise resizes SVG shapes.

Headless Edge notes: the host may report `prefers-reduced-motion`, and `--virtual-time-budget` does not advance every animation. To see a later animation frame, inject `animation-delay:-6.5s !important` on the stage elements in a test copy instead.

## Requesting a topic

Use the issue forms: **Topic request** (English) or **Onderwerpverzoek** (Dutch). They ask for a topic name, the board's question, the audience and the language, in fixed fields so a request can be picked up mechanically. Every form also puts the briefing-standard checklist into the issue body, so whoever picks it up — person or agent — works to AGENTS.md. The auto-labeler adds category labels (`topic-request`, `bug`, `mobile`, `translation`, `compliance`, `region`, `sponsor`) and a `page: <slug>` label when an issue concerns an existing briefing.

## Sponsors

Sponsoring keeps the briefings free, ad-free and untracked: [github.com/sponsors/evandervecht](https://github.com/sponsors/evandervecht). Sponsors at $15 a month are listed here; sponsors at $100 a month also get their logo on [plain-security.fyi/sponsors](https://plain-security.fyi/sponsors/).

<!-- One line per $15+/month sponsor: [Name](https://example.com) -->
No sponsors yet. [Be the first.](https://github.com/sponsors/evandervecht)

## Content notes

The compliance tables are indicative and say so on every page. Timelines are suggestions, not legal deadlines, and each page names the kind of date it shows (law, recommendation, draft or guidance). Every page lists what was checked against which primary source, and when. Confirm scope and deadlines with legal and compliance before relying on them. The regulatory content is EU and Dutch by construction; region variants for the UK, US and Switzerland are on the list but not built.

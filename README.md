# Plain Security

Security, explained for the board. Plain-language briefings on the risks that matter and the single control that stops each one, in English and Dutch.

Live: https://plain-security.fyi

## What a briefing is

Every topic is one self-contained HTML file with the same shape:

1. Hero with the topic in one sentence.
2. Four steps or risks. Each has a CSS-only animation, a plain-language explanation, a business-impact paragraph, and a risk pill and a fix pill.
3. A controls table: one line per control, which step it stops.
4. A board-level callout: the one decision the board actually owns.
5. Risk and compliance: a six-tile risk register card (likelihood, impact, residual, owner, key risk indicators, one-sentence register entry) and a table for NIS2, DORA, SOC 2 and ISAE 3402 with three columns: what it requires of you, what to look for when a supplier hands you their report, and what happens when this incident hits you.

Everything is bilingual. The EN/NL toggle is CSS radio buttons; one small script remembers the choice in `localStorage` across pages. No build step, no framework, no tracking, no cookies.

## Repository layout

```
index.html              landing page: search, cards, topic request, sponsor
<slug>/index.html       one folder per briefing
logo.svg  logo-nl.svg   wordmark, English and Dutch tagline
favicon.svg
CNAME                   custom domain for GitHub Pages
.github/                issue forms (EN/NL), issue auto-labeler
```

Hosted on GitHub Pages from the `main` branch root. HTTPS is enforced.

## Adding a briefing

1. Copy an existing briefing folder, for example `ransomware/`, to `<slug>/`.
2. Keep the generic CSS and the structure. Replace the four scenes, the text, the controls table, the callout and the risk and compliance content. Every visible string needs both an `.en` and an `.nl` span.
3. Add a card to `index.html` inside `.cards`, with a `data-k` attribute holding search keywords in both languages.
4. Add a `page: <slug>` entry to `.github/labeler.yml` and create the matching label.
5. Run the checks below, commit, push. Pages deploys in about a minute.

## Checks before pushing

These caught real defects during the build, so run them:

- **Tag balance**: every opened tag closed, per file.
- **Brace balance**: `{` and `}` counts inside `<style>` equal. A missing brace in the mobile media block silently swallows everything after it.
- **Required parts**: `id="risk"`, `href="#risk"` in the nav, `href="../"` on the brand, the favicon link.
- **Language visibility**: in headless Edge, force Dutch and count English elements still visible, then the reverse. Both must be zero. A rule with its own `display` value that is later or more specific than the hide rule will leak.
- **Mobile overflow**: at phone width, `scrollWidth` must equal `clientWidth`. Tables stack into blocks below 820px.

Headless Edge notes: the host may report `prefers-reduced-motion`, and `--virtual-time-budget` does not advance every animation. To see a later animation frame, inject `animation-delay:-6.5s !important` on the stage elements in a test copy instead.

## Requesting a topic

Use the issue forms: **Topic request** (English) or **Onderwerpverzoek** (Dutch). They ask for a topic name, the board's question, the audience and the language, in fixed fields so a request can be picked up mechanically. The auto-labeler adds category labels (`topic-request`, `bug`, `mobile`, `translation`, `compliance`, `region`, `sponsor`) and a `page: <slug>` label when an issue concerns an existing briefing.

## Content notes

The compliance tables are indicative and say so on every page. Deadlines are approximate and phrased as such. Confirm scope and deadlines with legal and compliance before relying on them. The regulatory content is EU and Dutch by construction; region variants for the UK, US and Switzerland are on the list but not built.

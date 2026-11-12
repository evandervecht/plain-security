<p align="center"><img src="favicon.svg" width="120" alt="Plain Security logo"></p>

<h1 align="center">Plain Security</h1>

<p align="center">
  <a href="https://github.com/evandervecht/plain-security/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/evandervecht/plain-security?color=F44336&style=for-the-badge">
  </a>
  <a href="https://github.com/evandervecht/plain-security/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/evandervecht/plain-security?color=FFEB3B&style=for-the-badge">
  </a>
  <a href="https://github.com/evandervecht/plain-security/network">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/evandervecht/plain-security?color=2196F3&style=for-the-badge">
  </a>
  <a href="https://github.com/sponsors/evandervecht">
    <img alt="Sponsor" src="https://img.shields.io/badge/sponsor-%E2%9D%A4-EA4AAA.svg?logo=githubsponsors&logoColor=white&style=for-the-badge">
  </a>
</p>
<p align="center">
  <img alt="HTML" src="https://img.shields.io/badge/HTML-raw%20files-E34F26.svg?logo=html5&logoColor=white&style=for-the-badge">
  <img alt="CSS" src="https://img.shields.io/badge/CSS-animations-1572B6.svg?logo=css3&logoColor=white&style=for-the-badge">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub-Pages-222222.svg?logo=github&logoColor=white&style=for-the-badge">
  <img alt="English" src="https://img.shields.io/badge/language-EN-005BBB.svg?style=for-the-badge">
  <img alt="Dutch" src="https://img.shields.io/badge/language-NL-F57C00.svg?style=for-the-badge">
</p>

Security, explained in plain language for the board. Each briefing covers one risk and the controls worth considering for it, in English and Dutch. The tone is advisory: we explain and suggest, the reader decides.

Every briefing is one raw HTML file. There is no build step, no framework, no tracking and no cookies. The site is live at [plain-security.fyi](https://plain-security.fyi).

## What it does

- **Explains one risk per page.** There are 49 briefings, from ransomware and phishing to NIS2, DORA and post-quantum cryptography.
- **Uses one shape for every briefing.** A hero line, three to five steps or risks with CSS-only animations, a controls table, a board-level callout, and a risk and compliance section.
- **Maps each topic to NIS2, DORA, SOC 2 and ISAE 3402.** The tables say what each asks of you, what to look for in a supplier's report, and what happens when the incident hits you.
- **Names its sources.** Every page lists what was checked, against which primary source, and when.
- **Works in English and Dutch.** The EN/NL toggle is CSS radio buttons. One small script remembers the choice in `localStorage` across pages.
- **Marks dates honestly.** Timelines carry a "suggested, not a legal deadline" note, and each page says whether a date comes from a law, a recommendation, a draft or guidance.
- **Adds a short video per briefing.** The rendered files are assets of the [`videos` release](https://github.com/evandervecht/plain-security/releases/tag/videos), and there is a podcast feed at `podcast.xml`.

## Preview locally

The site is plain files, so you can open `index.html` in a browser. To serve it:

```sh
git clone https://github.com/evandervecht/plain-security.git
cd plain-security
python -m http.server
```

Then open `http://localhost:8000`. Any static file server works.

## Use

- **Read:** go to [plain-security.fyi](https://plain-security.fyi) and search or pick a card.
- **Ask for a topic:** open an issue with the **Topic request** (English) or **Onderwerpverzoek** (Dutch) form. They ask for the topic, the board's question, the audience and the language.
- **Report a mistake or a gap:** use the **Correction** or **Missing content** form.
- **Add a briefing:**
  1. Copy an existing briefing folder to `<slug>/`. `quantum-and-ai/` is the most complete reference.
  2. Keep the generic CSS and the structure. Replace the scenes, text, controls table, callout and risk and compliance content. Every visible string needs an `.en` and an `.nl` span.
  3. Add a card to `index.html` inside `.cards`, with a `data-k` attribute holding search keywords in both languages.
  4. Add a `page: <slug>` entry to `.github/labeler.yml` and create the matching label.
  5. Run `node tools/check.mjs <slug>`, then commit and push. For a change to an existing page, add `--baseline main` to enforce the 10% text budget.

`node tools/check.mjs` needs Node 22 or newer and a local Chrome or Edge (`CHROME=` sets the path, `--static` skips the browser). It checks tag and brace balance, required parts, language visibility, mobile overflow and the rules in [AGENTS.md](AGENTS.md). The [Check briefings](.github/workflows/check-briefings.yml) workflow runs it on pull requests that touch a briefing or `tools/`.

## Repository layout

```
index.html              landing page: search, cards, topic request, sponsor
<slug>/index.html       one folder per briefing
AGENTS.md               briefing standard: rules, components, canonical regulatory text
CLAUDE.md               points agents at AGENTS.md, plus the development workflow
tools/                  dev-only: checks, tooltip and diagram generators, video tooling
media/                  one explainer video project per briefing
sponsors/index.html     sponsors page
podcast.xml             podcast feed, generated
logo.svg  logo-nl.svg   wordmark, English and Dutch tagline
favicon.svg
CNAME                   custom domain for GitHub Pages
.github/                issue forms (EN/NL), issue auto-labeler, check workflow
```

The site is hosted on GitHub Pages from the root of the `main` branch.

## Documentation

- [AGENTS.md](AGENTS.md): the briefing standard. Content rules, reusable components and the definition of done. Read it before writing or changing a briefing.
- [CLAUDE.md](CLAUDE.md): development workflow for agents and people.
- [media/README.md](media/README.md): how the briefing videos are made and released.
- [.github/REVIEW.md](.github/REVIEW.md): review notes for pull requests.

## Sponsors

Sponsoring keeps the briefings free, ad-free and untracked: [github.com/sponsors/evandervecht](https://github.com/sponsors/evandervecht). Sponsors at $15 a month are listed here. Sponsors at $100 a month also get their logo on [plain-security.fyi/sponsors](https://plain-security.fyi/sponsors/).

<!-- One line per $15+/month sponsor: [Name](https://example.com) -->
No sponsors yet. [Be the first.](https://github.com/sponsors/evandervecht)

## Content notes

The compliance tables are indicative and say so on every page. Confirm scope and deadlines with legal and compliance before relying on them. The regulatory content is EU and Dutch by construction. Region variants for the UK, US and Switzerland are on the list but not built.

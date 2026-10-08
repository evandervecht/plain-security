# Briefing standard

For anyone, person or agent, who writes or changes a briefing. The README describes the page shape. This file sets the rules for the content, the reusable components, and the definition of done. Where the two differ, this file wins.

## Who we write for, and in what role

- **Readers:** boards and C-level first, then risk and compliance, then engineers. A board member should follow every sentence without a glossary. An engineer should find nothing wrong.
- **Role: adviser, not auditor.** We explain the risk and suggest options. The reader decides.

## Five rules

1. **Advisory tone.**
   - Pills read `SUGGESTED:` / `AANBEVOLEN:`, never `FIX:` / `OPLOSSING:`.
   - Prefer "consider", "worth", "we suggest", "often the most effective first step", "your call".
   - Use "must" only when a law says so, and name the law: "NIS2 requires…".
2. **Readable, not complete.**
   - Replace, don't append. Correct text in place.
   - Add only what a board would miss, one line per addition. No new steps or risks.
   - Visible text may grow **at most 10%** per change. `tools/check.mjs --baseline main` measures it.
   - **At most one diagram per page**, and only if it replaces explanation.
   - Short sentences, one idea each. Explain jargon with a tooltip, not a parenthesis.
3. **Correct and current.**
   - Verify every date, deadline, figure, version and product name against a **primary source** on the day you edit. Primary sources include eur-lex.europa.eu, digital-strategy.ec.europa.eu, ENISA, NCSC-NL, NCSC UK, NIST, OWASP, and vendor documentation.
   - A claim you cannot verify is removed, or phrased as "reported by <source>".
   - Statistics always name their source and year.
   - List what you checked in the sources line (see the components below).
4. **Suggested, not mandatory.**
   - Tell the reader which kind of date they are looking at: a **law** ("NIS2 requires"), a **recommendation** (the EU PQC roadmap), a **draft** (NIST IR 8547), or **guidance** (NCSC).
   - Every timeline, roadmap or deadline list carries the disclaimer.
   - Incident classifications are conditional: "*can* count as a significant incident", never "is".
5. **Bilingual parity.**
   - Every visible string has an `.en` and an `.nl` span with the same meaning.
   - Dutch uses formal **u**, reads as natural Dutch (not machine translation), and uses Dutch legal names: Cyberbeveiligingswet, AVG, Autoriteit Persoonsgegevens.

## Page shape additions

These come on top of the five parts in the README.

- **In practice**, optional, between the last step and the controls: one reference-architecture diagram. Candidates are listed at the bottom of this file.
- **Sources line**, required, directly under the compliance table.
- **Related briefings**, optional, at most three links, next to the "Missing anything?" buttons.

## Components (copy these exactly)

All components use the page's CSS variables and need no JavaScript. Put the CSS once in the page's `<style>` block.

### Acronym tooltip

Use it on the first use of an acronym or jargon term in each section. The tip is one sentence of at most 160 characters. English tips go inside `.en` text and Dutch tips inside `.nl` text.

```html
<abbr class="tip" tabindex="0" data-tip="Harvest now, decrypt later: traffic recorded today and decrypted once a quantum computer exists.">HNDL</abbr>
```
```css
abbr.tip{position:relative;text-decoration:underline dotted var(--slate);text-underline-offset:3px;cursor:help;outline:none}
abbr.tip::after{content:attr(data-tip);position:absolute;left:0;bottom:calc(100% + 8px);width:max-content;max-width:36ch;white-space:normal;background:var(--deep);border:1px solid var(--line);border-left:3px solid var(--brand);color:var(--prose);font:400 12px/1.55 var(--mono);letter-spacing:0;text-transform:none;padding:9px 12px;display:none;pointer-events:none;z-index:30}
abbr.tip:hover::after,abbr.tip:focus::after{display:block}
@media (max-width:600px){abbr.tip::after{position:fixed;left:16px;right:16px;bottom:16px;width:auto;max-width:none}}
abbr.tip:focus-visible{outline:1px dashed var(--brand);outline-offset:2px}
```
Don't wrap acronyms inside pills, nav, headings or table header cells.

### Sources line

```html
<p class="sources en">Checked against: EU PQC Roadmap v1.1 (June 2025), NCSC-NL (2026) · September 2026.</p>
<p class="sources nl">Gecontroleerd tegen: EU PQC-roadmap v1.1 (juni 2025), NCSC-NL (2026) · september 2026.</p>
```
```css
.sources,.panel p.sources{font-family:var(--mono);font-size:11.5px;line-height:1.6;letter-spacing:.02em;color:var(--slate);margin:18px 0 0;max-width:none}
```
Name the source and its date only. Don't add a bibliography. Links are allowed on the source names.

### Disclaimer

Use it for any timeline or deadline list. It goes under a roadmap diagram, and on the board callout if that callout gives dates.

```html
<span class="en disclaimer">Suggested timeline, not a legal deadline. …</span>
<span class="nl disclaimer">Voorgestelde tijdlijn, geen wettelijke deadline. …</span>
```

### Related briefings

```html
<p class="related"><span class="en">Related:</span><span class="nl">Zie ook:</span>
  <a href="../phishing/"><span class="en">Phishing</span><span class="nl">Phishing</span></a> ·
  <a href="../identity/"><span class="en">Passwords and MFA</span><span class="nl">Wachtwoorden en MFA</span></a></p>
```

### What AI changes here

Optional, within each major section. Three-tile risk view (Break it, Abuse it, Enforce it) showing attack surface, misuse risk, and control opportunity. Use when the section covers a capability that AI materially changes.

```html
<div class="ai3">
  <span class="cap"><span class="en">What AI changes here</span><span class="nl">Wat AI hier verandert</span></span>
  <div class="g">
    <div class="t"><span class="k"><span class="en">Break it with AI</span><span class="nl">Breken met AI</span></span><b class="mid"><span class="en">Medium</span><span class="nl">Gemiddeld</span></b><p><span class="en">Attack surface that AI creates or expands.</span><span class="nl">Aanvalsoppervlak dat AI creëert of uitbreidt.</span></p></div>
    <div class="t"><span class="k"><span class="en">Abuse it with AI</span><span class="nl">Misbruiken met AI</span></span><b class="mid"><span class="en">Medium</span><span class="nl">Gemiddeld</span></b><p><span class="en">Misuse risk or unintended consequence of AI in scope.</span><span class="nl">Misbruikrisico of onbedoeld gevolg van AI in bereik.</span></p></div>
    <div class="t"><span class="k"><span class="en">Enforce it with AI</span><span class="nl">Afdwingen met AI</span></span><b class="lo"><span class="en">Low</span><span class="nl">Laag</span></b><p><span class="en">Control opportunity: how AI can help enforce this requirement.</span><span class="nl">Controlekans: hoe AI kan helpen deze eis af te dwingen.</span></p></div>
  </div>
</div>
```

```css
.ai3{margin-top:26px}.ai3>.cap{display:block;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted,#87a2b0);margin-bottom:10px}.ai3>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.ai3 .t{background:var(--bg-lo);border:1px solid var(--line);padding:18px 20px}.ai3 .k{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted,#87a2b0);margin-bottom:6px}.ai3 b{display:block;font-family:var(--sans,system-ui),sans-serif;font-size:17px;color:#fff;margin-bottom:8px}.ai3 b.hi{color:var(--bad)}.ai3 b.mid{color:var(--warn)}.ai3 b.lo{color:var(--good)}.ai3 p{font-family:var(--read);font-size:14px;line-height:1.6;color:var(--prose,#e6eff5);margin:0}@media (max-width:820px){.ai3>.g{grid-template-columns:1fr}}
```

### Reference-architecture diagram

- **Markup:** inline `<svg>` inside `<figure class="arch">`, with `role="img"`, a `<title>` and a `<desc>`.
- **Style:**
  - Sharp corners, the page's colours, and text at 10px or larger.
  - Status colours: `--good` (safe), `--warn` (partly or available), `--bad` (needs a plan).
  - One legend.
  - A foot line that says what the dates mean and "hover or tap for an explanation".
- **Tooltips:** every box and tag gets a hover/tap/focus tooltip in the site style: a bold term plus 2–4 lines, at most 5. `tools/tips.py` generates them and their CSS. Each host is `tabindex="0"`.
- **Mobile:** `.arch{overflow-x:auto} .arch svg{min-width:900px}` scrolls sideways instead of shrinking the text.
- **Motion:** any animation stops under `prefers-reduced-motion`.
- **Prefix every class inside the SVG** (`scope_classes()` in `tools/tips.py`, or by hand: `ot-node`, `ot-zone`…). Page CSS such as `.bar` or `.node` otherwise resizes SVG shapes, because CSS `width`, `height`, `x` and `y` apply to SVG. This broke the first quantum embed.
- **Build:** write the SVG by hand, or with a small script in `tools/`. `tools/gen_cmap.py` and `tools/gen_roadmap.py` are worked examples; the output is static HTML either way.
- **Embed** with `python3 tools/embed.py <slug> tools/out/<file>.svg-section.html`. It inserts the section before CONTROLS between `<!-- diagram:<id> -->` markers, and re-running it replaces the section. `quantum-and-ai/` is the reference page.

### Animated scenes (pure CSS, no JavaScript)

Some briefings include animated scenes (e.g., `backups-and-restore/` has four). Currently built by hand, with scene-specific CSS and animations. As a demo of the pattern, animation durations are parameterized as CSS variables (e.g., `--scene-duration: 7s`) to allow global pacing adjustments. **When to invest in tooling:**
- After 5–6 briefings with similar scene patterns emerge, write a `tools/scene-builder.js` that takes a JSON scene description and generates the hand-coded CSS output. Until then, hand-code and reuse where you can.
- Animation durations are inherited from `:root` CSS variables; keep them consistent across all scenes of the same visual pattern (e.g., all step-by-step reveals at 7s).
- Test at 1260px and 390px to check for overlaps and responsive layout issues; use headless Chromium to catch mobile rendering bugs.

## Canonical regulatory text

Last verified 6 Oct 2026. Re-verify before reuse, and use the same wording on every page.

| Topic | Text |
|---|---|
| NIS2 incident clocks (Art. 23) | Early warning within 24 hours of becoming aware · incident notification within 72 hours · final report within one month. |
| NIS2 in NL | The Cyberbeveiligingswet (Cbw) has been in force since 15 August 2026. About 8,000 organisations must register with NCSC, have a duty of care and report duties, and the board must be trained. |
| DORA major-incident clocks | Classify promptly · initial notification within 4 hours of classifying it as major (and at most 24 hours after becoming aware) · intermediate report within 72 hours of the initial notification · final report within one month. DORA has applied since 17 January 2025. |
| CRA | Manufacturers report actively exploited vulnerabilities and severe incidents from 11 September 2026: early warning 24h, notification 72h, via the ENISA Single Reporting Platform. The main obligations (security by design, vulnerability handling, SBOM, support period) apply from 11 December 2027. |
| GDPR/AVG | Notify the Autoriteit Persoonsgegevens within 72 hours (Art. 33); inform the people affected when the risk is high (Art. 34). |
| ISAE 3402 | ISAE 3402 creates no duty to notify user auditors. Expect a deviation in the next report, and ask for interim disclosure in the contract. |
| Significance | "Can count as a significant incident if it meets the thresholds." Never "is". |
| Post-quantum dates | EU PQC Roadmap v1.1 (recommendation to Member States): planning and pilots by end 2026, high-risk by end 2030, medium-risk by end 2035. NIST IR 8547 (draft): RSA/ECC deprecated after 2030, disallowed after 2035. NCSC UK (guidance): 2028 · 2031 · 2035. |
| EU AI Act | Prohibited practices and AI literacy since 2 Feb 2025 · general-purpose AI model duties since 2 Aug 2025 · transparency (Art. 50) from Aug 2026 · high-risk: Annex III from 2 Dec 2027, Annex I from 2 Aug 2028 (moved by the AI Omnibus, in force 27 Jul 2026). |
| Machinery Regulation (EU) 2023/1230 | Applies from 20 Jan 2027 and replaces the Machinery Directive, including protection against corruption of safety functions. |
| Windows 10 | Support ended 14 Oct 2025 · consumer ESU to 12 Oct 2027 · organisations can buy ESU for up to three years (to Oct 2028). Keep patching and endpoints identical. |

## Working an issue

Issues come from the forms in `.github/ISSUE_TEMPLATE` (topic requests, corrections, "missing" reports), and each one gets its own pull request.

1. Read the issue, including its pre-filled checklist, the page, and this file. Create a branch `issue-<n>-<slug>`.
2. List every claim you will add, change or keep near the change. Verify each against a primary source, and note the URL and date.
3. Make the smallest change that makes the page correct and readable. Keep the page's structure and generic CSS. Touch only the page concerned. Use a separate PR for changes to shared canonical text.
4. Run `node tools/check.mjs <slug> --baseline main`, or without `--baseline` for a new page. It must end with "All checks passed".
5. Look at the page yourself in headless Chrome or Edge: EN and NL, at 1260px and at 390px. Force a few tooltips visible in a temporary copy, and fix any overlap.
6. Open a pull request. Never commit to `main`.

### Pull-request description

```
## What changed
- <bullet per change, in plain language>

## Verified against
- <source> — <URL> — <date checked>

## Checks
- node tools/check.mjs <slug> --baseline main: passed (text +x.x%)
- Viewed EN/NL at desktop and 390px

## Left out on purpose
- <what you didn't add to stay readable, or couldn't verify>

Closes #<n>
```

### When to stop and ask

Ask a maintainer in the issue, and don't guess, when:
- a primary source contradicts the issue;
- a claim can't be verified;
- the fix would push the page over the text budget;
- the issue asks for more than one diagram, a new step, or a change to many pages;
- the answer needs legal interpretation beyond quoting the text.

## Definition of done

- [ ] Every changed fact is verified against a primary source; the sources line is updated.
- [ ] Advisory wording: `SUGGESTED:` pills, no unattributed "must".
- [ ] Timelines and deadlines carry the disclaimer; laws, recommendations, drafts and guidance are labelled.
- [ ] Acronyms have tooltips on first use per section; the tips are short.
- [ ] At most one diagram; it has tooltips, a legend, and scrolls on mobile.
- [ ] EN and NL say the same thing; Dutch uses formal *u*.
- [ ] Text grew by 10% or less; `node tools/check.mjs` passes; the PR description is complete.

## Diagram candidates

Add a diagram only when it replaces text.

ot-iot (Purdue / IEC 62443 zones) · ransomware (tiered admin + isolated backups) · ai-security (AI gateway, tools behind least privilege) · tls-cipher-suites (TLS per hop) · nis2-dora (which regime applies → reporting chain) · secure-development (pipeline with signing) · later: entra, email-security, cloud, incident-response.

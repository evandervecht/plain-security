"""Generate the 'Which regime applies to us?' section for plain-security.fyi/nis2-dora/.
A board-readable decision diagram: three questions -> regime -> reporting clock.
Static HTML + inline SVG, no JavaScript. Checked against NIS2 Art. 4, 23, recital 28;
DORA Art. 2, 64; Delegated Regulation (EU) 2025/301 Art. 5; GDPR Art. 33-34; NCSC-NL (Aug 2026)."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 640
QX, QW = 40, 250          # questions
RX, RW = 340, 200         # regime
CX, CW = 590, 490         # reporting clock
BH = 96
ROWS = {1: 70, 2: 200, 3: 322, 4: 420}


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("n", W, H)
out = []


def box(x, y, w, h, status, kick, lines, sub, tip, place="below"):
    """kick/sub: (en, nl); lines: list of (en, nl) name lines."""
    hc = TIPS.add((x, y, w, h), *tip, place=place)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 22, "kick", *kick))
    for i, ln in enumerate(lines):
        out.append(bi(x + 16, y + 44 + i * 17, "name", *ln))
    if sub:
        out.append(bi(x + 16, y + h - 12, "st", *sub))
    out.append('</g>')


def chain(x, y, w, h, kick, steps, note, tip, place="below"):
    """steps: list of ((en time, en label), (nl time, nl label))."""
    hc = TIPS.add((x, y, w, h), *tip, place=place)
    out.append(f'<g class="node-g s-bad {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 22, "kick", *kick))
    n = len(steps)
    sw = (w - 32) / n
    for i, ((te, le), (tn, ln)) in enumerate(steps):
        sx = round(x + 16 + i * sw, 1)
        out.append(f'<rect x="{sx}" y="{y + 34}" width="7" height="7" class="dot"/>')
        if i < n - 1:
            out.append(f'<path d="M{sx + 11} {y + 37.5} H{round(sx + sw - 6, 1)}" class="step"/>')
        out.append(bi(sx, y + 58, "time", te, tn))
        out.append(bi(sx, y + 72, "st", le, ln))
    if note:
        out.append(bi(x + 16, y + h - 8, "note", *note))
    out.append('</g>')


def arrow(d, label=None, lx=0, ly=0, anchor="start"):
    out.append(f'<path d="{d}" class="link" marker-end="url(#nd-arr)"/>')
    if label:
        out.append(bi(lx, ly, "llabel", *label, extra=f' text-anchor="{anchor}"'))


YES, NO = ("YES", "JA"), ("NO", "NEE")

out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="nd-title nd-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="nd-title">Which regime applies to us?</title>')
out.append('<desc id="nd-desc">Decision map. Question 1: are we a financial entity? If yes, DORA applies and takes precedence: '
           'classify the incident, initial notification within 4 hours of classifying it as major (at most 24 hours after becoming aware), '
           'intermediate report within 72 hours, final report within one month, to DNB or AFM. If no, question 2: are we in a Cbw sector and above '
           'the size threshold, or designated? If yes, the Cyberbeveiligingswet applies: early warning within 24 hours, notification within 72 hours, '
           'final report within one month, to NCSC or the sector CSIRT. If neither, no Cbw or DORA clock. Question 3, for everyone and in parallel: '
           'is personal data involved? If yes, notify the Autoriteit Persoonsgegevens within 72 hours under the GDPR. Indicative, not legal advice.</desc>')
out.append('''<defs>
<marker id="nd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
</defs>''')

# zones
out.append(f'<rect x="20" y="30" width="{CX - 40}" height="{ROWS[4] + BH + 18 - 30}" class="zone"/>')
out.append(bi(40, 54, "zlabel", "WHICH REGIME · CONFIRM WITH LEGAL", "WELK REGIME · BEVESTIG MET JURISTEN"))
out.append(f'<rect x="{CX - 10}" y="30" width="{W - CX - 10}" height="{ROWS[4] + BH + 18 - 30}" class="zone"/>')
out.append(bi(CX + 6, 54, "zlabel", "REPORTING CLOCK · FROM BECOMING AWARE", "MELDKLOK · VANAF KENNISNAME"))

# arrows first, boxes on top
y1, y2, y3, y4 = ROWS[1], ROWS[2], ROWS[3], ROWS[4]
mid = BH / 2
arrow(f"M{QX + QW + 2} {y1 + mid} H{RX - 3}", YES, QX + QW + 12, y1 + mid - 7)
arrow(f"M{QX + 60} {y1 + BH + 2} V{y2 - 3}", NO, QX + 70, y1 + BH + 22)
arrow(f"M{QX + QW + 2} {y2 + mid} H{RX - 3}", YES, QX + QW + 12, y2 + mid - 7)
arrow(f"M{QX + 160} {y2 + BH + 2} V{y3 + 32} H{RX - 3}", NO, QX + 170, y2 + BH + 18)
arrow(f"M{QX + QW + 2} {y4 + mid} H{RX - 3}", YES, QX + QW + 12, y4 + mid - 7)
for y in (y1, y2, y4):
    arrow(f"M{RX + RW + 2} {y + mid} H{CX - 3}")
# lex specialis: DORA over Cbw
out.append(f'<path d="M{RX + RW - 30} {y1 + BH + 2} V{y2 - 2}" class="lex"/>')
out.append(bi(RX + RW - 38, y1 + BH + 21, "llabel", "DORA FIRST", "DORA GAAT VOOR", ' text-anchor="end"'))

# questions
box(QX, y1, QW, BH, "q", ("QUESTION 1", "VRAAG 1"),
    [("Are we a financial entity?", "Zijn wij een financiële"), ("", "entiteit?")],
    ("banks, insurers and more", "banken, verzekeraars en meer"),
    (["Financial entity · DORA Art. 2", "Banks, insurers, investment firms, payment", "and crypto-asset firms, and more. If yes,", "DORA sets your ICT rules and clocks."],
     ["Financiële entiteit · DORA art. 2", "Banken, verzekeraars, beleggings-", "ondernemingen, betaal- en cryptobedrijven", "en meer. Zo ja: DORA bepaalt de regels."]))
box(QX, y2, QW, BH, "q", ("QUESTION 2", "VRAAG 2"),
    [("In a Cbw sector and above", "In een Cbw-sector en boven"), ("the size threshold?", "de omvangsdrempel?")],
    ("or designated", "of aangewezen"),
    (["Cbw sector · size threshold", "Sectors in NIS2 Annexes I and II, e.g.", "energy, health, transport, digital. Mostly", "medium-sized or larger; some entities are", "in scope regardless of size."],
     ["Cbw-sector · omvangsdrempel", "Sectoren uit bijlage I en II van NIS2,", "zoals energie, zorg, vervoer, digitaal.", "Meestal middelgroot of groter; sommige", "entiteiten vallen er altijd onder."]))
box(QX, y4, QW, BH, "q", ("QUESTION 3 · ALWAYS", "VRAAG 3 · ALTIJD"),
    [("Is personal data involved?", "Zijn persoonsgegevens"), ("", "betrokken?")],
    ("for everyone, in parallel", "voor iedereen, parallel"),
    (["Personal data · GDPR", "A personal data breach has its own clock", "under the GDPR (AVG in Dutch), alongside", "any Cbw or DORA report."],
     ["Persoonsgegevens · AVG", "Een datalek heeft een eigen termijn onder", "de AVG, naast een eventuele melding", "onder de Cbw of DORA."]), place="above")

# regimes
box(RX, y1, RW, BH, "warn", ("LEX SPECIALIS", "LEX SPECIALIS"), [("DORA applies", "DORA geldt")],
    ("since 17 Jan 2025", "sinds 17 jan 2025"),
    (["DORA · lex specialis", "Digital Operational Resilience Act. For", "financial entities it takes precedence", "over the NIS2 rules on ICT risk and", "incident reporting (NIS2 recital 28)."],
     ["DORA · lex specialis", "Digital Operational Resilience Act. Voor", "financiële entiteiten gaat DORA voor op", "de NIS2-regels voor ICT-risico en", "incidentmelding (NIS2 overweging 28)."]))
box(RX, y2, RW, BH, "warn", ("NIS2 IN THE NETHERLANDS", "NIS2 IN NEDERLAND"), [("Cbw applies", "Cbw geldt")],
    ("register with NCSC", "registreren bij NCSC"),
    (["Cbw · Cyberbeveiligingswet", "The Dutch NIS2 law, in force since", "15 August 2026: registration with NCSC,", "duty of care, reporting, board training."],
     ["Cbw · Cyberbeveiligingswet", "De Nederlandse NIS2-wet, van kracht sinds", "15 augustus 2026: registratie bij NCSC,", "zorgplicht, meldplicht, bestuurstraining."]))
box(RX, y3, RW, 64, "ok", ("NEITHER", "GEEN VAN BEIDE"), [("No Cbw or DORA clock", "Geen Cbw- of DORA-klok")], None,
    (["Outside Cbw and DORA", "No Cbw or DORA clock, but the GDPR,", "contracts and customer duties remain.", "Worth recording the scope decision."],
     ["Buiten Cbw en DORA", "Geen Cbw- of DORA-termijn, maar de AVG,", "contracten en klantafspraken blijven.", "Leg het reikwijdtebesluit wel vast."]))
box(RX, y4, RW, BH, "warn", ("PERSONAL DATA BREACH", "DATALEK"), [("GDPR applies", "AVG geldt")],
    ("Art. 33 and 34", "art. 33 en 34"),
    (["GDPR · AVG in Dutch", "General Data Protection Regulation.", "The controller notifies the Dutch data", "protection authority, the AP."],
     ["AVG · Algemene verordening", "gegevensbescherming. De verwerkings-", "verantwoordelijke meldt het datalek bij", "de Autoriteit Persoonsgegevens (AP)."]), place="above")

# reporting clocks
chain(CX, y1, CW, BH, ("DORA · TO DNB OR AFM", "DORA · AAN DNB OF AFM"),
      [(("CLASSIFY", "promptly"), ("CLASSIFICEER", "zo snel mogelijk")),
       (("4H", "initial"), ("4U", "eerste melding")),
       (("72H", "intermediate"), ("72U", "tussentijds")),
       (("1 MONTH", "final report"), ("1 MAAND", "eindrapport"))],
      ("4h after classifying as major · at most 24h after becoming aware", "4u na classificatie als ernstig · uiterlijk 24u na kennisname"),
      (["Major ICT incident · DORA", "Initial notification 4h after classifying", "as major (max 24h after aware), then", "intermediate in 72h, final in 1 month.", "To DNB or AFM, whichever supervises you."],
       ["Ernstig ICT-incident · DORA", "Eerste melding 4u na classificatie als", "ernstig (max. 24u na kennisname), dan", "tussentijds in 72u, eind na 1 maand.", "Aan DNB of AFM, wie op u toeziet."]))
chain(CX, y2, CW, BH, ("CBW · TO NCSC OR SECTOR CSIRT", "CBW · AAN NCSC OF SECTOR-CSIRT"),
      [(("24H", "early warning"), ("24U", "vroege waarschuwing")),
       (("72H", "notification"), ("72U", "incidentmelding")),
       (("1 MONTH", "final report"), ("1 MAAND", "eindrapport"))],
      ("if it can count as significant · via the NCSC portal", "als het als significant kan gelden · via het NCSC-portaal"),
      (["Significant incident · Cbw / NIS2 Art. 23", "Early warning 24h, notification 72h,", "final report 1 month. The NCSC portal", "forwards it to the CSIRT and supervisor."],
       ["Significant incident · Cbw / NIS2 art. 23", "Vroege waarschuwing 24u, melding 72u,", "eindrapport 1 maand. Het NCSC-portaal", "stuurt door naar CSIRT en toezichthouder."]))
chain(CX, y4, CW, BH, ("GDPR · TO THE AUTORITEIT PERSOONSGEGEVENS", "AVG · AAN DE AUTORITEIT PERSOONSGEGEVENS"),
      [(("72H", "notify the AP"), ("72U", "melden bij de AP")),
       (("HIGH RISK", "inform the people"), ("HOOG RISICO", "betrokkenen informeren"))],
      ("unless the breach is unlikely to cause a risk", "tenzij het datalek waarschijnlijk geen risico oplevert"),
      (["Data breach · GDPR Art. 33–34", "Notify the AP within 72h unless a risk", "is unlikely; tell the people affected", "without undue delay if the risk is high."],
       ["Datalek · AVG art. 33–34", "Meld binnen 72u bij de AP, tenzij een", "risico onwaarschijnlijk is; informeer", "betrokkenen onverwijld bij hoog risico."]), place="above")

# legend
ly = 572
legend = [(40, "q", "Question", "Vraag"), (200, "warn", "Regime applies", "Regime geldt"),
          (400, "bad", "Reporting clock runs", "Meldklok loopt"), (620, "ok", "No Cbw or DORA clock", "Geen Cbw- of DORA-klok")]
for x, st, en, nl in legend:
    out.append(f'<rect x="{x}" y="{ly - 11}" width="14" height="14" class="sw sw-{st}"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(f'<path d="M870 {ly - 4} H900" class="lex"/>')
out.append(bi(908, ly, "legend", "takes precedence", "gaat voor"))
out.append(bi(40, ly + 30, "foot",
              "Indicative — not legal advice · clocks as set in law, scope to confirm with legal · hover or tap a box for an explanation",
              "Indicatief — geen juridisch advies · termijnen zoals in de wet, reikwijdte bevestigen met juristen · beweeg of tik op een blok voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- regime map (which regime applies) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.24em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .s-q .bar{fill:var(--brand)}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-warn .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .note{font:400 10px var(--mono);fill:var(--muted)}
.arch .time{font:700 12px var(--mono);letter-spacing:.04em;fill:var(--white)}
.arch .dot{fill:var(--bad)}
.arch .step{fill:none;stroke:var(--slate);stroke-width:1.2;stroke-dasharray:3 4}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.arch .llabel{font:700 9.5px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:nd-flow 1.4s linear infinite}
.arch .lex{fill:none;stroke:var(--warn);stroke-width:2}
.arch .arrowhead{fill:var(--slate)}
.arch .sw-q{fill:var(--brand)}
.arch .sw-ok{fill:var(--good)}
.arch .sw-warn{fill:var(--warn)}
.arch .sw-bad{fill:var(--bad)}
@keyframes nd-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "nd-")
SECTION = f"""<section class="risk-block" id="regime-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">Which regime applies to you.<br><em>And whom you would report to.</em></span><span class="nl">Welk regime voor u geldt.<br><em>En aan wie u zou melden.</em></span></h2>
    <span class="term"><span class="en">regime map / indicative, not legal advice</span><span class="nl">regimekaart / indicatief, geen juridisch advies</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>We suggest settling questions 1 and 2 with legal now, not during an incident.</strong> A financial entity reports under DORA; a breach of personal data adds a {abbr("GDPR", "General Data Protection Regulation (AVG in Dutch): EU law on personal data, with its own 72-hour breach notification.")} report in parallel. Indicative, not a legal deadline list or legal advice.</p>
      <p class="nl"><strong>Wij raden aan vraag 1 en 2 nu met juristen te beantwoorden, niet tijdens een incident.</strong> Een financiële entiteit meldt onder DORA; bij een datalek komt er parallel een {abbr("AVG", "Algemene verordening gegevensbescherming: EU-wet over persoonsgegevens, met een eigen meldtermijn van 72 uur voor datalekken.")}-melding bij. Indicatief: geen wettelijke deadlinelijst en geen juridisch advies.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "regime-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

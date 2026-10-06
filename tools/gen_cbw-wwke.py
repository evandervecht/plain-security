"""Generate the 'Which law applies to us?' section for plain-security.fyi/cbw-wwke/.
A board-readable decision diagram: three questions -> law -> reporting clock.
Static HTML + inline SVG, no JavaScript. Checked against Wwke Art. 6, 14, 15, 17 (wetten.overheid.nl,
15 Aug 2026); NCTV, "Mijn organisatie wordt kritieke entiteit" and Q&A (Oct 2026); Cbw via NCTV
"Welke organisaties vallen onder de Cyberbeveiligingswet" (Oct 2026); GDPR Art. 33-34."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 640
QX, QW = 40, 250          # questions
RX, RW = 340, 200         # law
CX, CW = 590, 490         # reporting clock
BH = 96
ROWS = {1: 70, 2: 200, 3: 322, 4: 420}


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("c", W, H)
out = []


def box(x, y, w, h, status, kick, lines, sub, tip, place="below"):
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
    out.append(f'<path d="{d}" class="link" marker-end="url(#cw-arr)"/>')
    if label:
        out.append(bi(lx, ly, "llabel", *label, extra=f' text-anchor="{anchor}"'))


YES, NO = ("YES", "JA"), ("NO", "NEE")

out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="cw-title cw-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="cw-title">Which law applies to us: Cbw, Wwke or both?</title>')
out.append('<desc id="cw-desc">Decision map. Question 1: has your sector minister designated you as a critical entity? If yes, the Wwke applies '
           'and you are an essential entity under the Cbw by law: report a disruptive incident within 24 hours to the competent authority via the '
           'MijnNCSC portal, detailed report within one month, and the Cbw clock runs as well. If no, question 2: are you in a Cbw sector and '
           'medium-sized or larger, or designated? If yes, the Cbw applies: early warning within 24 hours, notification within 72 hours, final report '
           'within one month, to NCSC or the sector CSIRT. If neither, no Cbw or Wwke clock. Question 3, for everyone and in parallel: is personal '
           'data involved? If yes, notify the Autoriteit Persoonsgegevens within 72 hours under the GDPR. Indicative, not legal advice.</desc>')
out.append('''<defs>
<marker id="cw-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
</defs>''')

# zones
out.append(f'<rect x="20" y="30" width="{CX - 40}" height="{ROWS[4] + BH + 18 - 30}" class="zone"/>')
out.append(bi(40, 54, "zlabel", "WHICH LAW · CONFIRM WITH LEGAL", "WELKE WET · BEVESTIG MET JURISTEN"))
out.append(f'<rect x="{CX - 10}" y="30" width="{W - CX - 10}" height="{ROWS[4] + BH + 18 - 30}" class="zone"/>')
out.append(bi(CX + 6, 54, "zlabel", "REPORTING CLOCK · FROM BECOMING AWARE", "MELDKLOK · VANAF KENNISNAME"))

y1, y2, y3, y4 = ROWS[1], ROWS[2], ROWS[3], ROWS[4]
mid = BH / 2
arrow(f"M{QX + QW + 2} {y1 + mid} H{RX - 3}", YES, QX + QW + 12, y1 + mid - 7)
arrow(f"M{QX + 60} {y1 + BH + 2} V{y2 - 3}", NO, QX + 70, y1 + BH + 22)
arrow(f"M{QX + QW + 2} {y2 + mid} H{RX - 3}", YES, QX + QW + 12, y2 + mid - 7)
arrow(f"M{QX + 160} {y2 + BH + 2} V{y3 + 32} H{RX - 3}", NO, QX + 170, y2 + BH + 18)
arrow(f"M{QX + QW + 2} {y4 + mid} H{RX - 3}", YES, QX + QW + 12, y4 + mid - 7)
for y in (y1, y2, y4):
    arrow(f"M{RX + RW + 2} {y + mid} H{CX - 3}")
# designation pulls the Cbw in as well
out.append(f'<path d="M{RX + RW - 30} {y1 + BH + 2} V{y2 - 2}" class="lex"/>')
out.append(bi(RX + RW - 38, y1 + BH + 21, "llabel", "CBW TOO", "OOK CBW", ' text-anchor="end"'))

# questions
box(QX, y1, QW, BH, "q", ("QUESTION 1", "VRAAG 1"),
    [("Designated as a critical", "Door uw vakminister"), ("entity by your minister?", "aangewezen als kritiek?")],
    ("about 500 organisations", "ongeveer 500 organisaties"),
    (["Critical entity · Wwke Art. 6", "Your sector minister designates you if", "an incident would significantly disrupt", "an essential service. You receive a", "decision, with the date it starts."],
     ["Kritieke entiteit · Wwke art. 6", "Uw vakminister wijst u aan als een", "incident een essentiële dienst aanzienlijk", "zou verstoren. U krijgt een besluit, met", "de datum waarop het ingaat."]))
box(QX, y2, QW, BH, "q", ("QUESTION 2", "VRAAG 2"),
    [("In a Cbw sector and", "In een Cbw-sector en"), ("medium-sized or larger?", "middelgroot of groter?")],
    ("or designated · about 8,000", "of aangewezen · ruim 8.000"),
    (["Cbw sector · size", "18 sectors in the Cbw annexes, e.g.", "energy, health, transport, digital.", "Medium-sized: 50 staff or €10M turnover.", "You assess this yourself and register."],
     ["Cbw-sector · omvang", "18 sectoren in de Cbw-bijlagen, zoals", "energie, zorg, vervoer, digitaal.", "Middelgroot: 50 medewerkers of €10 mln", "omzet. U toetst dit zelf en registreert."]))
box(QX, y4, QW, BH, "q", ("QUESTION 3 · ALWAYS", "VRAAG 3 · ALTIJD"),
    [("Is personal data involved?", "Zijn persoonsgegevens"), ("", "betrokken?")],
    ("for everyone, in parallel", "voor iedereen, parallel"),
    (["Personal data · GDPR", "A personal data breach has its own clock", "under the GDPR (AVG in Dutch), alongside", "any Cbw or Wwke report."],
     ["Persoonsgegevens · AVG", "Een datalek heeft een eigen termijn onder", "de AVG, naast een eventuele melding", "onder de Cbw of de Wwke."]), place="above")

# laws
box(RX, y1, RW, BH, "warn", ("PHYSICAL AND DIGITAL", "FYSIEK EN DIGITAAL"), [("Wwke applies,", "Wwke geldt,"), ("and the Cbw by law", "en de Cbw van rechtswege")],
    ("essential entity", "essentiële entiteit"),
    (["Wwke · Wet weerbaarheid kritieke entiteiten", "Risk assessment within 9 months, measures", "within 10 months: physical protection,", "personnel checks, recovery. A critical", "entity is an essential entity under the Cbw."],
     ["Wwke · Wet weerbaarheid kritieke entiteiten", "Risicobeoordeling binnen 9 maanden,", "maatregelen binnen 10: fysieke beveiliging,", "personeelsscreening, herstel. Een kritieke", "entiteit is essentiële entiteit onder de Cbw."]))
box(RX, y2, RW, BH, "warn", ("DIGITAL ONLY", "ALLEEN DIGITAAL"), [("Cbw applies", "Cbw geldt")],
    ("register with NCSC", "registreren bij NCSC"),
    (["Cbw · Cyberbeveiligingswet", "The Dutch NIS2 law, in force since", "15 August 2026: registration with NCSC,", "duty of care, reporting, board training."],
     ["Cbw · Cyberbeveiligingswet", "De Nederlandse NIS2-wet, van kracht sinds", "15 augustus 2026: registratie bij NCSC,", "zorgplicht, meldplicht, bestuurstraining."]))
box(RX, y3, RW, 64, "ok", ("NEITHER", "GEEN VAN BEIDE"), [("No Cbw or Wwke clock", "Geen Cbw- of Wwke-klok")], None,
    (["Outside Cbw and Wwke", "No Cbw or Wwke clock, but the GDPR,", "contracts and customer duties remain.", "Worth recording the scope decision."],
     ["Buiten Cbw en Wwke", "Geen Cbw- of Wwke-termijn, maar de AVG,", "contracten en klantafspraken blijven.", "Leg het reikwijdtebesluit wel vast."]))
box(RX, y4, RW, BH, "warn", ("PERSONAL DATA BREACH", "DATALEK"), [("GDPR applies", "AVG geldt")],
    ("Art. 33 and 34", "art. 33 en 34"),
    (["GDPR · AVG in Dutch", "General Data Protection Regulation.", "The controller notifies the Dutch data", "protection authority, the AP."],
     ["AVG · Algemene verordening", "gegevensbescherming. De verwerkings-", "verantwoordelijke meldt het datalek bij", "de Autoriteit Persoonsgegevens (AP)."]), place="above")

# reporting clocks
chain(CX, y1, CW, BH, ("WWKE · TO THE COMPETENT AUTHORITY VIA MIJNNCSC", "WWKE · AAN DE BEVOEGDE AUTORITEIT VIA MIJNNCSC"),
      [(("24H", "notification"), ("24U", "melding")),
       (("1 MONTH", "detailed report"), ("1 MAAND", "uitgebreid rapport"))],
      ("if the disruption can count as significant · the Cbw clock below runs as well", "als de verstoring als significant kan gelden · de Cbw-klok hieronder loopt ook"),
      (["Disruptive incident · Wwke Art. 17", "Notify without undue delay and within", "24 hours of becoming aware; detailed", "report within one month. Same portal", "as the Cbw. The NCTV coordinates only."],
       ["Verstorend incident · Wwke art. 17", "Meld zonder onnodige vertraging en binnen", "24 uur na kennisname; uitgebreid rapport", "binnen een maand. Zelfde portaal als de", "Cbw. De NCTV coördineert alleen."]))
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
legend = [(40, "q", "Question", "Vraag"), (200, "warn", "Law applies", "Wet geldt"),
          (400, "bad", "Reporting clock runs", "Meldklok loopt"), (620, "ok", "No Cbw or Wwke clock", "Geen Cbw- of Wwke-klok")]
for x, st, en, nl in legend:
    out.append(f'<rect x="{x}" y="{ly - 11}" width="14" height="14" class="sw sw-{st}"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(f'<path d="M870 {ly - 4} H900" class="lex"/>')
out.append(bi(908, ly, "legend", "pulls the other law in", "trekt de andere wet mee"))
out.append(bi(40, ly + 30, "foot",
              "Indicative — not legal advice · clocks as set in law, scope to confirm with legal · hover or tap a box for an explanation",
              "Indicatief — geen juridisch advies · termijnen zoals in de wet, reikwijdte bevestigen met juristen · beweeg of tik op een blok voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- law map (which law applies) ---------- */
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
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:cw-flow 1.4s linear infinite}
.arch .lex{fill:none;stroke:var(--warn);stroke-width:2}
.arch .arrowhead{fill:var(--slate)}
.arch .sw-q{fill:var(--brand)}
.arch .sw-ok{fill:var(--good)}
.arch .sw-warn{fill:var(--warn)}
.arch .sw-bad{fill:var(--bad)}
@keyframes cw-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "cw-")
SECTION = f"""<section class="risk-block" id="law-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">Which law applies to you.<br><em>And whom you would report to.</em></span><span class="nl">Welke wet voor u geldt.<br><em>En aan wie u zou melden.</em></span></h2>
    <span class="term"><span class="en">law map / indicative, not legal advice</span><span class="nl">wettenkaart / indicatief, geen juridisch advies</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>We suggest settling question 1 with legal now, not after a designation letter arrives.</strong> A designation under the Wwke pulls the Cbw in by law; the reverse does not hold. Both laws use one portal, {abbr("MijnNCSC", "The NCSC portal where organisations register and report incidents under both the Cbw and the Wwke.")}, but the recipients and the clocks differ. Indicative, not a legal deadline list or legal advice.</p>
      <p class="nl"><strong>Wij raden aan vraag 1 nu met juristen te beantwoorden, niet pas als het aanwijzingsbesluit op de mat ligt.</strong> Een aanwijzing onder de Wwke trekt de Cbw van rechtswege mee; andersom geldt dat niet. Beide wetten gebruiken één portaal, {abbr("MijnNCSC", "Het NCSC-portaal waar organisaties zich registreren en incidenten melden onder zowel de Cbw als de Wwke.")}, maar de ontvangers en de termijnen verschillen. Indicatief: geen wettelijke deadlinelijst en geen juridisch advies.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "law-map.svg-section.html"), "w", encoding="utf-8").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

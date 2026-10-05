"""Generate the 'In practice' section for plain-security.fyi/cada-vs-sovereignty-framework/.
Two ladders side by side: the Commission's Cloud Sovereignty Framework (SEAL-0 to SEAL-4,
a procurement tool, Oct 2025) on the left and the four Union assurance levels of the proposed
Cloud and AI Development Act (COM(2026) 502, 3 June 2026) on the right. The middle column says
who would have to use each level and gives one example. Static HTML + inline SVG, no JavaScript.
Checked against CSF v1.2.1 and its implementation guidance, CADA Art. 17-20, 29-31 and Annex II."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 560
LX, LW = 30, 330            # left: the framework (SEAL)
FX, FW = 410, 300           # middle: who / example
RX, RW = 760, 330           # right: CADA levels
BH = 62
ROWS = [78, 158, 238, 318, 398]   # SEAL-0..4; CADA levels 1..4 sit on rows 1..4


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("c", W, H)
out = []


def box(x, y, w, h, status, kick, name, sub, tip, place="below"):
    hc = TIPS.add((x, y, w, h), *tip, place=place)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 20, "kick", *kick))
    out.append(bi(x + 16, y + 40, "name", *name))
    if sub:
        out.append(bi(x + 16, y + h - 9, "st", *sub))
    out.append('</g>')


def who(row, status, label, verdict, tip, place="below"):
    """Middle tag on a row: who would have to use this level under CADA, and one example."""
    x, y, w, h = FX, ROWS[row] + 8, FW, 46
    hc = TIPS.add((x, y, w, h), *tip, place=place)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 19, "fname", *label))
    out.append(bi(x + 16, y + 36, "st", *verdict))
    out.append(f'<path d="M{LX + LW + 2} {y + h / 2} H{x - 3}" class="link"/>')
    out.append(f'<path d="M{x + w + 2} {y + h / 2} H{RX - 4}" class="link"/>')
    out.append('</g>')


out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="cd-title cd-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="cd-title">Two ladders: the Cloud Sovereignty Framework and the proposed Cloud and AI Development Act</title>')
out.append('<desc id="cd-desc">Left: the Commission’s Cloud Sovereignty Framework, a procurement tool with five levels, SEAL-0 no '
           'sovereignty to SEAL-4 full digital sovereignty; SEAL-2 was the minimum in the Commission’s own tender and SEAL-4 is '
           'out of reach today. Right: the four Union assurance levels of the proposed Cloud and AI Development Act; level 1 is a '
           'self-assessment, levels 2 to 4 need an independent audit. In the middle, who would have to use each level once the '
           'proposal becomes law, with one example each: every public buyer at level 1, public-order activities such as hospitals '
           'and utilities at level 2 or higher, justice and classified information at level 3, the most critical activities such '
           'as defence at level 4. Indicative: the two scales are not formally mapped onto each other. Hover or tap a box for an explanation.</desc>')

# zones
ZH = ROWS[-1] + BH + 24 - 30
out.append(f'<rect x="{LX - 10}" y="30" width="{LW + 20}" height="{ZH + 60}" class="zone zone-l"/>')
out.append(bi(LX + 6, 54, "zlabel", "FRAMEWORK · PROCUREMENT TOOL · 2025", "KADER · INKOOPINSTRUMENT · 2025"))
out.append(f'<rect x="{RX - 10}" y="30" width="{RW + 20}" height="{ZH + 60}" class="zone zone-r"/>')
out.append(bi(RX + 6, 54, "zlabel", "CADA · PROPOSAL · 2026", "CADA · VOORSTEL · 2026"))
out.append(bi(FX + 6, 54, "zlabel", "WHO WOULD USE IT · EXAMPLE", "WIE HET ZOU GEBRUIKEN · VOORBEELD"))

# left: SEAL ladder
box(LX, ROWS[0], LW, BH, "bad", ("SEAL-0", "SEAL-0"),
    ("No sovereignty", "Geen soevereiniteit"), ("non-EU control, non-EU law", "niet-EU-zeggenschap, niet-EU-recht"),
    (["SEAL-0 · no sovereignty", "Service, technology and operations under", "exclusive non-EU control, governed entirely", "by non-EU law. A public chatbot, for example."],
     ["SEAL-0 · geen soevereiniteit", "Dienst, techniek en operatie onder exclu-", "sieve niet-EU-zeggenschap, geheel onder", "niet-EU-recht. Bijvoorbeeld een publieke chatbot."]))
box(LX, ROWS[1], LW, BH, "bad", ("SEAL-1", "SEAL-1"),
    ("EU law on paper", "EU-recht op papier"), ("limited enforceability · non-EU control", "beperkt afdwingbaar · niet-EU-zeggenschap"),
    (["SEAL-1 · jurisdictional sovereignty", "EU law formally applies but is hard to", "enforce; the provider stays under exclusive", "non-EU control. An EU region of a global", "cloud without a separate EU entity."],
     ["SEAL-1 · juridische soevereiniteit", "EU-recht geldt formeel maar is moeilijk af", "te dwingen; de aanbieder blijft onder exclu-", "sieve niet-EU-zeggenschap. Een EU-regio van", "een wereldwijde cloud zonder EU-entiteit."]))
box(LX, ROWS[2], LW, BH, "warn", ("SEAL-2 · DATA SOVEREIGNTY", "SEAL-2 · DATASOEVEREINITEIT"),
    ("EU law enforceable", "EU-recht afdwingbaar"), ("non-EU dependencies remain · tender minimum", "niet-EU-afhankelijkheden blijven · minimum tender"),
    (["SEAL-2 · data sovereignty", "EU law applies and is enforceable; non-EU", "parties have indirect control and material", "dependencies remain. Separate EU entities,", "customer-held keys. The Commission's minimum."],
     ["SEAL-2 · datasoevereiniteit", "EU-recht geldt en is afdwingbaar; niet-EU-", "partijen hebben indirecte zeggenschap en er", "blijven wezenlijke afhankelijkheden. Aparte", "EU-entiteiten, eigen sleutels. Commissieminimum."]))
box(LX, ROWS[3], LW, BH, "good", ("SEAL-3", "SEAL-3"),
    ("EU actors in control", "EU-partijen aan het stuur"), ("marginal non-EU control", "marginale niet-EU-zeggenschap"),
    (["SEAL-3 · EU actors in control", "EU actors exercise meaningful but not full", "influence; non-EU control is marginal.", "Decision-making in the EU, EU-run operations,", "non-EU law insulated by design."],
     ["SEAL-3 · EU-partijen aan het stuur", "EU-partijen hebben wezenlijke maar geen", "volledige invloed; niet-EU-zeggenschap is", "marginaal. Besluitvorming in de EU, EU-", "operatie, niet-EU-recht bewust afgeschermd."]))
box(LX, ROWS[4], LW, BH, "good", ("SEAL-4", "SEAL-4"),
    ("Full digital sovereignty", "Volledige digitale soevereiniteit"), ("no critical non-EU dependency · not reachable today", "geen kritieke niet-EU-afhankelijkheid · onhaalbaar"),
    (["SEAL-4 · full digital sovereignty", "Complete EU control, EU law only, no", "critical non-EU dependency. The Commission's", "own guidance calls it out of reach today", "because chips and hardware come from outside."],
     ["SEAL-4 · volledige digitale soevereiniteit", "Volledige EU-zeggenschap, alleen EU-recht,", "geen kritieke niet-EU-afhankelijkheid. De", "Commissie noemt het vandaag onhaalbaar omdat", "chips en hardware van buiten komen."]), place="above")

# right: CADA Union assurance levels
box(RX, ROWS[1], RW, BH, "warn", ("LEVEL 1 · SELF-ASSESSMENT", "NIVEAU 1 · ZELFBEOORDELING"),
    ("Established and hosted in the EU", "Gevestigd en gehost in de EU"), ("data, metadata and telemetry stay in the EU", "data, metadata en telemetrie blijven in de EU"),
    (["Level 1 · the baseline for every public buyer", "EU-established provider, infrastructure in", "the EU, customer data incl. metadata and", "telemetry in the EU. A non-EU parent is", "allowed. Self-assessed statement of conformity."],
     ["Niveau 1 · de basis voor elke publieke inkoper", "In de EU gevestigde aanbieder, infrastructuur", "in de EU, klantdata incl. metadata en tele-", "metrie in de EU. Niet-EU-moeder toegestaan.", "Zelf opgestelde EU-conformiteitsverklaring."]))
box(RX, ROWS[2], RW, BH, "warn", ("LEVEL 2 · INDEPENDENT AUDIT", "NIVEAU 2 · ONAFHANKELIJKE AUDIT"),
    ("EU staff, EU-only support", "EU-personeel, support alleen uit de EU"), ("non-EU parent allowed if ring-fenced", "niet-EU-moeder toegestaan mits afgeschermd"),
    (["Level 2 · audited; ring-fenced parent allowed", "Staff in the EU, support only from the EU,", "EU security certificate 'substantial', your", "data never trains non-EU AI, SBOM. A non-EU", "parent must be unable to read, stop or sanction."],
     ["Niveau 2 · geaudit; afgeschermde moeder mag", "Personeel in de EU, support alleen uit de EU,", "EU-certificaat 'substantieel', uw data traint", "nooit niet-EU-AI, SBOM. Een niet-EU-moeder", "mag niet kunnen meelezen, stoppen of sanctioneren."]))
box(RX, ROWS[3], RW, BH, "good", ("LEVEL 3 · INDEPENDENT AUDIT", "NIVEAU 3 · ONAFHANKELIJKE AUDIT"),
    ("No non-EU control", "Geen niet-EU-zeggenschap"), ("EU citizens, cleared where needed", "EU-burgers, gescreend waar nodig"),
    (["Level 3 · no non-EU control", "Provider and subcontractors not controlled", "from outside the EU, unless the Commission", "lists that country. EU-citizen staff, cleared", "where needed. Fit for EU classified data."],
     ["Niveau 3 · geen niet-EU-zeggenschap", "Aanbieder en onderaannemers niet van buiten", "de EU bestuurd, tenzij de Commissie dat land", "aanwijst. EU-burgers, gescreend waar nodig.", "Geschikt voor gerubriceerde EU-informatie."]))
box(RX, ROWS[4], RW, BH, "good", ("LEVEL 4 · INDEPENDENT AUDIT", "NIVEAU 4 · ONAFHANKELIJKE AUDIT"),
    ("Highest · certificate 'high'", "Hoogste · certificaat 'hoog'"), ("no non-EU hold on the software either", "ook geen niet-EU-greep op de software"),
    (["Level 4 · the highest level", "Everything of level 3, no exception for", "listed countries, EU security certificate", "'high', and no non-EU entity may effectively", "control the software components either."],
     ["Niveau 4 · het hoogste niveau", "Alles van niveau 3, geen uitzondering voor", "aangewezen landen, EU-certificaat 'hoog', en", "ook geen niet-EU-partij met effectieve greep", "op de softwarecomponenten."]), place="above")

# middle: who would use it, with an example
who(1, "warn", ("EVERY PUBLIC BUYER", "ELKE PUBLIEKE INKOPER"), ("e.g. a municipality's HR system", "bijv. het HR-systeem van een gemeente"),
    (["Every public buyer · level 1 as a minimum", "Under the proposal, public bodies whose", "activity is not 'public order' would only buy", "recognised level-1 services. Routine systems:", "HR, finance, a citizen portal."],
     ["Elke publieke inkoper · minimaal niveau 1", "Volgens het voorstel kopen publieke organen", "zonder 'openbare orde'-activiteit alleen", "erkende niveau-1-diensten. Routinesystemen:", "HR, financiën, een burgerportaal."]))
who(2, "warn", ("PUBLIC-ORDER ACTIVITIES", "ACTIVITEITEN VAN OPENBARE ORDE"), ("e.g. hospital, water utility", "bijv. ziekenhuis, waterbedrijf"),
    (["Public-order activities · level 2 or higher", "Activities in NIS2 sectors that a national", "risk assessment marks as public order would", "only buy level 2, 3 or 4. The level is set", "per activity, not per organisation."],
     ["Openbare orde · niveau 2 of hoger", "Activiteiten in NIS2-sectoren die een natio-", "nale risicobeoordeling als openbare orde", "aanmerkt, kopen alleen niveau 2, 3 of 4. Het", "niveau geldt per activiteit, niet per organisatie"]))
who(3, "good", ("JUSTICE · POLICE · CLASSIFIED", "JUSTITIE · POLITIE · GERUBRICEERD"), ("e.g. EU classified information", "bijv. gerubriceerde EU-informatie"),
    (["Justice, police, classified · often level 3", "The proposal names justice, law enforcement,", "borders and internal security. Levels 3 and 4", "should allow EU classified information.", "The exact level follows the risk assessment."],
     ["Justitie, politie, gerubriceerd · vaak niveau 3", "Het voorstel noemt justitie, opsporing, grens-", "bewaking en binnenlandse veiligheid. Niveau 3", "en 4 moeten gerubriceerde EU-informatie aankunnen.", "Het precieze niveau volgt uit de risicobeoordeling"]))
who(4, "good", ("MOST CRITICAL · DEFENCE", "MEEST KRITIEK · DEFENSIE"), ("set by the national risk assessment", "bepaald door de nationale risicobeoordeling"),
    (["Most critical · defence · level 4", "The Commission's methodology would say how", "Member States use the highest level for the", "most critical activities, defence included.", "Migration, if needed, within 12 months."],
     ["Meest kritiek · defensie · niveau 4", "De methodiek van de Commissie zou bepalen hoe", "lidstaten het hoogste niveau inzetten voor de", "meest kritieke activiteiten, defensie incluis.", "Migratie, indien nodig, binnen 12 maanden."]), place="above")

# legend
ly = 500
legend = [(30, "good", "Non-EU control excluded", "Niet-EU-zeggenschap uitgesloten"),
          (300, "warn", "Non-EU parent allowed under conditions", "Niet-EU-moeder toegestaan onder voorwaarden"),
          (660, "bad", "Non-EU law decides in practice", "Niet-EU-recht beslist in de praktijk")]
for x, st, en, nl in legend:
    out.append(f'<rect x="{x}" y="{ly - 11}" width="14" height="14" class="sw sw-{st}"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(30, ly + 30, "foot",
              "Indicative — the two scales are not formally mapped onto each other, and CADA is a proposal · hover or tap a box for an explanation",
              "Indicatief — de twee schalen zijn niet formeel op elkaar gelegd, en CADA is een voorstel · beweeg of tik op een blok voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- two ladders (framework vs CADA) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .zone-l{stroke:rgba(255,200,87,.35)}
.arch .zone-r{stroke:rgba(90,200,250,.35)}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.24em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .s-good .bar{fill:var(--good)}
.arch .s-warn .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .fname{font:700 11px var(--mono);letter-spacing:.14em;fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5}
.arch .s-good .link{stroke:rgba(55,211,155,.6)}
.arch .s-warn .link{stroke:rgba(255,200,87,.6)}
.arch .sw-good{fill:var(--good)}
.arch .sw-warn{fill:var(--warn)}
.arch .sw-bad{fill:var(--bad)}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "cd-")
SECTION = f"""<section class="risk-block" id="cada-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">Two ladders, side by side.<br><em>Where would you land?</em></span><span class="nl">Twee ladders naast elkaar.<br><em>Waar zou u uitkomen?</em></span></h2>
    <span class="term"><span class="en">the framework's SEAL levels, the proposal's assurance levels, and who would use which / indicative</span><span class="nl">de SEAL-niveaus van het kader, de zekerheidsniveaus van het voorstel, en wie welk zou gebruiken / indicatief</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>We suggest reading the ladders from the middle.</strong> Find the activity that looks most like yours, then read left for the question to ask a supplier today and right for the level the proposal would attach to it. The scales are not formally mapped onto each other: {abbr("SEAL", "Sovereignty Effectiveness Assurance Level: the Commission's 0-to-4 scale for how far a cloud service is under EU control and EU law.")} scores how sovereign a service is, the proposal's levels say what a public buyer would be allowed to buy. Most organisations will find themselves on the two middle rows.</p>
      <p class="nl"><strong>Wij raden aan de ladders vanuit het midden te lezen.</strong> Zoek de activiteit die het meest op de uwe lijkt, lees dan links welke vraag u een leverancier vandaag stelt en rechts welk niveau het voorstel eraan zou koppelen. De schalen zijn niet formeel op elkaar gelegd: {abbr("SEAL", "Sovereignty Effectiveness Assurance Level: de schaal van 0 tot 4 van de Commissie voor hoever een clouddienst onder EU-controle en EU-recht valt.")} meet hoe soeverein een dienst is, de niveaus van het voorstel zeggen wat een publieke inkoper zou mogen kopen. De meeste organisaties komen op de twee middelste rijen uit.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "cada-map.svg-section.html"), "w", encoding="utf-8").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

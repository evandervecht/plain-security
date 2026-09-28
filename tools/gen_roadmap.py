"""Generate the phased PQC roadmap (Gantt) section for plain-security.fyi/quantum-and-ai/.
Board-first: plain-language rows, technical detail as a secondary line.
Static HTML + inline SVG, no JavaScript."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

ROW_TIPS = {  # hover text for row labels; first line = term
    "quantum": (["Q-day", "The day a quantum computer can break RSA", "and ECC. Nobody knows when; the Dutch AIVD", "says it could be as early as 2030."],
                ["Q-day", "De dag dat een quantumcomputer RSA en ECC", "kan breken. Niemand weet wanneer; de AIVD", "zegt mogelijk al in 2030."]),
    2: (["Crypto inventory · data classification", "Inventory: every place encryption is used,", "and which algorithm. Classification: how", "long each kind of data must stay secret."],
        ["Crypto-inventaris · dataclassificatie", "Inventaris: waar encryptie wordt gebruikt,", "en welk algoritme. Classificatie: hoe lang", "elk soort data geheim moet blijven."]),
    3: (["PQ · post-quantum encryption", "Encryption quantum computers cannot break.", "Hybrid = PQ plus today's method, so if one", "fails your data is still protected."],
        ["PQ · post-quantum encryptie", "Encryptie die quantumcomputers niet breken.", "Hybride = PQ plus de huidige methode; faalt", "er één, dan blijft uw data beschermd."]),
    4: (["Certificates · HSMs", "Certificates prove a site or device is", "genuine. HSM: sealed hardware for keys.", "Both move to ML-DSA or LMS signatures."],
        ["Certificaten · HSM's", "Certificaten bewijzen dat een site of", "apparaat echt is. HSM: afgeschermde", "sleutelhardware. Beide gaan naar ML-DSA/LMS."]),
    5: (["RSA / ECC · OT / IoT", "RSA/ECC: today's public-key algorithms,", "broken outright by quantum. OT/IoT: machines,", "sensors, devices — often slowest to update."],
        ["RSA / ECC · OT / IoT", "RSA/ECC: huidige public-key-algoritmen, door", "quantum volledig te breken. OT/IoT: machines,", "sensoren, apparaten — vaak traagst te updaten."]),
    "suppliers": (["NIS2 · DORA", "NIS2: EU cyber law — in the Netherlands the", "Cyberbeveiligingswet, in force 15 Aug 2026.", "DORA: EU rules for financial firms. Both", "expect you to manage supplier risk."],
                  ["NIS2 · DORA", "NIS2: EU-cyberwet — in Nederland de", "Cyberbeveiligingswet, van kracht per 15 aug", "2026. DORA: EU-regels voor financiële", "instellingen. Beide vragen leveranciersbeheer."]),
    "agility": (["Crypto agility · risk indicators (KRIs)", "Agility: swapping an algorithm without", "rebuilding the system. KRIs: the numbers the", "board tracks, e.g. % of systems migrated."],
                ["Crypto-agility · risico-indicatoren (KRI's)", "Agility: een algoritme wisselen zonder het", "systeem opnieuw te bouwen. KRI's: cijfers die", "de directie volgt, zoals % gemigreerd."]),
}
FLAG_TIPS = [
    (["EU PQC Roadmap · June 2025", "A recommendation from the NIS Cooperation", "Group to EU Member States. Not a law, but", "a likely yardstick for supervisors."],
     ["EU PQC-roadmap · juni 2025", "Aanbeveling van de NIS-samenwerkingsgroep", "aan de lidstaten. Geen wet, maar wel een", "verwachte maatstaf voor toezichthouders."]),
    (["EU + NIST target dates", "EU: high-risk systems quantum-safe by end", "2030, medium-risk by end 2035. NIST (US,", "draft IR 8547): RSA/ECC out by 2030/2035."],
     ["Streefdata EU + NIST", "EU: hoog-risicosystemen quantumveilig eind", "2030, middelrisico eind 2035. NIST (VS,", "concept IR 8547): RSA/ECC uit in 2030/2035."]),
]
FLAG_TIPS.append(FLAG_TIPS[1])

W, H = 1120, 820
X0, X1 = 330, 1080          # timeline pixels for 2026.0 .. 2036.0
Y_START, Y_END = 2026.0, 2036.0
TODAY = 2026.74             # end of September 2026


def xy(year):
    return round(X0 + (year - Y_START) / (Y_END - Y_START) * (X1 - X0), 1)


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


def tag(x, y, kind):
    w = 42 if kind == "HNDL" else 32
    cls = "tag-h" if kind == "HNDL" else "tag-s"
    h = TIPS.gloss((x, y, w, 16), kind)
    return (f'<g class="{cls} {h}" tabindex="0"><rect x="{x}" y="{y}" width="{w}" height="16"/>'
            f'<text x="{x + w / 2}" y="{y + 11.5}" text-anchor="middle">{kind}</text></g>')


TIPS = Tips("r", W, H)
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="rm-title rm-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="rm-title">Post-quantum migration roadmap, 2026 to 2035</title>')
out.append('<desc id="rm-desc">Why now: data encrypted today must stay secret for 10 to 25 years, migration takes 5 to 8 years, '
           'and a quantum computer that breaks current encryption may arrive in the 2030s. '
           'Five phases: decide and fund (2026), know what we have (to 2027), stop the harvest (2027 to 2029), '
           'renew digital signatures (2028 to mid 2031), clean up and switch off (2030 to 2035), plus ongoing supplier management and crypto agility. '
           'Deadlines: EU start by end 2026, high-risk systems by 2030, everything by 2035. Five board checkpoints.</desc>')
out.append('''<defs>
<pattern id="rm-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="hatch-bg"/><line x1="0" y1="0" x2="0" y2="6" class="hatch-ln"/></pattern>
<pattern id="rm-risk" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" class="risk-bg"/><line x1="0" y1="0" x2="0" y2="6" class="risk-ln"/></pattern>
<linearGradient id="rm-q" x1="0" x2="1" y1="0" y2="0"><stop offset="0" class="q0"/><stop offset=".45" class="q1"/><stop offset="1" class="q2"/></linearGradient>
<marker id="rm-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
</defs>''')

# ---- year axis + grid ----
for yr in range(2026, 2036):
    x = xy(yr)
    out.append(f'<line x1="{x}" y1="62" x2="{x}" y2="736" class="grid"/>')
    out.append(f'<text x="{x + 37.5}" y="52" class="year" text-anchor="middle">{yr}</text>')
out.append(f'<line x1="{X1}" y1="62" x2="{X1}" y2="736" class="grid"/>')
out.append(f'<line x1="{X0}" y1="62" x2="{X1}" y2="62" class="axis"/>')

# ---- regulatory deadlines (flags) ----
DEADLINES = [  # year, anchor, (EN l1, l2), (NL l1, l2)
    (2027.0, "start", ("EU: PLANS + PILOTS", "started by end of 2026", ""), ("EU: PLANNEN + PILOTS", "gestart vóór eind 2026", "")),
    (2031.0, "start", ("EU: HIGH-RISK DONE", "NIST draft:", "RSA/ECC deprecated"), ("EU: HOOG RISICO KLAAR", "NIST-concept:", "RSA/ECC afgeraden")),
    (2036.0, "end", ("EU: MEDIUM-RISK DONE", "NIST draft:", "RSA/ECC disallowed"), ("EU: MIDDEL RISICO KLAAR", "NIST-concept:", "RSA/ECC verboden")),
]
for i, (yr, anchor, (a1, a2, a3), (b1, b2, b3)) in enumerate(DEADLINES):
    x = xy(yr)
    out.append(f'<line x1="{x}" y1="70" x2="{x}" y2="736" class="deadline"/>')
    bx = x if anchor == "start" else x - 160
    h = TIPS.add((bx, 66, 160, 44), *FLAG_TIPS[i])
    out.append(f'<g class="{h}" tabindex="0"><rect x="{bx}" y="66" width="160" height="44" fill="transparent"/>')
    out.append(f'<path d="M{x} 70 V96 M{x} 70 h{9 if anchor == "start" else -9} l{-3 if anchor == "start" else 3} 4 l{3 if anchor == "start" else -3} 4 h{-9 if anchor == "start" else 9}" class="flag"/>')
    tx = x + 14 if anchor == "start" else x - 14
    ta = f' text-anchor="{anchor}"'
    out.append(bi(tx, 80, "dl1", a1, b1, ta))
    out.append(bi(tx, 93, "dl2", a2, b2, ta))
    if a3:
        out.append(bi(tx, 105, "dl2", a3, b3, ta))
    out.append('</g>')

# ---- zone helper ----
def zone(y, h, en, nl):
    out.append(f'<rect x="20" y="{y}" width="{W - 40}" height="{h}" class="zone"/>')
    out.append(bi(40, y + 22, "zlabel", en, nl))


def row_label(y, name, sub, tg=None, tip=None):
    if tip:
        h = TIPS.add((36, y - 12, 250, 38), *tip)
        out.append(f'<g class="{h}" tabindex="0"><rect x="36" y="{y - 12}" width="250" height="38" fill="transparent"/>')
    out.append(bi(40, y + 4, "name", *name))
    out.append(bi(40, y + 19, "sub", *sub))
    if tip:
        out.append('</g>')
    if tg:
        # tag sits after the name; widths differ per language, so it goes at a fixed column
        out.append(tag(262 if tg == "HNDL" else 272, y - 9, tg))


def bar(y, start, end, cls, text=None, text_cls="bar-in", fill=None):
    x, w = xy(start), xy(end) - xy(start)
    f = f' fill="{fill}"' if fill else ""
    out.append(f'<rect x="{x}" y="{y - 8}" width="{w}" height="18" class="{cls}"{f}/>')
    if text:
        en, nl = text
        if w >= 96:
            out.append(bi(x + 8, y + 5, text_cls, en, nl))
        else:
            out.append(bi(x + w + 8, y + 5, "bar-out", en, nl))


# ---- WHY NOW ----
zone(116, 162, "WHY NOW · THE WINDOW", "WAAROM NU · HET VENSTER")
r1, r2, r3 = 158, 198, 238
row_label(r1, ("Today's data must stay secret", "Data van vandaag moet geheim blijven"),
          ("Medical, IP, personal data: 10–25 years", "Medisch, IP, persoonsgegevens: 10–25 jaar"))
bar(r1, TODAY, 2030.0, "b-data", ("SAFE — FOR NOW", "VEILIG — VOOR NU"))
x = xy(2030.0)
out.append(f'<rect x="{x}" y="{r1 - 8}" width="{X1 - x}" height="18" fill="url(#rm-risk)" class="b-risk"/>')
out.append(bi(x + 8, r1 + 5, "risk-in", "READABLE BY ATTACKER IF NOT MIGRATED  →  2040+",
              "LEESBAAR VOOR AANVALLER ALS NIET GEMIGREERD  →  2040+"))

row_label(r2, ("Moving to new encryption takes", "Overstappen op nieuwe encryptie duurt"),
          ("A typical programme: 5–8 years", "Een gemiddeld programma: 5–8 jaar"))
bar(r2, TODAY, 2033.5, "b-mig", ("5–8 YEARS OF WORK", "5–8 JAAR WERK"))

row_label(r3, ("When quantum breaks today's crypto", "Wanneer quantum huidige crypto breekt"),
          ("Credible estimates: the 2030s · uncertain", "Serieuze schattingen: jaren 2030 · onzeker"), tip=ROW_TIPS["quantum"])
x = xy(2029.0)
out.append(f'<rect x="{x}" y="{r3 - 8}" width="{X1 - x}" height="18" fill="url(#rm-q)"/>')
out.append(bi(x + 70, r3 + 5, "q-in", "POSSIBLE ARRIVAL — NOBODY KNOWS THE YEAR", "MOGELIJKE KOMST — NIEMAND KENT HET JAAR"))

# ---- PHASES ----
zone(292, 332, "WHAT WE DO · FIVE PHASES", "WAT WE DOEN · VIJF FASEN")
PHASES = [  # (EN, NL) name, (EN, NL) sub, tag, start, end, class, (EN, NL) bar text
    (("1  Decide & fund", "1  Besluiten & financieren"), ("Board mandate · one owner · budget", "Mandaat directie · één eigenaar · budget"),
     None, TODAY, 2027.25, "b-p1", ("Q4 2026", "Q4 2026")),
    (("2  Know what we have", "2  Weten wat we hebben"), ("Crypto inventory · data classification", "Crypto-inventaris · dataclassificatie"),
     None, TODAY, 2028.0, "b-p2", ("2026 – 2027", "2026 – 2027")),
    (("3  Stop the harvest", "3  Oogsten stoppen"), ("New encryption on web, VPN & supplier links", "Nieuwe encryptie op web, VPN & leveranciers"),
     "HNDL", 2027.25, 2030.0, "b-p3", ("2027 – 2029", "2027 – 2029")),
    (("4  Renew digital signatures", "4  Digitale handtekeningen"), ("Certificates, code & firmware signing, HSMs", "Certificaten, code- & firmwaresignering, HSM's"),
     "SIG", 2028.0, 2031.5, "b-p4", ("2028 – mid 2031", "2028 – medio 2031")),
    (("5  Clean up & switch off", "5  Opruimen & uitschakelen"), ("Legacy, OT/IoT, archives · retire RSA/ECC", "Legacy, OT/IoT, archieven · RSA/ECC uit"),
     None, 2030.0, 2035.9, "b-p5", ("2030 – 2035", "2030 – 2035")),
]
y = 336
for n, (name, sub, tg, s, en_, cls, txt) in enumerate(PHASES, 1):
    row_label(y, name, sub, tg, tip=ROW_TIPS.get(n))
    bar(y, s, en_, cls, txt)
    y += 42

out.append(f'<line x1="40" y1="{y - 20}" x2="{X1}" y2="{y - 20}" class="sep"/>')
y += 6
ONGOING = [
    (("Keep suppliers in step", "Leveranciers meenemen"), ("Contracts · due diligence · NIS2/DORA evidence", "Contracten · due diligence · NIS2/DORA-bewijs"),
     TODAY, Y_END, ("ONGOING", "DOORLOPEND")),
    (("Stay able to switch", "Kunnen blijven wisselen"), ("Crypto agility · monitoring · risk indicators", "Crypto-agility · monitoring · risico-indicatoren"),
     2027.5, Y_END, ("ONGOING", "DOORLOPEND")),
]
for key, (name, sub, s, en_, txt) in zip(("suppliers", "agility"), ONGOING):
    row_label(y, name, sub, tip=ROW_TIPS[key])
    bar(y, s, en_, "b-ongoing", txt, text_cls="ongoing-in", fill="url(#rm-hatch)")
    y += 42

# ---- BOARD CHECKPOINTS ----
zone(638, 104, "WHEN THE BOARD CHECKS · YES / NO", "WANNEER DE DIRECTIE TOETST")
out.append(bi(40, 686, "name", "Five checkpoints", "Vijf toetsmomenten"))
out.append(bi(40, 702, "sub", "Each is a yes/no question, not a tech review", "Elk een ja/nee-vraag, geen technische review"))
CHECKS = [  # year, n, row (0 = upper, 1 = lower), anchor, (EN, NL)
    (2026.95, 1, 0, "middle", ("Mandate & budget?", "Mandaat & budget?")),
    (2028.0, 2, 1, "middle", ("Inventory done · baseline set?", "Inventaris klaar · nulmeting?")),
    (2030.0, 3, 0, "middle", ("Harvest-exposed links protected?", "Oogstbare verbindingen beschermd?")),
    (2031.5, 4, 1, "middle", ("Signatures renewed?", "Handtekeningen vernieuwd?")),
    (2035.9, 5, 0, "end", ("Old crypto switched off?", "Oude crypto uitgeschakeld?")),
]
cy = 684
for yr, n, row, anchor, (en, nl) in CHECKS:
    x = xy(yr)
    out.append(f'<rect x="{x - 8}" y="{cy - 8}" width="16" height="16" transform="rotate(45 {x} {cy})" class="diamond"/>')
    out.append(f'<text x="{x}" y="{cy + 4}" class="dnum" text-anchor="middle">{n}</text>')
    ly = cy + (26 if row == 0 else 44)
    lx = x + 8 if anchor == "end" else x
    if row == 1:
        out.append(f'<line x1="{x}" y1="{cy + 12}" x2="{x}" y2="{ly - 11}" class="leader"/>')
    out.append(bi(lx, ly, "check", en, nl, f' text-anchor="{anchor}"'))

# ---- today marker (on top) ----
tx = xy(TODAY)
out.append(f'<line x1="{tx}" y1="104" x2="{tx}" y2="624" class="today"/>')
out.append(bi(tx, 112, "today-t", "TODAY", "VANDAAG", ' text-anchor="middle"'))

# ---- legend + footnote ----
ly = 774
out.append(f'<rect x="40" y="{ly - 10}" width="12" height="12" transform="rotate(45 46 {ly - 4})" class="diamond"/>')
out.append(bi(62, ly, "legend", "Board checkpoint", "Toetsmoment directie"))
out.append(f'<path d="M240 {ly - 13} V{ly + 2} M240 {ly - 13} h9 l-3 4 l3 4 h-9" class="flag"/>')
out.append(bi(258, ly, "legend", "Official target date", "Officiële streefdatum"))
out.append(f'<rect x="440" y="{ly - 10}" width="30" height="12" fill="url(#rm-hatch)" class="b-ongoing"/>')
out.append(bi(480, ly, "legend", "Ongoing, never “done”", "Doorlopend, nooit “klaar”"))
out.append(tag(680, ly - 12, "HNDL"))
out.append(tag(730, ly - 12, "SIG"))
out.append(bi(772, ly, "legend", "Same tags as the crypto map", "Zelfde labels als de cryptokaart"))
out.append(bi(40, ly + 28, "foot",
              "Suggested timeline, not a legal deadline · sources: EU PQC Roadmap v1.1 (June 2025), NCSC UK (2025), NIST IR 8547 draft (2024)",
              "Voorgestelde tijdlijn, geen wettelijke deadline · bronnen: EU PQC Roadmap v1.1 (juni 2025), NCSC UK (2025), NIST IR 8547-concept (2024)"))
out.append(bi(40, 30, "hint", "HOVER OR TAP A LABEL FOR AN EXPLANATION", "BEWEEG OF TIK OP EEN LABEL VOOR UITLEG"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- roadmap (phased gantt) ---------- */
.rmap{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.rmap svg{display:block;width:100%;min-width:940px;height:auto}
.rmap .zone{fill:var(--bg-hi);stroke:var(--line-soft);fill-opacity:.7}
.rmap .zlabel{font:700 11px var(--mono);letter-spacing:.28em;fill:var(--slate)}
.rmap .grid{stroke:var(--line-soft);stroke-width:1}
.rmap .axis{stroke:var(--line);stroke-width:1}
.rmap .year{font:700 12px var(--mono);letter-spacing:.1em;fill:var(--muted)}
.rmap .deadline{stroke:var(--warn);stroke-opacity:.35;stroke-dasharray:2 4}
.rmap .flag{fill:none;stroke:var(--warn);stroke-width:1.5;stroke-linejoin:round}
.rmap .dl1{font:700 9.5px var(--mono);letter-spacing:.1em;fill:var(--warn)}
.rmap .dl2{font:400 9.5px var(--mono);fill:var(--body)}
.rmap .name{font:600 12.5px var(--sans);fill:var(--white)}
.rmap .sub{font:400 9.5px var(--mono);fill:var(--muted)}
.rmap .bar-in{font:700 9.5px var(--mono);letter-spacing:.1em;fill:var(--deep)}
.rmap .bar-out{font:700 9.5px var(--mono);letter-spacing:.1em;fill:var(--body)}
.rmap .risk-in{font:700 9.5px var(--mono);letter-spacing:.1em;fill:var(--white)}
.rmap .q-in{font:700 9.5px var(--mono);letter-spacing:.1em;fill:var(--white)}
.rmap .ongoing-in{font:700 9.5px var(--mono);letter-spacing:.14em;fill:var(--body)}
.rmap .b-data{fill:var(--brand)}
.rmap .b-risk{stroke:var(--bad);stroke-opacity:.6}
.rmap .risk-bg{fill:rgba(255,93,115,.18)}
.rmap .risk-ln{stroke:var(--bad);stroke-opacity:.45;stroke-width:2}
.rmap .b-mig{fill:var(--warn)}
.rmap .q0{stop-color:var(--bad);stop-opacity:0}
.rmap .q1{stop-color:var(--bad);stop-opacity:.45}
.rmap .q2{stop-color:var(--bad);stop-opacity:.8}
.rmap .b-p1{fill:var(--muted)}
.rmap .b-p2{fill:var(--brand)}
.rmap .b-p3{fill:var(--bad)}
.rmap .b-p4{fill:var(--warn)}
.rmap .b-p5{fill:var(--good)}
.rmap .b-ongoing{stroke:var(--slate)}
.rmap .hatch-bg{fill:var(--surface)}
.rmap .hatch-ln{stroke:var(--line);stroke-width:2}
.rmap .sep{stroke:var(--line);stroke-dasharray:3 4}
.rmap .diamond{fill:var(--white)}
.rmap .dnum{font:700 10px var(--mono);fill:var(--deep)}
.rmap .check{font:700 10px var(--mono);fill:var(--prose);paint-order:stroke;stroke:var(--bg-hi);stroke-width:4px}
.rmap .leader{stroke:var(--slate)}
.rmap .today{stroke:var(--brand);stroke-width:1.5}
.rmap .today-t{font:700 9.5px var(--mono);letter-spacing:.18em;fill:var(--brand);paint-order:stroke;stroke:var(--bg-lo);stroke-width:4px}
.rmap .arrowhead{fill:var(--slate)}
.rmap .legend{font:400 11px var(--mono);fill:var(--body)}
.rmap .foot{font:400 10px var(--mono);letter-spacing:.04em;fill:var(--slate)}
.rmap .tag-h rect{fill:rgba(255,93,115,.12);stroke:rgba(255,93,115,.5)}
.rmap .tag-h text{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--bad-soft)}
.rmap .tag-s rect{fill:rgba(135,162,176,.12);stroke:var(--slate)}
.rmap .tag-s text{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--muted)}
.rmap .hint{font:700 9.5px var(--mono);letter-spacing:.16em;fill:var(--slate)}
""" + TIPS.css(".rmap") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".rmap", "rm-")
SECTION = f"""<section class="risk-block" id="roadmap">
  <div class="wrap">
    <span class="kicker"><b>//</b><span class="en">ROADMAP</span><span class="nl">ROADMAP</span></span>
    <h2><span class="en">From today to 2035.<br><em>Five phases, five board checkpoints.</em></span><span class="nl">Van vandaag tot 2035.<br><em>Vijf fasen, vijf toetsmomenten.</em></span></h2>
    <span class="term"><span class="en">post-quantum migration / suggested plan, not mandatory</span><span class="nl">post-quantum migratie / voorgesteld plan, niet verplicht</span></span>

    <figure class="rmap">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>The top three bars carry the argument:</strong> data encrypted today may need to stay secret for longer than it takes a quantum computer to arrive, and switching takes years. That is why we suggest starting now — mostly by adding post-quantum requirements to hardware, software and contract renewals you already plan.</p>
      <p class="en"><strong>What the board may want to decide in 2026:</strong> a mandate, one owner (often the {abbr("CIO", "Chief Information Officer: the executive responsible for IT.")}) and a multi-year budget — then five yes/no checkpoints. The flags are EU recommendations and {abbr("NIST", "US National Institute of Standards and Technology. Published the first post-quantum standards in 2024.")} drafts, not legal deadlines; your sector or supervisor may set other dates.</p>
      <p class="nl"><strong>De bovenste drie balken dragen het verhaal:</strong> data die vandaag wordt versleuteld, moet mogelijk langer geheim blijven dan het duurt voordat er een quantumcomputer is, en overstappen kost jaren. Daarom stellen we voor nu te beginnen — vooral door post-quantum eisen op te nemen in hardware-, software- en contractvernieuwingen die u al plant.</p>
      <p class="nl"><strong>Wat de directie in 2026 zou kunnen besluiten:</strong> een mandaat, één eigenaar (vaak de {abbr("CIO", "Chief Information Officer: de bestuurder die verantwoordelijk is voor IT.")}) en een meerjarig budget — daarna vijf ja/nee-toetsmomenten. De vlaggen zijn EU-aanbevelingen en {abbr("NIST", "Amerikaans standaardeninstituut. Publiceerde in 2024 de eerste post-quantum standaarden.")}-concepten, geen wettelijke deadlines; uw sector of toezichthouder kan andere data stellen.</p>
    </div>
  </div>
</section>"""

import os
BASE_CSS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "preview_base.css")).read()
open(os.path.join(OUT, "roadmap.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert after the crypto map section, before CONTROLS -->\n" + SECTION + "\n")
open(os.path.join(OUT, "roadmap-preview.html"), "w").write(f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview · Roadmap</title>
<style>
{BASE_CSS}
{CSS}
</style></head><body>
<div class="lang"><input type="radio" name="lang" id="lang-en" checked><input type="radio" name="lang" id="lang-nl"><label for="lang-en">EN</label><label for="lang-nl">NL</label></div>
{SECTION}
</body></html>""")
print("ok")

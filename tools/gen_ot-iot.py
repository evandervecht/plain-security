"""Generate the 'In practice' reference diagram for plain-security.fyi/ot-iot/:
office IT | IT/OT DMZ | OT operations | cell/area zones (Purdue model, IEC 62443
zones and conduits), with the vendor path forced through the jump host and a
passive monitoring tap. Output is static HTML + inline SVG, no JavaScript.

    python3 tools/gen_ot-iot.py
    python3 tools/embed.py ot-iot tools/out/ot-map.svg-section.html
"""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 720
BW, BH = 210, 70
COL = {"B": 300, "C": 560, "D": 850}

ZONES = [  # x, y, w, h, EN label, NL label, tip EN, tip NL
    (20, 40, 790, 120, "OFFICE IT · LEVEL 4–5", "KANTOOR-IT · NIVEAU 4–5",
     ["Office IT · Purdue level 4–5", "The business network: laptops, email, ERP,", "and its links to the internet and cloud."],
     ["Kantoor-IT · Purdue-niveau 4–5", "Het bedrijfsnetwerk: laptops, e-mail, ERP,", "en de koppelingen met internet en cloud."]),
    (830, 40, 270, 120, "INTERNET · SUPPLIERS", "INTERNET · LEVERANCIERS",
     ["Internet · suppliers", "Everything outside our control, including", "the vendors who maintain the machines."],
     ["Internet · leveranciers", "Alles buiten onze controle, ook de", "leveranciers die de machines onderhouden."]),
    (20, 190, 1080, 120, "IT/OT DMZ · LEVEL 3.5", "IT/OT-DMZ · NIVEAU 3,5",
     ["IT/OT DMZ · level 3.5", "DMZ: a buffer zone between office and", "plant. Nothing crosses directly; every", "connection stops here first."],
     ["IT/OT-DMZ · niveau 3,5", "DMZ: een bufferzone tussen kantoor en", "fabriek. Niets gaat rechtstreeks; elke", "verbinding stopt eerst hier."]),
    (20, 340, 1080, 120, "OT OPERATIONS · LEVEL 2–3", "OT-BEDRIJFSVOERING · NIVEAU 2–3",
     ["OT · operational technology", "The systems that run physical processes.", "Level 2–3: supervision and control rooms."],
     ["OT · operationele technologie", "Systemen die fysieke processen aansturen.", "Niveau 2–3: bewaking en controlekamers."]),
    (20, 490, 1080, 120, "CELL / AREA ZONES · LEVEL 0–1", "CEL- / GEBIEDSZONES · NIVEAU 0–1",
     ["Cells and areas · level 0–1", "Controllers, drives and sensors on the", "floor. IEC 62443 groups them into zones", "by risk, one zone per line or area."],
     ["Cellen en gebieden · niveau 0–1", "Besturingen, aandrijvingen en sensoren op", "de vloer. IEC 62443 deelt ze op risico in", "zones in, één zone per lijn of gebied."]),
]

# status: bad = untrusted side, mid = controlled crossing, ok = protected zone, mon = passive monitoring
NODES = [  # key, col, row y, status, (kick EN, NL), (name EN, NL), (sub EN, NL), tip EN, tip NL
    ("office", "B", 76, "bad", ("ERP · EMAIL · LAPTOPS", "ERP · E-MAIL · LAPTOPS"), ("Office network", "Kantoornetwerk"),
     ("Where infections start", "Hier beginnen besmettingen"),
     ["Office network", "Laptops, email and ERP: most infections", "start here, so the office gets no direct", "route to the plant."],
     ["Kantoornetwerk", "Laptops, e-mail en ERP: de meeste", "besmettingen beginnen hier, dus het kantoor", "krijgt geen directe route naar de fabriek."]),
    ("vendor", "D", 76, "bad", ("REMOTE MAINTENANCE", "ONDERHOUD OP AFSTAND"), ("Machine vendor", "Machineleverancier"),
     ("Only via the jump host", "Alleen via de jump host"),
     ["Vendor remote access", "The machine builder's engineers fixing", "faults from their office. Only through the", "jump host, named person, set time."],
     ["Leverancierstoegang op afstand", "Monteurs van de machinebouwer die vanaf", "kantoor storingen verhelpen. Alleen via de", "jump host, per persoon, voor een vaste tijd."]),
    ("relay", "B", 226, "mid", ("PATCH · AV RELAY", "PATCH- · AV-RELAY"), ("Update relay", "Updaterelay"),
     ("Tested updates go in", "Geteste updates gaan erin"),
     ["Patch / AV relay", "Updates and antivirus signatures are", "staged and tested in the DMZ, then passed", "on: plant systems never touch the internet."],
     ["Patch-/AV-relay", "Updates en virusdefinities worden in de DMZ", "klaargezet en getest, en dan doorgegeven:", "fabriekssystemen raken nooit het internet."]),
    ("jump", "C", 226, "mid", ("RECORDED SESSIONS", "OPGENOMEN SESSIES"), ("Jump host", "Jump host"),
     ("On request · recorded", "Op aanvraag · opgenomen"),
     ["Jump host · the one door in", "A hardened server in the DMZ. Every remote", "session passes it: MFA, opened on request,", "recorded, closed by default."],
     ["Jump host · de ene deur naar binnen", "Een geharde server in de DMZ. Elke sessie", "van buiten loopt erdoorheen: MFA, open op", "aanvraag, opgenomen, standaard dicht."]),
    ("hist", "B", 376, "ok", ("HISTORIAN", "HISTORIAN"), ("Process history", "Procesgeschiedenis"),
     ("Records every value", "Bewaart elke waarde"),
     ["Historian", "A database of every process value over", "time. Useful for reports, and for spotting", "a setpoint that drifted."],
     ["Historian", "Database met elke proceswaarde door de", "tijd. Handig voor rapportages en om een", "verschoven instelwaarde te zien."]),
    ("scada", "C", 376, "ok", ("SCADA · HMI", "SCADA · HMI"), ("Control room", "Controlekamer"),
     ("Operators see and steer", "Operators zien en sturen"),
     ["SCADA / HMI", "SCADA: software that supervises the", "process. HMI: the operator screen.", "Its own zone, behind a firewall."],
     ["SCADA / HMI", "SCADA: software die het proces bewaakt.", "HMI: het bedienscherm.", "Een eigen zone, achter een firewall."]),
    ("mon", "D", 376, "mon", ("PASSIVE TAP", "PASSIEVE TAP"), ("OT monitoring", "OT-monitoring"),
     ("Listens, never sends", "Luistert, zendt nooit"),
     ["OT monitoring · passive", "Analyses a copy of plant traffic for new", "devices, reprogrammed controllers and odd", "setpoint changes. Sends nothing back."],
     ["OT-monitoring · passief", "Analyseert een kopie van fabrieksverkeer", "op nieuwe apparaten, herprogrammering en", "vreemde instelwaarden. Stuurt niets terug."]),
    ("cellA", "B", 526, "ok", ("CELL A · PLCS", "CEL A · PLC'S"), ("Production line", "Productielijn"),
     ("One zone per line", "Eén zone per lijn"),
     ["Cell zone · PLCs", "PLC: the small computer that runs a", "machine. Each line is its own zone, so", "a problem on one line stays there."],
     ["Celzone · PLC's", "PLC: de kleine computer die een machine", "aanstuurt. Elke lijn is een eigen zone:", "een probleem op één lijn blijft daar."]),
    ("cellB", "C", 526, "ok", ("CELL B · SENSORS", "CEL B · SENSOREN"), ("Building & safety", "Gebouw & veiligheid"),
     ("Interlocks stay physical", "Vergrendeling blijft fysiek"),
     ["Sensors, building & safety", "Sensors, climate, access control and the", "safety system. The safety interlock is", "hard-wired: no login can override it."],
     ["Sensoren, gebouw & veiligheid", "Sensoren, klimaat, toegang en het", "veiligheidssysteem. De vergrendeling is", "bedraad: geen inlog kan die omzeilen."]),
]

FW_TIP = (["Conduit · firewall", "IEC 62443 term: the one permitted path", "between two zones. Only listed traffic", "passes; everything else is blocked."],
          ["Conduit · firewall", "IEC 62443-term: de enige toegestane route", "tussen twee zones. Alleen vastgelegd", "verkeer mag door; de rest wordt geweerd."])
MFA_TIP = (["MFA · on request", "Multi-factor login, and access opened", "only when we approve it, for a set time."],
           ["MFA · op aanvraag", "Inloggen met een tweede factor, en toegang", "alleen open als wij die goedkeuren."])
SPAN_TIP = (["SPAN port / tap", "A switch port or small device that copies", "traffic to the monitor. Read-only: it", "cannot disturb the process."],
            ["SPAN-poort / tap", "Een switchpoort of kastje dat verkeer", "kopieert naar de monitor. Alleen lezen:", "het kan het proces niet verstoren."])
CLOSED_TIP = (["Old direct vendor link", "A permanent line straight to the machines", "bypasses every zone. Worth closing once", "the jump host is in place."],
              ["Oude directe leverancierslijn", "Een vaste lijn rechtstreeks naar de machines", "omzeilt elke zone. De moeite waard om te", "sluiten zodra de jump host er is."])

for tip in [z[6] for z in ZONES] + [z[7] for z in ZONES] + [n[7] for n in NODES] + [n[8] for n in NODES] + \
        [t for pair in (FW_TIP, MFA_TIP, SPAN_TIP, CLOSED_TIP) for t in pair]:
    assert 3 <= len(tip) <= 5 and all(len(s) <= 46 for s in tip), tip


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("o", W, H)
POS = {}
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="ot-title ot-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="ot-title">Office, DMZ, plant: one door in</title>')
out.append('<desc id="ot-desc">Reference design in the Purdue model with IEC 62443 zones and conduits. Office IT at the top, '
           'then an IT/OT DMZ with a jump host and a patch and antivirus relay, then OT operations with SCADA, HMI and historian, '
           'then cell and area zones with PLCs and sensors. Each crossing between zones passes a firewall. '
           'The machine vendor reaches the plant only through the jump host; the old direct link is closed. '
           'A passive monitoring tap copies plant traffic.</desc>')
out.append('''<defs>
<marker id="ot-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<marker id="ot-arrm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead-m"/></marker>
<symbol id="ot-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="ot-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="ot-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
<symbol id="ot-mon" viewBox="0 0 14 14"><path d="M1 7 Q7 1 13 7 Q7 13 1 7 Z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="7" r="2.2" fill="currentColor"/></symbol>
</defs>''')

# zones (label is a tooltip host)
for x, y, w, h, en, nl, ten, tnl in ZONES:
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="zone"/>')
    lw = max(len(en), len(nl)) * 8.8 + 8
    hc = TIPS.add((x + 14, y + 8, lw, 20), ten, tnl)
    out.append(f'<g class="zl {hc}" tabindex="0"><rect x="{x + 14}" y="{y + 8}" width="{lw:.0f}" height="20" class="hit"/>')
    out.append(bi(x + 20, y + 22, "zlabel", en, nl) + '</g>')

for key, col, y, *_ in NODES:
    POS[key] = (COL[col], y)


def cx(k): return POS[k][0] + BW / 2
def top(k): return POS[k][1]
def bot(k): return POS[k][1] + BH
def mid(k): return POS[k][1] + BH / 2
def left(k): return POS[k][0]
def right(k): return POS[k][0] + BW


# conduits (drawn before the boxes)
links = [
    (f"M{cx('office')} {bot('office') + 2} V{top('relay') - 3}", cx('office') + 24, 186, ("UPDATES", "UPDATES"), "start", "link"),
    (f"M{cx('vendor')} {bot('vendor') + 2} V{mid('jump')} H{right('jump') + 3}", cx('vendor') - 12, 214, ("VENDOR SESSION", "LEVERANCIERSSESSIE"), "end", "link"),
    (f"M{cx('jump')} {bot('jump') + 2} V{top('scada') - 3}", cx('jump') + 24, 336, ("RECORDED", "OPGENOMEN"), "start", "link"),
    (f"M{right('relay') - 20} {bot('relay') + 2} L{left('scada') + 20} {top('scada') - 3}", left('scada') - 40, 336, ("PATCHES · AV", "PATCHES · AV"), "end", "link"),
    (f"M{left('scada') - 2} {mid('scada')} H{right('hist') + 3}", (right('hist') + left('scada')) / 2, mid('scada') - 7, ("DATA", "DATA"), "middle", "link"),
    (f"M{cx('scada')} {bot('scada') + 2} V{top('cellB') - 3}", None, None, None, None, "link"),
    (f"M{cx('scada')} 476 H{cx('cellA')} V{top('cellA') - 3}", None, None, None, None, "link"),
]
for d, lx, ly, label, anchor, cls in links:
    out.append(f'<path d="{d}" class="{cls}" marker-end="url(#ot-arr)"/>')
    if label:
        out.append(bi(lx, ly, "llabel", label[0], label[1], f' text-anchor="{anchor}"'))

# passive tap: copy of the cell conduit to the monitor
out.append(f'<path d="M{cx("scada") + 3} 476 H{cx("mon")} V{bot("mon") + 3}" class="tap" marker-end="url(#ot-arrm)"/>')
# old direct vendor link, closed
out.append(f'<path d="M{right("vendor") + 2} {mid("vendor")} H1082 V{mid("cellB")} H{right("cellB") + 3}" class="closed"/>')


def tag(x, y, label, tip, cls="tag-f", w=None):
    en, nl = label if isinstance(label, tuple) else (label, label)
    w = w or (max(len(en), len(nl)) * 6.6 + 14)
    h = TIPS.add((x, y, w, 16), *tip)
    return (f'<g class="{cls} {h}" tabindex="0"><rect x="{x}" y="{y}" width="{w:.0f}" height="16"/>'
            + bi(round(x + w / 2, 1), y + 11.5, "tt", en, nl, ' text-anchor="middle"') + '</g>')


out.append(tag(cx('office') - 14, 167, "FW", FW_TIP, w=28))
out.append(tag(cx('jump') - 14, 317, "FW", FW_TIP, w=28))
out.append(tag(cx('cellA') + 40, 468, "FW", FW_TIP, w=28))
out.append(tag(cx('vendor') - 132, 230, ("MFA · ON REQUEST", "MFA · OP AANVRAAG"), MFA_TIP, "tag-m"))
out.append(tag(cx('mon') + 12, 466, "SPAN / TAP", SPAN_TIP, "tag-t"))

# boxes
for key, col, y, status, kick, name, sub, ten, tnl in NODES:
    x = COL[col]
    place = "above" if y > 450 else "below"
    h = TIPS.add((x, y, BW, BH), ten, tnl, place=place)
    out.append(f'<g class="node-g s-{status} {h}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{BH}" class="bar"/>')
    out.append(bi(x + 16, y + 20, "kick", *kick))
    out.append(bi(x + 16, y + 41, "name", *name))
    out.append(f'<use href="#ot-{status}" class="u-{status}" x="{x + 16}" y="{y + 50}" width="12" height="12"/>')
    out.append(bi(x + 34, y + 60, "st", *sub))
    out.append('</g>')

# closed-link tag last so it sits on top of the dashed line
out.append(tag(862, mid('cellB') - 8, ("✕ OLD DIRECT LINK · CLOSED", "✕ OUDE DIRECTE LIJN · DICHT"), CLOSED_TIP, "tag-x"))

# legend
ly = 650
legend = [
    (40, ly, "bad", "Untrusted side: where attacks start", "Onvertrouwde kant: hier begint een aanval"),
    (560, ly, "mid", "Crossing point: controlled and recorded", "Overgang: gecontroleerd en opgenomen"),
    (40, ly + 24, "ok", "Protected zone: reachable via a conduit only", "Beschermde zone: alleen via een conduit"),
    (560, ly + 24, "mon", "Passive monitoring: listens, never sends", "Passieve monitoring: luistert, zendt nooit"),
]
for x, y, st, en, nl in legend:
    out.append(f'<use href="#ot-{st}" class="u-{st}" x="{x}" y="{y - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, y, "legend", en, nl))
out.append(bi(40, ly + 54, "foot", "Reference design after the Purdue model and IEC 62443 zones and conduits · FW = firewall · hover or tap a box or tag for an explanation",
              "Referentieontwerp naar het Purdue-model en IEC 62443-zones en -conduits · FW = firewall · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- OT reference map (zones and conduits) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.2em;fill:var(--slate)}
.arch .hit{fill:transparent}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-mid .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-mon .bar{fill:var(--brand)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.04em;fill:var(--slate)}
.arch .llabel{font:700 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:ot-flow 1.4s linear infinite}
.arch .tap{fill:none;stroke:var(--brand);stroke-width:1.3;stroke-dasharray:2 4}
.arch .closed{fill:none;stroke:var(--bad);stroke-width:1.3;stroke-dasharray:3 6;opacity:.6}
.arch .arrowhead{fill:var(--slate)}
.arch .arrowhead-m{fill:var(--brand)}
.arch .u-ok{color:var(--good)}
.arch .u-mid{color:var(--warn)}
.arch .u-bad{color:var(--bad)}
.arch .u-mon{color:var(--brand)}
.arch .tag-f rect{fill:var(--deep);stroke:var(--warn)}
.arch .tag-f text{font:700 10px var(--mono);letter-spacing:.08em;fill:var(--warn)}
.arch .tag-m rect{fill:var(--deep);stroke:var(--warn)}
.arch .tag-m text{font:700 10px var(--mono);letter-spacing:.04em;fill:var(--warn)}
.arch .tag-t rect{fill:var(--deep);stroke:var(--brand)}
.arch .tag-t text{font:700 10px var(--mono);letter-spacing:.04em;fill:var(--brand)}
.arch .tag-x rect{fill:var(--deep);stroke:rgba(255,93,115,.6)}
.arch .tag-x text{font:700 10px var(--mono);letter-spacing:.04em;fill:var(--bad-soft)}
@keyframes ot-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "ot-")

CONDUIT_EN = abbr("conduit", "IEC 62443 term: the one permitted, monitored path between two zones, enforced by a firewall.")
CONDUIT_NL = abbr("conduit", "IEC 62443-term: de enige toegestane, bewaakte route tussen twee zones, afgedwongen door een firewall.")
SECTION = f"""<section class="risk-block" id="ot-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">What the line could look like. <em>One door for vendors.</em></span><span class="nl">Hoe die lijn eruit kan zien. <em>Eén deur voor leveranciers.</em></span></h2>
    <span class="term"><span class="en">reference design / Purdue model · IEC 62443 zones and conduits</span><span class="nl">referentieontwerp / Purdue-model · IEC 62443-zones en -conduits</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>Where to start is your call.</strong> Often the most effective first step is the vendor path: route it through the jump host and close the old direct line. Then split the plant into zones that meet only through a monitored {CONDUIT_EN}.</p>
      <p class="nl"><strong>Waar u begint, bepaalt u zelf.</strong> Vaak is de leveranciersroute de meest effectieve eerste stap: leid die via de jump host en sluit de oude directe lijn. Deel daarna de fabriek op in zones die elkaar alleen via een bewaakte {CONDUIT_NL} raken.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "ot-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

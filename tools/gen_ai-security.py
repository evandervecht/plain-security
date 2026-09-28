"""Generate the 'One front door for AI' reference diagram for plain-security.fyi/ai-security/.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1180, 590
BW, BH = 220, 96
COLS = [40, 320, 660, 940]
ROWS = [70, 190, 310]
GW_H = ROWS[2] + BH - ROWS[0]          # gateway spans all three rows
LOG_Y, LOG_H = 436, 62


def bi(x, y, cls, en, nl, extra=""):
    """Bilingual text pair; the page's .en/.nl rules show one of them."""
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


def check(tip):
    for ls in tip:
        assert 3 <= len(ls) <= 5, ls[0]
        for s in ls:
            assert len(s) <= 46, (len(s), s)
    return tip


# status: ok = control point, mid = allowed within limits, bad = untrusted input / high rights
NODES = {
    # key: (x, y, w, h, status, (kick EN, NL), (name EN, NL), [(line EN, NL), ...], tip, place)
    "staff": (COLS[0], ROWS[0], BW, BH, "ok", ("USERS", "GEBRUIKERS"), ("Staff", "Medewerkers"),
              [("Work account + MFA ·", "Werkaccount + MFA ·"), ("one approved tool", "één goedgekeurde tool")],
              (["Staff · people using AI", "Chat and copilots via the approved tool.", "Signed in with their own work account,", "so every prompt has a name on it."],
               ["Medewerkers · mensen die AI gebruiken", "Chat en copilots via de goedgekeurde tool.", "Ingelogd met hun eigen werkaccount, dus", "elke prompt heeft een naam."]), "below"),
    "apps": (COLS[0], ROWS[1], BW, BH, "ok", ("API CALLS", "API-AANROEPEN"), ("Business apps", "Bedrijfsapplicaties"),
             [("Call models only", "Roepen modellen alleen"), ("via the gateway", "via de gateway aan")],
             (["API · application programming interface", "How your own software (CRM, service desk,", "search) calls a model. Routed through the", "gateway, never straight to a provider."],
              ["API · application programming interface", "Zo roept eigen software (CRM, servicedesk,", "zoeken) een model aan. Via de gateway,", "nooit rechtstreeks naar een aanbieder."]), "below"),
    "agents": (COLS[0], ROWS[2], BW, BH, "bad", ("ACTS ON ITS OWN", "HANDELT ZELF"), ("AI agents", "AI-agents"),
               [("Reads untrusted input ·", "Leest onbetrouwbare invoer ·"), ("own identity, few rights", "eigen ID, minimale rechten")],
               (["AI agent · acts on its own", "Plans steps and calls tools for a task.", "Reads mail, web and files that may hide", "commands: treat all input as untrusted."],
                ["AI-agent · handelt zelfstandig", "Plant stappen en roept tools aan.", "Leest mail, web en bestanden met mogelijk", "verborgen opdrachten: invoer is onbetrouwbaar."]), "above"),
    "ext": (COLS[3], ROWS[0], BW, BH, "mid", ("ENTERPRISE CONTRACT", "ZAKELIJK CONTRACT"), ("External model", "Extern model"),
            [("No training on your data ·", "Geen training op uw data ·"), ("set retention, EU region", "vaste bewaartermijn, EU")],
            (["External model · approved provider", "A paid enterprise contract: no training on", "your data, set retention, EU region.", "Consumer versions are not in this path."],
             ["Extern model · goedgekeurde aanbieder", "Zakelijk contract: geen training op uw", "data, vaste bewaartermijn, EU-regio.", "Consumentenversies vallen hierbuiten."]), "below"),
    "int": (COLS[3], ROWS[1], BW, BH, "ok", ("SELF-HOSTED", "ZELF GEHOST"), ("Internal model", "Intern model"),
            [("Data stays in ·", "Data blijft binnen ·"), ("you patch and monitor", "u patcht en monitort")],
            (["Internal model · in your environment", "Self-hosted or in your own cloud tenant.", "Data stays in, but patching, access and", "monitoring are your job."],
             ["Intern model · in uw eigen omgeving", "Zelf gehost of in uw eigen cloudtenant.", "Data blijft binnen, maar patchen, toegang", "en monitoring doet u zelf."]), "below"),
    "gate": (COLS[2], ROWS[2], BW, BH, "ok", ("WRITE · PAY · DELETE", "SCHRIJVEN · BETALEN · WISSEN"), ("Human approval", "Menselijke goedkeuring"),
             [("A named person clicks", "Een genoemde persoon zegt"), ("yes before it runs", "ja vóór de actie")],
             (["Human approval · a person says yes", "Sending, deleting, paying or changing", "access waits for a named person. Reading", "and drafting can run on their own."],
              ["Menselijke goedkeuring · een mens zegt ja", "Versturen, wissen, betalen of rechten", "wijzigen wacht op een genoemde persoon.", "Lezen en opstellen mag zelfstandig."]), "above"),
    "tools": (COLS[3], ROWS[2], BW, BH, "mid", ("MCP · CONNECTORS", "MCP · CONNECTORS"), ("Tools & data", "Tools & data"),
              [("Least-privilege scopes ·", "Minimale rechten per scope ·"), ("read-only by default", "standaard alleen lezen")],
              (["MCP · Model Context Protocol", "Standard way to plug tools and data into", "AI. Each connector gets the least rights", "and its own OAuth scope, reviewed often."],
               ["MCP · Model Context Protocol", "Standaardmanier om tools en data aan AI", "te koppelen. Elke connector krijgt minimale", "rechten en een eigen OAuth-scope."]), "above"),
}

GATEWAY_TIP = check((["AI gateway · one front door", "Every request to a model passes here.", "One place to check who asks, what data", "goes out, and to block unapproved tools."],
                     ["AI-gateway · één voordeur", "Elk verzoek aan een model komt hier langs.", "Eén plek om te zien wie vraagt, welke data", "vertrekt, en niet-goedgekeurde tools te weren."]))
GW_TAGS = [  # (EN label, NL label, tip)
    ("IDENTITY · SSO", "IDENTITEIT · SSO",
     (["SSO · single sign-on", "One work login for every AI tool, with", "MFA. Leavers lose access in one place.", "Agents get their own identity, not yours."],
      ["SSO · single sign-on", "Eén werklogin voor elke AI-tool, met MFA.", "Wie vertrekt, verliest overal toegang.", "Agents krijgen een eigen identiteit."])),
    ("DLP", "DLP",
     (["DLP · data loss prevention", "Spots customer data, personal data or", "secrets in a prompt and blocks or masks", "them before they leave."],
      ["DLP · data loss prevention", "Herkent klantdata, persoonsgegevens of", "geheimen in een prompt en blokkeert of", "maskeert ze voordat ze vertrekken."])),
    ("LOGGING", "LOGGING",
     (["Logging · who asked what", "Prompts, answers and tool calls are kept", "for a set period, so an incident can be", "traced back to a person or agent."],
      ["Logging · wie vroeg wat", "Prompts, antwoorden en tool-aanroepen", "worden een vaste periode bewaard, zodat een", "incident te herleiden is."])),
    ("PROMPT FILTER", "PROMPTFILTER",
     (["Prompt filter · checks in and out", "Flags text that looks like a hidden", "command (prompt injection) and unsafe", "output. Catches known patterns, not all."],
      ["Promptfilter · controle in en uit", "Signaleert tekst die lijkt op een verborgen", "opdracht (prompt injection) en onveilige", "uitvoer. Vangt bekende patronen, niet alles."])),
]
LOG_TIP = check((["Audit log · evidence afterwards", "One record of prompts, tool calls and", "approvals, kept outside the AI's reach", "so an agent cannot erase its tracks."],
                 ["Auditlog · bewijs achteraf", "Eén vastlegging van prompts, tool-aanroepen", "en goedkeuringen, buiten bereik van de AI,", "zodat een agent zijn sporen niet wist."]))

TIPS = Tips("a", W, H)
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="ai-title ai-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="ai-title">One front door for AI</title>')
out.append('<desc id="ai-desc">Reference design: staff, business apps and AI agents reach AI only through one AI gateway that checks identity, '
           'scans for sensitive data, logs and filters prompts. Behind it sit approved external and internal models. Tool calls from agents '
           'pass a human approval step for write, payment and delete actions before reaching tools and MCP connectors with least-privilege scopes. '
           'Everything is recorded in an audit log outside the agents\' reach.</desc>')
out.append('''<defs>
<marker id="ai-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<symbol id="ai-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="ai-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="ai-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
</defs>''')

# column headers
for x, en, nl in [(COLS[0], "WHO ASKS", "WIE VRAAGT"), (COLS[1], "ONE CONTROL POINT", "ÉÉN CONTROLEPUNT"),
                  (COLS[2], "WHAT IT MAY REACH", "WAT HET MAG BEREIKEN")]:
    out.append(bi(x, 44, "zlabel", en, nl))

# links (drawn before boxes)
gx0, gx1 = COLS[1], COLS[1] + BW
links = []
for r in ROWS:
    links.append((f"M{COLS[0] + BW + 2} {r + BH / 2} H{gx0 - 3}", None))
links.append((f"M{gx1 + 2} {ROWS[0] + BH / 2} H{COLS[3] - 3}", ((gx1 + COLS[3]) / 2, ROWS[0] + BH / 2 - 8, "APPROVED MODELS ONLY", "ALLEEN GOEDGEKEURDE MODELLEN")))
links.append((f"M{gx1 + 2} {ROWS[1] + BH / 2} H{COLS[3] - 3}", ((gx1 + COLS[3]) / 2, ROWS[1] + BH / 2 - 8, "NO TRAINING ON YOUR DATA", "GEEN TRAINING OP UW DATA")))
links.append((f"M{gx1 + 2} {ROWS[2] + BH / 2} H{COLS[2] - 3}", ((gx1 + COLS[2]) / 2, ROWS[2] + BH / 2 - 8, "TOOL CALLS", "TOOL-AANROEPEN")))
links.append((f"M{COLS[2] + BW + 2} {ROWS[2] + BH / 2} H{COLS[3] - 3}", ((COLS[2] + BW + COLS[3]) / 2, ROWS[2] + BH / 2 - 8, "IF YES", "ALS JA")))
for x in (gx0 + BW / 2, COLS[2] + BW / 2):
    links.append((f"M{x} {ROWS[2] + BH + 2} V{LOG_Y - 3}", None))
for d, lab in links:
    out.append(f'<path d="{d}" class="link" marker-end="url(#ai-arr)"/>')
    if lab:
        lx, ly, en, nl = lab
        out.append(bi(lx, ly, "llabel", en, nl, ' text-anchor="middle"'))


def box(x, y, w, h, status, kick, name, lines, tip, place):
    hc = TIPS.add((x, y, w, h), *check(tip), place=place)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 22, "kick", *kick))
    out.append(bi(x + 16, y + 45, "name", *name))
    if lines:
        out.append(f'<use href="#ai-{status}" class="u-{status}" x="{x + 16}" y="{y + 60}" width="13" height="13"/>')
        for i, (en, nl) in enumerate(lines):
            assert len(en) <= 30 and len(nl) <= 30, (en, nl)
            out.append(bi(x + 36, y + 70 + 14 * i, "st", en, nl))
    out.append('</g>')


for key, (x, y, w, h, st, kick, name, lines, tip, place) in NODES.items():
    box(x, y, w, h, st, kick, name, lines, tip, place)

# gateway: tall box with four control tags
hc = TIPS.add((gx0, ROWS[0], BW, 60), *GATEWAY_TIP, place="below")
out.append(f'<g class="node-g s-ok {hc}" tabindex="0">')
out.append(f'<rect x="{gx0}" y="{ROWS[0]}" width="{BW}" height="{GW_H}" class="node gw"/>')
out.append(f'<rect x="{gx0}" y="{ROWS[0]}" width="4" height="{GW_H}" class="bar"/>')
out.append(bi(gx0 + 16, ROWS[0] + 22, "kick", "ONE FRONT DOOR", "ÉÉN VOORDEUR"))
out.append(bi(gx0 + 16, ROWS[0] + 45, "name", "AI gateway", "AI-gateway"))
out.append(f'<use href="#ai-ok" class="u-ok" x="{gx0 + 16}" y="{ROWS[0] + GW_H - 30}" width="13" height="13"/>')
out.append(bi(gx0 + 36, ROWS[0] + GW_H - 20, "st", "Blocks unapproved AI tools", "Weert niet-goedgekeurde AI"))
out.append('</g>')
for i, (en, nl, tip) in enumerate(GW_TAGS):
    tx, ty, tw, th = gx0 + 16, ROWS[0] + 72 + i * 50, BW - 32, 34
    hc = TIPS.add((tx, ty, tw, th), *check(tip), place="below" if i < 2 else "above")
    out.append(f'<g class="ctag {hc}" tabindex="0"><rect x="{tx}" y="{ty}" width="{tw}" height="{th}"/>')
    out.append(bi(tx + 14, ty + 21, "ctag-t", en, nl))
    out.append('</g>')

# audit log strip
lx0, lw = gx0, COLS[3] + BW - gx0
hc = TIPS.add((lx0, LOG_Y, lw, LOG_H), *LOG_TIP, place="above")
out.append(f'<g class="node-g s-ok {hc}" tabindex="0">')
out.append(f'<rect x="{lx0}" y="{LOG_Y}" width="{lw}" height="{LOG_H}" class="node"/>')
out.append(f'<rect x="{lx0}" y="{LOG_Y}" width="4" height="{LOG_H}" class="bar"/>')
out.append(bi(lx0 + 16, LOG_Y + 22, "kick", "EVIDENCE", "BEWIJS"))
out.append(bi(lx0 + 16, LOG_Y + 45, "name", "Audit log", "Auditlog"))
out.append(f'<use href="#ai-ok" class="u-ok" x="{lx0 + 150}" y="{LOG_Y + 34}" width="13" height="13"/>')
out.append(bi(lx0 + 170, LOG_Y + 45, "st", "Prompts, tool calls and approvals · kept outside the agents' reach",
              "Prompts, tool-aanroepen en goedkeuringen · buiten bereik van de agents"))
out.append('</g>')

# legend + foot
ly = 540
for x, st, en, nl in [(40, "ok", "Control point", "Controlepunt"),
                      (230, "mid", "Allowed, within limits", "Toegestaan, binnen grenzen"),
                      (500, "bad", "Untrusted input — plan the rights", "Onbetrouwbare invoer — rechten plannen")]:
    out.append(f'<use href="#ai-{st}" class="u-{st}" x="{x}" y="{ly - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(40, ly + 28, "foot", "Reference design, not a product list · adapt to your own stack · hover or tap a box or tag for an explanation",
              "Referentieontwerp, geen productlijst · pas aan uw eigen omgeving aan · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- AI reference design (one front door for AI) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.28em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .gw{fill:var(--bg-hi)}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-mid .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .ctag rect{fill:rgba(55,211,155,.10);stroke:rgba(55,211,155,.55)}
.arch .ctag-t{font:700 10px var(--mono);letter-spacing:.14em;fill:var(--white)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.arch .llabel{font:700 10px var(--mono);letter-spacing:.1em;fill:var(--muted)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:ai-flow 1.4s linear infinite}
.arch .arrowhead{fill:var(--slate)}
.arch .u-ok{color:var(--good)}
.arch .u-mid{color:var(--warn)}
.arch .u-bad{color:var(--bad)}
@keyframes ai-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "ai-")
SECTION = f"""<section class="risk-block" id="ai-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">One front door for AI.<br><em>A design worth considering.</em></span><span class="nl">Eén voordeur voor AI.<br><em>Een ontwerp om te overwegen.</em></span></h2>
    <span class="term"><span class="en">reference architecture / AI gateway</span><span class="nl">referentiearchitectuur / AI-gateway</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>Where to start is your call.</strong> One gateway gives one place for identity, data checks and logs. Agents reach tools with narrow rights, and anything that writes or pays waits for a person.</p>
      <p class="nl"><strong>Waar u begint, bepaalt u zelf.</strong> Eén gateway geeft één plek voor identiteit, datacontrole en logs. Agents bereiken tools met beperkte rechten, en alles wat schrijft of betaalt wacht op een mens.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "ai-security.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

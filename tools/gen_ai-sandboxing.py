"""Generate the 'A sandbox for AI, layer by layer' reference diagram for plain-security.fyi/ai-sandboxing/.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1180, 600
BW, BH = 220, 96
COLS = [40, 320, 660, 940]
ROWS = [70, 190, 310]
SB_H = ROWS[2] + BH - ROWS[0]          # sandbox spans all three rows
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


# status: ok = control point, mid = reachable within limits, bad = untrusted
NODES = {
    # key: (x, y, status, (kick EN, NL), (name EN, NL), [(line EN, NL), ...], tip, place)
    "team": (COLS[0], ROWS[0], "ok", ("GIVES THE TASK", "GEEFT DE OPDRACHT"), ("A named person", "Een genoemde persoon"),
             [("Own login · every run", "Eigen login · elke run"), ("has an owner", "heeft een eigenaar")],
             (["Owner · who starts the task", "A named person starts each task with", "their own login, so every sandbox run", "has someone accountable for it."],
              ["Eigenaar · wie de opdracht start", "Een genoemde persoon start elke opdracht", "met een eigen login, zodat elke run in de", "zandbak iemand heeft die verantwoordelijk is."]), "below"),
    "input": (COLS[0], ROWS[1], "bad", ("WHAT IT READS", "WAT HET LEEST"), ("Untrusted input", "Onbetrouwbare invoer"),
              [("Web, mail, documents,", "Web, mail, documenten,"), ("other people's code", "code van anderen")],
              (["Untrusted input · text you did not write", "Web pages, email, documents, tickets and", "other people's code. Any of it can hide", "instructions the agent may follow."],
               ["Onbetrouwbare invoer · tekst van anderen", "Webpagina's, e-mail, documenten, tickets", "en code van anderen. Alles kan verborgen", "opdrachten bevatten die de agent opvolgt."]), "below"),
    "proxy": (COLS[2], ROWS[0], "ok", ("BLOCKED BY DEFAULT", "STANDAARD DICHT"), ("Egress proxy", "Uitgaande proxy"),
              [("Only allowlisted", "Alleen toegestane"), ("sites are reachable", "sites bereikbaar")],
              (["Egress proxy · the only way out", "Outbound traffic is blocked by default.", "Only named sites can be reached, so", "stolen data has nowhere to go."],
               ["Uitgaande proxy · de enige weg naar buiten", "Uitgaand verkeer staat standaard dicht.", "Alleen genoemde sites zijn bereikbaar,", "dus gestolen data kan nergens heen."]), "below"),
    "broker": (COLS[2], ROWS[1], "ok", ("KEYS STAY OUTSIDE", "SLEUTELS BLIJVEN BUITEN"), ("Credential broker", "Sleutelbeheer"),
               [("Short-lived token,", "Kortlevend token,"), ("one task, one scope", "één taak, één scope")],
               (["Credential broker · keys stay outside", "Holds the real secrets outside the", "sandbox and hands in short-lived tokens", "scoped to this one task."],
                ["Sleutelbeheer · sleutels blijven buiten", "Bewaart de echte geheimen buiten de", "zandbak en geeft kortlevende tokens", "die alleen voor deze ene taak gelden."]), "below"),
    "gate": (COLS[2], ROWS[2], "ok", ("MERGE · DEPLOY · SEND", "MERGEN · UITROLLEN · MAIL"), ("Human approval", "Menselijke goedkeuring"),
             [("A named person says", "Een genoemde persoon"), ("yes before it leaves", "zegt ja vóór vertrek")],
             (["Human approval · a person says yes", "Merging code, deploying, sending mail or", "paying waits for a named person.", "Reading and drafting can run alone."],
              ["Menselijke goedkeuring · een mens zegt ja", "Code mergen, uitrollen, mail versturen of", "betalen wacht op een genoemde persoon.", "Lezen en opstellen mag zelfstandig."]), "above"),
    "sites": (COLS[3], ROWS[0], "mid", ("ALLOWLIST", "TOEGESTAAN"), ("Named sites only", "Alleen genoemde sites"),
              [("Model API · internal", "Model-API · interne"), ("package mirror", "pakketbron")],
              (["Allowlist · named sites only", "Typically the model API and an internal", "package mirror. Everything else,", "file-sharing sites too, stays blocked."],
               ["Allowlist · alleen genoemde sites", "Meestal de model-API en een interne", "pakketbron. Al het andere blijft dicht,", "ook sites om bestanden te delen."]), "below"),
    "scoped": (COLS[3], ROWS[1], "mid", ("JUST ENOUGH, BRIEFLY", "NET GENOEG, KORT"), ("Code and cloud", "Code en cloud"),
               [("One repo · one test", "Eén repo · één test-"), ("account · read first", "account · eerst lezen")],
               (["Scoped access · just enough, briefly", "One repository, one test account, read", "where possible. The token expires", "when the task ends."],
                ["Beperkte toegang · net genoeg, kort", "Eén repository, één testaccount, waar", "mogelijk alleen lezen. Het token vervalt", "als de taak klaar is."]), "below"),
    "prod": (COLS[3], ROWS[2], "mid", ("NEVER DIRECTLY", "NOOIT RECHTSTREEKS"), ("Production", "Productie"),
             [("Only via the normal", "Alleen via de gewone"), ("pipeline and review", "pipeline en review")],
             (["Production · never directly", "Changes reach live systems only through", "the normal pipeline, with review and", "the usual change records."],
              ["Productie · nooit rechtstreeks", "Wijzigingen bereiken live systemen alleen", "via de gewone pipeline, met review en", "de gebruikelijke wijzigingsregistratie."]), "above"),
}

SANDBOX_TIP = check((["Sandbox · a disposable machine", "A microVM or VM with its own kernel,", "created for one task and wiped after.", "Nothing of value lives inside it."],
                     ["Zandbak · een wegwerpmachine", "Een microVM of VM met een eigen kernel,", "gemaakt voor één taak en daarna gewist.", "Er staat niets van waarde in."]))
SB_TAGS = [  # (EN label, NL label, status, tip)
    ("AI AGENT", "AI-AGENT", "bad",
     (["AI agent · treat it as untrusted", "It may follow instructions hidden in", "what it reads. Design so a hijacked", "agent can do little harm."],
      ["AI-agent · behandel hem als onbetrouwbaar", "Hij kan verborgen opdrachten volgen in", "wat hij leest. Ontwerp zo dat een gekaapte", "agent weinig schade kan doen."])),
    ("WORKSPACE COPY", "WERKKOPIE", "ok",
     (["Workspace · a copy, not the original", "A fresh clone of the code or a sample of", "the data. Changes leave only as a", "reviewed proposal."],
      ["Werkkopie · een kopie, niet het origineel", "Een verse kopie van de code of een", "steekproef van de data. Wijzigingen gaan", "alleen als beoordeeld voorstel naar buiten."])),
    ("FAKE OR MASKED DATA", "NEP OF GEMASKEERD", "ok",
     (["Test data · fake or masked", "Synthetic or masked records instead of", "real customers. Personal data in a test", "is still covered by the GDPR."],
      ["Testdata · nep of gemaskeerd", "Synthetische of gemaskeerde records in", "plaats van echte klanten. Persoonsgegevens", "in een test vallen ook onder de AVG."])),
    ("NO STANDING KEYS", "GEEN VASTE SLEUTELS", "ok",
     (["No standing keys · nothing to steal", "No passwords, API keys or SSH keys stored", "inside. Access arrives as a token that", "expires when the task ends."],
      ["Geen vaste sleutels · niets te stelen", "Geen wachtwoorden, API- of SSH-sleutels", "binnen. Toegang komt als token dat", "vervalt als de taak klaar is."])),
]
LOG_TIP = check((["Audit log · evidence afterwards", "Commands, network requests, tokens and", "approvals, kept outside the sandbox", "so an agent cannot erase its tracks."],
                 ["Auditlog · bewijs achteraf", "Opdrachten, netwerkverkeer, tokens en", "goedkeuringen, buiten de zandbak bewaard,", "zodat een agent zijn sporen niet wist."]))

TIPS = Tips("s", W, H)
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="sb-title sb-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="sb-title">A sandbox for AI, layer by layer</title>')
out.append('<desc id="sb-desc">Reference design: a named person gives an AI agent a task; the agent also reads untrusted input. '
           'The agent runs in a disposable sandbox, a microVM or VM with its own kernel, holding only a workspace copy, fake or masked data '
           'and no standing keys. It has three ways out: an egress proxy that allows only named sites, a credential broker that hands in '
           'short-lived scoped tokens for code and cloud, and a human approval step before anything reaches production. '
           'An audit log outside the sandbox records it all.</desc>')
out.append('''<defs>
<marker id="sb-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<symbol id="sb-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="sb-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="sb-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
</defs>''')

# column headers
for x, en, nl in [(COLS[0], "WHO AND WHAT", "WIE EN WAT"), (COLS[1], "THE SANDBOX", "DE ZANDBAK"),
                  (COLS[2], "THE ONLY WAYS OUT", "DE ENIGE UITGANGEN"), (COLS[3], "WHAT IT CAN REACH", "WAT HET BEREIKT")]:
    out.append(bi(x, 44, "zlabel", en, nl))

# links (drawn before boxes)
sx0, sx1 = COLS[1], COLS[1] + BW
links = [(f"M{COLS[0] + BW + 2} {r + BH / 2} H{sx0 - 3}", None) for r in ROWS[:2]]
for r in ROWS:
    links.append((f"M{sx1 + 2} {r + BH / 2} H{COLS[2] - 3}", None))
for r, en, nl in [(ROWS[0], "LIST", "LIJST"), (ROWS[1], "TOKEN", "TOKEN"), (ROWS[2], "IF YES", "ALS JA")]:
    links.append((f"M{COLS[2] + BW + 2} {r + BH / 2} H{COLS[3] - 3}", ((COLS[2] + BW + COLS[3]) / 2, r + BH / 2 - 8, en, nl)))
for d, lab in links:
    out.append(f'<path d="{d}" class="link" marker-end="url(#sb-arr)"/>')
    if lab:
        lx, ly, en, nl = lab
        out.append(bi(lx, ly, "llabel", en, nl, ' text-anchor="middle"'))


def box(x, y, status, kick, name, lines, tip, place):
    hc = TIPS.add((x, y, BW, BH), *check(tip), place=place)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{BH}" class="bar"/>')
    out.append(bi(x + 16, y + 22, "kick", *kick))
    out.append(bi(x + 16, y + 45, "name", *name))
    out.append(f'<use href="#sb-{status}" class="u-{status}" x="{x + 16}" y="{y + 60}" width="13" height="13"/>')
    for i, (en, nl) in enumerate(lines):
        assert len(en) <= 30 and len(nl) <= 30, (en, nl)
        out.append(bi(x + 36, y + 70 + 14 * i, "st", en, nl))
    out.append('</g>')


for key, (x, y, st, kick, name, lines, tip, place) in NODES.items():
    box(x, y, st, kick, name, lines, tip, place)

# sandbox: tall box with four tags
hc = TIPS.add((sx0, ROWS[0], BW, 60), *SANDBOX_TIP, place="below")
out.append(f'<g class="node-g s-ok {hc}" tabindex="0">')
out.append(f'<rect x="{sx0}" y="{ROWS[0]}" width="{BW}" height="{SB_H}" class="node sb"/>')
out.append(f'<rect x="{sx0}" y="{ROWS[0]}" width="4" height="{SB_H}" class="bar"/>')
out.append(bi(sx0 + 16, ROWS[0] + 22, "kick", "OWN KERNEL · DISPOSABLE", "EIGEN KERNEL · WEGWERP"))
out.append(bi(sx0 + 16, ROWS[0] + 45, "name", "microVM or VM", "microVM of VM"))
out.append(f'<use href="#sb-ok" class="u-ok" x="{sx0 + 16}" y="{ROWS[0] + SB_H - 30}" width="13" height="13"/>')
out.append(bi(sx0 + 36, ROWS[0] + SB_H - 20, "st", "Wiped after every task", "Gewist na elke taak"))
out.append('</g>')
for i, (en, nl, st, tip) in enumerate(SB_TAGS):
    tx, ty, tw, th = sx0 + 16, ROWS[0] + 72 + i * 50, BW - 32, 34
    hc = TIPS.add((tx, ty, tw, th), *check(tip), place="below" if i < 2 else "above")
    out.append(f'<g class="ctag c-{st} {hc}" tabindex="0"><rect x="{tx}" y="{ty}" width="{tw}" height="{th}"/>')
    out.append(bi(tx + 14, ty + 21, "ctag-t", en, nl))
    out.append('</g>')

# audit log strip
lx0, lw = sx0, COLS[3] + BW - sx0
hc = TIPS.add((lx0, LOG_Y, lw, LOG_H), *LOG_TIP, place="above")
out.append(f'<g class="node-g s-ok {hc}" tabindex="0">')
out.append(f'<rect x="{lx0}" y="{LOG_Y}" width="{lw}" height="{LOG_H}" class="node"/>')
out.append(f'<rect x="{lx0}" y="{LOG_Y}" width="4" height="{LOG_H}" class="bar"/>')
out.append(bi(lx0 + 16, LOG_Y + 22, "kick", "EVIDENCE", "BEWIJS"))
out.append(bi(lx0 + 16, LOG_Y + 45, "name", "Audit log", "Auditlog"))
out.append(f'<use href="#sb-ok" class="u-ok" x="{lx0 + 150}" y="{LOG_Y + 34}" width="13" height="13"/>')
out.append(bi(lx0 + 170, LOG_Y + 45, "st", "Commands, network requests, tokens and approvals · kept outside the sandbox",
              "Opdrachten, netwerkverkeer, tokens en goedkeuringen · buiten de zandbak bewaard"))
out.append('</g>')

# legend + foot
ly = 548
for x, st, en, nl in [(40, "ok", "Control point", "Controlepunt"),
                      (230, "mid", "Reachable, within limits", "Bereikbaar, binnen grenzen"),
                      (510, "bad", "Untrusted: assume it can be hijacked", "Onbetrouwbaar: reken op kaping")]:
    out.append(f'<use href="#sb-{st}" class="u-{st}" x="{x}" y="{ly - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(40, ly + 28, "foot", "Reference design, not a product list · adapt to your own stack · hover or tap a box or tag for an explanation",
              "Referentieontwerp, geen productlijst · pas aan uw eigen omgeving aan · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- AI sandbox reference design ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.28em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .sb{fill:var(--bg-hi);stroke:var(--good);stroke-dasharray:6 4}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-mid .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .ctag rect{fill:rgba(55,211,155,.10);stroke:rgba(55,211,155,.55)}
.arch .c-bad rect{fill:rgba(255,93,115,.12);stroke:rgba(255,93,115,.55)}
.arch .ctag-t{font:700 10px var(--mono);letter-spacing:.14em;fill:var(--white)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.arch .llabel{font:700 10px var(--mono);letter-spacing:.1em;fill:var(--muted)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:sb-flow 1.4s linear infinite}
.arch .arrowhead{fill:var(--slate)}
.arch .u-ok{color:var(--good)}
.arch .u-mid{color:var(--warn)}
.arch .u-bad{color:var(--bad)}
@keyframes sb-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "sb-")
SECTION = f"""<section class="risk-block" id="sb-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">A sandbox for AI, layer by layer.<br><em>A design worth considering.</em></span><span class="nl">Een zandbak voor AI, laag voor laag.<br><em>Een ontwerp om te overwegen.</em></span></h2>
    <span class="term"><span class="en">reference architecture / disposable sandbox with three guarded exits</span><span class="nl">referentiearchitectuur / wegwerpzandbak met drie bewaakte uitgangen</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>Where to start is your call.</strong> The agent gets a machine with nothing of value in it. Every way out is a control point: named sites, short-lived keys, a person's yes.</p>
      <p class="nl"><strong>Waar u begint, bepaalt u zelf.</strong> De agent krijgt een machine zonder iets van waarde erin. Elke uitgang is een controlepunt: genoemde sites, kortlevende sleutels, het ja van een mens.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "ai-sandboxing.svg-section.html"), "w", encoding="utf-8").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

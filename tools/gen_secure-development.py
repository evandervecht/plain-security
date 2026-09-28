"""Generate the 'From laptop to production' pipeline map for plain-security.fyi/secure-development/.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself.

    python3 tools/gen_secure-development.py
    python3 tools/embed.py secure-development tools/out/pipeline-map.svg-section.html
"""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 500
BW, BH = 156, 140          # pipeline boxes
GAP = 26
X0 = 30
COLS = [X0 + i * (BW + GAP) for i in range(6)]
Z1, Z2 = (40, 196), (256, 146)   # zone y, height
ROW1 = Z1[0] + 38
ROW2 = Z2[0] + 38
BW2, BH2 = 260, 86

# status: ok = usually in place (check it is on), mid = often partial, bad = often missing
PIPE = [
    # kicker EN/NL, name EN/NL, status, lines EN, lines NL, tags
    (("01 · CODE", "01 · CODE"), ("Developer", "Ontwikkelaar"), "mid",
     ["MFA on every account", "signed commits"], ["MFA op elk account", "ondertekende commits"], ["MFA"]),
    (("02 · REVIEW", "02 · REVIEW"), ("Repository", "Repository"), "ok",
     ["branch protection:", "review before merge", "secret scanning"], ["branchbeveiliging:", "review vóór merge", "secret scanning"], []),
    (("03 · BUILD", "03 · BUILD"), ("CI build", "CI-build"), "mid",
     ["SAST + SCA scans", "SBOM per release", "isolated runners", "short-lived keys"],
     ["SAST- + SCA-scans", "SBOM per release", "geïsoleerde runners", "kortlevende sleutels"], ["SBOM", "OIDC"]),
    (("04 · SIGN", "04 · TEKEN"), ("Sign & attest", "Ondertekenen"), "bad",
     ["Sigstore signature", "SLSA provenance"], ["Sigstore-handtekening", "SLSA-herkomstdata"], ["SLSA"]),
    (("05 · STORE", "05 · BEWAAR"), ("Artifact registry", "Artefactregister"), "ok",
     ["unchangeable versions", "signature + SBOM kept"], ["onwijzigbare versies", "handtekening + SBOM"], []),
    (("06 · RUN", "06 · DRAAI"), ("Production", "Productie"), "bad",
     ["deploys only signed,", "verified artifacts"], ["draait alleen onder-", "tekende artefacten"], []),
]
PIPE_TIPS = [
    (["Developer · the first link", "MFA stops a stolen password from pushing", "code. Signed commits show who really", "wrote a change."],
     ["Ontwikkelaar · de eerste schakel", "MFA voorkomt dat een gestolen wachtwoord", "code kan pushen. Ondertekende commits", "tonen wie een wijziging echt schreef."]),
    (["Repository · where the code lives", "Branch protection: no change reaches the", "main branch without review. Secret", "scanning blocks commits with keys in them."],
     ["Repository · waar de code staat", "Branchbeveiliging: geen wijziging komt", "zonder review op de hoofdbranch. Secret", "scanning blokkeert commits met sleutels."]),
    (["CI · continuous integration", "SAST reads our code for flaws; SCA checks", "third-party packages for known ones. Each", "build runs on a fresh, isolated runner."],
     ["CI · continuous integration", "SAST zoekt fouten in onze code; SCA toetst", "externe pakketten op bekende lekken. Elke", "build draait op een schone, losse runner."]),
    (["Sign & attest · proof of origin", "Sigstore signs the build; SLSA provenance", "records how and where it was built, so", "tampering shows."],
     ["Ondertekenen · bewijs van herkomst", "Sigstore ondertekent de build; SLSA-", "herkomstdata legt vast hoe en waar die", "is gebouwd, zodat manipulatie opvalt."]),
    (["Artifact registry", "Stores each release once, unchangeable,", "with its signature and SBOM next to it.", "Production pulls only from here."],
     ["Artefactregister", "Bewaart elke release één keer, onwijzigbaar,", "met handtekening en SBOM ernaast.", "Productie haalt alleen hier op."]),
    (["Production · verify before deploy", "The platform checks the signature and", "refuses anything unsigned or built", "outside the pipeline."],
     ["Productie · controleren vóór uitrol", "Het platform controleert de handtekening", "en weigert alles wat niet ondertekend is", "of buiten de pipeline is gebouwd."]),
]
SIDE = [
    # x, kicker, name, status, lines EN, lines NL, tip EN, tip NL
    (COLS[0] + 40, ("AI · PULL REQUESTS", "AI · PULL REQUESTS"), ("AI coding agent", "AI-codeeragent"), "bad",
     ["least-privilege token ·", "same review + scans as people"], ["token met minimale rechten ·", "zelfde review + scans als mensen"],
     ["AI coding agent", "Treated like a new developer: its own token", "with only the rights it needs, and every", "change reviewed and scanned like ours."],
     ["AI-codeeragent", "Behandeld als een nieuwe ontwikkelaar: een", "eigen token met alleen de nodige rechten,", "elke wijziging gereviewd en gescand."]),
    (COLS[4] + 40, ("AT RUN TIME", "TIJDENS HET DRAAIEN"), ("Secrets vault", "Kluis voor geheimen"), "mid",
     ["hands out keys at run time ·", "rotated, never in code"], ["geeft sleutels pas bij gebruik ·", "gewisseld, nooit in code"],
     ["Secrets vault", "Hands passwords and keys to software at", "run time, rotates them and logs every use.", "Nothing secret sits in the code."],
     ["Kluis voor geheimen", "Geeft wachtwoorden en sleutels pas tijdens", "het draaien af, wisselt ze en logt elk", "gebruik. Geen geheim staat in de code."]),
]
TAGS = {
    "MFA": (["MFA · multi-factor authentication", "A second proof besides the password, such", "as an app prompt or a security key."],
            ["MFA · meervoudige authenticatie", "Een tweede bewijs naast het wachtwoord,", "zoals een app-melding of hardwaresleutel."]),
    "SBOM": (["SBOM · software bill of materials", "The ingredient list of a release: every", "component and version. The EU CRA makes", "it a manufacturer duty from Dec 2027."],
             ["SBOM · software bill of materials", "De ingrediëntenlijst van een release: elk", "onderdeel en elke versie. De CRA maakt het", "vanaf dec 2027 een plicht voor fabrikanten."]),
    "OIDC": (["OIDC · short-lived credentials", "The build proves its identity to the cloud", "and gets a key valid for minutes: no", "long-lived secret stored in the pipeline."],
             ["OIDC · kortlevende toegang", "De build bewijst zijn identiteit aan de", "cloud en krijgt een sleutel voor minuten:", "geen blijvend geheim in de pipeline."]),
    "SLSA": (["SLSA · supply-chain levels", "OpenSSF framework (v1.2) with levels for", "how trustworthy a build and its", "provenance record are."],
             ["SLSA · supply-chain levels", "OpenSSF-raamwerk (v1.2) met niveaus voor", "hoe betrouwbaar een build en zijn", "herkomstgegevens zijn."]),
}


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


def tag(x, y, kind, place="below"):
    w = 10 + 7 * len(kind)
    h = TIPS.add((x, y, w, 16), *TAGS[kind], place=place)
    return (f'<g class="tag {h}" tabindex="0"><rect x="{x}" y="{y}" width="{w}" height="16"/>'
            f'<text x="{x + w / 2}" y="{y + 11.5}" text-anchor="middle">{kind}</text></g>'), w


def box(x, y, w, h, kick, name, status, l_en, l_nl, tip, place):
    hc = TIPS.add((x, y, w, h), *tip, place=place)
    o = [f'<g class="node-g s-{status} {hc}" tabindex="0">',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>',
         f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>',
         bi(x + 14, y + 20, "kick", *kick),
         bi(x + 14, y + 42, "name", *name),
         f'<use href="#sd-{status}" class="u-{status}" x="{x + w - 24}" y="{y + 9}" width="14" height="14"/>']
    for i, (a, b) in enumerate(zip(l_en, l_nl)):
        o.append(bi(x + 14, y + 62 + i * 14, "st", a, b))
    o.append('</g>')
    return o


TIPS = Tips("s", W, H)
out = [f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="sd-title sd-desc" xmlns="http://www.w3.org/2000/svg">',
       '<title id="sd-title">From laptop to production: a protected software pipeline</title>',
       '<desc id="sd-desc">Reference pipeline in six steps: developer with MFA and signed commits, repository with branch '
       'protection and secret scanning, CI build with code and dependency scans, SBOM, isolated runners and short-lived '
       'credentials, signing with Sigstore and SLSA provenance, an artifact registry, and production that deploys only '
       'signed artifacts. Beside it, an AI coding agent with a least-privilege token and a secrets vault that feeds '
       'production at run time. Signing and signature checks at deploy, and agent tokens, are often missing.</desc>',
       '''<defs>
<marker id="sd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<symbol id="sd-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="sd-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="sd-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
</defs>''']

for (y, h), en, nl in ((Z1, "PIPELINE · FROM CODE TO CUSTOMER", "PIPELINE · VAN CODE TOT KLANT"),
                       (Z2, "AROUND THE PIPELINE", "RONDOM DE PIPELINE")):
    out.append(f'<rect x="16" y="{y}" width="{W - 32}" height="{h}" class="zone"/>')
    out.append(bi(30, y + 22, "zlabel", en, nl))

# links first, so boxes sit on top
mid = ROW1 + BH / 2
for i in range(5):
    out.append(f'<path d="M{COLS[i] + BW + 2} {mid} H{COLS[i + 1] - 3}" class="link" marker-end="url(#sd-arr)"/>')
ax = COLS[1] + 40                      # agent -> repository
out.append(f'<path d="M{ax} {ROW2 - 2} V{ROW1 + BH + 3}" class="link" marker-end="url(#sd-arr)"/>')
out.append(f'<text x="{ax + 8}" y="{ROW2 - 12}" class="llabel">PULL REQUEST</text>')
vx = COLS[5] + 60                      # vault -> production
out.append(f'<path d="M{vx} {ROW2 - 2} V{ROW1 + BH + 3}" class="link" marker-end="url(#sd-arr)"/>')
out.append(bi(vx + 8, ROW2 - 12, "llabel", "SECRETS", "GEHEIMEN"))

for i, (kick, name, st, l_en, l_nl, tags) in enumerate(PIPE):
    x = COLS[i]
    out += box(x, ROW1, BW, BH, kick, name, st, l_en, l_nl, PIPE_TIPS[i], "below")
    tx = x + 14
    for t in tags:
        g, w = tag(tx, ROW1 + BH - 26, t)
        out.append(g)
        tx += w + 6

for x, kick, name, st, l_en, l_nl, t_en, t_nl in SIDE:
    out += box(x, ROW2, BW2, BH2, kick, name, st, l_en, l_nl, (t_en, t_nl), "above")

# legend + foot
ly = 440
legend = [(30, "ok", "Usually in place — check it is on", "Meestal aanwezig — controleer of het aanstaat"),
          (390, "mid", "Often partial — worth closing", "Vaak half — de moeite waard om af te maken"),
          (730, "bad", "Often missing — worth a plan", "Vaak afwezig — een plan waard")]
for x, st, en, nl in legend:
    out.append(f'<use href="#sd-{st}" class="u-{st}" x="{x}" y="{ly - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(30, ly + 28, "foot",
              "Reference design, not a legal requirement · colours show a typical starting point · hover or tap a box or tag for an explanation",
              "Referentieontwerp, geen wettelijke eis · kleuren tonen een gangbaar startpunt · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- pipeline map (secure development, in practice) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .zlabel{font:700 11px var(--mono);letter-spacing:.28em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-mid .bar{fill:var(--warn)}
.arch .s-bad .bar{fill:var(--bad)}
.arch .s-bad .node{stroke:rgba(255,93,115,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 14px var(--sans);fill:var(--white)}
.arch .st{font:400 10.5px var(--mono);fill:var(--prose)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.04em;fill:var(--slate)}
.arch .llabel{font:700 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:sd-flow 1.4s linear infinite}
.arch .arrowhead{fill:var(--slate)}
.arch .u-ok{color:var(--good)}
.arch .u-mid{color:var(--warn)}
.arch .u-bad{color:var(--bad)}
.arch .tag rect{fill:rgba(90,200,250,.10);stroke:rgba(90,200,250,.45)}
.arch .tag text{font:700 10px var(--mono);letter-spacing:.08em;fill:var(--brand)}
@keyframes sd-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "sd-")

P_EN = ("<strong>A reference, not a checklist.</strong> Signing at the build and checking that signature at deploy tie the two ends together: production then runs only what "
        "your pipeline built. The red boxes are often the most effective place to start.")
P_NL = ("<strong>Een referentie, geen afvinklijst.</strong> Ondertekenen bij de build en die handtekening controleren bij de uitrol verbinden de twee uiteinden: productie draait dan "
        "alleen wat uw pipeline heeft gebouwd. De rode blokken zijn vaak de meest effectieve plek om te beginnen.")

SECTION = f"""<section class="risk-block" id="pipeline-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">From laptop to production.<br><em>Where signing could fit.</em></span><span class="nl">Van laptop tot productie.<br><em>Waar ondertekening past.</em></span></h2>
    <span class="term"><span class="en">software delivery pipeline / reference design</span><span class="nl">softwareleverketen / referentieontwerp</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en">{P_EN}</p>
      <p class="nl">{P_NL}</p>
    </div>
  </div>
</section>"""

# sanity: tooltip line length
for (en, nl) in [t for t in PIPE_TIPS] + [(s[6], s[7]) for s in SIDE] + list(TAGS.values()):
    for s in en + nl:
        assert len(s) <= 46, s

open(os.path.join(OUT, "pipeline-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

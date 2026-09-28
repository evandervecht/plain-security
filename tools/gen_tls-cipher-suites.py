"""Generate the 'TLS per hop' section for plain-security.fyi/tls-cipher-suites/.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself.

    python3 tools/gen_tls-cipher-suites.py
    python3 tools/embed.py tls-cipher-suites tools/out/tls-map.svg-section.html
"""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1140, 470
BW, BH = 184, 100
COLS = [24, 251, 478, 705, 932]          # 5 columns, 43px gaps
ROW = [104, 262]                           # top of row 1 (main path) and row 2

# status: ok = safe today, mid = sufficient / check, bad = phase out
NODES = [
    # row, col, (kicker EN, NL), status, (name EN, NL), (EN l1, l2), (NL l1, l2), tip EN, tip NL
    (0, 0, ("CLIENT", "CLIENT"), "ok", ("Browsers & apps", "Browsers & apps"),
     ("TLS 1.3 · hybrid PQ", "default in browsers"), ("TLS 1.3 · hybride PQ", "standaard in browsers"),
     ["Browsers & apps", "Current Chrome, Firefox and Safari offer", "X25519MLKEM768 by default. Older mobile",
      "apps may still offer only classic ECDHE."],
     ["Browsers & apps", "Huidige Chrome, Firefox en Safari bieden", "standaard X25519MLKEM768 aan. Oudere",
      "mobiele apps bieden soms alleen ECDHE."]),
    (0, 1, ("TLS TERMINATION", "TLS-TERMINATIE"), "ok", ("CDN / WAF", "CDN / WAF"),
     ("TLS 1.2+ · AEAD only", "hybrid PQ at the edge"), ("TLS 1.2+ · alleen AEAD", "hybride PQ aan de rand"),
     ["CDN / WAF · TLS termination", "CDN: network serving your site near users.", "WAF: web application firewall. Both",
      "decrypt TLS, so their settings decide what", "visitors get. Large CDNs offer hybrid PQ."],
     ["CDN / WAF · TLS-terminatie", "CDN: netwerk dat uw site dicht bij", "gebruikers aanbiedt. WAF: webfirewall.",
      "Beide ontsleutelen TLS en bepalen wat", "bezoekers krijgen. Grote CDN's: hybride PQ."]),
    (0, 2, ("RE-ENCRYPTS", "HERVERSLEUTELT"), "mid", ("Load balancer", "Load balancer"),
     ("TLS 1.2+ · ECDHE", "hybrid: OpenSSL 3.5+"), ("TLS 1.2+ · ECDHE", "hybride: OpenSSL 3.5+"),
     ["Load balancer · TLS to your servers", "Decrypts and re-encrypts traffic. TLS 1.2", "with ECDHE is sufficient; hybrid PQ needs",
      "a recent library such as OpenSSL 3.5 (LTS).", ],
     ["Load balancer · TLS naar uw servers", "Ontsleutelt en versleutelt verkeer. TLS 1.2", "met ECDHE is voldoende; hybride PQ vraagt",
      "een recente bibliotheek, zoals OpenSSL 3.5."]),
    (0, 3, ("EAST-WEST", "EAST-WEST"), "mid", ("App services", "Applicatieservices"),
     ("mTLS · TLS 1.2+ · ECDHE", "check mesh & libraries"), ("mTLS · TLS 1.2+ · ECDHE", "check mesh-versies"),
     ["App services · east-west traffic", "Traffic between your own services. Often", "left on plain HTTP inside the network;",
      "the mesh or library version decides", "which TLS and key exchange you get."],
     ["Applicatieservices · east-west", "Verkeer tussen uw eigen services. Binnen", "het netwerk vaak nog gewoon HTTP; de",
      "mesh- of bibliotheekversie bepaalt welke", "TLS en sleuteluitwisseling u krijgt."]),
    (0, 4, ("DATA", "DATA"), "mid", ("Database", "Database"),
     ("TLS 1.2+ · often optional", "enforce it in drivers"), ("TLS 1.2+ · vaak optioneel", "afdwingen in drivers"),
     ["Database connections", "Many drivers treat TLS as optional: the", "PostgreSQL default 'prefer' falls back to",
      "plaintext. Worth enforcing TLS 1.2+ and", "certificate checks."],
     ["Databaseverbindingen", "Veel drivers maken TLS optioneel: de", "PostgreSQL-standaard 'prefer' valt terug",
      "op onversleuteld. Overweeg TLS 1.2+ en", "certificaatcontrole af te dwingen."]),
    (1, 0, ("LEGACY", "LEGACY"), "bad", ("Old clients & IoT", "Oude clients & IoT"),
     ("TLS 1.0/1.1 · 3DES/CBC", "isolate or replace"), ("TLS 1.0/1.1 · 3DES/CBC", "isoleren of vervangen"),
     ["Legacy clients · IoT · middleboxes", "Old devices, embedded stacks and TLS", "inspection boxes may still need TLS 1.0/1.1",
      "or 3DES. NCSC-NL rates these insufficient", "or to be phased out."],
     ["Oude clients · IoT · middleboxes", "Oude apparaten, ingebouwde stacks en TLS-", "inspectie vragen soms nog TLS 1.0/1.1 of",
      "3DES. NCSC-NL noemt dat onvoldoende of", "uit te faseren."]),
    (1, 3, ("INTERNAL", "INTERN"), "mid", ("Batch jobs & APIs", "Batchjobs & API's"),
     ("custom TLS stacks", "pin TLS 1.2 as minimum"), ("eigen TLS-stacks", "minimum: TLS 1.2"),
     ["Internal APIs & batch jobs", "Scripts and older libraries sometimes", "retry with a lower TLS version when a",
      "handshake fails. Worth pinning TLS 1.2 as", "the minimum in code and config."],
     ["Interne API's & batchjobs", "Scripts en oudere bibliotheken proberen", "het soms opnieuw met een lagere TLS-versie",
      "als een handshake mislukt. Zet TLS 1.2 als", "minimum vast in code en configuratie."]),
]

# hop tags: (label, status, x-centre, y, tip EN, tip NL)
def gap_mid(c):
    return COLS[c] + BW + (COLS[c + 1] - COLS[c] - BW) / 2

HOPS = [
    ("TLS 1.3 · PQ", "ok", gap_mid(0), 0,
     ["X25519MLKEM768 · hybrid key exchange", "Classic X25519 plus post-quantum ML-KEM.", "Safe as long as either one holds.",
      "NCSC-NL rates it 'good' (2025-05)."],
     ["X25519MLKEM768 · hybride uitwisseling", "Klassiek X25519 plus post-quantum ML-KEM.", "Veilig zolang één van beide standhoudt.",
      "NCSC-NL: 'goed' (richtlijnen 2025-05)."]),
    ("TLS 1.2+ · ECDHE", "mid", gap_mid(1), 0,
     ["ECDHE · ephemeral key exchange", "A fresh key per session (forward secrecy):", "a stolen server key cannot decrypt past",
      "traffic. NCSC-NL: 'sufficient'. Not", "quantum-safe on its own."],
     ["ECDHE · kortstondige sleuteluitwisseling", "Elke sessie een nieuwe sleutel (forward", "secrecy): een gestolen serversleutel",
      "ontsleutelt oud verkeer niet. NCSC-NL:", "'voldoende'. Zelf niet quantumveilig."]),
    ("MTLS 1.2+", "mid", gap_mid(2), 0,
     ["mTLS · mutual TLS", "Both sides prove who they are with a", "certificate. A service mesh can issue",
      "and rotate those certificates for you."],
     ["mTLS · wederzijdse TLS", "Beide kanten bewijzen met een certificaat", "wie ze zijn. Een service mesh kan die",
      "certificaten voor u uitgeven en vernieuwen."]),
    ("TLS 1.2+ · AEAD", "mid", gap_mid(3), 0,
     ["AEAD · authenticated encryption", "AES-GCM or ChaCha20-Poly1305: encrypts", "and checks integrity in one step. CBC",
      "and 3DES suites are worth phasing out."],
     ["AEAD · geauthenticeerde versleuteling", "AES-GCM of ChaCha20-Poly1305: versleutelt", "en controleert integriteit in één stap.",
      "CBC- en 3DES-suites kunt u uitfaseren."]),
    ("TLS 1.0 · 3DES", "bad", None, 1,
     ["3DES · Sweet32 (2016)", "3DES encrypts in 64-bit blocks. In one", "long session, collisions become likely",
      "after about 32 GB and leak data."],
     ["3DES · Sweet32 (2016)", "3DES versleutelt in blokken van 64 bits.", "In één lange sessie worden botsingen na",
      "zo'n 32 GB waarschijnlijk en lekt data."]),
    ("TLS 1.2 MIN", "mid", None, 1,
     ["Downgrade protection", "TLS 1.3 and TLS_FALLBACK_SCSV let both", "sides detect a forced lower version.",
      "Custom retry logic can bypass this."],
     ["Downgradebescherming", "TLS 1.3 en TLS_FALLBACK_SCSV laten beide", "kanten een afgedwongen lagere versie",
      "zien. Eigen retry-logica omzeilt dat soms."]),
]


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


def hop_tag(label, status, cx, y, en, nl, place="above"):
    w = round(len(label) * 6.2 + 18)
    x = round(cx - w / 2)
    h = TIPS.add((x, y, w, 18), en, nl, place=place)
    return (f'<g class="hop s-{status} {h}" tabindex="0"><rect x="{x}" y="{y}" width="{w}" height="18"/>'
            f'<text x="{cx}" y="{y + 12.5}" text-anchor="middle">{e(label)}</text></g>')


TIPS = Tips("t", W, H)
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="tl-title tl-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="tl-title">TLS per hop</title>')
out.append('<desc id="tl-desc">Reference path from browsers through a CDN, load balancer and app services to the database, '
           'with the typical minimum TLS version and key exchange per hop. Browsers to the CDN can use TLS 1.3 with hybrid '
           'post-quantum key exchange; internal hops typically use TLS 1.2 or higher with ECDHE; old clients and IoT on '
           'TLS 1.0 or 3DES need a plan.</desc>')
out.append('''<defs>
<marker id="tl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<symbol id="tl-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="tl-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="tl-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
</defs>''')

# zones
out.append(f'<rect x="12" y="20" width="{W - 24}" height="{ROW[1] + BH + 22 - 20}" class="zone"/>')
out.append(bi(24, 42, "zlabel", "PUBLIC INTERNET → YOUR NETWORK → DATA", "PUBLIEK INTERNET → UW NETWERK → DATA"))

# links (before nodes)
mid0 = ROW[0] + BH / 2
for c in range(4):
    x1, x2 = COLS[c] + BW + 2, COLS[c + 1] - 3
    out.append(f'<path d="M{x1} {mid0} H{x2}" class="link" marker-end="url(#tl-arr)"/>')
    gx = gap_mid(c)
    out.append(f'<path d="M{gx} {ROW[0] - 22} V{mid0 - 3}" class="tick"/>')
# legacy -> CDN (diagonal), batch -> services (vertical)
lx1, ly1 = COLS[0] + BW - 30, ROW[1] - 2
lx2, ly2 = COLS[1] + 40, ROW[0] + BH + 3
out.append(f'<path d="M{lx1} {ly1} L{lx2} {ly2}" class="link bad" marker-end="url(#tl-arr)"/>')
bx = COLS[3] + BW / 2
out.append(f'<path d="M{bx} {ROW[1] - 2} V{ROW[0] + BH + 3}" class="link" marker-end="url(#tl-arr)"/>')

# nodes
for row, col, (k_en, k_nl), status, (n_en, n_nl), (s1, s2), (t1, t2), tip_en, tip_nl in NODES:
    x, y = COLS[col], ROW[row]
    h = TIPS.add((x, y, BW, BH), tip_en, tip_nl, place="above" if row == 1 else "below")
    out.append(f'<g class="node-g s-{status} {h}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{BH}" class="bar"/>')
    out.append(f'<use href="#tl-{status}" class="u-{status}" x="{x + BW - 26}" y="{y + 11}" width="14" height="14"/>')
    out.append(bi(x + 16, y + 22, "kick", k_en, k_nl))
    out.append(bi(x + 16, y + 46, "name", n_en, n_nl))
    out.append(bi(x + 16, y + 70, "st", s1, t1))
    out.append(bi(x + 16, y + 86, "st", s2, t2))
    out.append('</g>')

# hop tags (after nodes so they sit on top)
for label, status, cx, kind, en, nl in HOPS[:4]:
    out.append(hop_tag(label, status, cx, ROW[0] - 40, en, nl, place="above"))
lab, st, _, _, en, nl = HOPS[4]
out.append(hop_tag(lab, st, (lx1 + lx2) / 2 + 72, (ly1 + ly2) / 2 + 2, en, nl, place="below"))
lab, st, _, _, en, nl = HOPS[5]
out.append(hop_tag(lab, st, bx + 58, (ROW[1] + ROW[0] + BH) / 2 - 9, en, nl, place="below"))

# legend
ly = 420
legend = [
    (24, "ok", "TLS 1.3 + hybrid PQ · NCSC-NL: good", "TLS 1.3 + hybride PQ · NCSC-NL: goed"),
    (360, "mid", "TLS 1.2 + ECDHE · sufficient, check", "TLS 1.2 + ECDHE · voldoende, controleren"),
    (700, "bad", "TLS 1.0/1.1, 3DES, CBC · phase out", "TLS 1.0/1.1, 3DES, CBC · uitfaseren"),
]
for x, st, en, nl in legend:
    out.append(f'<use href="#tl-{st}" class="u-{st}" x="{x}" y="{ly - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(24, ly + 30, "foot",
              "Typical minimums in 2026 · ratings are NCSC-NL guidance (2025-05), not law · hover or tap a box or tag for an explanation",
              "Gangbare minimums in 2026 · oordelen zijn NCSC-NL-richtlijnen (2025-05), geen wet · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- TLS per hop (in practice) ---------- */
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
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:tl-flow 1.4s linear infinite}
.arch .link.bad{stroke:var(--bad)}
.arch .tick{fill:none;stroke:var(--line);stroke-width:1}
.arch .arrowhead{fill:var(--slate)}
.arch .u-ok{color:var(--good)}
.arch .u-mid{color:var(--warn)}
.arch .u-bad{color:var(--bad)}
.arch .hop rect{fill:var(--deep);stroke:var(--line)}
.arch .hop text{font:700 9.5px var(--mono);letter-spacing:.08em}
.arch .hop.s-ok rect{stroke:var(--good)}
.arch .hop.s-ok text{fill:var(--good)}
.arch .hop.s-mid rect{stroke:var(--warn)}
.arch .hop.s-mid text{fill:var(--warn)}
.arch .hop.s-bad rect{stroke:var(--bad)}
.arch .hop.s-bad text{fill:var(--bad-soft,#ffb3be)}
@keyframes tl-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "tl-")
# the page CSS has .hop? scope_classes renames every class used in the SVG, so .tl-hop etc.

PQ_EN = abbr("Hybrid PQ", "Hybrid post-quantum key exchange: classic X25519 plus ML-KEM, so recorded traffic stays safe if either one holds.")
PQ_NL = abbr("Hybride PQ", "Hybride post-quantum sleuteluitwisseling: klassiek X25519 plus ML-KEM; opgenomen verkeer blijft veilig zolang één van beide standhoudt.")
SECTION = f"""<section class="risk-block" id="tls-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2>
      <span class="en">One padlock, five hops. <em>Each sets its own minimum.</em></span>
      <span class="nl">Eén hangslot, vijf hops. <em>Elke hop kiest zijn eigen minimum.</em></span>
    </h2>
    <span class="term"><span class="en">TLS per hop / reference path</span><span class="nl">TLS per hop / referentiepad</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>Where to look first is your call.</strong> Every box that decrypts traffic sets its own TLS version and key exchange, so a strong edge says little about the hops behind it. {PQ_EN} at the edge is often a sensible first step; the amber and red hops usually need an owner and a date.</p>
      <p class="nl"><strong>Waar u eerst kijkt, bepaalt u zelf.</strong> Elk blok dat verkeer ontsleutelt, kiest zijn eigen TLS-versie en sleuteluitwisseling. Een sterke rand zegt dus weinig over de hops erachter. {PQ_NL} aan de rand is vaak een logische eerste stap; de oranje en rode hops hebben meestal een eigenaar en een datum nodig.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "tls-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
# guard: tooltip lines <= 46 chars
for (box, en, nl, place) in TIPS.items:
    for s in en + nl:
        assert len(s) <= 46, (len(s), s)
print("ok")

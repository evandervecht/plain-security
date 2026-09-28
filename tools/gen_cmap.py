"""Generate the 'Where your crypto lives' section for plain-security.fyi/quantum-and-ai/.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 650
BW, BH = 220, 96
COLS = [40, 300, 560, 860]

ZONES = [  # y, height, EN label, NL label
    (40, 156, "EDGE · PUBLIC INTERNET", "EDGE · PUBLIEK INTERNET"),
    (216, 176, "INSIDE · YOUR NETWORK & CLOUD", "BINNEN · UW NETWERK & CLOUD"),
    (412, 156, "TRUST & KEYS · UNDERPINS EVERYTHING ABOVE", "VERTROUWEN & SLEUTELS · ONDER ALLES HIERBOVEN"),
]

# status: ok = safe today, mid = hybrid available / partly, bad = needs a plan or vendor
# tag: HNDL = harvest-now exposure, SIG = authenticity only
NODES = [
    # zone, col, kicker, status, tag, (EN name, NL name), (EN s1, EN s2), (NL s1, NL s2)
    (0, 0, "X25519MLKEM768", "mid", "HNDL", ("Visitors & apps", "Bezoekers & apps"),
     ("Modern browsers ready ·", "old clients & apps lag"), ("Moderne browsers klaar ·", "oude clients & apps achter")),
    (0, 1, "TLS TERMINATION", "mid", "HNDL", ("CDN / WAF", "CDN / WAF"),
     ("Hybrid key exchange:", "worth enabling & verifying"), ("Hybride sleuteluitwisseling:", "aanzetten overwegen")),
    (0, 2, ("TLS TO ORIGIN", "TLS NAAR ORIGIN"), "mid", "HNDL", ("Load balancer / gateway", "Load balancer / gateway"),
     ("Needs OpenSSL 3.5+", "or vendor support"), ("Vereist OpenSSL 3.5+", "of leveranciersondersteuning")),
    (0, 3, "IKEV2 / IPSEC", "bad", "HNDL", ("Branch & partner VPN", "VPN vestigingen"),
     ("Vendor-dependent ·", "top harvest target"), ("Afhankelijk van leverancier ·", "favoriet oogstdoel")),
    (1, 0, ("OUTBOUND TLS", "UITGAAND TLS"), "bad", "HNDL", ("SaaS & suppliers", "SaaS & leveranciers"),
     ("Unknown until you ask ·", "consider the contract"), ("Onbekend tot u het vraagt ·", "denk aan het contract")),
    (1, 1, "MLKEM768X25519", "ok", "HNDL", ("Admin access (SSH)", "Beheertoegang (SSH)"),
     ("OpenSSH 10+: hybrid default ·", "upgrade older servers"), ("OpenSSH 10+: hybride default ·", "oudere servers upgraden")),
    (1, 2, "MTLS · EAST-WEST", "mid", "HNDL", ("Services & mesh", "Services & mesh"),
     ("Depends on mesh &", "library versions"), ("Afhankelijk van mesh-", "en bibliotheekversies")),
    (1, 3, ("AES-256 AT REST", "AES-256 IN RUST"), "ok", None, ("Databases & storage", "Databases & opslag"),
     ("At rest AES-256: safe ·", "check client TLS"), ("In rust AES-256: veilig ·", "client-TLS controleren")),
    (2, 0, "RSA / ECDSA CERTS", "bad", "SIG", ("PKI & certificates", "PKI & certificaten"),
     ("Not harvestable, but", "roots live 20+ years"), ("Niet te oogsten, maar", "roots leven 20+ jaar")),
    (2, 1, ("ENVELOPE ENCRYPTION", "ENVELOPE-ENCRYPTIE"), "mid", None, ("KMS / HSM", "KMS / HSM"),
     ("AES key wrap: safe ·", "RSA wrap & firmware: check"), ("AES-sleutelwrap: veilig ·", "RSA-wrap & firmware: check")),
    (2, 2, ("UPDATES · PACKAGES", "UPDATES · PAKKETTEN"), "bad", "SIG", ("Code & firmware signing", "Code- & firmwaresignering"),
     ("Devices live 10+ years ·", "ML-DSA / LMS to plan"), ("Apparaten leven 10+ jaar ·", "ML-DSA / LMS inplannen")),
    (2, 3, ("LONG RETENTION", "LANGE BEWAARTERMIJN"), "mid", "HNDL", ("Backups & archives", "Back-ups & archieven"),
     ("AES-256 data: safe ·", "re-wrap RSA-held keys"), ("AES-256-data: veilig ·", "RSA-sleutels herwrappen")),
]

NODE_TIPS = [  # (EN lines, NL lines) per node, same order as NODES; first line = term
    (["X25519MLKEM768 · hybrid key exchange", "Classic X25519 plus post-quantum ML-KEM.", "Modern browsers use it by default; the", "connection stays safe if either one holds."],
     ["X25519MLKEM768 · hybride uitwisseling", "Klassiek X25519 plus post-quantum ML-KEM.", "Moderne browsers gebruiken het standaard;", "veilig zolang één van beide standhoudt."]),
    (["CDN / WAF", "CDN: network that serves your site close to", "visitors. WAF: web application firewall.", "Both decrypt TLS, so they set the crypto."],
     ["CDN / WAF", "CDN: netwerk dat uw site dicht bij bezoekers", "aanbiedt. WAF: firewall voor webapplicaties.", "Beide ontsleutelen TLS en bepalen de crypto."]),
    (["TLS · the encryption behind https://", "Load balancers and gateways decrypt and", "re-encrypt traffic to your servers. Needs a", "recent library, e.g. OpenSSL 3.5 or newer."],
     ["TLS · de encryptie achter https://", "Load balancers en gateways ontsleutelen en", "versleutelen verkeer naar uw servers. Vraagt", "een recente bibliotheek, zoals OpenSSL 3.5+."]),
    (["VPN · IKEv2 / IPsec", "VPN: encrypted tunnel between locations.", "IKEv2/IPsec: the protocols most VPNs use.", "Post-quantum support depends on the vendor."],
     ["VPN · IKEv2 / IPsec", "VPN: versleutelde tunnel tussen locaties.", "IKEv2/IPsec: protocollen van de meeste VPN's.", "PQ-ondersteuning hangt af van de leverancier."]),
    (["SaaS · software as a service", "Software you rent online: CRM, HR, mail.", "Your data reaches them over TLS — worth", "asking when they support hybrid PQ."],
     ["SaaS · software as a service", "Online gehuurde software: CRM, HR, mail.", "Uw data gaat erheen via TLS — de moeite", "waard om te vragen wanneer hybride PQ komt."]),
    (["SSH · secure shell", "Encrypted remote login for administrators.", "OpenSSH 10+ uses mlkem768x25519, a hybrid", "post-quantum key exchange, by default."],
     ["SSH · secure shell", "Versleutelde beheertoegang op afstand.", "OpenSSH 10+ gebruikt standaard mlkem768x25519,", "een hybride post-quantum uitwisseling."]),
    (["mTLS · mutual TLS", "Both sides prove who they are with a", "certificate. East-west: traffic between your", "own services. A service mesh automates it."],
     ["mTLS · wederzijdse TLS", "Beide kanten bewijzen met een certificaat", "wie ze zijn. East-west: verkeer tussen uw", "eigen services. Een service mesh regelt dit."]),
    (["AES-256 · symmetric encryption", "Used for stored data. Quantum computers only", "weaken it slightly — it stays safe. The TLS", "to the database is worth a check."],
     ["AES-256 · symmetrische encryptie", "Voor opgeslagen data. Quantumcomputers", "verzwakken die maar licht — blijft veilig.", "De TLS naar de database is het checken waard."]),
    (["PKI · RSA / ECDSA", "PKI: the system that issues certificates.", "RSA/ECDSA: today's signature algorithms —", "quantum breaks them. Roots live 20+ years."],
     ["PKI · RSA / ECDSA", "PKI: het systeem dat certificaten uitgeeft.", "RSA/ECDSA: huidige handtekeningalgoritmen —", "quantum breekt ze. Roots gaan 20+ jaar mee."]),
    (["KMS / HSM", "KMS: key management service. HSM: sealed", "hardware that guards keys. Envelope", "encryption wraps data keys in a master key —", "safe with AES, not with RSA."],
     ["KMS / HSM", "KMS: sleutelbeheerdienst. HSM: afgeschermde", "hardware die sleutels bewaakt. Envelope-", "encryptie pakt datasleutels in met een", "hoofdsleutel — veilig met AES, niet met RSA."]),
    (["ML-DSA / LMS · quantum-safe signatures", "Code signing proves an update is genuine.", "Devices in the field for 10+ years will", "need to accept the new signatures."],
     ["ML-DSA / LMS · quantumveilige handtekening", "Codesignering bewijst dat een update echt is.", "Apparaten die 10+ jaar meegaan, moeten de", "nieuwe handtekeningen kunnen controleren."]),
    (["Backups & archives", "Kept for years. AES-256 data is safe, but", "keys wrapped with RSA are not — they can be", "re-wrapped with AES or post-quantum keys."],
     ["Back-ups & archieven", "Jaren bewaard. AES-256-data is veilig, maar", "met RSA ingepakte sleutels niet — die kunnen", "opnieuw worden ingepakt met AES of PQ."]),
]


def node_y(zone):
    return ZONES[zone][0] + 36


def bi(x, y, cls, en, nl, extra=""):
    """Bilingual text pair; the page's .en/.nl rules show one of them."""
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


TIPS = Tips("c", W, H)
out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="cm-title cm-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="cm-title">Where your crypto lives</title>')
out.append('<desc id="cm-desc">Map of twelve places where cryptography is used, across edge, internal and trust layers, '
           'each marked safe today, hybrid post-quantum available, or needs a plan. '
           'VPN, SaaS suppliers, PKI roots and code signing need a plan; SSH and data at rest are safe today.</desc>')
out.append('''<defs>
<marker id="cm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
<symbol id="cm-ok" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7.3 L6.1 9.4 L10.2 4.9" fill="none" stroke="currentColor" stroke-width="1.6"/></symbol>
<symbol id="cm-mid" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1 A6 6 0 0 1 7 13 Z" fill="currentColor"/></symbol>
<symbol id="cm-bad" viewBox="0 0 14 14"><path d="M7 1.2 L13.2 12.6 H0.8 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 5.2 V8.6" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="10.6" r="0.9" fill="currentColor"/></symbol>
</defs>''')

# zones
for y, h, en, nl in ZONES:
    out.append(f'<rect x="20" y="{y}" width="{W - 40}" height="{h}" class="zone"/>')
    out.append(bi(40, y + 22, "zlabel", en, nl))

# links (drawn before nodes so boxes sit on top)
mid_a = node_y(0) + BH / 2
mid_b = node_y(1) + BH / 2
a_bot, b_top, b_bot = node_y(0) + BH, node_y(1), node_y(1) + BH
links = [
    (f"M{COLS[0] + BW + 2} {mid_a} H{COLS[1] - 3}", COLS[0] + BW + 20, mid_a - 7, "TLS", "middle"),
    (f"M{COLS[1] + BW + 2} {mid_a} H{COLS[2] - 3}", COLS[1] + BW + 20, mid_a - 7, "TLS", "middle"),
    (f"M{COLS[2] + BW / 2} {a_bot + 2} V{b_top - 3}", COLS[2] + BW / 2 + 10, (a_bot + b_top) / 2 + 4, "TLS", "start"),
    (f"M{COLS[3] + 60} {a_bot + 2} L{COLS[2] + BW - 20} {b_top - 3}", COLS[3] + 34, (a_bot + b_top) / 2 + 12, "IPSEC", "start"),
    (f"M{COLS[1] + BW + 2} {mid_b} H{COLS[2] - 3}", COLS[1] + BW + 20, mid_b - 7, "SSH", "middle"),
    (f"M{COLS[2] + BW + 2} {mid_b} H{COLS[3] - 3}", COLS[2] + BW + 40, mid_b - 7, "TLS", "middle"),
    (f"M{COLS[2] + 40} {b_bot + 2} V{b_bot + 22} H{COLS[0] + BW / 2} V{b_bot + 3}", COLS[1] + BW / 2, b_bot + 17, "TLS · OUTBOUND", "middle"),
]
for d, lx, ly, label, anchor in links:
    out.append(f'<path d="{d}" class="link" marker-end="url(#cm-arr)"/>')
    out.append(f'<text x="{lx}" y="{ly}" class="llabel" text-anchor="{anchor}">{label}</text>')

# nodes
for i, (zone, col, kick, status, tg, (n_en, n_nl), (s1, s2), (t1, t2)) in enumerate(NODES):
    x, y = COLS[col], node_y(zone)
    h = TIPS.add((x, y, BW, BH), *NODE_TIPS[i], place="above" if zone == 2 else "below")
    out.append(f'<g class="node-g s-{status} {h}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{BH}" class="bar"/>')
    k_en, k_nl = kick if isinstance(kick, tuple) else (kick, kick)
    out.append(bi(x + 16, y + 22, "kick", k_en, k_nl))
    out.append(bi(x + 16, y + 45, "name", n_en, n_nl))
    out.append(f'<use href="#cm-{status}" class="u-{status}" x="{x + 16}" y="{y + 60}" width="13" height="13"/>')
    out.append(bi(x + 36, y + 70, "st", s1, t1))
    out.append(bi(x + 36, y + 84, "st", s2, t2))
    out.append('</g>')
    if tg:
        out.append(tag(x + BW - (52 if tg == "HNDL" else 42), y + 10, tg))

# legend
ly = 604
legend = [
    (40, "ok", "Safe today", "Vandaag veilig"),
    (210, "mid", "Hybrid available — worth enabling", "Hybride beschikbaar — overwegen"),
    (470, "bad", "Worth a plan / ask vendor", "Plan of leverancier nodig"),
]
for x, st, en, nl in legend:
    out.append(f'<use href="#cm-{st}" class="u-{st}" x="{x}" y="{ly - 11}" width="14" height="14"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(tag(700, ly - 12, "HNDL"))
out.append(bi(750, ly, "legend", "harvest-now exposure", "blootgesteld aan oogsten"))
out.append(tag(930, ly - 12, "SIG"))
out.append(bi(970, ly, "legend", "authenticity only", "alleen echtheid"))
out.append(bi(40, ly + 26, "foot", "Defaults as of 2026 · worth checking against the versions you run · hover or tap a box or tag for an explanation",
              "Standaardwaarden per 2026 · vergelijk met de versies die u draait · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- crypto map (where your crypto lives) ---------- */
.cmap{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.cmap svg{display:block;width:100%;min-width:900px;height:auto}
.cmap .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.cmap .zlabel{font:700 11px var(--mono);letter-spacing:.28em;fill:var(--slate)}
.cmap .node{fill:var(--surface);stroke:var(--line)}
.cmap .s-ok .bar{fill:var(--good)}
.cmap .s-mid .bar{fill:var(--warn)}
.cmap .s-bad .bar{fill:var(--bad)}
.cmap .s-bad .node{stroke:rgba(255,93,115,.45)}
.cmap .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.cmap .name{font:600 13px var(--sans);fill:var(--white)}
.cmap .st{font:400 10px var(--mono);fill:var(--prose)}
.cmap .legend{font:400 11px var(--mono);fill:var(--body)}
.cmap .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.cmap .llabel{font:700 9.5px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.cmap .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:cm-flow 1.4s linear infinite}
.cmap .arrowhead{fill:var(--slate)}
.cmap .u-ok{color:var(--good)}
.cmap .u-mid{color:var(--warn)}
.cmap .u-bad{color:var(--bad)}
.cmap .tag-h rect{fill:rgba(255,93,115,.12);stroke:rgba(255,93,115,.5)}
.cmap .tag-h text{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--bad-soft)}
.cmap .tag-s rect{fill:rgba(135,162,176,.12);stroke:var(--slate)}
.cmap .tag-s text{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--muted)}
@keyframes cm-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.cmap .link{animation:none}}
""" + TIPS.css(".cmap") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".cmap", "cm-")
SECTION = f"""<section class="risk-block" id="crypto-map">
  <div class="wrap">
    <span class="kicker"><b>//</b><span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">Where your crypto lives.<br><em>And where you might start.</em></span><span class="nl">Waar uw cryptografie zit.<br><em>En waar u zou kunnen beginnen.</em></span></h2>
    <span class="term"><span class="en">crypto inventory / reference map</span><span class="nl">crypto-inventaris / referentiekaart</span></span>

    <figure class="cmap">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>Where to start is your call.</strong> Boxes tagged {abbr("<code>HNDL</code>", "Harvest now, decrypt later: encrypted traffic recorded today and decrypted once a quantum computer exists.")} carry secrets over a network that can be recorded today and decrypted later — hybrid post-quantum key exchange there is often the most effective first step. Boxes tagged {abbr("<code>SIG</code>", "Signature: proves who sent something. It cannot be harvested, but certificates and firmware live for decades.")} cannot be harvested, but roots and firmware live for decades, so they usually need the longest planning.</p>
      <p class="nl"><strong>Waar u begint, bepaalt u zelf.</strong> Blokken met {abbr("<code>HNDL</code>", "Harvest now, decrypt later: versleuteld verkeer dat vandaag wordt opgenomen en later wordt ontcijferd met een quantumcomputer.")} vervoeren geheimen over een netwerk die vandaag kunnen worden opgenomen en later ontcijferd — hybride post-quantum sleuteluitwisseling is daar vaak de meest effectieve eerste stap. Blokken met {abbr("<code>SIG</code>", "Handtekening: bewijst wie iets stuurde. Niet te oogsten, maar certificaten en firmware gaan decennia mee.")} zijn niet te oogsten, maar roots en firmware gaan decennia mee, dus die vragen meestal de langste planning.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "crypto-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")

# Standalone preview: page palette + i18n toggle, so it can be opened directly.
PREVIEW = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Preview · Where your crypto lives</title>
<style>
:root{{--deep:#051324;--bg:#0b1b2b;--bg-lo:#081727;--bg-hi:#0d1e2d;--surface:#2a4858;--slate:#637b88;--muted:#87a2b0;--body:#c8d8e1;--prose:#e6eff5;--white:#fff;--line:#335364;--line-soft:#1d3444;--good:#37d39b;--warn:#ffc857;--bad:#ff5d73;--bad-soft:#ffb3be;--brand:#5ac8fa;
--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;--read:"Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;--sans:"Poppins","Montserrat",system-ui,-apple-system,"Segoe UI",sans-serif}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--body);font-family:var(--mono);font-size:15px;line-height:1.75}}
.wrap{{max-width:1180px;margin:0 auto;padding:0 40px}}
.en,.nl{{display:none}}body:has(#lang-en:checked) .en{{display:revert}}body:has(#lang-nl:checked) .nl{{display:revert}}
.lang{{display:inline-flex;border:1px solid var(--line);margin:20px 40px}}.lang input{{position:absolute;opacity:0}}
.lang label{{cursor:pointer;padding:6px 14px;font-size:11px;letter-spacing:.18em;font-weight:700;color:var(--muted)}}
#lang-en:checked ~ label[for=lang-en],#lang-nl:checked ~ label[for=lang-nl]{{background:var(--slate);color:var(--deep)}}
section.risk-block{{padding:40px 0 78px}}
.kicker{{font-size:12px;letter-spacing:.34em;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:20px;font-weight:500}}.kicker b{{color:var(--slate);margin-right:10px}}
h2{{font-family:var(--sans);font-weight:700;color:var(--white);font-size:clamp(21px,2.6vw,32px);line-height:1.15;margin:0 0 20px}}h2 em{{font-style:normal;color:var(--muted)}}
.term{{display:block;font-size:12px;letter-spacing:.2em;color:var(--slate);text-transform:uppercase;margin:-14px 0 30px}}
.panel{{background:var(--surface);border:1px solid var(--line);padding:36px 40px;max-width:900px}}
.panel p{{font-family:var(--read);font-size:16px;line-height:1.72;margin:0 0 18px;color:var(--prose);max-width:70ch}}.panel strong{{color:var(--white)}}
.panel code{{font-family:var(--mono);background:var(--bg-lo);border:1px solid var(--line);padding:1px 7px;color:var(--white);font-size:13px}}
figure{{margin:0}}
{CSS}
</style></head><body>
<div class="lang"><input type="radio" name="lang" id="lang-en" checked><input type="radio" name="lang" id="lang-nl"><label for="lang-en">EN</label><label for="lang-nl">NL</label></div>
{SECTION}
</body></html>"""
open(os.path.join(OUT, "crypto-map-preview.html"), "w").write(PREVIEW)
print("ok")

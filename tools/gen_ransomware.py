"""Generate the 'What a contained network looks like' section for plain-security.fyi/ransomware/.
Tiered administration (Enterprise Access Model style) with PAWs, segmentation, allowed admin
paths and an immutable backup vault in a separate trust domain.
Output is static HTML + inline SVG: no JavaScript needed for the diagram itself."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 604
BW, BH = 204, 80
COLS = [56, 300, 544]
VAULT_X = 866

BANDS = [  # y, height, EN label, NL label
    (64, 150, "TIER 0 · IDENTITY & CONTROL", "TIER 0 · IDENTITEIT & CONTROLE"),
    (236, 130, "TIER 1 · SERVERS & APPS", "TIER 1 · SERVERS & APPS"),
    (388, 130, "TIER 2 · WORKSTATIONS & USERS", "TIER 2 · WERKPLEKKEN & GEBRUIKERS"),
]


def box_y(band):
    return BANDS[band][0] + (48 if band == 0 else 40)


# status: ok = hardened & separated, mid = where attackers usually land
NODES = [
    # band (or "vault"), col, (EN kicker, NL kicker), status, (EN name, NL name), (EN s1, EN s2), (NL s1, NL s2), tip EN, tip NL
    (0, 0, ("TIER 0 · PAW", "TIER 0 · PAW"), "ok", ("Admin workstation", "Beheerwerkplek"),
     ("Only for Tier 0 work ·", "no mail, no browsing"), ("Alleen voor Tier 0-werk ·", "geen mail, geen browser"),
     ["PAW · privileged access workstation", "A locked-down device used only for admin", "work. No email or web, so phishing and", "browser attacks cannot reach admin logins."],
     ["PAW · privileged access workstation", "Afgeschermd apparaat alleen voor beheer.", "Geen mail of web, dus phishing en", "browseraanvallen bereiken de beheerlogin niet."]),
    (0, 1, ("AD · ENTRA ID", "AD · ENTRA ID"), "ok", ("Identity", "Identiteit"),
     ("Keys to every system ·", "managed from a PAW only"), ("Sleutels tot alles ·", "alleen beheer via een PAW"),
     ["Tier 0 · identity (AD / Entra ID)", "Active Directory and Entra ID decide who", "may log in anywhere. Whoever controls them", "controls the whole company."],
     ["Tier 0 · identiteit (AD / Entra ID)", "Active Directory en Entra ID bepalen wie", "overal mag inloggen. Wie ze beheerst,", "beheerst het hele bedrijf."]),
    (0, 2, ("BACKUP ADMIN", "BACK-UPBEHEER"), "ok", ("Backup server", "Back-upserver"),
     ("Treated as Tier 0 ·", "its own admin accounts"), ("Behandeld als Tier 0 ·", "eigen beheeraccounts"),
     ["Backup server · worth treating as Tier 0", "It can restore or delete every backup,", "so it deserves the same protection as", "identity: own accounts, MFA, a PAW."],
     ["Back-upserver · behandelen als Tier 0", "Hij kan elke back-up terugzetten of wissen,", "dus verdient hij dezelfde bescherming als", "identiteit: eigen accounts, MFA, een PAW."]),
    (1, 0, ("TIER 1 · PAW", "TIER 1 · PAW"), "ok", ("Server admin", "Serverbeheer"),
     ("Separate account ·", "servers only, never Tier 0"), ("Apart account ·", "alleen servers, nooit Tier 0"),
     ["Tier 1 · server administration", "A separate admin account and device for", "servers and apps. It never logs on to", "Tier 0 systems or to workstations."],
     ["Tier 1 · serverbeheer", "Een apart beheeraccount en apparaat voor", "servers en apps. Logt nooit in op", "Tier 0-systemen of op werkplekken."]),
    (1, 1, ("SERVERS · APPS", "SERVERS · APPS"), "ok", ("Servers & databases", "Servers & databases"),
     ("Reachable only through", "admin paths & app ports"), ("Alleen bereikbaar via", "beheerpaden & app-poorten"),
     ["Tier 1 · servers & databases", "Segmented: reachable only through the", "admin path and the ports the apps need,", "not from every desk."],
     ["Tier 1 · servers & databases", "Gesegmenteerd: alleen bereikbaar via het", "beheerpad en de poorten die apps nodig", "hebben, niet vanaf elk bureau."]),
    (2, 0, ("TIER 2 · SUPPORT", "TIER 2 · SUPPORT"), "ok", ("Helpdesk account", "Helpdeskaccount"),
     ("Manages laptops ·", "no rights on servers"), ("Beheert laptops ·", "geen rechten op servers"),
     ["Tier 2 · workstation support", "Helpdesk accounts manage laptops only.", "If one is stolen, the attacker still has", "no rights on servers or identity."],
     ["Tier 2 · werkplekbeheer", "Helpdeskaccounts beheren alleen laptops.", "Wordt er één gestolen, dan heeft de", "aanvaller nog geen rechten op servers."]),
    (2, 1, ("EMAIL · WEB · VPN", "E-MAIL · WEB · VPN"), "mid", ("Laptops & users", "Laptops & gebruikers"),
     ("Phishing lands here ·", "cannot reach Tier 0"), ("Phishing landt hier ·", "kan niet bij Tier 0"),
     ["Tier 2 · laptops, email & web", "Where phishing and stolen logins usually", "land. Assume one is compromised: the", "tiers keep it from reaching the rest."],
     ["Tier 2 · laptops, e-mail & web", "Hier landen phishing en gestolen inlogs", "meestal. Ga ervan uit dat er één lek is:", "de lagen houden de rest buiten bereik."]),
    ("vault", 0, ("IMMUTABLE", "ONVERANDERBAAR"), "ok", ("Backup vault", "Back-upkluis"),
     ("Own accounts & MFA ·", "no one can delete early"), ("Eigen accounts & MFA ·", "niemand kan vroeg wissen"),
     ["Immutable backup vault", "Separate trust domain: its own accounts,", "MFA and network. Copies are locked for", "a set period, so even a stolen domain", "admin account cannot delete them."],
     ["Onveranderbare back-upkluis", "Apart vertrouwensdomein: eigen accounts,", "MFA en netwerk. Kopieën zijn een vaste", "periode vergrendeld; ook een gestolen", "domeinbeheerder kan ze niet wissen."]),
]

TAG_TIPS = {
    "FIREWALL": (["Segmentation · firewall between tiers", "Only the listed admin paths and app ports", "may cross. Everything else is dropped", "and logged."],
                 ["Segmentatie · firewall tussen lagen", "Alleen de vastgelegde beheerpaden en", "app-poorten mogen erdoor. De rest wordt", "geblokkeerd en gelogd."]),
    "BLOCKED": (["Blocked path · Tier 2 to Tier 0", "Tier 0 accounts never log on to laptops,", "so there are no admin credentials there", "for an attacker to harvest."],
                ["Geblokkeerd pad · Tier 2 naar Tier 0", "Tier 0-accounts loggen nooit in op laptops,", "dus daar liggen geen beheergegevens", "die een aanvaller kan oogsten."]),
}


def bi(x, y, cls, en, nl, extra=""):
    """Bilingual text pair; the page's .en/.nl rules show one of them."""
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("r", W, H)


def tag(x, y, kind, label_en, label_nl, cls, w):
    h = TIPS.add((x, y, w, 16), *TAG_TIPS[kind], place="below")
    return (f'<g class="{cls} {h}" tabindex="0"><rect x="{x}" y="{y}" width="{w}" height="16"/>'
            + bi(x + w / 2, y + 11.5, "tagt", label_en, label_nl, ' text-anchor="middle"') + '</g>')


out = []
out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="rw-title rw-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="rw-title">What a contained network looks like</title>')
out.append('<desc id="rw-desc">Reference pattern for ransomware containment. Three administrative tiers: Tier 0 identity, '
           'Tier 0 admin workstation and backup server; Tier 1 servers with a separate server-admin workstation; Tier 2 laptops '
           'with a separate helpdesk account. Each admin account only manages its own tier, firewalls separate the tiers, and the path '
           'from laptops to Tier 0 is blocked. The backup server copies one way into an immutable backup vault in a separate trust domain.</desc>')
out.append('''<defs>
<marker id="rw-arr-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="ah-g"/></marker>
<marker id="rw-arr-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="ah-b"/></marker>
</defs>''')

# trust domains
out.append(f'<rect x="20" y="30" width="790" height="500" class="dom"/>')
out.append(bi(36, 50, "dlabel", "PRODUCTION · ONE TRUST DOMAIN", "PRODUCTIE · ÉÉN VERTROUWENSDOMEIN"))
out.append(f'<rect x="830" y="30" width="270" height="500" class="dom vdom"/>')
out.append(bi(846, 50, "dlabel", "SEPARATE TRUST DOMAIN", "APART VERTROUWENSDOMEIN"))

# tiers
for y, h, en, nl in BANDS:
    out.append(f'<rect x="36" y="{y}" width="758" height="{h}" class="band"/>')
    out.append(bi(52, y + 22, "blabel", en, nl))

# links (before boxes)
def mid(band):
    return box_y(band) + BH / 2

links = []
# allowed admin paths
links.append((f"M{COLS[0] + BW + 2} {mid(0)} H{COLS[1] - 3}", "g"))
links.append((f"M{COLS[0] + BW / 2} {box_y(0) - 2} V{box_y(0) - 12} H{COLS[2] + BW / 2} V{box_y(0) - 3}", "g"))
links.append((f"M{COLS[0] + BW + 2} {mid(1)} H{COLS[1] - 3}", "g"))
links.append((f"M{COLS[0] + BW + 2} {mid(2)} H{COLS[1] - 3}", "g"))
# one-way copy to the vault
links.append((f"M{COLS[2] + BW + 2} {mid(0)} H{VAULT_X - 3}", "b"))
for d, kind in links:
    out.append(f'<path d="{d}" class="link-{kind}" marker-end="url(#rw-arr-{kind})"/>')
# blocked path: laptops -> Tier 0 backup server
bx = COLS[2] + BW / 2
out.append(f'<path d="M{COLS[1] + BW + 2} {mid(2)} H{bx} V{box_y(0) + BH + 3}" class="link-x"/>')
cy = mid(1)
out.append(f'<g class="xmark"><circle cx="{bx}" cy="{cy}" r="10"/><path d="M{bx - 4.5} {cy - 4.5} L{bx + 4.5} {cy + 4.5} M{bx + 4.5} {cy - 4.5} L{bx - 4.5} {cy + 4.5}"/></g>')
out.append(tag(bx + 18, cy - 8, "BLOCKED", "BLOCKED", "GEBLOKKEERD", "tag-x", 92))
# segmentation tags on the tier boundaries
for gy in (BANDS[0][0] + BANDS[0][1] + 3, BANDS[1][0] + BANDS[1][1] + 3):
    out.append(tag(706, gy, "FIREWALL", "FIREWALL", "FIREWALL", "tag-f", 76))

# boxes
for band, col, (k_en, k_nl), status, (n_en, n_nl), (s1, s2), (t1, t2), tip_en, tip_nl in NODES:
    if band == "vault":
        x, y = VAULT_X, box_y(0)
        place = "below"
    else:
        x, y = COLS[col], box_y(band)
        place = "above" if band == 2 else "below"
    h = TIPS.add((x, y, BW, BH), tip_en, tip_nl, place=place)
    out.append(f'<g class="node-g s-{status} {h}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{BH}" class="bar"/>')
    out.append(bi(x + 16, y + 20, "kick", k_en, k_nl))
    out.append(bi(x + 16, y + 41, "name", n_en, n_nl))
    out.append(bi(x + 16, y + 58, "st", s1, t1))
    out.append(bi(x + 16, y + 71, "st", s2, t2))
    out.append('</g>')

# vault notes (plain text, no host)
vy = box_y(0) + BH + 34
for i, (en, nl) in enumerate([("Copies locked for a set period", "Kopieën een vaste periode op slot"),
                              ("No production login reaches it", "Geen productie-inlog kan erbij"),
                              ("Full restore tested yearly", "Volledig herstel jaarlijks getest")]):
    out.append(bi(VAULT_X - 16, vy + i * 20, "note", "· " + en, "· " + nl))

# legend
ly = 560
out.append(f'<rect x="40" y="{ly - 11}" width="4" height="14" class="lg-ok"/>')
out.append(bi(52, ly, "legend", "Hardened & separated", "Gehard & gescheiden"))
out.append(f'<rect x="230" y="{ly - 11}" width="4" height="14" class="lg-mid"/>')
out.append(bi(242, ly, "legend", "Where attackers usually land", "Waar aanvallers binnenkomen"))
out.append(f'<path d="M470 {ly - 4} H500" class="link-g" marker-end="url(#rw-arr-g)"/>')
out.append(bi(510, ly, "legend", "Allowed admin path", "Toegestaan beheerpad"))
out.append(f'<path d="M680 {ly - 4} H710" class="link-x"/>')
out.append(bi(720, ly, "legend", "Blocked path", "Geblokkeerd pad"))
out.append(f'<path d="M850 {ly - 4} H880" class="link-b" marker-end="url(#rw-arr-b)"/>')
out.append(bi(890, ly, "legend", "One-way, locked copy", "Eenrichtingskopie"))
out.append(bi(40, ly + 28, "foot", "Reference pattern, not a product design · tiers as in Microsoft's Enterprise Access Model · hover or tap a box or tag for an explanation",
              "Referentiepatroon, geen productontwerp · lagen zoals in Microsofts Enterprise Access Model · beweeg of tik op een blok of label voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- ransomware containment map ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .dom{fill:none;stroke:var(--line);stroke-dasharray:2 4}
.arch .vdom{stroke:var(--good);stroke-opacity:.55}
.arch .dlabel{font:700 10.5px var(--mono);letter-spacing:.24em;fill:var(--muted)}
.arch .band{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .blabel{font:700 11px var(--mono);letter-spacing:.24em;fill:var(--slate)}
.arch .node{fill:var(--surface);stroke:var(--line)}
.arch .s-ok .bar{fill:var(--good)}
.arch .s-mid .bar{fill:var(--warn)}
.arch .s-mid .node{stroke:rgba(255,200,87,.45)}
.arch .kick{font:500 10px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .name{font:600 13px var(--sans);fill:var(--white)}
.arch .st{font:400 10px var(--mono);fill:var(--prose)}
.arch .note{font:400 10.5px var(--mono);fill:var(--body)}
.arch .legend{font:400 11px var(--mono);fill:var(--body)}
.arch .foot{font:400 10px var(--mono);letter-spacing:.06em;fill:var(--slate)}
.arch .llabel{font:700 9.5px var(--mono);letter-spacing:.12em;fill:var(--muted)}
.arch .link-g{fill:none;stroke:var(--good);stroke-width:1.6}
.arch .link-b{fill:none;stroke:var(--brand);stroke-width:1.6;stroke-dasharray:5 5;animation:rw-flow 1.4s linear infinite}
.arch .link-x{fill:none;stroke:var(--bad);stroke-width:1.5;stroke-dasharray:3 4}
.arch .ah-g{fill:var(--good)}
.arch .ah-b{fill:var(--brand)}
.arch .xmark circle{fill:var(--deep);stroke:var(--bad);stroke-width:1.5}
.arch .xmark path{stroke:var(--bad);stroke-width:2}
.arch .lg-ok{fill:var(--good)}
.arch .lg-mid{fill:var(--warn)}
.arch .tag-x rect{fill:rgba(255,93,115,.12);stroke:rgba(255,93,115,.5)}
.arch .tag-x .tagt{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--bad-soft)}
.arch .tag-f rect{fill:rgba(135,162,176,.12);stroke:var(--slate)}
.arch .tag-f .tagt{font:700 9px var(--mono);letter-spacing:.1em;fill:var(--muted)}
@keyframes rw-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link-b{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "rw-")
PAW_EN = abbr("PAW", "Privileged access workstation: a locked-down device used only for admin work, never for email or browsing.")
PAW_NL = abbr("PAW", "Privileged access workstation: een afgeschermd apparaat alleen voor beheer, nooit voor mail of internet.")
SECTION = f"""<section class="risk-block" id="ransomware-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">What a contained network looks like. <em>And where attackers get stuck.</em></span><span class="nl">Zo ziet een ingedamd netwerk eruit. <em>En hier loopt de aanvaller vast.</em></span></h2>
    <span class="term"><span class="en">tiered administration / isolated backups / reference pattern</span><span class="nl">gelaagd beheer / geïsoleerde back-ups / referentiepatroon</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>What to look for:</strong> each tier has its own admin accounts, used only from its own hardened device ({PAW_EN}). Microsoft calls this its Enterprise Access Model. The backup vault sits outside it all, so a stolen domain admin cannot delete the last clean copy. Which gap to close first is your call.</p>
      <p class="nl"><strong>Waar u op let:</strong> elke laag heeft eigen beheeraccounts, alleen te gebruiken vanaf een eigen geharde werkplek ({PAW_NL}). Microsoft noemt dit het Enterprise Access Model. De back-upkluis staat daarbuiten, zodat een gestolen domeinbeheerder de laatste schone kopie niet kan wissen. Welk gat u eerst dicht, bepaalt u zelf.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "ransomware-map.svg-section.html"), "w").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

"""Generate the 'In practice' section for plain-security.fyi/cloud-sovereignty/.
A board-readable map of a hybrid estate: your own applications on a sovereign EU cloud
on the left, SaaS with a non-EU parent on the right, and the six flows between them,
coloured by whether they stay under your control or leave. Static HTML + inline SVG,
no JavaScript. Checked against the Commission's Cloud Sovereignty Framework v1.2.1
(Oct 2025), 18 U.S.C. 2713, GDPR Art. 48, Data Act Art. 25 and 29, Microsoft EU Data
Boundary documentation (Feb 2025)."""
from html import escape as e
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import Tips, abbr, HTML_CSS, scope_classes
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)

W, H = 1120, 560
LX, LW = 30, 330            # left zone: your sovereign estate
FX, FW = 410, 300           # middle: flows
RX, RW = 760, 330           # right zone: SaaS with a non-EU parent
BH = 62
ROWS = [78, 158, 238, 318]  # box rows
FROWS = [78, 142, 206, 270, 334, 398]  # flow tags


def bi(x, y, cls, en, nl, extra=""):
    if en == nl:
        return f'<text x="{x}" y="{y}" class="{cls}"{extra}>{e(en)}</text>'
    return (f'<text x="{x}" y="{y}" class="{cls} en"{extra}>{e(en)}</text>'
            f'<text x="{x}" y="{y}" class="{cls} nl"{extra}>{e(nl)}</text>')


TIPS = Tips("s", W, H)
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


def flow(y, status, label, verdict, tip):
    """A flow tag in the middle lane. status: bad = leaves under the provider's law,
    warn = leaves under conditions, good = stays with you."""
    x, w, h = FX, FW, 46
    hc = TIPS.add((x, y, w, h), *tip)
    out.append(f'<g class="node-g s-{status} {hc}" tabindex="0">')
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" class="node"/>')
    out.append(f'<rect x="{x}" y="{y}" width="4" height="{h}" class="bar"/>')
    out.append(bi(x + 16, y + 19, "fname", *label))
    out.append(bi(x + 16, y + 36, "st", *verdict))
    if status == "good":
        # stays: a short bar back to your estate, and a stop mark towards the SaaS
        out.append(f'<path d="M{x - 2} {y + h / 2} H{LX + LW + 4}" class="link-stay"/>')
        out.append(f'<path d="M{x + w + 12} {y + 8} V{y + h - 8}" class="stop"/>')
    else:
        out.append(f'<path d="M{LX + LW + 2} {y + h / 2} H{x - 3}" class="link"/>')
        out.append(f'<path d="M{x + w + 2} {y + h / 2} H{RX - 4}" class="link" marker-end="url(#sv-arr)"/>')
    out.append('</g>')


out.append(f'<svg viewBox="0 0 {W} {H}" role="img" aria-labelledby="sv-title sv-desc" xmlns="http://www.w3.org/2000/svg">')
out.append('<title id="sv-title">Sovereign infrastructure with SaaS outside it: what still leaves</title>')
out.append('<desc id="sv-desc">Left: your sovereign estate in the EU, with your applications, databases and files, your identity provider '
           'and your keys. Right: SaaS with a non-EU parent, such as a collaboration suite, business SaaS, an AI assistant, and the '
           'provider’s support, engineering and telemetry. In the middle, six flows. Content, identities and metadata leave and come under '
           'the provider’s law. Support access and AI processing leave under conditions you can set in the contract. Keys you hold yourself '
           'stay with you. Indicative, hover or tap a box for an explanation.</desc>')
out.append('''<defs>
<marker id="sv-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" class="arrowhead"/></marker>
</defs>''')

# zones
ZH = ROWS[-1] + BH + 24 - 30
out.append(f'<rect x="{LX - 10}" y="30" width="{LW + 20}" height="{ZH + 60}" class="zone zone-l"/>')
out.append(bi(LX + 6, 54, "zlabel", "YOUR SOVEREIGN ESTATE · EU", "UW SOEVEREINE OMGEVING · EU"))
out.append(f'<rect x="{RX - 10}" y="30" width="{RW + 20}" height="{ZH + 60}" class="zone zone-r"/>')
out.append(bi(RX + 6, 54, "zlabel", "SAAS · NON-EU PARENT", "SAAS · NIET-EU-MOEDER"))
out.append(bi(FX + 6, 54, "zlabel", "WHAT FLOWS BETWEEN THEM", "WAT ERTUSSEN STROOMT"))

# left: your estate
box(LX, ROWS[0], LW, BH, "good", ("IAAS / PAAS · EU-OPERATED", "IAAS / PAAS · EU-BEHEERD"),
    ("Your applications", "Uw applicaties"), ("sovereign cloud or own data centre", "soevereine cloud of eigen datacenter"),
    (["Your applications · the sovereign part", "Run by an EU-operated provider or on your", "own hardware. This is what most 'we are", "sovereign' statements actually describe."],
     ["Uw applicaties · het soevereine deel", "Draaien bij een EU-beheerde aanbieder of", "op eigen hardware. Dit is wat de meeste", "'wij zijn soeverein'-uitspraken beschrijven."]))
box(LX, ROWS[1], LW, BH, "good", ("DATA", "DATA"),
    ("Databases and files", "Databases en bestanden"), ("stay in the EU, under EU law", "blijven in de EU, onder EU-recht"),
    (["Databases and files", "Stored and processed in the EU by an EU", "operator. Still check backups, logging", "and the operator's own suppliers."],
     ["Databases en bestanden", "Opgeslagen en verwerkt in de EU door een", "EU-beheerder. Controleer ook back-ups,", "logging en de leveranciers van de beheerder."]))
box(LX, ROWS[2], LW, BH, "warn", ("LOGIN", "INLOG"),
    ("Identity provider", "Identiteitsprovider"), ("often the SaaS itself", "vaak de SaaS zelf"),
    (["Identity provider", "Who signs your people in? If the", "collaboration suite is also the login for", "the sovereign apps, the SaaS can see and", "stop every session."],
     ["Identiteitsprovider", "Wie logt uw mensen in? Als de samenwerk-", "suite ook de inlog is voor de soevereine", "apps, ziet en stopt de SaaS elke sessie."]))
box(LX, ROWS[3], LW, BH, "good", ("KEYS", "SLEUTELS"),
    ("Your keys (HSM or KMS)", "Uw sleutels (HSM of KMS)"), ("held outside every provider", "buiten elke aanbieder bewaard"),
    (["Keys you hold", "Encryption keys in your own HSM or KMS.", "A foreign order to the provider then yields", "ciphertext. Note: SaaS search and AI", "features usually need the plain text."],
     ["Sleutels in eigen hand", "Sleutels in uw eigen HSM of KMS. Een", "buitenlands bevel aan de aanbieder levert", "dan versleutelde tekst op. Let op: SaaS-", "zoeken en AI hebben meestal leesbare tekst nodig."]), place="above")

# right: SaaS
box(RX, ROWS[0], RW, BH, "bad", ("SAAS", "SAAS"),
    ("Collaboration suite", "Samenwerkingssuite"), ("mail, documents, chat, meetings", "mail, documenten, chat, vergaderingen"),
    (["Collaboration suite", "Mail, documents, chat and meetings: the", "place where the people actually work.", "Its level sets the level of the estate."],
     ["Samenwerkingssuite", "Mail, documenten, chat en vergaderingen:", "waar de mensen echt werken. Het niveau", "hiervan bepaalt het niveau van het geheel."]))
box(RX, ROWS[1], RW, BH, "bad", ("SAAS", "SAAS"),
    ("Business SaaS", "Bedrijfs-SaaS"), ("CRM, tickets, HR, finance", "CRM, tickets, HR, financiën"),
    (["Business SaaS", "Customer records, tickets, HR and finance", "data live in the vendor's tenant, under", "the vendor's law and its sub-processors."],
     ["Bedrijfs-SaaS", "Klantgegevens, tickets, HR- en financiële", "data staan in de tenant van de leverancier,", "onder diens recht en subverwerkers."]))
box(RX, ROWS[2], RW, BH, "warn", ("AI", "AI"),
    ("AI assistant", "AI-assistent"), ("may process in another region", "verwerkt mogelijk in een andere regio"),
    (["AI assistant", "Assistants index what the user can see and", "may process it where the model runs.", "Check the region and the training terms."],
     ["AI-assistent", "Assistenten indexeren wat de gebruiker kan", "zien en verwerken het waar het model draait.", "Controleer regio en trainingsvoorwaarden."]))
box(RX, ROWS[3], RW, BH, "warn", ("PROVIDER", "AANBIEDER"),
    ("Support, engineering, telemetry", "Support, engineering, telemetrie"), ("listed exceptions to EU residency", "genoemde uitzonderingen op EU-opslag"),
    (["Support, engineering, telemetry", "Providers list these as exceptions to", "their EU data commitments: remote access", "for support and security, and usage data.", "Ask what, who, from where."],
     ["Support, engineering, telemetrie", "Aanbieders noemen dit als uitzondering op", "hun EU-toezeggingen: toegang op afstand", "voor support en beveiliging, en gebruiksdata.", "Vraag wat, wie, vanwaar."]), place="above")

# flows (middle)
flow(FROWS[0], "bad", ("CONTENT", "INHOUD"), ("leaves · provider's law applies", "verlaat · recht van de aanbieder geldt"),
     (["Content", "Mail, files, records and chat sit in the", "SaaS. A US provider must hand over data in", "its 'possession, custody or control',", "wherever stored (CLOUD Act, 18 U.S.C. 2713)."],
      ["Inhoud", "Mail, bestanden, dossiers en chat staan in", "de SaaS. Een Amerikaanse aanbieder moet data", "onder zijn 'beheer of controle' afgeven, waar", "die ook staat (CLOUD Act, 18 U.S.C. 2713)."]))
flow(FROWS[1], "bad", ("IDENTITIES", "IDENTITEITEN"), ("leaves · who, when, from where", "verlaat · wie, wanneer, vanwaar"),
     (["Identities", "Accounts, groups, roles and sign-in logs.", "If the SaaS is your identity provider, it", "also governs access to the sovereign apps."],
      ["Identiteiten", "Accounts, groepen, rollen en inloglogs.", "Is de SaaS uw identiteitsprovider, dan", "regelt hij ook de toegang tot de soevereine apps."]))
flow(FROWS[2], "bad", ("METADATA", "METADATA"), ("leaves · rarely in the residency promise", "verlaat · zelden in de opslagbelofte"),
     (["Metadata and telemetry", "Who talked to whom, when, how often, from", "which device. Usage and diagnostic data", "are often outside 'customer data' in the", "residency commitment."],
      ["Metadata en telemetrie", "Wie met wie sprak, wanneer, hoe vaak,", "vanaf welk apparaat. Gebruiks- en", "diagnosedata vallen vaak buiten 'klantdata'", "in de opslagtoezegging."]))
flow(FROWS[3], "warn", ("SUPPORT ACCESS", "SUPPORTTOEGANG"), ("conditional · set it in the contract", "voorwaardelijk · leg het vast in het contract"),
     (["Support access", "Engineers outside the EU may access data", "to fix or secure the service. Approval", "workflows and EU-only support are options", "most large providers offer."],
      ["Supporttoegang", "Engineers buiten de EU kunnen bij data om", "de dienst te herstellen of te beveiligen.", "Goedkeuringsstappen en EU-only support zijn", "opties die grote aanbieders bieden."]))
flow(FROWS[4], "warn", ("AI PROCESSING", "AI-VERWERKING"), ("conditional · region and training terms", "voorwaardelijk · regio en trainingsvoorwaarden"),
     (["AI processing", "Prompts, documents and outputs may be", "processed where the model runs. Check", "the region, retention and whether your", "data trains the model."],
      ["AI-verwerking", "Prompts, documenten en uitvoer worden", "mogelijk verwerkt waar het model draait.", "Controleer regio, bewaartermijn en of uw", "data het model traint."]))
flow(FROWS[5], "good", ("KEYS YOU HOLD", "SLEUTELS IN EIGEN HAND"), ("stays · an order yields ciphertext", "blijft · een bevel levert versleutelde tekst"),
     (["Keys you hold", "With customer-held keys, data handed over", "under an order is unreadable. The SaaS", "features that need plain text (search, AI)", "are the trade-off."],
      ["Sleutels in eigen hand", "Met eigen sleutels is data die onder een", "bevel wordt afgegeven onleesbaar. SaaS-", "functies die leesbare tekst nodig hebben", "(zoeken, AI) zijn de afweging."]))

# legend
ly = 500
legend = [(30, "good", "Stays under your control", "Blijft onder uw controle"),
          (300, "warn", "Leaves under conditions you set", "Verlaat onder uw voorwaarden"),
          (620, "bad", "Leaves · the provider's law applies", "Verlaat · recht van de aanbieder geldt")]
for x, st, en, nl in legend:
    out.append(f'<rect x="{x}" y="{ly - 11}" width="14" height="14" class="sw sw-{st}"/>')
    out.append(bi(x + 22, ly, "legend", en, nl))
out.append(bi(30, ly + 30, "foot",
              "Indicative — the level of the estate is the level of its weakest flow · hover or tap a box for an explanation",
              "Indicatief — het niveau van het geheel is het niveau van de zwakste stroom · beweeg of tik op een blok voor uitleg"))
out.append(TIPS.render())
out.append('</svg>')
SVG = "\n".join(out)

CSS = """/* ---------- sovereignty map (what still leaves) ---------- */
.arch{margin:0 0 30px;background:var(--bg-lo);border:1px solid var(--line-soft);padding:12px;overflow-x:auto}
.arch svg{display:block;width:100%;min-width:900px;height:auto}
.arch .zone{fill:var(--bg-hi);stroke:var(--line-soft)}
.arch .zone-l{stroke:rgba(55,211,155,.35)}
.arch .zone-r{stroke:rgba(255,93,115,.35)}
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
.arch .link{fill:none;stroke:var(--slate);stroke-width:1.5;stroke-dasharray:5 5;animation:sv-flow 1.4s linear infinite}
.arch .s-bad .link{stroke:rgba(255,93,115,.7)}
.arch .s-warn .link{stroke:rgba(255,200,87,.7)}
.arch .link-stay{fill:none;stroke:var(--good);stroke-width:1.5}
.arch .stop{fill:none;stroke:var(--good);stroke-width:3}
.arch .arrowhead{fill:var(--slate)}
.arch .sw-good{fill:var(--good)}
.arch .sw-warn{fill:var(--warn)}
.arch .sw-bad{fill:var(--bad)}
@keyframes sv-flow{to{stroke-dashoffset:-10}}
@media (prefers-reduced-motion:reduce){.arch .link{animation:none}}
""" + TIPS.css(".arch") + "\n" + HTML_CSS

SVG, CSS = scope_classes(SVG, CSS, ".arch", "sv-")
SECTION = f"""<section class="risk-block" id="sov-map">
  <div class="wrap">
    <span class="kicker"><b>//</b> <span class="en">IN PRACTICE</span><span class="nl">IN DE PRAKTIJK</span></span>
    <h2><span class="en">Sovereign infrastructure, SaaS outside it.<br><em>What still leaves.</em></span><span class="nl">Soevereine infrastructuur, SaaS erbuiten.<br><em>Wat er toch vertrekt.</em></span></h2>
    <span class="term"><span class="en">the hybrid estate / one map per SaaS, indicative</span><span class="nl">de hybride omgeving / één kaart per SaaS, indicatief</span></span>

    <figure class="arch">
{SVG}
    </figure>

    <div class="panel">
      <p class="en"><strong>We suggest drawing this map once per SaaS you depend on.</strong> Three flows usually leave outright: content, identities and metadata. Two leave under conditions you can negotiate: support access and AI processing. Keys you hold stay. The sovereignty level of the whole estate is the level of the weakest flow, which is why {abbr("SaaS", "Software as a service: an application you rent and use through the browser; the vendor runs it in its own cloud.")} with a non-EU parent, not the data centre, usually sets it.</p>
      <p class="nl"><strong>Wij raden aan deze kaart één keer te tekenen per SaaS waarvan u afhankelijk bent.</strong> Drie stromen vertrekken meestal gewoon: inhoud, identiteiten en metadata. Twee vertrekken onder voorwaarden waarover u kunt onderhandelen: supporttoegang en AI-verwerking. Sleutels in eigen hand blijven. Het soevereiniteitsniveau van het geheel is dat van de zwakste stroom. Daarom bepaalt meestal de {abbr("SaaS", "Software as a service: een applicatie die u huurt en via de browser gebruikt; de leverancier draait haar in zijn eigen cloud.")} met een niet-EU-moeder het niveau, niet het datacenter.</p>
    </div>
  </div>
</section>"""

open(os.path.join(OUT, "sov-map.svg-section.html"), "w", encoding="utf-8").write(
    "<!-- 1) Add to the page <style> block -->\n<style>\n" + CSS + "\n</style>\n\n"
    "<!-- 2) Insert before the CONTROLS section -->\n" + SECTION + "\n")
print("ok")

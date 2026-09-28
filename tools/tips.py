"""Pure-CSS hover/tap tooltips for the inline SVG diagrams and HTML text.

SVG: each host gets class h<prefix><n> and tabindex=0; the tooltip is drawn at the
end of the SVG (so it paints on top) and shown with svg:has(.host:hover/:focus).
HTML: <abbr class="tip" data-tip="..."> with a CSS ::after bubble.
First line of every tip is the term (bold); keep 2-5 lines of <= 46 characters."""
from html import escape as e

CH = 6.6        # approx. width of one 11px mono character
LH = 15         # line height
PAD = 10

GLOSSARY = {
    "HNDL": (["HNDL · harvest now, decrypt later",
              "Attackers record encrypted traffic today",
              "and read it once a quantum computer exists.",
              "Often a sensible first step: hybrid PQ."],
             ["HNDL · harvest now, decrypt later",
              "Aanvallers slaan versleuteld verkeer nu op",
              "en lezen het zodra er een quantumcomputer is.",
              "Vaak een logische eerste stap: hybride PQ."]),
    "SIG": (["SIG · digital signature",
             "Proves who sent something. Not harvestable:",
             "only forgeable once quantum arrives. But",
             "certificates and firmware live long."],
            ["SIG · digitale handtekening",
             "Bewijst wie iets stuurde. Niet te oogsten:",
             "pas te vervalsen als quantum er is. Maar",
             "certificaten en firmware gaan lang mee."]),
}

HTML_CSS = """/* ---------- acronym tooltips in text ---------- */
abbr.tip{position:relative;text-decoration:underline dotted var(--slate);text-underline-offset:3px;cursor:help;outline:none}
abbr.tip::after{content:attr(data-tip);position:absolute;left:0;bottom:calc(100% + 8px);width:max-content;max-width:36ch;white-space:normal;background:var(--deep);border:1px solid var(--line);border-left:3px solid var(--brand);color:var(--prose);font:400 12px/1.55 var(--mono);letter-spacing:0;text-transform:none;padding:9px 12px;display:none;pointer-events:none;z-index:30}
abbr.tip:hover::after,abbr.tip:focus::after{display:block}
@media (max-width:600px){abbr.tip::after{position:fixed;left:16px;right:16px;bottom:16px;width:auto;max-width:none}}
abbr.tip:focus-visible{outline:1px dashed var(--brand);outline-offset:2px}"""


def abbr(label, tip):
    """Inline HTML acronym with a CSS tooltip (tip: one short sentence, <= ~140 chars)."""
    return f'<abbr class="tip" tabindex="0" data-tip="{e(tip, quote=True)}">{label}</abbr>'


class Tips:
    def __init__(self, prefix, width, height):
        self.p, self.W, self.H = prefix, width, height
        self.items = []

    def add(self, box, en, nl, place="below"):
        """Register a tooltip for a host occupying box=(x, y, w, h); returns the host class."""
        n = len(self.items)
        self.items.append((box, en, nl, place))
        return f"h{self.p}{n}"

    def gloss(self, box, term, place="below"):
        en, nl = GLOSSARY[term]
        return self.add(box, en, nl, place)

    def render(self):
        out = []
        for n, ((x, y, w, h), en, nl, place) in enumerate(self.items):
            lines = max(len(en), len(nl))
            assert lines <= 5, en[0]
            tw = round(max(len(s) for s in en + nl) * CH + 2 * PAD + 6)
            th = lines * LH + 2 * PAD - 3
            ty = y + h + 6 if place == "below" else y - th - 6
            if ty + th > self.H - 4:
                ty = y - th - 6
            if ty < 4:
                ty = y + h + 6
            tx = min(max(x, 24), self.W - 24 - tw)
            out.append(f'<g class="svtip t{self.p}{n}" aria-hidden="true">')
            out.append(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" class="tip-bg"/>')
            out.append(f'<rect x="{tx}" y="{ty}" width="3" height="{th}" class="tip-acc"/>')
            same = en == nl
            for lang, ls in (("en", en), ("nl", nl)):
                if same and lang == "nl":
                    break
                for i, s in enumerate(ls):
                    cls = "tip-t0" if i == 0 else "tip-t"
                    lc = "" if same else f" {lang}"
                    out.append(f'<text x="{tx + PAD + 4}" y="{ty + PAD + 8 + i * LH}" class="{cls}{lc}">{e(s)}</text>')
            out.append('</g>')
        return "\n".join(out)

    def css(self, scope):
        rules = [f"""{scope} .svtip{{visibility:hidden;pointer-events:none}}
{scope} .tip-bg{{fill:var(--deep);stroke:var(--line)}}
{scope} .tip-acc{{fill:var(--brand)}}
{scope} .tip-t0{{font:700 11px var(--mono);fill:var(--white)}}
{scope} .tip-t{{font:400 11px var(--mono);fill:var(--prose)}}
{scope} [tabindex]{{cursor:help;outline:none}}
{scope} [tabindex]:focus-visible > rect:first-child{{stroke:var(--brand);stroke-width:1.5}}"""]
        hosts = ",".join(f"{scope} svg:has(.h{self.p}{n}:hover,.h{self.p}{n}:focus) .t{self.p}{n}"
                         for n in range(len(self.items)))
        if hosts:
            rules.append(hosts + "{visibility:visible}")
        return "\n".join(rules)


def scope_classes(svg, css, scope, prefix):
    """Prefix every class used inside the SVG (except en/nl) so page CSS such as
    .bar or .node can never restyle diagram shapes (CSS width/height/x/y apply to SVG).
    Rewrites class="..." in the SVG and ".name" selectors in the scoped CSS."""
    import re
    keep = {"en", "nl"}
    names = set()
    def fix_attr(m):
        toks = m.group(1).split()
        names.update(t for t in toks if t not in keep)
        return 'class="' + " ".join(t if t in keep else prefix + t for t in toks) + '"'
    svg = re.sub(r'class="([^"]*)"', fix_attr, svg)
    def fix_css(m):
        name = m.group(1)
        return "." + (prefix + name if name in names else name)
    body = css.split("\n")
    out = []
    for line in body:
        if line.lstrip().startswith(scope) or line.startswith("@") or scope in line:
            # rewrite class selectors in selector part only (before the first "{")
            sel, brace, rest = line.partition("{")
            sel = re.sub(r"\.([A-Za-z][\w-]*)", fix_css, sel)
            line = sel + brace + rest
            # nested rules inside @media blocks
            line = re.sub(r"(\{\s*)(" + re.escape(scope) + r"[^{]*)\{", lambda mm: mm.group(1) + re.sub(r"\.([A-Za-z][\w-]*)", fix_css, mm.group(2)) + "{", line)
        out.append(line)
    return svg, "\n".join(out)

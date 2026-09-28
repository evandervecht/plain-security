#!/usr/bin/env python3
"""Insert or replace a generated diagram section in a briefing page.

    python3 tools/embed.py quantum-and-ai tools/out/crypto-map.svg-section.html [--before CONTROLS]

The section file holds a <style> block and a <section id="..."> (as written by the
tools/gen_*.py scripts). CSS goes inside the page <style> between
/* diagram:<id> */ ... /* /diagram:<id> */ and the section goes between
<!-- diagram:<id> --> ... <!-- /diagram:<id> -->. Re-running replaces both, so a
diagram can be regenerated without hand edits. The tooltip CSS for <abbr class="tip">
is added once per page (marker: acronym tooltips).
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from tips import HTML_CSS  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    args = sys.argv[1:]
    before = "CONTROLS"
    if "--before" in args:
        i = args.index("--before")
        before = args[i + 1]
        del args[i:i + 2]
    slug, section_file = args
    page = os.path.join(ROOT, slug, "index.html")
    s = open(page, encoding="utf-8").read()
    t = open(section_file, encoding="utf-8").read()

    css = re.search(r"<style>\n(.*?)\n</style>", t, re.S).group(1)
    css = css.replace(HTML_CSS, "").rstrip()
    sec = t[t.index("<section"):].rstrip()
    sid = re.search(r'<section[^>]*id="([^"]+)"', sec).group(1)

    css_block = f"/* diagram:{sid} */\n{css}\n/* /diagram:{sid} */"
    css_re = re.compile(rf"/\* diagram:{re.escape(sid)} \*/.*?/\* /diagram:{re.escape(sid)} \*/", re.S)
    if css_re.search(s):
        s = css_re.sub(lambda m: css_block, s, count=1)
    else:
        i = s.index("</style>")
        s = s[:i] + css_block + "\n" + s[i:]
    if "acronym tooltips" not in s:
        i = s.index("</style>")
        s = s[:i] + HTML_CSS + "\n" + s[i:]

    sec_block = f"<!-- diagram:{sid} -->\n{sec}\n<!-- /diagram:{sid} -->"
    sec_re = re.compile(rf"<!-- diagram:{re.escape(sid)} -->.*?<!-- /diagram:{re.escape(sid)} -->", re.S)
    if sec_re.search(s):
        s = sec_re.sub(lambda m: sec_block, s, count=1)
    else:
        marker = f"<!-- ============================ {before} ============================ -->"
        if marker not in s:
            sys.exit(f"marker not found: {marker}")
        s = s.replace(marker, sec_block + "\n\n" + marker, 1)

    open(page, "w", encoding="utf-8").write(s)
    print(f"embedded #{sid} into {slug}/index.html")


if __name__ == "__main__":
    main()

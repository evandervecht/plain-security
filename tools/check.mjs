#!/usr/bin/env node
// Checks from README "Checks before pushing" + the briefing standard (AGENTS.md).
// No dependencies: Node 22+ (built-in WebSocket) and a local Chrome/Edge.
//
//   node tools/check.mjs                  all pages, static + browser checks
//   node tools/check.mjs ransomware cloud only these slugs
//   node tools/check.mjs --static         skip the browser checks
//   node tools/check.mjs --baseline main  also enforce the text-length budget vs a git ref
//   node tools/check.mjs --changed origin/main --baseline origin/main   only pages changed vs a ref (CI)
//
// CHROME=/path/to/browser overrides the browser binary.
import { readFileSync, existsSync, readdirSync, statSync, mkdtempSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url))); // .pathname is "/C:/..." on Windows
const args = process.argv.slice(2);
const STATIC_ONLY = args.includes("--static");
const bi = args.indexOf("--baseline");
const BASELINE = bi >= 0 ? args[bi + 1] : null;
const ci = args.indexOf("--changed");
const CHANGED = ci >= 0 ? args[ci + 1] : null;
let slugsArg = args.filter((a, i) => !a.startsWith("--") && !(bi >= 0 && i === bi + 1) && !(ci >= 0 && i === ci + 1));
if (CHANGED) {
  const files = execFileSync("git", ["diff", "--name-only", `${CHANGED}...HEAD`], { cwd: ROOT, encoding: "utf8" }).split("\n");
  slugsArg = [...new Set(files.filter(f => /^([^/]+\/)?index\.html$/.test(f)).map(f => f.includes("/") ? f.split("/")[0] : "."))]
    .filter(s => existsSync(join(ROOT, s, "index.html")));
  if (!slugsArg.length) { console.log(`No pages changed vs ${CHANGED}.`); process.exit(0); }
}
const BUDGET = 1.10; // visible text may grow at most 10% vs baseline

const pages = (slugsArg.length ? slugsArg : readdirSync(ROOT).filter(d =>
  !d.startsWith(".") && d !== "tools" && statSync(join(ROOT, d)).isDirectory() && existsSync(join(ROOT, d, "index.html"))))
  .map(s => ({ slug: s, file: join(ROOT, s, "index.html") }));
if (!slugsArg.length || slugsArg.includes(".")) { const i = pages.findIndex(p => p.slug === "."); if (i >= 0) pages.splice(i, 1); pages.unshift({ slug: ".", file: join(ROOT, "index.html") }); }
const BRIEFING = p => p.slug !== "sponsors" && p.slug !== ".";

let failures = 0;
const fail = (slug, msg) => { failures++; console.log(`  ✗ ${slug}: ${msg}`); };
const ok = (slug, msg) => console.log(`  ✓ ${slug}: ${msg}`);

// ---------- static checks ----------
const VOID = new Set("area base br col embed hr img input link meta source track wbr".split(" "));
function tagBalance(html) {
  const src = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  const stack = [];
  for (const m of src.matchAll(/<(\/?)([a-zA-Z][\w:-]*)\b[^>]*?(\/?)>/g)) {
    const [, close, name, self] = m; const t = name.toLowerCase();
    if (self || (!close && VOID.has(t))) continue;
    if (!close) stack.push(t);
    else if (stack.at(-1) === t) stack.pop();
    else return `unexpected </${t}>, open: <${stack.at(-1)}>`;
  }
  return stack.length ? `unclosed <${stack.at(-1)}> (+${stack.length - 1})` : null;
}
function visibleText(html) {
  // diagrams, the sources line and related links are required furniture, not reading text
  return html.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "").replace(/<p class="(sources|related)[^"]*"[\s\S]*?<\/p>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function staticChecks(p, html) {
  const e = tagBalance(html); if (e) fail(p.slug, `tag balance: ${e}`);
  for (const css of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const o = (css[1].match(/{/g) || []).length, c = (css[1].match(/}/g) || []).length;
    if (o !== c) fail(p.slug, `brace balance in <style>: ${o} { vs ${c} }`);
  }
  if (!html.includes(p.slug === "." ? 'href="favicon.svg"' : 'href="../favicon.svg"')) fail(p.slug, "favicon link missing");
  if (BRIEFING(p)) {
    for (const need of ['id="risk"', 'href="#risk"', 'href="../"']) if (!html.includes(need)) fail(p.slug, `required part missing: ${need}`);
    // advisory tone: no imperative FIX:/OPLOSSING: pills
    const imp = html.match(/>(FIX|OPLOSSING):/g); if (imp) fail(p.slug, `imperative pill wording (${imp.length}× FIX:/OPLOSSING:) — use SUGGESTED:/AANBEVOLEN:`);
    // ...and every briefing suggests at least one control (CONTROL:/CONTROLE: and the like slipped past the FIX: check)
    if (!/>(SUGGESTED|AANBEVOLEN):/.test(html)) fail(p.slug, "no SUGGESTED:/AANBEVOLEN: pill — every briefing suggests at least one control");
    // every tooltip has text, and stays short
    for (const m of html.matchAll(/<abbr class="tip"[^>]*data-tip="([^"]*)"/g)) {
      if (!m[1].trim()) fail(p.slug, "empty data-tip");
      else if (m[1].length > 160) fail(p.slug, `tooltip too long (${m[1].length} > 160): ${m[1].slice(0, 40)}…`);
    }
    // at most one reference-architecture figure (quantum-and-ai has map + roadmap)
    const figs = (html.match(/<figure class="(arch|cmap|rmap)"/g) || []).length;
    if (figs > (p.slug === "quantum-and-ai" ? 2 : 1)) fail(p.slug, `${figs} diagrams — at most one per page`);
    // timelines/deadlines must carry the disclaimer
    if (/<figure class="(rmap|arch)"/.test(html) && /20[2-3]\d/.test(html) && !/not a legal deadline|geen wettelijke deadline|indicative|indicatief/i.test(html))
      fail(p.slug, "dates shown without a 'suggested, not a legal deadline' disclaimer");
    // sources line
    if (!/class="sources[ "]/.test(html)) fail(p.slug, 'no "checked against" sources line (class="sources")');
  }
  if (BASELINE) {
    try {
      const old = execFileSync("git", ["show", `${BASELINE}:${p.slug}/index.html`], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
      const a = visibleText(old).length, b = visibleText(html).length;
      const r = b / a;
      if (r > BUDGET) fail(p.slug, `text grew ${(100 * (r - 1)).toFixed(0)}% vs ${BASELINE} (budget ${(100 * (BUDGET - 1)).toFixed(0)}%)`);
      else ok(p.slug, `text ${r >= 1 ? "+" : ""}${(100 * (r - 1)).toFixed(1)}% vs ${BASELINE}`);
    } catch { /* new page: no baseline */ }
  }
}

// ---------- browser checks (CDP over WebSocket) ----------
function findChrome() {
  const c = [process.env.CHROME,
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe"].filter(Boolean);
  return c.find(existsSync);
}
async function browserChecks(list) {
  const bin = findChrome(); if (!bin) { console.log("  ! no Chrome/Edge found, skipping browser checks (set CHROME=)"); return; }
  const proc = spawn(bin, ["--headless=new", "--remote-debugging-port=0", "--no-first-run", "--disable-gpu",
    ...(process.env.CI ? ["--no-sandbox"] : []), // GitHub's Ubuntu runners block Chrome's user-namespace sandbox
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "ps-check-"))}`, "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
  const wsUrl = await new Promise((res, rej) => {
    let buf = ""; proc.stderr.on("data", d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); });
    setTimeout(() => rej(new Error("browser did not start")), 30000);
  });
  const port = new URL(wsUrl).port;
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r, { once: true }));
  let id = 0; const pending = new Map(); const waiters = [];
  ws.addEventListener("message", ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method) for (const w of waiters.splice(0)) w(msg);
  });
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async expr => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Page.enable");
  const load = async (url, width) => {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    const done = new Promise(r => { const f = m => (m.method === "Page.loadEventFired" ? r() : waiters.push(f)); waiters.push(f); });
    await send("Page.navigate", { url }); await done;
    await evaluate("new Promise(r => setTimeout(r, 150))");
  };
  const LEAK = lang => `(() => { const other = '${lang === "en" ? "nl" : "en"}';
    const i = document.getElementById('lang-${lang}'); if (!i) return -1; i.checked = true; i.dispatchEvent(new Event('change'));
    return [...document.querySelectorAll('.' + other)].filter(el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden').length; })()`;
  for (const p of list) {
    const url = "file://" + p.file;
    await load(url, 1260);
    const hasToggle = await evaluate("!!document.getElementById('lang-en')");
    if (hasToggle) for (const lang of ["en", "nl"]) {
      const n = await evaluate(LEAK(lang));
      if (n > 0) fail(p.slug, `${n} ${lang === "en" ? "Dutch" : "English"} element(s) visible with ${lang.toUpperCase()} selected`);
    }
    for (const lang of hasToggle ? ["en", "nl"] : ["en"]) {
      await load(url, 390);
      if (hasToggle) await evaluate(`(() => { const i = document.getElementById('lang-${lang}'); i.checked = true; })()`);
      const o = await evaluate("[document.documentElement.scrollWidth, document.documentElement.clientWidth]");
      if (o[0] > o[1]) fail(p.slug, `mobile overflow (${lang}): scrollWidth ${o[0]} > clientWidth ${o[1]}`);
    }
    ok(p.slug, "browser checks done");
  }
  ws.close(); proc.kill();
}

console.log(`Checking ${pages.length} page(s)${BASELINE ? `, baseline ${BASELINE}` : ""}`);
for (const p of pages) staticChecks(p, readFileSync(p.file, "utf8"));
if (!STATIC_ONLY) await browserChecks(pages);
console.log(failures ? `\n${failures} problem(s).` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);

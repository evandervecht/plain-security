#!/usr/bin/env node
// Videos for the briefings (media/README.md): one explainroo project per slug in media/<slug>/, rendered on
// the hub, uploaded as assets of the GitHub release "videos", and put on its page one a week from
// media/queue.txt. Node 22+, no dependencies; needs gh (logged in) and the explainroo checkout.
//
//   node tools/media.mjs render [slug...]   voice, check, render, verify: queued slugs without an upload, or these
//   node tools/media.mjs upload [slug...]   out/video.mp4 .vtt .cover.jpg -> <slug>.mp4 .mp3 .vtt .jpg on the release
//   node tools/media.mjs release            head of the queue -> its page, podcast.xml, branch video-<slug>, chore(media) PR
//   node tools/media.mjs feed               podcast.xml from the pages that carry their video (mp3s on the release)
//   node tools/media.mjs status             the queue against the release assets
//
// EXPLAINROO_DIR overrides where explainroo is checked out.
import { readFileSync, writeFileSync, existsSync, mkdtempSync, copyFileSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { join, resolve } from "node:path";
import { tmpdir, cpus } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const REPO = "evandervecht/plain-security";
export const TAG = "videos";
export const ASSET_URL = `https://github.com/${REPO}/releases/download/${TAG}/`;
const EXPLAINROO = process.env.EXPLAINROO_DIR || "C:\\Work\\brainstorm_workspaces\\best_practice_training\\video\\explainroo";
const QUEUE = join(ROOT, "media", "queue.txt");

// null when stdout is inherited (check.mjs runs that way)
const sh = (cmd, args, opts = {}) => String(execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], ...opts }) ?? "").trim();
// gh and other .cmd shims need a shell on Windows
const gh = (args, opts) => sh(process.platform === "win32" ? "gh.exe" : "gh", args, opts);
const git = (args) => sh("git", args);

export function parseQueue(text) {
  return text.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith("#"));
}
const readQueue = () => parseQueue(readFileSync(QUEUE, "utf8"));
function dropFromQueue(slug) {
  const lines = readFileSync(QUEUE, "utf8").split(/\r?\n/);
  const i = lines.findIndex(l => l.trim() === slug);
  if (i >= 0) lines.splice(i, 1);
  writeFileSync(QUEUE, lines.join("\n"));
}

function ensureRelease() {
  const r = spawnSync(process.platform === "win32" ? "gh.exe" : "gh", ["release", "view", TAG, "--repo", REPO, "--json", "assets"], { encoding: "utf8" });
  if (r.status === 0) return JSON.parse(r.stdout).assets.map(a => ({ name: a.name, size: a.size }));
  gh(["release", "create", TAG, "--repo", REPO, "--title", "Briefing videos", "--latest=false",
    "--notes", "The two-minute English video per briefing, one file per slug. Made with explainroo; see media/README.md."]);
  return [];
}
const assetNames = () => ensureRelease().map(a => a.name);

// render keeps one core free for other tasks on the hub (Ellert, 2026-11-03); the routine also pins the affinity
const WORKERS = String(Math.max(1, Math.min(8, cpus().length - 1)));
function explainroo(cmd, slug) {
  const extra = cmd === "render" ? ["--workers", WORKERS] : [];
  const r = spawnSync("node", [join(EXPLAINROO, "bin", "explainroo.js"), cmd, join(ROOT, "media", slug), ...extra], { cwd: EXPLAINROO, stdio: "inherit" });
  if (r.status !== 0) throw new Error(`explainroo ${cmd} ${slug} failed (exit ${r.status})`);
}

function render(slug) {
  if (!existsSync(join(ROOT, "media", slug, "video.json"))) throw new Error(`media/${slug}/video.json missing: no project for ${slug}`);
  for (const step of ["voice", "check", "render", "verify"]) explainroo(step, slug);
}

function upload(slug) {
  const out = join(ROOT, "media", slug, "out");
  if (!existsSync(join(out, "video.mp4"))) throw new Error(`media/${slug}/out/video.mp4 missing: render first`);
  // the podcast episode: the video's sound as mono mp3 at podcast loudness (same settings as Ellert's render-podcast.mjs)
  const m = spawnSync("ffmpeg", ["-v", "error", "-y", "-i", join(out, "video.mp4"), "-vn", "-ac", "1", "-ar", "44100",
    "-af", "loudnorm=I=-16:TP=-1.5", "-c:a", "libmp3lame", "-b:a", "96k", join(out, "video.mp3")], { stdio: "inherit" });
  if (m.status !== 0) throw new Error(`ffmpeg mp3 ${slug} failed (exit ${m.status})`);
  const files = [["video.mp4", `${slug}.mp4`], ["video.mp3", `${slug}.mp3`], ["video.vtt", `${slug}.vtt`], ["video.cover.jpg", `${slug}.jpg`]];
  const tmp = mkdtempSync(join(tmpdir(), "ps-media-"));
  const paths = files.filter(([src]) => existsSync(join(out, src))).map(([src, dst]) => { copyFileSync(join(out, src), join(tmp, dst)); return join(tmp, dst); });
  ensureRelease();
  gh(["release", "upload", TAG, ...paths, "--repo", REPO, "--clobber"]);
  console.log(`uploaded ${paths.length} file(s) for ${slug}`);
}

// The page's video block: after the hero, before the first risk, in the page's own width. Pure.
export function embed(html, slug) {
  if (html.includes('<figure class="vid">')) return html;
  const css = `<style>.vid{margin:28px auto 0}.vid video{display:block;width:100%;aspect-ratio:16/9;border-radius:12px;background:#000;border:1px solid var(--line)}.vid figcaption{margin-top:8px;font-size:.9rem;color:var(--muted)}</style>\n`;
  const block = `<div class="wrap"><figure class="vid">
  <video controls preload="none" poster="${ASSET_URL}${slug}.jpg" src="${ASSET_URL}${slug}.mp4">
    <track kind="subtitles" srclang="en" label="English" src="video.vtt" default>
  </video>
  <figcaption><span class="en">The two-minute video of this briefing.</span><span class="nl">De video van twee minuten over deze briefing (Engels gesproken).</span></figcaption>
</figure></div>

`;
  const at = html.indexOf('<section class="risk-block"');
  if (at < 0 || !html.includes("</head>")) throw new Error("page has no risk-block section or </head>: cannot place the video");
  const open = html.lastIndexOf("<!--", at); // the "==== 01 ====" banner comment above the first risk, when there is one
  const cut = open > html.lastIndexOf("</div>", at) ? open : at;
  return html.replace("</head>", css + "</head>").replace(html.slice(cut, at), block + html.slice(cut, at));
}

// The podcast feed: one episode per page that carries its video, newest first (the landing page's order),
// the mp3 on the release as enclosure. Pure.
const SITE = "https://plain-security.fyi/";
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function feedXml(items) {
  const item = (it, i) => `  <item>
    <title>${esc(it.title)}</title>
    <link>${SITE}${it.slug}/</link>
    <guid isPermaLink="false">plain-security-${it.slug}</guid>
    <pubDate>${new Date(it.date).toUTCString()}</pubDate>
    <description>${esc(it.description)}</description>
    <enclosure url="${ASSET_URL}${it.slug}.mp3" length="${it.bytes}" type="audio/mpeg"/>
    <itunes:episode>${items.length - i}</itunes:episode>
  </item>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Plain Security</title>
  <link>${SITE}</link>
  <atom:link href="${SITE}podcast.xml" rel="self" type="application/rss+xml"/>
  <language>en</language>
  <description>Two-minute security briefings for the board: how it breaks, what stops it, one suggested first step. The sound of the briefing videos on plain-security.fyi.</description>
  <itunes:author>Plain Security</itunes:author>
  <itunes:explicit>false</itunes:explicit>
${items.map(item).join("\n")}
</channel>
</rss>
`;
}

function feed() {
  const order = [...new Set([...readFileSync(join(ROOT, "index.html"), "utf8").matchAll(/href="([a-z0-9-]+)\/"/g)].map(m => m[1]))];
  const size = Object.fromEntries(ensureRelease().map(a => [a.name, a.size]));
  const items = [];
  for (const slug of order) {
    const page = join(ROOT, slug, "index.html"), project = join(ROOT, "media", slug, "video.json");
    if (!existsSync(page) || !existsSync(project)) continue;
    const html = readFileSync(page, "utf8");
    if (!html.includes('<figure class="vid">')) continue;
    if (!size[`${slug}.mp3`]) throw new Error(`${slug}.mp3 is not on the ${TAG} release: run upload first`);
    const desc = (/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    items.push({ slug, title: JSON.parse(readFileSync(project, "utf8")).title, description: desc, bytes: size[`${slug}.mp3`],
      date: git(["log", "-1", "--format=%cI", "--", `${slug}/video.vtt`]) || new Date().toISOString() }); // a page released just now has no commit yet
  }
  writeFileSync(join(ROOT, "podcast.xml"), feedXml(items));
  console.log(`podcast.xml: ${items.length} episode(s)`);
}

function release() {
  const queue = readQueue();
  if (!queue.length) { console.log("queue empty: nothing to release"); return; }
  const slug = queue[0];
  const have = assetNames();
  for (const n of [`${slug}.mp4`, `${slug}.vtt`, `${slug}.jpg`]) if (!have.includes(n)) throw new Error(`${n} is not on the ${TAG} release: run render and upload first`);
  const page = join(ROOT, slug, "index.html");
  if (git(["status", "--porcelain"])) throw new Error("working tree not clean");
  const branch = `video-${slug}`;
  git(["checkout", "-q", "-B", branch]);
  gh(["release", "download", TAG, "--repo", REPO, "--pattern", `${slug}.vtt`, "--output", join(ROOT, slug, "video.vtt"), "--clobber"]);
  writeFileSync(page, embed(readFileSync(page, "utf8"), slug));
  dropFromQueue(slug);
  feed();
  sh("node", ["tools/check.mjs", slug, "--static", "--baseline", "origin/main"], { stdio: "inherit" });
  git(["add", page, join(ROOT, slug, "video.vtt"), QUEUE, join(ROOT, "podcast.xml")]);
  git(["commit", "-q", "-m", `chore(media): add the video to ${slug}\n\nThe two-minute English explainer from media/${slug}, served from the ${TAG} release. Next in media/queue.txt: ${queue[1] || "nothing"}.`]);
  git(["push", "-q", "-u", "origin", branch, "--force"]);
  const body = `## What changed\n- ${slug}/index.html: the two-minute video (a plain \`<video>\` tag, files on the \`${TAG}\` release) between the hero and the first risk, with an EN/NL caption line\n- ${slug}/video.vtt: its English subtitles\n- podcast.xml: the episode (the mp3 on the release)\n- media/queue.txt: ${slug} released; next is ${queue[1] || "nothing"}\n\n## Verified against\n- nothing new: the video says only what the page says (media/${slug}/script.md)\n\n## Checks\n- node tools/check.mjs ${slug} --static --baseline origin/main: passed\n\n## Left out on purpose\n- a Dutch voice: Kokoro has none; the caption says the video is in English\n`;
  const url = gh(["pr", "create", "--repo", REPO, "--base", "main", "--head", branch, "--title", `chore(media): add the video to ${slug}`, "--body", body]);
  console.log(`released ${slug}: ${url}`);
  git(["checkout", "-q", "main"]);
}

function status() {
  const have = assetNames(), queue = readQueue();
  for (const s of queue) console.log(`${have.includes(`${s}.mp4`) ? "uploaded " : "no video "} ${existsSync(join(ROOT, "media", s, "video.json")) ? "project  " : "no proj. "} ${s}`);
  console.log(`${queue.length} queued, next: ${queue[0] || "none"}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [cmd, ...slugs] = process.argv.slice(2);
  const todo = () => slugs.length ? slugs : readQueue().filter(s => !assetNames().includes(`${s}.mp4`) && existsSync(join(ROOT, "media", s, "video.json")));
  try {
    if (cmd === "render") for (const s of todo()) { render(s); upload(s); }
    else if (cmd === "upload") for (const s of (slugs.length ? slugs : readQueue())) upload(s);
    else if (cmd === "release") release();
    else if (cmd === "feed") feed();
    else if (cmd === "status") status();
    else { console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 12).map(l => l.replace(/^\/\/ ?/, "")).join("\n")); process.exit(2); }
  } catch (e) { console.error(`✗ ${e.message}`); process.exit(1); }
}

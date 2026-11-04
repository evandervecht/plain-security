// node --test tools/media.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { embed, feedXml, parseQueue, ROOT, ASSET_URL } from "./media.mjs";

test("queue: blank and comment lines are skipped, order kept", () => {
  assert.deepEqual(parseQueue("# top = next\n\nransomware\n  cloud \n#x\n"), ["ransomware", "cloud"]);
});

test("embed: once, before the first risk, EN/NL parity, release URLs", () => {
  // the shape of a briefing page before its video (every real page carries one now)
  const html = `<html><head></head><body><div class="wrap"><div class="hero"><span class="en">a</span><span class="nl">b</span></div></div>
<!-- ==== 01 ==== -->
<section class="risk-block"></section></body></html>`;
  const out = embed(html, "blast-radius");
  const vid = out.indexOf('<figure class="vid">'), risk = out.indexOf('<section class="risk-block"'), hero = out.indexOf('<div class="hero">');
  assert.ok(hero < vid && vid < risk, "video sits between the hero and the first risk");
  assert.ok(out.includes(`src="${ASSET_URL}blast-radius.mp4"`) && out.includes('src="video.vtt"'));
  const count = (s, re) => (s.match(re) || []).length;
  assert.equal(count(out, /<span class="en">/g) - count(html, /<span class="en">/g), 1);
  assert.equal(count(out, /<span class="nl">/g) - count(html, /<span class="nl">/g), 1);
  assert.equal(count(out, /<style>/g) - count(html, /<style>/g), 1);
  assert.equal(embed(out, "blast-radius"), out, "a page that has the video is left alone");
});

test("embed: a page without the expected shape is refused", () => {
  assert.throws(() => embed("<html><head></head><body></body></html>", "x"), /cannot place/);
});

test("feed: one item per episode, newest first, numbered from the oldest, text escaped", () => {
  const xml = feedXml([
    { slug: "b", title: "B & co", description: 'Says "x" <y>', bytes: 20, date: "2026-11-04T13:35:25Z" },
    { slug: "a", title: "A", description: "first", bytes: 10, date: "2026-11-03T10:54:04Z" },
  ]);
  assert.equal((xml.match(/<item>/g) || []).length, 2);
  assert.ok(xml.indexOf("plain-security-b") < xml.indexOf("plain-security-a"));
  assert.ok(xml.includes("<itunes:episode>2</itunes:episode>") && xml.includes("<itunes:episode>1</itunes:episode>"));
  assert.ok(xml.includes(`<enclosure url="${ASSET_URL}b.mp3" length="20" type="audio/mpeg"/>`));
  assert.ok(xml.includes("<title>B &amp; co</title>") && xml.includes("Says &quot;x&quot; &lt;y&gt;"));
  assert.ok(xml.includes("<pubDate>Wed, 04 Nov 2026 13:35:25 GMT</pubDate>"));
  assert.ok(!xml.includes("<item>") || xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
});

// Every media/<slug>/ project: video.json has its fields, each scene in scenes.js has a "## section" in script.md
// (and the reverse), and each #id cue in a scene is a [#id] in its own section.
const MEDIA = join(ROOT, "media");
const REQUIRED = ["title", "theme", "size", "voice", "captions", "music", "sfx", "watermark"];
const sections = (md) => {
  const out = new Map();
  let cur = null;
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^## (\S+)/);
    if (h) { cur = h[1]; out.set(cur, ""); } else if (cur) out.set(cur, out.get(cur) + line + "\n");
  }
  return out;
};

test("media projects: video.json, scenes.js and script.md agree", async (t) => {
  const slugs = readdirSync(MEDIA).filter(d => existsSync(join(MEDIA, d, "video.json")));
  assert.ok(slugs.length >= 48, `expected every briefing project, found ${slugs.length}`);
  for (const slug of slugs) {
    await t.test(slug, async () => {
      const dir = join(MEDIA, slug);
      const video = JSON.parse(readFileSync(join(dir, "video.json"), "utf8"));
      for (const k of REQUIRED) assert.ok(video[k] !== undefined && video[k] !== "", `video.json lacks ${k}`);
      const secs = sections(readFileSync(join(dir, "script.md"), "utf8"));
      const { default: scenes } = await import(pathToFileURL(join(dir, "scenes.js")).href);
      const keys = Object.keys(scenes);
      assert.deepEqual(keys.filter(k => !secs.has(k)), [], "scene export without a ## section in script.md");
      assert.deepEqual([...secs.keys()].filter(k => !keys.includes(k)), [], "## section without a scene export");
      for (const key of keys) {
        const ids = new Set([...scenes[key].toString().matchAll(/['"`]#([\w-]+)['"`]/g)].map(m => m[1]));
        for (const id of ids) assert.ok(secs.get(key).includes(`[#${id}]`), `cue #${id} in scene "${key}" is not [#${id}] in its section`);
      }
    });
  }
});

// node --test tools/media.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { embed, parseQueue, ROOT, ASSET_URL } from "./media.mjs";

test("queue: blank and comment lines are skipped, order kept", () => {
  assert.deepEqual(parseQueue("# top = next\n\nransomware\n  cloud \n#x\n"), ["ransomware", "cloud"]);
});

test("embed: once, before the first risk, EN/NL parity, release URLs", () => {
  const html = readFileSync(join(ROOT, "blast-radius", "index.html"), "utf8");
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

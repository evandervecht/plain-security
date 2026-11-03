# Briefing videos

One two-minute English explainer per briefing, made with [explainroo](https://github.com/vincentsch/explainroo)
(local Kokoro voice `af_heart`, speed 0.9, the look in `plain-look.json`). Nothing here runs on the site:
the rendered files are assets of the GitHub release `videos`, and a page links to them with a plain `<video>` tag.

- `media/<slug>/script.md`, `scenes.js`, `video.json`: the explainroo project for the briefing at `<slug>/`.
  `build/` and `out/` are explainroo's own output and stay out of git.
- `media/queue.txt`: the release order, top = next. Add a new slug at the end, or at the top to jump the queue.
- `tools/media.mjs`: `render` (voice, check, render, verify every queued slug that has no upload yet), `upload`
  (the mp4, vtt and cover as `<slug>.mp4` etc. on the release), `release` (the head of the queue onto its page,
  on a branch and a `chore(media)` PR), `status`. The hub runs `render` then `release` once a week.

A new briefing gets its project when the briefing is written (see AGENTS.md, "Video"): script first, then the
pictures, then `node <explainroo>/bin/explainroo.js check media/<slug>` until it is clean. The hub renders it.
Script rules: the briefing's own facts only, the advisory tone (suggest, consider, never "must" unless a law says
so), the board's question first, what good looks like with the named control (CIS, NIST CSF, ISO 27001), and one
suggested first step. English only; the Dutch page gets the same video with a Dutch caption line.

# Game project: instructions for Claude

This is a kid's game project (Leo's). It is a single static `index.html`. Vercel is connected to this GitHub repo and redeploys on every push to `main`. There is no build step.

## House rules
- Use the metric system for every measurement in the game text.
- Keep the game forgiving. Nobody likes dying; make mistakes cost time, not progress.
- Cosmetics (hats, jackets) need draw code, not just names.
- The whole game must fit an iPad screen (landscape 1024x768 and portrait 768x1024) with no page scroll for the main play screen, and must never zoom on tap. The starter's viewport meta tag and CSS already do this; keep them.
- All player-facing text is written in English in the code. Italian and Spanish come from the translation dictionary (see `tools/README.md`). After adding or changing text, update the translations.

## The DEPLOY command

When Leo (or anyone) says **DEPLOY** (any capitalisation), deploy **only the game in this repo**. Never touch, commit, or push any other project or repo, even if one is open in the session. Do exactly this:

1. Run `git status`. If there is nothing to commit and nothing unpushed, say "Nothing new to deploy" and stop.
2. Quick safety check: make sure `index.html` exists and its script parses (open it headlessly or run `node --check` on the extracted script). If it is broken, do NOT push. Tell Leo in one friendly sentence what is wrong and offer to fix it.
3. `git add index.html README.md`, then commit with a short plain message describing what changed.
4. `git push origin main`. If rejected, fetch, rebase onto `origin/main`, and push again. Never force-push.
5. Reply in one or two short, upbeat sentences: it is pushed to GitHub, and Vercel will have it live in about a minute at the project's main Vercel address.

Keep the reply simple enough for a kid. Do not paste git output.

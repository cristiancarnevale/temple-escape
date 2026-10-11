# Game project: instructions for Claude

This is a kid's game project (Leo's). It is a single static `index.html`. Vercel is connected to this GitHub repo and redeploys on every push to `main`. There is no build step.

## House rules
- Use the metric system for every measurement in the game text.
- Keep the game forgiving. Nobody likes dying; make mistakes cost time, not progress.
- Cosmetics (hats, jackets) need draw code, not just names.
- The whole game must fit an iPad screen (landscape 1024x768 and portrait 768x1024) with no page scroll for the main play screen, and must never zoom on tap. The starter's viewport meta tag and CSS already do this; keep them.
- All player-facing text is written in English in the code. Italian and Spanish come from the translation dictionary (see `tools/README.md`). After adding or changing text, update the translations.

## The DEPLOY command

When Leo (or anyone) says **DEPLOY** (any capitalisation), deploy **this game and the Leo's Games menu site** (the `leos-games` repo, which Vercel serves as the one URL where Leo picks a game). Touch only these two repos. Never touch, commit, or push any other project or repo, even if one is open in the session. Do exactly this:

1. Run `git status` in this game repo. Also check whether the menu copy is behind: compare `index.html` with `/home/claude/games-hub/temple-escape/index.html` (if `/home/claude/games-hub` is missing, clone `https://github.com/cristiancarnevale/leos-games.git` there). If there is nothing to commit, nothing unpushed, and the menu copy is identical, say "Nothing new to deploy" and stop.
2. Quick safety check: make sure `index.html` exists and its script parses (open it headlessly or run `node --check` on the extracted script). If it is broken, do NOT push anything. Tell Leo in one friendly sentence what is wrong and offer to fix it.
3. In this game repo: `git add index.html README.md` (plus `tools/` if it changed and exists), commit with a short plain message describing what changed, then `git push origin main`. If rejected, fetch, rebase onto `origin/main`, and push again. Never force-push.
4. In the menu repo (`/home/claude/games-hub`): `git pull --rebase origin main`, copy this game's `index.html` to `temple-escape/index.html`, and if this game has no entry yet in the `GAMES` list in the menu `index.html`, add one that matches the existing entries. Then `git add -A`, commit with the same short message (for example "Update temple-escape in the menu site"), and `git push origin main` (fetch, rebase and push again if rejected; never force-push).
5. Reply in one or two short, upbeat sentences: the game and the menu are pushed to GitHub, and Vercel will have it live in about a minute at the menu's main Vercel address (not the long per-deploy address, which never changes).

Keep the reply simple enough for a kid. Do not paste git output.

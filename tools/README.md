# Translating the game (English, Italian, Spanish)

The game text lives in `index.html` in English. At runtime a dictionary (`window.__I18N_DATA`) turns every English piece into Italian or Spanish as it is shown, and the start card has the language picker.

To translate after writing or changing text:
1. `cd tools && npm i acorn` (once).
2. `node ext.js ../index.html` then `node units.js ../index.html` — makes `units.json`, a list of every English text piece.
3. Translate the pieces into `tr*.txt` files, one per line: `index¦italian¦spanish`.
   Keep names, HTML tags (`<b>`, `<i>`), and leading/trailing spaces in pieces that are joined to numbers.
4. `python3 build.py` then `python3 inject.py` — puts the dictionary into `index.html`.
5. Test each language: set `gameStarter.lang` in localStorage (key set in `engine.js`; rename it per game) to `it` or `es`, and look for leftover English.

Words the game builds from code (directions, colours) are listed in the `extra` block of `build.py`.

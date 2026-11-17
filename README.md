# ⚖️ COIN COURT

**AICS Circuit v. Being Broke**: a pixel-art mock trial where the Hack Club reviewer is the judge and our club argues (badly) for coins.

Made by AICS Circuit for the Hack Club **Vibes** workshop.

## How to play

1. Press **ALL RISE**.
2. Click the dialogue box (or press `Space`) to move the trial along.
3. When the defense makes its case, you rule on it: **I'LL ALLOW IT** or **OBJECTION!** (keys `1` / `2`).
4. At the end, deliver your final verdict. Good luck pressing deny.

Secrets: bang the gavel (click it or press `G`), boop the duck jurors, press `F` to pay respects, and open the dev tools when the console.log witness asks you to.

## Features

- Typewriter dialogue with a whole cast: Bailiff Duck, the defendant, Prosecutor Spreadsheet, and a jury of 12 ducks
- Exhibits A–D: Gerald the moth, the 2:47 AM photo, the STONKS chart, and our git history
- Witnesses that are lines of code: an if statement, an infinite loop, console.log, undefined, and a TODO comment
- Allow/Objection choices that award coins and aura, with flying coins, meme stamps, screen shake, and confetti
- A DENY button that runs away from you
- 15 achievements, a news ticker, and a final court record you can copy
- All pixel art is drawn in code (`makeSprites` in `script.js`), and every sound is generated with the Web Audio API, so there are no image or audio files

## Run it

It's plain HTML/CSS/JS with no build step. Open `index.html` in a browser, or deploy the repo with GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root).

## Files

- `index.html`: page structure
- `style.css`: all the styling (colors and fonts are at the top in `:root`)
- `script.js`: the trial script, sprites, sounds, and game logic (settings are at the top in `CONFIG`)

## How it was made

The base code was generated with AI (Claude) from my own prompt. My hand edits are in the `edits` commit:

1.
2.
3.
4.
5.

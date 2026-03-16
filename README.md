# CSAwesome Prep Coach

This repo now contains a minimal Chrome-compatible extension that injects a study coach panel into `csawesome2` on Runestone:

- Shows the current roadmap block directly inside CSAwesome.
- Tracks mastered blocks, checklist progress, streak, and milestone badges in local extension storage.
- Opens the matching CSAwesome table-of-contents entry for today’s target.
- Auto-advances to the next roadmap block after mastery if enabled.
- Extends the study plan from March 16, 2026 through the AP CSA exam on May 15, 2026.

## Files needed for local use

- `manifest.json`: MV3 extension manifest.
- `schedule.js`: student profile, milestones, and the full March 16 to May 15 roadmap.
- `content.js`: panel UI, storage, navigation, and achievement logic.
- `styles.css`: overlay styling.
- `icons/`: extension icons required by the manifest.

## Install locally

1. Download or clone this repo from GitHub.
2. Open Chrome and go to `chrome://extensions`.
3. Enable Developer mode.
4. Choose Load unpacked.
5. Select the local `AP-CSA-prep` folder you downloaded.
6. Open CSAwesome at `https://runestone.academy/ns/books/published/csawesome2/csawesome2.html`.

## Package for Chrome Web Store

Run:

```bash
python scripts/build_store_assets.py
```

That command generates:

- extension icons in `icons/`
- store screenshots in `store-assets/screenshots/`
- listing copy in `store-assets/cws-listing.md`
- upload zip in `dist/cws/CSAwesome-Prep-Coach-v0.1.1.zip`

## How the MVP works

The extension does not depend on Runestone internals. Instead, it reads the visible CSAwesome table of contents already present in the page and opens the matching topic by unit label such as `3.1`, `4.8`, or `5.1`.

That makes it a safer first version because:

- no login scraping is required
- no private Runestone APIs are assumed
- the roadmap can be edited by changing plain data in `schedule.js`

## Tailoring the plan

The current roadmap is tuned for this student profile:

- strong enough fundamentals to move fast
- clear gap in class design and encapsulation
- clear gap in arrays, ArrayLists, files, and 2D structures
- TJ-only stretch topics in inheritance and recursion

If you want to customize the plan, edit the `schedule` array in `schedule.js`:

- `startDate` and `endDate`: active date range
- `targets`: CSAwesome section labels to open from the page TOC
- `task`: what the student should do
- `tip`: the AP or TJ focus note
- `checklist`: lightweight mastery gate before clicking `Mark mastered`

## Good next upgrades

- Add an options page so the schedule can be edited without touching code.
- Detect real Runestone completion state for quizzes if you want automatic mastery instead of manual checkoff.
- Add a parent dashboard export so spreadsheet tracking becomes optional instead of primary.

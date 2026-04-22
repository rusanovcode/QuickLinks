# Quick Links

Quick Links is a Chrome/Chromium popup extension for keeping a compact set of important links one click away from the browser toolbar.

The project is intentionally small. It is not a full bookmark manager. The current goal is a fast, reliable launcher for a personal set of links.

## Current Features

- Save links manually
- Save the current active tab
- Organize links into collections
- Search by name, URL, or note
- Mark links as favorites
- Reorder links inside a collection with drag-and-drop
- Export the full state to JSON
- Import the full state from JSON
- Mirror links into browser bookmarks as a safety backup
- Check GitHub for updates using version comparison plus source fingerprint fallback

## Project Files

- `manifest.json`
  Extension metadata and permissions.

- `popup.html`
  Popup markup and styles.

- `popup.js`
  Module entrypoint and shared config exports.

- `popup-helpers.js`
  Shared URL, icon, i18n, and formatting helpers.

- `popup-platform.js`
  Promise wrappers around Chrome APIs and bookmark-backup primitives.

- `popup-state.js`
  State boot, normalization, migration, persistence, and backup sync.

- `popup-render.js`
  DOM caching and UI rendering.

- `popup-actions.js`
  Popup interactions, CRUD flows, import/export, toasts, and modal actions.

- `popup-update.js`
  GitHub update-check service.

- `PROJECT_CONTEXT.md`
  Fast orientation file for future sessions and contributors.

- `CHANGELOG.md`
  High-level history of important product changes.

- `ROADMAP.md`
  Current backlog and planned directions.

- `TEST_CHECKLIST.md`
  Manual verification steps after changes.

## Storage And Backup

Primary state is stored in `chrome.storage.local` under `quickLinksState`.

There are two backup layers:

- JSON export/import for the full rich state
- Browser bookmarks mirror under `Quick Links Menu Backup` for raw link recovery after reinstall

Important limitation:

- bookmark backup preserves links only
- JSON backup preserves collections, notes, favorites, and custom icons

## Install Locally

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click `Load unpacked`
4. Select the project folder that contains `manifest.json`

## Development Notes

- No framework
- No build step
- No automated tests
- Runtime logic is now split into small ES modules
- Most UI work still touches `popup.html` plus one or more `popup-*.js` files

If a future session needs fast orientation, start with `PROJECT_CONTEXT.md`.

# Project Context

This file exists to give a new session a fast technical map of the project without re-reading the whole codebase first.

## What The Project Is

Quick Links is a Chrome/Chromium popup extension for storing a compact list of important links and opening them quickly from the toolbar.

It is intentionally lightweight. The project is not a full bookmark manager like Raindrop or Workona. The current target is a fast launch surface for a limited personal set of links.

## Main Files And Responsibilities

- `manifest.json`
  Purpose: extension manifest, permissions, popup entrypoint, icon registration.
  Key details: uses `storage`, `unlimitedStorage`, `bookmarks`, `tabs`, and `favicon`.

- `popup.html`
  Purpose: full popup layout and styles.
  Contains:
  - search and collection filter
  - favorites toggle
  - quick-save-current-tab button
  - collection management modal
  - add/edit form
  - export/import controls
  - update modal
  - undo bar and toast

- `popup.js`
  Purpose: module entrypoint and shared config.
  Responsibilities:
  - exports constants and translations used across popup modules
  - dynamically loads popup modules
  - creates shared runtime context
  - boots the popup when the DOM is ready

- `popup-helpers.js`
  Purpose: pure helpers for URL normalization, icon fallback generation, formatting, theme lookup, and translations.

- `popup-platform.js`
  Purpose: promise-based wrappers around Chrome storage, tabs, and bookmarks APIs.

- `popup-state.js`
  Purpose: state boot, migration, normalization, persistence, bookmark backup sync, and restore.

- `popup-render.js`
  Purpose: DOM element caching plus all UI rendering.

- `popup-actions.js`
  Purpose: event binding and all user-triggered flows.
  Major areas:
  - link CRUD
  - collection CRUD
  - import/export
  - quick add current tab
  - drag-and-drop reorder
  - modal and toast handling

- `popup-update.js`
  Purpose: GitHub update check, source fingerprint comparison, and repository-open/download actions.

## Current Architecture

The extension is a single-page popup with plain JavaScript.

There is no framework, build step, bundler, or test runner.

The popup now loads `popup.js` as an ES module entrypoint. That entrypoint composes the runtime out of smaller modules with clear boundaries:

1. config and boot in `popup.js`
2. pure helpers in `popup-helpers.js`
3. browser API access in `popup-platform.js`
4. state lifecycle in `popup-state.js`
5. rendering in `popup-render.js`
6. user actions in `popup-actions.js`
7. GitHub update checks in `popup-update.js`

## Storage Strategy

Primary storage:

- `chrome.storage.local`
- key: `quickLinksState`

Legacy storage key:

- `quickLinks`

Secondary backup:

- Chrome bookmarks folder named `Quick Links Menu Backup`

Why this exists:

- uninstalling an extension wipes extension storage
- bookmark mirror preserves the raw links after reinstall
- JSON export preserves the full rich state

## Important Functional Areas

Boot and normalization:

- `loadAppState`
- `normalizeState`
- `migrateLegacyState`
- `createEmptyState`

Backup and restore:

- `syncBookmarksBackup`
- `restoreStateFromBookmarksBackup`
- `getBackupRootNode`
- `clearBookmarkChildren`

Rendering:

- `renderAll`
- `renderCollectionFilter`
- `renderCollectionManager`
- `renderLinks`

Link operations:

- `saveLink`
- `deleteLink`
- `restoreDeletedLink`
- `toggleFavorite`
- `handleDrop`

Quick actions:

- `quickAddCurrentTab`
- `fillFormFromCurrentTab`

Validation:

- `parseAndNormalizeUrl`
- `getSelectedIconPayload`

Update check:

- `checkForUpdates`
- `fetchRemoteManifest`
- `fetchRemoteFingerprint`
- `fetchLocalFingerprint`
- `compareVersions`

## Product Decisions Already Made

- Favicon loading no longer uses an external Google favicon endpoint.
- Browser bookmark backup is intentional and should stay unless replaced by a clearly better backup model.
- JSON import/export is required because bookmark backup does not preserve notes, custom icons, favorites, or collection metadata.
- Update check must not rely only on version string comparison. File fingerprint fallback exists because GitHub content may change without a version bump.

## Known Constraints

- No automated tests in the repository.
- The popup is still a single large HTML file.
- Runtime JS is now modular, but the popup remains fully client-side with no build step.
- Browser-bookmark backup stores links only, not full metadata.

## Safe Change Strategy

When changing this project, verify these flows manually:

1. install as unpacked extension
2. add a link manually
3. save current tab
4. edit and delete a link
5. undo delete
6. create, rename, and delete a collection
7. export JSON
8. import JSON
9. reload extension and confirm state survives
10. check update flow

## If A Future Session Needs Fast Orientation

Read in this order:

1. `PROJECT_CONTEXT.md`
2. `manifest.json`
3. `popup.js`
4. `popup-state.js`
5. `popup-actions.js`
6. `popup-render.js`
7. `popup.html`

That is enough to understand the project without doing a full exploratory pass first.

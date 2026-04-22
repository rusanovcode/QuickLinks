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
  Purpose: all runtime logic.
  Major areas:
  - state boot and migration
  - rendering
  - storage persistence
  - bookmark backup sync and restore
  - JSON import/export
  - current-tab capture
  - URL validation and normalization
  - update check against GitHub
  - collection and link CRUD

## Current Architecture

The extension is a single-page popup with plain JavaScript.

There is no framework, build step, bundler, or test runner.

The popup loads `popup.js`, which:

1. reads `chrome.storage.local`
2. migrates old data if needed
3. restores from bookmark backup if local state is missing
4. binds event handlers
5. renders the full UI from in-memory state

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

## Important Functional Areas In popup.js

Boot and normalization:

- `loadAppState`
- `normalizeState`
- `migrateLegacyState`
- `sanitizeStoredLink`

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
- The popup is still a single large HTML file and a single large JS file.
- The project is maintainable at this size, but future growth may justify splitting `popup.js` into modules.
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
4. `popup.html`

That is enough to understand the project without doing a full exploratory pass first.

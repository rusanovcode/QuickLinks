# Changelog

## 2.0.0

Major popup rewrite focused on reliability, recoverability, and scalability for a larger personal link set.

### Added

- Collections for grouping links
- Search by name, URL, and note
- Favorites
- Quick save of the current tab
- JSON export and import
- Browser-bookmark backup and restore path
- Project context documentation
- Manual test checklist
- Roadmap file

### Changed

- Popup UI reworked for search, collections, import/export, and management flows
- State model moved from a flat legacy array to a structured state object
- Update check now uses semver comparison plus file fingerprint fallback
- Favicon loading now uses Chrome's internal favicon support instead of an external Google endpoint
- URL validation and duplicate handling were tightened

### Fixed

- Version comparison bug that could report a stale GitHub build as up to date
- Data-loss risk after extension removal by adding bookmark backup and JSON export/import
- Legacy state migration path from the old `quickLinks` storage key

## 1.0.0

Initial popup-based quick-links extension.

### Included

- Manual link creation
- Edit and delete
- Drag-and-drop sorting
- Basic icon selection
- Theme and language toggle

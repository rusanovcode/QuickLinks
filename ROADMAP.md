# Roadmap

This file is intentionally short. It should describe what is worth doing next, not everything that could ever be done.

## Now

- Keep the current popup flow stable
- Validate the bookmark backup and restore flow across reinstall
- Clean up repository documentation
- Verify update-check behavior against real GitHub changes

## Next

- Split `popup.js` into smaller modules if the project keeps growing
- Add batch import from plain URL lists
- Add a dedicated restore flow from bookmark backup in the UI
- Improve keyboard navigation and accessibility for collection management and drag actions
- Add better duplicate-resolution behavior during import

## Later

- Optional per-collection sorting modes
- Optional archive state for old links
- Optional browser-context menu entry for saving the current page
- Optional lightweight tests for URL normalization and version comparison helpers

## Not Planned Right Now

- Full cloud sync
- Account system
- Multi-page application structure
- Replacing the popup with a complex dashboard

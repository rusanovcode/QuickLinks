# Test Checklist

Use this checklist after meaningful changes.

## Setup

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Reload the unpacked extension from the project folder

## Core Flows

1. Open the popup
2. Add a link manually
3. Save the current tab
4. Edit a link
5. Delete a link
6. Undo the delete
7. Mark and unmark a link as favorite
8. Search by name
9. Search by URL
10. Search by description

## Collections

1. Create a collection
2. Rename a collection
3. Set a different default collection
4. Move links by editing them into another collection
5. Delete a collection and confirm links are moved safely
6. Reorder links inside one collection

## Backup And Restore

1. Export JSON
2. Import the exported JSON back into the extension
3. Confirm notes, favorites, and custom icons survive JSON import
4. Confirm `Quick Links Menu Backup` exists in browser bookmarks
5. Confirm links inside the backup folder match the extension data

## Update Check

1. Open the update dialog
2. Run `Check updates`
3. Confirm no error is shown
4. If GitHub content changed, confirm the popup reports it correctly

## Regression Checks

1. Reload the extension
2. Reopen the popup
3. Confirm state is still present
4. Confirm theme and language settings are still present
5. Confirm there are no broken icons or empty list items

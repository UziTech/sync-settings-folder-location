# Sync Atom settings to a local folder

[![CI](https://github.com/UziTech/sync-settings-folder-location/workflows/CI/badge.svg)](https://github.com/UziTech/sync-settings-folder-location/actions)

Synchronize settings, keymaps, user styles, init script, snippets and installed packages across [Atom](https://atom.io) instances to local folder.

This may be useful for storing your backup in Google Drive or Dropbox.

## Installation

This is a service package for [Sync-Settings](https://atom.io/packages/sync-settings). You will need Sync-Settings installed for this package to do anything.

1. Install [Sync-Settings](https://atom.io/packages/sync-settings).
2. Install [Sync-Settings-folder-location](https://atom.io/packages/sync-settings-folder-location).
3. Go To the Sync-Settings [settings page](atom://config/packages/sync-settings).
4. Check `Use Other Backup Location`.
5. Run command `sync-settings:create-backup` to create the backup location.
6. Run command `sync-settings:backup` to backup your settings.

### How to sync to different folder paths on different machines

To allow different folder paths on different machines with the same backup you will have to prevent the `sync-settings-folder-location.folderPath` setting from being included in the backup.

1. Go to the `Sync-Settings` settings
2. Enter `sync-settings-folder-location.folderPath` into the Blacklisted Keys setting
   ![image](https://user-images.githubusercontent.com/97994/86014931-94e6ed00-b9e6-11ea-855e-d7a02a3b157e.png)

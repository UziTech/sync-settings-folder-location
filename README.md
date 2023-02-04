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
2. Enter `sync-settings-folder-location.folderPath` into the Disallowed Settings

   ![image](https://user-images.githubusercontent.com/97994/135786391-d53ce46b-0cfe-41ad-bfbf-946dcc22f9a9.png)

### Manual Process for Configuring [Sync-Settings-folder-location](https://github.com/UziTech/sync-settings-folder-location)

If the instructions in the Installation section don't work for some reason, do not despair! Rather, a manual edit of your config.cson file can add the support that you want. If you follow the above Installation instructions and an attempt to perform step 5 fails saying that you don't have a folder location configured, you can manually add it as follows.

1. Choose `Edit -> Config...` to open your config.cson file.
2. Look for the `sync-settings` section of the file which will have, at minimum, an entry used to enable `Sync-Settings-folder-location`. Something like this:
`"sync-settings":
  useOtherLocation: true`
3. Add the following new stanza below that stanza to specify your local folder where you wish to save backups to sync:

    "sync-settings-folder-location":
        folderPath: "YOUR_OS_SPECIFIC_PATH"

For example, for a Linux user, your entry might look like this:

    "sync-settings-folder-location":
        folderPath: "/home/user/sync-settings-folder"

...or on Windows:

    "sync-settings-folder-location":
        folderPath: "C:\sync-settings-folder"

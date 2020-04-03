---
id: index
title: "Home"
---

# SheetsCrossword

This is a plugin for completing crosswords from the Guardian newspaper collaboratively using Google Sheets

## Installation

- Ensure `clasp` is installed. If not, run `npm install @google/clasp -g`
- Ensure you've logged in to `clasp` and allowed it access to your Google Account: `clasp login`
- Create a folder for this repo (no we can't clone just yet):
  ```bash
  mkdir SheetsCrossword
  cd SheetsCrossword
  ```
- Create a new AppsScript project:
  ```bash
  clasp create --type Spreadsheet --title <TITLE>
  ```
- Delete the junk that `clasp` creates:
  ```bash
  rm appsscript.json
  ```
- Now you can pull!
  ```bash
  git init
  git remote add origin git@github.com:TMiguelT/SheetsCrossword.git
  git pull origin master
  ```
- Deploy to Google
  ```bash
  clasp push
  ```
- Open the script in Google:
  ```bash
  clasp open
  ```
- You can now test out the script using `Run → Test as add-on` in the menu
- You can now also publish the app within your own organization/account by following [these instructions](https://developers.google.com/gsuite/add-ons/how-tos/publishing-editor-addons),
  making sure that you select **Private** when creating your consent screen

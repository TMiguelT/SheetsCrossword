/**
 * Location for the entry point function
 */
import GuardianParser from "./parsers/guardian";
import XwordinfoParser from "./parsers/xwordinfo";
import CrosswordParser from "./parsers/parser";

const parsers: CrosswordParser[] = [
  new GuardianParser(),
  new XwordinfoParser(),
];

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();

  for (let parser of parsers)
    menu.addItem(parser.getMenuName(), parser.importFunction());

  menu.addToUi();
}

global.onOpen = onOpen;

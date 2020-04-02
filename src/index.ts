/**
 * Location for the entry point function
 */
import GuardianParser from "./parsers/guardian";
import CrosswordParser from "./parsers/parser";

const parsers: CrosswordParser[] = [new GuardianParser()];

function onOpen() {
  const menu = SpreadsheetApp.getUi().createAddonMenu();

  for (let parser of parsers)
    menu.addItem(parser.getMenuName(), parser.importFunction());

  menu.addToUi();
}

global.onOpen = onOpen;

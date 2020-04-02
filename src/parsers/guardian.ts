import { CrosswordPuzzle } from "../crosswordPuzzle";

declare global {
  const Cheerio: CheerioAPI;
}

import CrosswordParser from "./parser";

function loadCrossword(url: string) {
  const response = UrlFetchApp.fetch(url).getContentText();
  if (process.env.NODE_ENV !== "production") {
    console.log(response);
  }
  const $ = Cheerio.load(response);
  const attr = $(".js-crossword").attr("data-crossword-data");
  return JSON.parse(attr);
}

function parse(data: string): CrosswordPuzzle {
  // The guardian format is an HTML page
  const $ = Cheerio.load(data);
  const attr = $(".js-crossword").attr("data-crossword-data");
  const json = JSON.parse(attr);
  return {
    clues: json.entries.map((entry: any) => ({
      direction: entry.direction,
      start: {
        column: entry.position.x,
        row: entry.position.y,
      },
      text: entry.clue,
      number: entry.number,
    })),
    dimensions: json.dimensions,
    name: json.name,
  };
}

global.guardianParserEntry = () => {
  const ui = SpreadsheetApp.getUi();

  const result = ui.prompt(
    "Input the URL of the crossword you want to convert:",
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const text = result.getResponseText();
  if (button === ui.Button.OK) {
    try {
      const data = loadCrossword(text);
      return parse(data);
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        ui.alert("Crossword creation failed", e.message, ui.ButtonSet.OK);
      } else {
        throw e;
      }
    }
  }
};

export default class GuardianParser extends CrosswordParser {
  getMenuName(): string {
    return "Import Guardian Crossword";
  }

  importFunction(): string {
    return "guardianParserEntry";
  }
}

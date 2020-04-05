import { ClueDirection, CrosswordPuzzle } from "../crosswordPuzzle";
import generateCrossword from "../generate";
import CrosswordParser from "./parser";

declare global {
  const Cheerio: CheerioAPI;
}

function loadCrossword(url: string) {
  const response = UrlFetchApp.fetch(url).getContentText();
  const $ = Cheerio.load(response);
  const attr = $(".js-crossword").attr("data-crossword-data");
  return JSON.parse(attr);
}

export function parse(data: any): CrosswordPuzzle {
  // The guardian format is an HTML page
  return {
    clues: data.entries.map((entry: any) => ({
      direction:
        entry.direction == "across" ? ClueDirection.ACROSS : ClueDirection.DOWN,
      start: {
        column: entry.position.x,
        row: entry.position.y,
      },
      text: entry.clue,
      number: entry.number,
      length: entry.length,
      answer: entry.solution,
    })),
    dimensions: data.dimensions,
    name: data.name,
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
      const parsed = parse(data);
      generateCrossword(parsed);
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

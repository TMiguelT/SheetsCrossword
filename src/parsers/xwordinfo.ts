import CrosswordParser from "./parser";
import generateCrossword from "../generate";
import { Clue, CrosswordPuzzle, ClueDirection } from "../crosswordPuzzle";

function loadCrossword(url: string): CrosswordPuzzle {
  // We have the HTML URL, we need to find the JSON API URL
  const [base, query] = url.split("?");
  const jsonUrl = "https://www.xwordinfo.com/JSON/TrackData.aspx?" + query;
  const xwordData = UrlFetchApp.fetch(jsonUrl).getContentText();
  return parse(xwordData);
}

export function buildClues(
  clues: string[],
  map: number[],
  direction: ClueDirection
): Clue[] {
  const width = Math.sqrt(map.length);
  const output: Clue[] = [];

  for (let i = 0; i < map.length; i++) {
    const row = Math.floor(i / width);
    const col = i % width;
    const index = map[i];

    if (index < output.length)
      // Skip clues we've already seen
      continue;

    const [clueName, clueText, clueAnswer] = clues[index].split(":");
    const answer = clueAnswer.replace(/<\/?b>/g, "").trim();

    output.push({
      text: clueText.trim(),
      start: {
        row,
        column: col,
      },
      direction: direction,
      answer: answer,
      length: answer.length,
      number: parseInt(clueName.replace(/ (Across|Down)/, "")),
    });
  }

  return output;
}

export function parse(xwordData: any): CrosswordPuzzle {
  const width = Math.sqrt(xwordData.AcrossMap.length);

  return {
    dimensions: {
      cols: width,
      rows: width,
    },
    name: xwordData.Date,
    clues: buildClues(
      xwordData.Across,
      xwordData.AcrossMap,
      ClueDirection.ACROSS
    ).concat(buildClues(xwordData.Down, xwordData.DownMap, ClueDirection.DOWN)),
  };
}

global.xwordinfoParserEntry = () => {
  const ui = SpreadsheetApp.getUi();

  const result = ui.prompt(
    "Input Crossword URL",
    'Input the URL of the crossword you want to convert, e.g. "https://www.xwordinfo.com/Crossword?date=1/5/2020"',
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  const button = result.getSelectedButton();
  const text = result.getResponseText();
  if (button === ui.Button.OK) {
    try {
      const data = loadCrossword(text);
      generateCrossword(data);
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        ui.alert("Crossword creation failed", e.message, ui.ButtonSet.OK);
      } else {
        throw e;
      }
    }
  }
};

export default class XwordinfoParser extends CrosswordParser {
  getMenuName(): string {
    return "Import xwordinfo crossword";
  }

  importFunction(): string {
    return "xwordinfoParserEntry";
  }
}

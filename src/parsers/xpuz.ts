import Parser from "./parser";
import { Puzzle as XpuzPuzzle, Parsers } from "xpuz/lib/index";
import { Clue, ClueDirection, CrosswordPuzzle } from "../crosswordPuzzle";

function puzzleFromXPuz(xpus: XpuzPuzzle): CrosswordPuzzle {
  const across: { [key: string]: Partial<Clue> } = {};
  const down: { [key: string]: Partial<Clue> } = {};

  xpus.grid.forEach((el, i) => {
    el.forEach((cell, j) => {
      if (cell.across) {
        across[cell.accross] = {
          number: cell.accross,
          start: {
            row: i + 1,
            column: j + 1,
          },
          direction: ClueDirection.ACROSS,
        };
      }
      if (cell.down) {
        down[cell.down] = {
          number: cell.down,
          start: {
            row: i + 1,
            column: j + 1,
          },
          direction: ClueDirection.DOWN,
        };
      }
    });
  });

  for (let [key, value] of Object.entries(xpus.across)) {
    across[key].text = value;
  }

  for (let [key, value] of Object.entries(xpus.down)) {
    down[key].text = value;
  }

  const clues: Clue[] = [];
  for (let [key, value] of [
    ...Object.entries(down),
    ...Object.entries(across),
  ]) {
    clues.push(value as Clue);
  }

  return {
    dimensions: {
      rows: xpus.grid.length,
      cols: xpus.grid[0].length,
    },
    clues: clues,
    name: xpus.info.title,
  };
}

/**
 * Intermediate class for pulling in the xpus parsers, which include ipuz and puz format
 */
class XpuzParser extends Parser {
  getMenuName(): string {
    return "";
  }

  importFunction(): string {
    return "";
  }
}

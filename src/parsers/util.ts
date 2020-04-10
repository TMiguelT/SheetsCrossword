import { Parsers, Puzzle as XpuzPuzzle } from "xpuz";
import { Clue, ClueDirection, CrosswordPuzzle } from "../crosswordPuzzle";

declare class XpuzPuzzle {
  grid: any[][];
  across: { [key: number]: string };
  down: { [key: number]: string };
}

function puzzleFromXPuz(xpus: XpuzPuzzle): CrosswordPuzzle {
  const across: { [key: number]: Partial<Clue> } = {};
  const down: { [key: number]: Partial<Clue> } = {};

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

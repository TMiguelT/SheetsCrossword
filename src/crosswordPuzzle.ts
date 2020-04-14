/**
 * This module outlines general classes that define
 */
export interface CrosswordDimensions {
  rows: number;
  cols: number;
}

export interface CrosswordPosition {
  row: number;
  column: number;
}

export interface Clue {
  direction: ClueDirection;
  text: string;
  start: CrosswordPosition;
  length: number;
  answer: string;
  number: number;
}

export interface CrosswordPuzzle {
  name: string;
  dimensions: CrosswordDimensions;
  clues: Clue[];
}

export enum ClueDirection {
  ACROSS,
  DOWN,
}

export namespace ClueDirection {
  export function toString(clue: ClueDirection): string {
    if (clue == ClueDirection.ACROSS) {
      return "Across";
    } else if (clue == ClueDirection.DOWN) {
      return "Down";
    }
  }
}

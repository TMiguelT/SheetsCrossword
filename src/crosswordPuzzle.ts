/**
 * This module outlines general classes that define
 */

export interface CrosswordDimensions {
  rows: number;
  cols: number;
}

export enum ClueDirection {
  ACROSS,
  DOWN,
}

export interface CrosswordPosition {
  row: number;
  column: number;
}

export interface Clue {
  direction: ClueDirection;
  text: string;
  start: CrosswordPosition;
  answer: string;
  number: number;
}

export interface CrosswordPuzzle {
  name: string;
  dimensions: CrosswordDimensions;
  clues: Clue[];
}

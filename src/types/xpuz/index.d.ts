/**
 * Global typedefs
 */
declare namespace xpuz {
  /**
   * A single cell of a grid.
   * @property [isBlockCell] - true if this is a block cell (a black cell that
   * 	doesn't contain any part of the solution).
   * @property [cellNumber] - the clue number associated with this cell, if
   * 	any. If `isBlockCell` is true, this property is meaningless and should be absent.
   * @property [containingClues] - the clues that cover this cell. This should be
   * 	absent if `isBlockCell` is true.
   * @property [containingClues.across] - the across clue, if any, that covers this cell.
   * @property [containingClues.down] - the down clue, if any, that covers this cell.
   * @property [backgroundShape] - a string describing a shape, if any, that should be
   * 	displayed in the background of the cell (e.g. a circle). This should be absent if
   * 	`isBlockCell` is true.
   */
  type GridCell = {
    isBlockCell?: boolean;
    cellNumber?: number;
    containingClues?: {
      across?: number;
      down?: number;
    };
    backgroundShape?: string;
  };
  /**
   * A single cell of a grid as an immutable Map. Contains the same structure as {@link Types.GridCell},
   * but any collection is an Immutable collection.
   * @property [isBlockCell] - true if this is a block cell (a black cell that
   * 	doesn't contain any part of the solution).
   * @property [cellNumber] - the clue number associated with this cell, if
   * 	any. If `isBlockCell` is true, this property is meaningless and should be absent.
   * @property [containingClues] - the clues that cover this cell. This should be
   * 	absent if `isBlockCell` is true.
   * @property [containingClues.across] - the across clue, if any, that covers this cell.
   * @property [containingClues.down] - the down clue, if any, that covers this cell.
   * @property [backgroundShape] - a string describing a shape, if any, that should be
   * 	displayed in the background of the cell (e.g. a circle). This should be absent if
   * 	`isBlockCell` is true.
   */
  type ImmutableGridCell = external;
  /**
   * A crossword grid.
   */
  type Grid = Types.GridCell[][];
  /**
   * An immutable crossword grid.
   */
  type ImmutableGrid = external;
}
declare namespace Puzzle {
  /**
   * Info object
   * @property title - the title of the puzzle
   * @property author - the author of the puzzle
   * @property publisher - the publisher of the puzzle
   * @property copyright - the copyright of the puzzle
   * @property intro - the introductory text of the puzzle
   * @property difficulty - the difficulty level of the puzzle
   * @property formatExtra - any extra data for a specific file format
   * (e.g. .puz files have a version string)
   */
  type PuzzleInfo = {
    title: string;
    author: string;
    publisher: string;
    copyright: string;
    intro: string;
    difficulty: any;
    formatExtra: any;
  };
}

declare interface Puzzle extends PuzzleMixin {}

/**
 * Represents a puzzle object
 * @param args - the constructor args
 * @param args.grid - a two-dimensional array representing the puzzle grid
 * @param args.clues - a list of clues
 * 	for across and down, with each collection having the key as the clue number and the value as the clue
 * 	text (e.g. `{across: { 3: "some clue" }}`)
 * @param [args.userSolution] - the currently filled in guesses of the user stored with this
 * 	puzzle instance. Two dimensional array with the same dimensions as `grid`, where each cell is either a string
 * 	or `null` (for block cells)
 * @param [args.info] - information about the puzzle
 * @param [args.extensions] - extra, possibly implementation-specific information about the puzzle, such as timer
 * 	information
 */
declare class Puzzle implements PuzzleMixin {
  constructor(args: {
    grid: Types.Grid;
    clues: any;
    userSolution?: ?string[][];
    info?: PuzzleInfo;
    extensions?: any;
  });
  /**
   * The definition of the puzzle grid. It is represented as an array of rows, so
   * 	`grid[0]` is the first row of the puzzle.
   */
  grid: Types.GridCell[][];
  /**
   * Listing of clues for the puzzle
   * @property across - an object mapping clue numbers to clue texts for across clues
   * @property down - an object mapping clue numbers to clue texts for down clues
   */
  clues: {
    across: any;
    down: any;
  };
  /**
   * An object of various puzzle information, such as author, title, copyright, etc.
   * @property [title] - the title of the puzzle
   * @property [author] - the author of the puzzle
   * @property [publisher] - the publisher of the puzzle
   * @property [copyright] - the copyright text of the puzzle
   * @property [difficulty] - the difficulty level of the puzzle
   * @property [intro] - the introductory text of the puzzle
   * @property [formatExtra] - any additional format-specific data
   */
  info: {
    title?: string;
    author?: string;
    publisher?: string;
    copyright?: string;
    difficulty?: any;
    intro?: string;
    formatExtra?: any;
  };
  /**
   * A structure representing the current solution as the user has filled it out.
   * 	The structure is similar to {@link Puzzle#grid|grid}, but
   * 	each item is a string containing the user's current answer--an empty string
   * 	if the corresponding grid cell is not filled in, a non-empty string if it's
   * 	filled in.
   */
  userSolution: string[][];
  /**
   * A collection of extra, possibly implementation-dependent data about the puzzle,
   * such as timer information.
   */
  extensions: any;
  /**
   * Returns this puzzle as a plain Javascript object, suitable for serializing to JSON.
   * @returns object representation of this puzzle object
   */
  toJSON(): any;
  /**
   * Returns a deep copy of this puzzle.
   * @returns cloned Puzzle
   */
  clone(): Puzzle;
}

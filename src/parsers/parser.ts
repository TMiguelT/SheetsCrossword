import Menu = GoogleAppsScript.Base.Menu;

export default abstract class CrosswordParser {
  /**
   * Returns the name that should be used for the import button for this parser
   */
  abstract getMenuName(): string;

  /**
   * Returns the name of a function that will be called when the associated menu item is clicked, which should return
   * a puzzle
   */
  abstract importFunction(): string;

  // abstract addImportOption(menu: Menu): void
  // abstract parse(data: string): CrosswordPuzzle;
}

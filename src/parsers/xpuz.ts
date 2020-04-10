import Parser from "./parser";
import { Puzzle as XpuzPuzzle, Parsers } from "xpuz";
import { CrosswordPuzzle } from "../crosswordPuzzle";

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

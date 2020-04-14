import { parse as parseXWord } from "../src/parsers/xwordinfo";
import { parse as parseGuardian } from "../src/parsers/guardian";
import { readFileSync } from "fs";
import { assert } from "chai";

function readJson(path: string) {
  return JSON.parse(readFileSync(path, { encoding: "utf-8" }));
}

describe("xWordInfo parser", () => {
  it("should parse an xWordInfo crossword", () => {
    const data = readJson(__dirname + "/xWordInfo.json");
    const puzzle = parseXWord(data);

    assert.equal(puzzle.name, "2/15/1942");
    assert.equal(puzzle.dimensions.rows, 23);
    assert.equal(puzzle.dimensions.cols, 23);
    assert.equal(puzzle.clues.length, 84 * 2);
    assert.equal(puzzle.clues[0], {
      text: "Famous one-eyed general.",
      start: {
        row: 0,
        column: 0,
      },
      direction: 0,
      answer: "WAVELL",
      length: 6,
      number: 1,
    });
  });
});

describe("guardian parser", () => {
  it("should parse a Guardian crossword", () => {
    const data = readJson(__dirname + "/guardian.json");
    const puzzle = parseGuardian(data);

    assert.equal(puzzle.name, "Quick crossword No 15,568");
    assert.equal(puzzle.dimensions.rows, 13);
    assert.equal(puzzle.dimensions.cols, 13);
    assert.equal(puzzle.clues.length, 26);
    assert.deepEqual(puzzle.clues[0], {
      text: "Slit in the back of a jacket (4)",
      start: {
        row: 0,
        column: 0,
      },
      direction: 0,
      answer: "VENT",
      length: 4,
      number: 1,
    });
  });
});

describe("xpuz parser", () => {
  it("should parse an ipuz crossword", () => {
    const data = readJson(__dirname + "/example.ipuz");
    const puzzle = parseGuardian(data);

    assert.equal(puzzle.name, "Quick crossword No 15,568");
    assert.equal(puzzle.dimensions.rows, 13);
    assert.equal(puzzle.dimensions.cols, 13);
    assert.equal(puzzle.clues.length, 26);
    assert.deepEqual(puzzle.clues[0], {
      text: "Slit in the back of a jacket (4)",
      start: {
        row: 0,
        column: 0,
      },
      direction: 0,
      answer: "VENT",
      length: 4,
      number: 1,
    });
  });
});

let crossData;

/**
 * Hooks
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Crossword")
    .addItem("Add Guardian Crossword", "showPrompt")
    .addToUi();
}

function onEdit(e) {
  const range = e.range;
}

function showPrompt() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.prompt(
    "Input the URL of the crossword you want to convert:",
    ui.ButtonSet.OK_CANCEL
  );

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button === ui.Button.OK) {
    try {
      const data = loadCrossword(text);
      addToSheet(data);
      // Store data for future hooks
      crossData = data;
    } catch (e) {
      ui.alert("Crossword creation failed", e.message, ui.ButtonSet.OK);
    }
  }
}

function addToSheet(crossData) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const ss = spreadsheet.getActiveSheet();
  spreadsheet.setName(crossData.name);
  ss.setName(crossData.name);

  const crossRange = ss.getRange(
    1,
    1,
    crossData.dimensions.rows,
    crossData.dimensions.cols
  );

  formatCrosswordArea(ss, crossData.dimensions.rows, crossData.dimensions.cols);

  [acrossClues, downClues] = insertClueSquares(ss, crossData.entries);

  // Build the clue text
  insertClueText(ss, acrossClues, 1, 1 + crossData.dimensions.cols, "Across");
  insertClueText(ss, downClues, 1, 2 + crossData.dimensions.cols, "Down");
}

function loadCrossword(url) {
  var response = UrlFetchApp.fetch(url).getContentText();
  const $ = Cheerio.load(response);
  const attr = $(".js-crossword").attr("data-crossword-data");
  return JSON.parse(attr);
}

function formatCrosswordArea(ss, rows, cols) {
  const crossRange = ss.getRange(1, 1, cols, rows);
  // Resize the crossword
  ss.setColumnWidths(1, cols, 50);
  ss.setRowHeights(1, rows, 50);
  // Reformatting that affects the whole crossword
  crossRange.setBackground("black");
  crossRange.setHorizontalAlignment("center");
  crossRange.setVerticalAlignment("middle");
  crossRange.setFontSize(20);

  // Set cell borders
  // setBorder(top, left, bottom, right, vertical, horizontal)
  ss.getRange(1, 1, 1, cols).setBorder(true, null, null, null, null, null);
  ss.getRange(1, 1, rows, 1).setBorder(null, true, null, null, null, null);
  ss.getRange(rows, 1, 1, cols).setBorder(null, null, true, null, null, null);
  ss.getRange(1, cols, rows, 1).setBorder(null, null, null, true, null, null);
}

function rangeFromClue(ss, clue) {
  if (clue.direction === "across") {
    return ss.getRange(
      clue.position.y + 1,
      clue.position.x + 1,
      1,
      clue.length
    );
  } else {
    return ss.getRange(
      clue.position.y + 1,
      clue.position.x + 1,
      clue.length,
      1
    );
  }
}

function insertClueSquares(ss, entries) {
  // Keep track of clues for creating the clue text
  const downClues = [];
  const acrossClues = [];

  // Insert the crossword clues in the text
  for (let entry of entries) {
    let entryRange = rangeFromClue(ss, entry);
    let firstCell = entryRange.getCell(1, 1);

    if (entry.direction === "across") {
      acrossClues.push(entry);
    } else {
      downClues.push(entry);
    }

    // We have to combine the previous note and the current note in case this is both a
    // down and across clue
    const prevNote = firstCell.getNote();
    const newNote = entry.number + " " + entry.direction + ": " + entry.clue;
    let note;
    if (prevNote.length > 0) note = prevNote + "\n\n" + newNote;
    else note = newNote;

    firstCell.setNote(note);
    firstCell.setValue(entry.number);

    entryRange.setBackground("white");
  }

  return [acrossClues, downClues];
}

function insertClueText(ss, clues, startRow, startColumn, title) {
  let clueX = startColumn;
  let clueY = startRow;

  const rules = ss.getConditionalFormatRules();

  // Make the title row
  ss.getRange(clueY++, clueX)
    .setValue(title)
    .setFontWeight("bold");

  // Make the clue rows
  for (let entry of clues) {
    let clueTextRange = ss.getRange(clueY++, clueX);
    let clueSquareRange = rangeFromClue(ss, entry);

    // Add the auto-update rule
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied(
          `= COUNTBLANK(${clueSquareRange.getA1Notation()}) = 0`
        )
        .setStrikethrough(true)
        .setRanges([clueTextRange])
        .build()
    );

    clueTextRange.setValue(entry.number + ": " + entry.clue);
  }
  ss.setConditionalFormatRules(rules);
  ss.autoResizeColumn(clueX);
}

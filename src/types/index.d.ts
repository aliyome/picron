type UNKNOWN = 0;
type CHECKED = 1; // is known to be checked
type EMPTY = -1; // is known to be empty
type Cell = CHECKED | UNKNOWN | EMPTY;
type Line = Cell[];
type Content = Line[]; // row lines
type LineHint = number[];
type Hint = LineHint[];

/**
 *  ____col1,col2,col3
 *  row1
 *  row2
 *  row3
 */
interface PuzzleData {
  rows: Hint;
  columns: Hint;
  content?: Content;
}

interface Puzzle {
  width: number;
  height: number;
  hint: {
    rows: Hint;
    columns: Hint;
  };
  originalContent: Content;
  state: Cell[];
}

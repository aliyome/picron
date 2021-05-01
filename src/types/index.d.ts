type CellUnknown = 0;
type CellChecked = 1; // is known to be checked
type CellEmpty = -1; // is known to be empty

type Cell = CellUnknown | CellChecked | CellEmpty;

/**
 *  ?✓?
 *  ✓✗✓
 *  ✓?✓
 *
 * [
 *  [0, 1, 0],
 *  [1, -1, 1],
 *  [1, 0, 1],
 * ]
 */
type Content = Cell[][];

interface Line {
  get(i: number): Cell;
  set(i: number, value: Cell): void;
  length(): number;
  hint(): LineHint;
}

type LineHint = number[];
type Hint = LineHint[];

/**
 *  ____col1,col2,col3
 *  row1
 *  row2
 *  row3
 */
interface PuzzleData {
  /**
   *    3 12
   *       0
   * 1  5  2
   *
   * [
   *  [3, 12],
   *  [0],
   *  [1, 5, 2]
   * ]
   */
  rows: Hint;

  /**
   *      1
   * 3    5
   * 12 0 2
   *
   * [
   *  [3, 12],
   *  [0],
   *  [1, 5, 2]
   * ]
   */
  columns: Hint;

  content?: Content;
}

type Puzzle = Readonly<{
  width: number;
  height: number;
  hint: {
    rows: Hint;
    columns: Hint;
  };
  state: Content;
  originalContent?: Content;
}>;

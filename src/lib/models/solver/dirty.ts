import { cellType } from '../../helpers/const';
import { isValidable } from '../line';
import { rowGetter, columnGetter, drawState } from '../puzzle';

const getNextStep = (x: number, y: number, width: number) => {
  const nextX = (x + 1) % width;
  const nextY = y + (x + 1 === width ? 1 : 0);
  return { nextX, nextY };
};

const verify = (row: Line, column: Line, x: number, y: number) => {
  return isValidable(row, x) && isValidable(column, y);
};

const makeSolver = (puzzle: Puzzle) => {
  const getRow = rowGetter(puzzle);
  const getColumn = columnGetter(puzzle);

  const solve = (x: number, y: number) => {
    if (y >= puzzle.height) return true;
    const { nextX, nextY } = getNextStep(x, y, puzzle.width);
    const row = getRow(y);
    const column = getColumn(x);

    row.set(x, cellType.Checked);
    if (verify(row, column, x, y) && solve(nextX, nextY)) {
      return true;
    }

    row.set(x, cellType.Empty);
    if (verify(row, column, x, y) && solve(nextX, nextY)) {
      return true;
    }

    return false;
  };
  return { solve };
};

export const solve = (puzzle: Puzzle): boolean => {
  const solver = makeSolver(puzzle);
  const solved = solver.solve(0, 0);
  return solved;
};

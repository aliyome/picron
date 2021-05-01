import { get } from 'svelte/store';
import { sum } from '../helpers/array';
import { cellType } from '../helpers/const';

const initLineHint = (hint: Hint): Hint =>
  hint.map((h) => (h.length === 1 && h[0] === 0 ? [] : [...h]));

const isValidHint = (rows: Hint, columns: Hint) => sum(rows.map(sum)) === sum(columns.map(sum));

const isValidContent = (content: Content, width: number, height: number) =>
  content.length === height && content.every((line) => line.length === width);

const initState = (width: number, height: number, content?: Content): Content => {
  const state: Content = new Array(height)
    .fill(null)
    .map(() => new Array(width).fill(cellType.Unknown));

  if (!content) {
    return state;
  }

  content.forEach((rows, y) => {
    rows.forEach((val, x) => {
      state[y][x] = val;
    });
  });
  return state;
};

export const rowGetter = (puzzle: Puzzle) => (y: number): Line => {
  return {
    get(i: number): Cell {
      return puzzle.state[y][i];
    },
    set(i: number, value: Cell): void {
      puzzle.state[y][i] = value;
    },
    length(): number {
      return puzzle.width;
    },
    hint(): LineHint {
      return puzzle.hint.rows[y];
    },
  };
};

export const columnGetter = (puzzle: Puzzle) => (x: number): Line => {
  return {
    get(i: number): Cell {
      return puzzle.state[i][x];
    },
    set(i: number, value: Cell): void {
      puzzle.state[i][x] = value;
    },
    length(): number {
      return puzzle.height;
    },
    hint(): LineHint {
      return puzzle.hint.columns[x];
    },
  };
};

export function init(data: PuzzleData): Puzzle {
  const width = data.columns.length;
  const height = data.rows.length;

  if (!isValidHint(data.rows, data.columns)) {
    throw new Error('hint is not valid');
  }
  if (data.content && !isValidContent(data.content, width, height)) {
    throw new Error('content is not valid');
  }

  return {
    width,
    height,
    hint: {
      rows: initLineHint(data.rows),
      columns: initLineHint(data.columns),
    },
    state: initState(width, height, data.content),
    originalContent: data.content,
  };
}

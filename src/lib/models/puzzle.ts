import { sum } from '../helpers/array';

const initLineHint = (hint: Hint): Hint =>
  hint.map((h) => (h.length === 1 && h[0] === 0 ? [] : [...h]));

const isValidHint = (rows: Hint, columns: Hint) => sum(rows.map(sum)) === sum(columns.map(sum));

const isValidContent = (content: Content, width: number, height: number) =>
  content.length === height && content.every((line) => line.length === width);

const initState = (data: PuzzleData) => {
  const width = data.columns.length;
  const state = new Array(data.columns.length * data.rows.length).fill(0 as UNKNOWN);
  if (!data.content) {
    return state;
  }
  data.content.forEach((rows, y) => {
    rows.forEach((val, x) => {
      state[y * width + x] = val;
    });
  });
  console.log(state);

  return state;
};

export const set = (puzzle: Puzzle) => (x: number, y: number, value: Cell) => {
  puzzle.state[y * puzzle.width + x] = value;
};

export const get = (puzzle: Puzzle) => (x: number, y: number): Cell => {
  return puzzle.state[y * puzzle.width + x];
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
    originalContent: data.content,
    state: initState(data),
  };
}

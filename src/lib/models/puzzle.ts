import { sum } from '../helpers/array';

const initLineHint = (hint: Hint): Hint =>
  hint.map((h) => (h.length === 1 && h[0] === 0 ? [] : [...h]));

const isValidHint = (rows: Hint, columns: Hint) => sum(rows.map(sum)) === sum(columns.map(sum));

const isValidContent = (content: Content, width: number, height: number) =>
  content.length === height && content.every((line) => line.length === width);

const initState = (width: number, height: number, content?: Content): Content => {
  const state: Content = new Array(height).fill(null).map(() => new Array(width).fill(0));

  if (!content) {
    return state;
  }
  content.forEach((rows, y) => {
    rows.forEach((val, x) => {
      state[y][x] = val;
    });
  });
  console.log(state);

  return state;
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

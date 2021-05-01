import { sum } from '../helpers/array';

const initLineHint = (hint: Hint): Hint =>
  hint.map((h) => (h.length === 1 && h[0] === 0 ? [] : [...h]));

const isValidHint = (rows: Hint, columns: Hint) => sum(rows.map(sum)) === sum(columns.map(sum));

export function init(data: PuzzleData): Puzzle {
  if (!isValidHint(data.rows, data.columns)) {
    throw new Error('hint is not valid');
  }

  return {
    width: data.columns.length,
    height: data.rows.length,
    hint: {
      rows: initLineHint(data.rows),
      columns: initLineHint(data.columns),
    },
    originalContent: data.content,
  };
}

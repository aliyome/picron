const initLineHint = (hint: Hint): Hint =>
  hint.map((h) => (h.length === 1 && h[0] === 0 ? [] : [...h]));

export function init(data: PuzzleData): Puzzle {
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

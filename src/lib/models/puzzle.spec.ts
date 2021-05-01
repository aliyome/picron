import { init } from './puzzle';

describe('init', () => {
  it('throws an error when data is invalid', () => {
    expect(() => init({ rows: [[0]], columns: [[1]] })).toThrow();
  });

  it('makes hint array blank when hint is [0]', () => {
    const puzzle = init({ rows: [[0], [1]], columns: [[1], [0]] });
    expect(puzzle.hint).toEqual({
      rows: [[], [1]],
      columns: [[1], []],
    });
  });
});

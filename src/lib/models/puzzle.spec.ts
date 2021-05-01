import { get, init, set } from './puzzle';

describe('init', () => {
  it('throws an error when data is invalid', () => {
    expect(() => init({ rows: [[0]], columns: [[1]] })).toThrow();
    expect(() => init({ rows: [[0]], columns: [[0]], content: [[0, 0]] })).toThrow();
  });

  it('makes hint array blank when hint is [0]', () => {
    expect(init({ rows: [[0], [1]], columns: [[1], [0]] }).hint).toEqual({
      rows: [[], [1]],
      columns: [[1], []],
    });
  });

  it('makes initial state', () => {
    expect(init({ rows: [[0], [0]], columns: [[0], [0]] }).state).toEqual([0, 0, 0, 0]);
    expect(
      init({
        rows: [[0], [0], [0]],
        columns: [[0], [0], [0]],
        content: [
          [-1, 0, -1],
          [0, 0, -1],
          [0, -1, 0],
        ],
      }).state,
    ).toEqual([-1, 0, -1, 0, 0, -1, 0, -1, 0]);
  });
});

describe('get/set', () => {
  const puzzle = { width: 2, height: 2, state: [-1, 0, 1, 0] } as Puzzle;
  const getter = get(puzzle);
  const setter = set(puzzle);
  it('accesses puzzle state', () => {
    expect(getter(0, 0)).toBe(-1);
    expect(getter(1, 0)).toBe(0);
    setter(0, 0, 1);
    expect(getter(0, 0)).toBe(1);
  });
});

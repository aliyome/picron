import { columnGetter, init, rowGetter } from './puzzle';

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
    expect(init({ rows: [[0], [0]], columns: [[0], [0]] }).state).toEqual([
      [0, 0],
      [0, 0],
    ]);
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
    ).toEqual([
      [-1, 0, -1],
      [0, 0, -1],
      [0, -1, 0],
    ]);
  });
});

describe('get/set', () => {
  const puzzle = {
    width: 3,
    height: 2,
    state: [
      [-1, 0, 0],
      [1, 0, 1],
    ],
    hint: {
      rows: [
        [1, 0],
        [0, 1],
      ],
      columns: [
        [1, 1],
        [0, 0],
        [-1, -1],
      ],
    },
  } as Puzzle;
  const getColumn = columnGetter(puzzle);
  const getRow = rowGetter(puzzle);
  it('accesses puzzle state by column', () => {
    expect(getColumn(0).length()).toBe(2);
    expect(getColumn(0).get(0)).toBe(-1);
    expect(getColumn(0).get(1)).toBe(1);
    expect(getColumn(2).get(1)).toBe(1);
    expect(getColumn(2).hint()).toEqual([-1, -1]);
  });
  it('accesses puzzle state by row', () => {
    expect(getRow(0).length()).toBe(3);
    expect(getRow(0).get(0)).toBe(-1);
    expect(getRow(0).get(1)).toBe(0);
    expect(getRow(1).get(2)).toBe(1);
    expect(getRow(1).hint()).toEqual([0, 1]);
  });
});

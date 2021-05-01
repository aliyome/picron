import { init } from '../puzzle';
import { solve } from './dirty';

describe('dirty solver', () => {
  it('can solve', () => {
    const puzzle = init({ columns: [[0], [1]], rows: [[1], [0]] });
    expect(solve(puzzle)).toBeTruthy();
  });

  it('can solve 3x3', () => {
    const puzzle = init({ columns: [[0], [1], [1]], rows: [[1], [1], [0]] });
    expect(solve(puzzle)).toBeTruthy();
  });
  it('cannot solve', () => {
    const puzzle: Puzzle = {
      width: 3,
      height: 3,
      hint: { columns: [[], [1], [1]], rows: [[1], [1], [1]] },
      state: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
    expect(solve(puzzle)).toBeFalsy();
  });
});

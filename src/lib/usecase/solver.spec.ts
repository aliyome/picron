import { solve } from './solver';

describe('solve', () => {
  describe('1x1', () => {
    it('can solve', () => {
      expect(solve({ top: [[1]], left: [[1]] })).toBeTruthy();
      expect(solve({ top: [[0]], left: [[0]] })).toBeTruthy();
    });
    it('cannot solve', () => {
      expect(solve({ top: [[1]], left: [[0]] })).toBeFalsy();
      expect(solve({ top: [[0]], left: [[1]] })).toBeFalsy();
    });
  });

  describe('3x3', () => {
    it('can solve', () => {
      expect(
        solve({
          top: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
          ],
          left: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
          ],
        }),
      ).toBeTruthy();
    });
    expect(
      solve({
        top: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 1, 1],
        ],
        left: [
          [1, 0, 0],
          [0, 1, 1],
          [0, 0, 1],
        ],
      }),
    ).toBeTruthy();
  });
});

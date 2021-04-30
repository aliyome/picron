import { solve } from './solver';

describe('solve', () => {
  describe('1x1', () => {
    it('can solve', () => {
      expect(solve([[1]], [[1]])).toBeTruthy();
      expect(solve([[0]], [[0]])).toBeTruthy();
    });
    it('cannot solve', () => {
      expect(solve([[1]], [[0]])).toBeFalsy();
      expect(solve([[0]], [[1]])).toBeFalsy();
    });
  });
});

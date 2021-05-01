import { cellType } from '../helpers/const';
import { isValid, isValidable, makeLine } from './line';

describe('Line isValid', () => {
  describe('[0]', () => {
    const line = makeLine(1, []);
    it('valid', () => {
      line.set(0, cellType.Empty);
      expect(isValid(line)).toBeTruthy();
    });
    it('invalid', () => {
      line.set(0, cellType.Checked);
      expect(isValid(line)).toBeFalsy();
    });
  });

  describe('[1]', () => {
    const line = makeLine(1, [1]);
    it('valid', () => {
      line.set(0, cellType.Checked);
      expect(isValid(line)).toBeTruthy();
    });
    it('invalid', () => {
      line.set(0, cellType.Empty);
      expect(isValid(line)).toBeFalsy();
    });
  });

  describe('[0, 1, 1, 0, 1, 1, 1, 0, 1]', () => {
    it('valid', () => {
      const line = makeLine([0, 1, 1, 0, 1, 1, 1, 0, 1], [2, 3, 1]);
      expect(isValid(line)).toBeTruthy();
    });

    it('invalid', () => {
      const line = makeLine([0, 1, 1, 0, 1, 1, 1, 0, 1], [2, 4, 1]);
      expect(isValid(line)).toBeFalsy();
    });
  });
});

describe('Line isValidable', () => {
  describe('[0, 0, 1, 1, 0, 1, 0, 1, 0, 0]', () => {
    it('2 1 1 is valid', () => {
      const line = makeLine([0, 0, 1, 1, 0, 1, 0, 1, 0, 0], [2, 1, 1]);
      for (let i = 0; i < line.length(); i++) {
        expect(isValidable(line, i)).toBeTruthy();
      }
    });
    it('2 1 2 is invalid', () => {
      const line = makeLine([0, 0, 1, 1, 0, 1, 0, 1, 0, 0], [2, 1, 2]);
      expect(isValidable(line, 7)).toBeTruthy();
      expect(isValidable(line, 8)).toBeFalsy();
    });
    it('2 2 1 is invalid', () => {
      const line = makeLine([0, 0, 1, 1, 0, 1, 0, 1, 0, 0], [2, 2, 1]);
      expect(isValidable(line, 5)).toBeTruthy();
      expect(isValidable(line, 6)).toBeFalsy();
    });
  });
});

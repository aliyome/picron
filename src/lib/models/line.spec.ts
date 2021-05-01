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
    const setTestState = (line: Line) => {
      [0, 1, 1, 0, 1, 1, 1, 0, 1].forEach((value, i) => {
        line.set(i, value as Cell);
      });
    };
    it('valid', () => {
      const line = makeLine(9, [2, 3, 1]);
      setTestState(line);
      expect(isValid(line)).toBeTruthy();
    });

    it('invalid', () => {
      const line = makeLine(9, [2, 4, 1]);
      setTestState(line);
      expect(isValid(line)).toBeFalsy();
    });
  });
});

describe('Line isValidable', () => {
  describe('[0, 0, 1, 1, 0, 1, 0, 1, 0, 0]', () => {
    const setTestState = (line: Line) => {
      [0, 0, 1, 1, 0, 1, 0, 0, 0, 1].forEach((value, i) => {
        line.set(i, value as Cell);
      });
    };
    it('2 1 1 is valid', () => {
      const line = makeLine(10, [2, 1, 1]);
      setTestState(line);
      for (let i = 0; i < line.length(); i++) {
        expect(isValidable(line, i)).toBeTruthy();
      }
    });
    it('2 1 2 is invalid', () => {
      const line = makeLine(10, [2, 1, 2]);
      setTestState(line);
      expect(isValidable(line, 7)).toBeTruthy();
      expect(isValidable(line, 8)).toBeFalsy();
    });
    it('2 2 1 is invalid', () => {
      const line = makeLine(10, [2, 2, 1]);
      setTestState(line);
      expect(isValidable(line, 5)).toBeTruthy();
      expect(isValidable(line, 6)).toBeFalsy();
    });
  });
});

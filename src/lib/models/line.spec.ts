import { cellType } from '../helpers/const';
import { isValid, makeLine } from './line';

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
      line.state = [0, 1, 1, 0, 1, 1, 1, 0, 1];
      expect(isValid(line)).toBeFalsy();
    });
  });
});

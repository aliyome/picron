import { cellType } from '../helpers/const';
import { isValid, makeLine } from './line';

describe('Line isValid', () => {
  describe('1x1 [0]', () => {
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

  describe('1x1 [1]', () => {
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
});

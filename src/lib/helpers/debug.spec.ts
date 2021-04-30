import { drawHint } from './debug';

it('sample', () => {
  expect(drawHint({ top: [[0]], left: [[0]] })).toEqual(
    `
_0
0x`.trim(),
  );

  expect(drawHint({ top: [[0, 0], [1]], left: [[1, 1], [0]] })).toEqual(
    `
__0_
__01
11xx
_0xx`.trim(),
  );
});

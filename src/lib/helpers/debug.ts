import { range } from './array';

export const drawHint = ({ top, left }: Hint) => {
  const topDepth = top.map((x) => x.length).sort()[top.length - 1];
  const leftDepth = left.map((x) => x.length).sort()[left.length - 1];

  const result: string[][] = range(leftDepth + top.length).map((x) =>
    new Array(topDepth + left.length).fill('_'),
  );

  top.forEach((col, x) => {
    col.forEach((val, y) => {
      result[topDepth - col.length + y][leftDepth + x] = String(val);
    });
  });
  left.forEach((row, y) => {
    row.forEach((val, x) => {
      result[topDepth + y][leftDepth - row.length + x] = String(val);
    });
  });
  for (let x = leftDepth; x < leftDepth + top.length; x++) {
    for (let y = topDepth; y < topDepth + left.length; y++) {
      result[y][x] = 'x';
    }
  }

  return result.map((line) => line.join('')).join('\n');
};

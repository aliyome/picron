type Cell = 1 | 0;
export const solve = (x: number[][], y: number[][]) => {
  if (x[0][0] === 1 && y[0][0] === 1) {
    return true;
  }
  if (x[0][0] === 0 && y[0][0] === 0) {
    return true;
  }
  return false;
};

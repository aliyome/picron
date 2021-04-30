export const solve = ({ top: x, left: y }: Hint) => {
  if (x[0][0] === 1 && y[0][0] === 1) {
    return true;
  }
  if (x[0][0] === 0 && y[0][0] === 0) {
    return true;
  }
  return false;
};

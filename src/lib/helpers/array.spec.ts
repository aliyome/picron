import { sum } from './array';

it('accumulates an array', () => {
  expect(sum([1, 2, 3])).toBe(6);
  expect([[0]].map(sum) === [[0]].map(sum));
});

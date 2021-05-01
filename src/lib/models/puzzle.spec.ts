import { init } from './puzzle';

describe('init', () => {
  it('throws an error when data is invalid', () => {
    expect(() => init({ rows: [[0]], columns: [[1]] })).toThrow();
  });
});

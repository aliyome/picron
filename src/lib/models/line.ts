import { cellType } from '../helpers/const';

export const isValid = (line: Line): boolean => {
  const hint = line.hint();
  let hintIndex = 0;
  let acc = 0;
  let needGap = false;

  for (let i = 0; i < line.length(); i++) {
    // ヒントを使い切ったのにチェックが残っている場合はinvalid
    if (hint.length === hintIndex) {
      if (line.get(i) === cellType.Checked) {
        return false;
      }
    }

    if (line.get(i) === cellType.Checked) {
      acc++;
      if (needGap) {
        return false;
      }
    } else {
      acc = 0;
    }

    // ヒント通りなら次のヒントへ
    if (hint[hintIndex] === acc) {
      hintIndex++;
      needGap = true;
    } else {
      needGap = false;
    }
  }

  // ヒント使い切っているならvalid
  return hintIndex === hint.length;
};

export const makeLine = (size: number, hint: LineHint) => {
  const state = new Array(size).fill(cellType.Unknown);
  return {
    get(i: number): Cell {
      return state[i];
    },
    set(i: number, value: Cell): void {
      state[i] = value;
    },
    length(): number {
      return state.length;
    },
    hint(): LineHint {
      return hint;
    },
    state,
  };
};

import { sum } from '../helpers/array';
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

export const isValidable = (line: Line, till: number) => {
  const length = line.length();
  const hint = line.hint();
  let hintIndex = 0;
  let acc = 0;
  let needGap = false;

  for (let i = 0; i <= till; i++) {
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

    // 残りでヒントを使いきれるか？
    const restHints = hint.slice(hintIndex);
    const requiredCellCount = sum(restHints) + restHints.length - 1 + (needGap ? 1 : 0);
    if (acc + length - i - 1 < requiredCellCount) {
      return false;
    }
  }

  return true;
};

type DebugLine = Line & { state: Cell[] };
export function makeLine(values: Cell[], hint: LineHint): DebugLine;
export function makeLine(size: number, hint: LineHint): DebugLine;
export function makeLine(sizeOrValues: number | Cell[], hint: LineHint): DebugLine {
  let state: Cell[];
  if (Array.isArray(sizeOrValues)) {
    state = Array.from(sizeOrValues);
  } else {
    state = new Array(sizeOrValues).fill(cellType.Unknown);
  }
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

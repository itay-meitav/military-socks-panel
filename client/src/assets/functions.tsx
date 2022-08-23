type primitive = number | string | boolean;
type anyObj = {
  [key: string | number]: primitive;
};

type uniqCell = anyObj | primitive;

export function getUniq<T>(arr: T[], cb: (cell: T) => T | T[keyof T]) {
  return arr.filter((cell, i) => {
    const uniqBy = cb(cell);
    const firstOccuranceIndex = arr.findIndex((cell) => uniqBy == cb(cell));
    return i == firstOccuranceIndex;
  });
}

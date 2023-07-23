import { IItem } from '../structures/item';

export function getSortItemsByNumberFnc(
   property: keyof IItem
): (a: IItem, b: IItem) => number {
  return (itemA, itemB) => {
    if (itemA[property] > itemB[property]) {
      return 1;
    }
    if (itemA[property] < itemB[property]) {
      return -1;
    }
    return 0;
  };
}

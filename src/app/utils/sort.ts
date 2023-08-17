import { IItem } from '../structures/item';

export function getSortItemsByNumberFnc(
   property: keyof Pick<IItem, 'amount' | 'price' | 'tachometer'>
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

export function getSortItemsByDateFnc(
  property: keyof Pick<IItem, "date"> 
): (a: IItem, b: IItem) => number {
 return (itemA, itemB) => {
  if (itemA[property].getTime() > itemB[property].getTime()) {
    return -1;
  }
  return 1;
 };
}

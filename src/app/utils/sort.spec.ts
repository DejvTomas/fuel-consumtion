import { IItem } from '../structures/item';
import { getSortItemsByNumberFnc } from './sort';

describe('Sort', () => {
  const item1: IItem = {
        date: new Date(2023, 11, 6),
        tachometer: 4,
        price: 1,
        amount: 3,

  }
  const item2: IItem = {
    date: new Date(2023,8, 1),
    tachometer: 2,
    price: 2,
    amount: 1 ,
}
  const item3: IItem = {
    date: new Date(2023,10, 1),
    tachometer: 3,
    price: 3,
    amount: 2 ,
}

const items: IItem[] = [item1, item2, item3];


  it('should have proper return value', () => {
    expect(items.sort(getSortItemsByNumberFnc('tachometer'))).toEqual([item2, item3, item1]);
    expect(items.sort(getSortItemsByNumberFnc('price'))).toEqual([item1, item2, item3]);
    expect(items.sort(getSortItemsByNumberFnc('amount'))).toEqual([item2, item3, item1]);
  
  });
});

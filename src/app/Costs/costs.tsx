import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { toFixed } from '../utils/toFixed';
import { getSortItemsByNumberFnc } from '../utils/sort';

export interface ICostsProps {
  items: IItem[];
}

interface IPricePerKilometer {
  date: Date;
  price: number;
}

export function Costs({ items }: ICostsProps) {

  const totalPrice = useMemo<number>(() => {
    const total = items
      .map((item) => item.price * item.amount)
      .reduce((previous, current) => {
        return previous + current;
      }, 0);

    return total;
  }, [items]);

  const pricePerKilometer = useMemo<number>(() => {
    const kilometers = Math.max(...items.map((i) => i.tachometer));
    return totalPrice / kilometers;
  }, [items]);

  const pricesPerKilometer = useMemo<IPricePerKilometer[]>(() => {
   return items
      .sort(getSortItemsByNumberFnc('tachometer'))
      .map((item, index, array) => {
        if (index === 0) {
          return {
            date: item.date,
            price: 0,
          };
        }

        const kilometers = item.tachometer - array[index - 1].tachometer;

        return {
          date: item.date,
          price: (item.price * item.amount) / kilometers,
        };
      })
      .slice(1);

   
  }, [items]);

  return (
    <div>
      <div>Total Price: </div>
      <div>{toFixed(totalPrice)}</div>
      <div>Price Per Kilometer: </div>
      <div>{toFixed(pricePerKilometer)}</div>
      <div>Prices Per Kilometer: </div>
      <div>
        {pricesPerKilometer.map((item) => {
          return (
            <div>
              <div>{item.date.toLocaleDateString()}</div>
              <div>{toFixed(item.price)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

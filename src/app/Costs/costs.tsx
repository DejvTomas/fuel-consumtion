import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { toFixed } from '../utils/toFixed';

export interface ICostsProps {
  items: IItem[];
}

interface IAnalysis {
  totalPrice: number;
  totalLiters: number;
  totalKilometers: number;
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

  const pricesPerKilometer = items
    .sort((a, b) => {
      if (a.tachometer > b.tachometer) {
        return 1;
      }
      if (a.tachometer < b.tachometer) {
        return -1;
      }
      return 0;
    })
    .map((item, index, array) => {
      if (index === 0) {
        return {
          date: item.date,
          pricePerKilometer: 0,
        };
      }
      console.log('asdf');

      const kilometers = item.tachometer - array[index - 1].tachometer;

      return {
        date: item.date,
        pricePerKilometer: (item.price * item.amount) / kilometers,
      };
    })
    .slice(1);

  const pricesPerLiter = items.map((item) => {
    return { date: item.date, price: item.price };
  });

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
              <div>{toFixed(item.pricePerKilometer)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

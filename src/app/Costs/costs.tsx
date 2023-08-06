import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { toFixed } from '../utils/toFixed';
import { getSortItemsByNumberFnc } from '../utils/sort';
import { Box, Grid, Stack } from '@mui/material';
import { LocalGasStation, Speed, LegendToggle } from '@mui/icons-material';
import { Chart } from '../components/chart';
import { Counter } from '../components/counter';
import { DataTable } from '../components/dataTable/dataTable';
import { dateFormate } from '../utils/dateFormate';
import { Units } from '../utils/units';

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

  const avgPricePerLiter = useMemo<number>(() => {
    const totalAmount = items.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );

    return totalPrice / totalAmount;
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

        const periodKilometers = item.tachometer - array[index - 1].tachometer;
        const periodPrice = array[index - 1].price;

        return {
          date: item.date,
          price: (periodPrice * item.amount) / periodKilometers,
        };
      })
      .slice(1);
  }, [items]);

  // const avgConsumptionsPerDate = useMemo<IAVGConsumption[]>(() => {
  //   return items
  //     .sort(getSortItemsByNumberFnc('tachometer'))
  //     .map((item, index, array) => {
  //       if (index === 0) {
  //         return {
  //           date: item.date,
  //           avgPriceForLastPeriod: 0,
  //           totalAvgPricePerKilometer: 0,
  //         };
  //       }

  //       const kilometersPeriod = item.tachometer - array[index - 1].tachometer;

  //       const totalAmount =
  //         array.slice(1, index).reduce((previous, current) => {
  //           return previous + current.amount;
  //         }, 0) + item.amount;

  //       console.log(item.date, totalAmount, item.tachometer);

  //       return {
  //         date: item.date,
  //         avgPriceForLastPeriod: (item.amount / kilometersPeriod) * 100,
  //         totalAvgPricePerKilometer:
  //           (totalAmount / (item.tachometer - initialTachometer)) * 100,
  //       };
  //     })
  //     .slice(1);
  // }, [items]);

  return (
    <>
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
      <div>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Counter
                label="Total Price"
                icon={<LocalGasStation fontSize="large" color="primary" />}
              >
                {toFixed(totalPrice, undefined)}
              </Counter>
            </Grid>
            <Grid item xs={12} md={4}>
              <Counter
                label="Average Price"
                icon={<Speed fontSize="large" color="primary" />}
              >
                {toFixed(pricePerKilometer, 2, 'Kč/KM')}
              </Counter>
            </Grid>
            <Grid item xs={12} md={4}>
              <Counter
                label="Average Price per Liter"
                icon={<Speed fontSize="large" color="primary" />}
              >
                {toFixed(avgPricePerLiter, 2, 'Kč/L')}
              </Counter>
            </Grid>
          </Grid>

          {/* <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
        <Chart
          points={avgConsumptionsPerDate.map((a) => {
            return {
              label: dateFormate(a.date),
              value: toFixed(a.avgConsumptionForLastPeriod),
            };
          })}
          referenceValue={{
            label: `AVG ${toFixed(avgConsumption)} ${Units.LPer100KM}`,
            value: avgConsumption,
          }}
          height={300}
        />
      </Box> */}

          <DataTable
            columns={[
              {
                header: 'Date',
                valueGetter: (item) => dateFormate(item.date),
              },
              {
                header: 'Price per KM',
                valueGetter: (item) => toFixed(item.price, 2),
              },
              // {
              //   header: 'Total AVG Con.',
              //   valueGetter: (item) =>
              //     toFixed(item., 2, Units.LPer100KM),
              // },
            ]}
            items={pricesPerKilometer.reverse()}
          />
        </Stack>
      </div>
    </>
  );
}

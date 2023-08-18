import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { toFixed } from '../utils/toFixed';
import { getSortItemsByNumberFnc } from '../utils/sort';
import { Box, Grid, Stack } from '@mui/material';
import { LegendToggle, Functions } from '@mui/icons-material';
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

interface IAVGCost {
  date: Date;
  avgCostForLastPeriod: number;
  totalAvgCost: number;
}

export function Costs({ items }: ICostsProps) {
  const sortedItems = useMemo<IItem[]>(() => {
    return items.sort(getSortItemsByNumberFnc('tachometer')) || [];
  }, [items]);

  /** total price for already consumed fuel*/
  const totalConsumedPrice = useMemo<number>(() => {
    const totalPrices = sortedItems.map((item, index, array) => {
      if (index === 0) {
        return 0;
      }
      return array[index - 1].price * item.amount;
    });
    return totalPrices.reduce((previous, current) => {
      return previous + current;
    }, 0);
  }, [items]);

  const totalPrice = useMemo<number>(() => {
    return sortedItems
      .map((item) => item.price * item.amount)
      .reduce((previous, current) => {
        return previous + current;
      }, 0);
  }, [items]);

  const initialTachometer = sortedItems[0]?.tachometer || 0;

  const pricePerKilometer = useMemo<number>(() => {
    const kilometers = Math.max(...sortedItems.map((i) => i.tachometer));
    return totalConsumedPrice / (kilometers - initialTachometer);
  }, [items]);

  const avgPricePerLiter = useMemo<number>(() => {
    const totalAmount = items.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );

    return totalPrice / totalAmount;
  }, [items]);

  const pricesPerKilometer = useMemo<IPricePerKilometer[]>(() => {
    return sortedItems
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

  const avgCostsPerDate = useMemo<IAVGCost[]>(() => {
    return sortedItems
      .map((item, index, array) => {
        if (index === 0) {
          return {
            date: item.date,
            avgCostForLastPeriod: 0,
            totalAvgCost: 0,
          };
        }

        const periodKilometers = item.tachometer - array[index - 1].tachometer;
        const periodPrice = array[index - 1].price;

        const totalPriceUntilPeriod: number = array
          .slice(0, index + 1)
          .reduce((previous, current, index, array) => {
            if (index === array.length - 1) {
              return previous;
            }
            return previous + current.price * array[index + 1].amount;
          }, 0);
        return {
          date: item.date,
          avgCostForLastPeriod: (periodPrice * item.amount) / periodKilometers,
          totalAvgCost:
            totalPriceUntilPeriod / (item.tachometer - initialTachometer),
        };
      })
      .slice(1);
  }, [items]);

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Counter
            label="Total Price"
            icon={<Functions fontSize="large" color="primary" />}
          >
            {toFixed(totalPrice, 2, Units.KC)}
          </Counter>
        </Grid>
        <Grid item xs={12} md={4}>
          <Counter
            label="Average Price"
            icon={<LegendToggle fontSize="large" color="primary" />}
          >
            {toFixed(pricePerKilometer, 2, Units.PricePerKM)}
          </Counter>
        </Grid>
        <Grid item xs={12} md={4}>
          <Counter
            label="Average Price per Liter"
            icon={<LegendToggle fontSize="large" color="primary" />}
          >
            {toFixed(avgPricePerLiter, 2, Units.PricePerL)}
          </Counter>
        </Grid>
      </Grid>

      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
        <Chart
          points={pricesPerKilometer.map((a) => {
            return {
              label: dateFormate(a.date),
              value: parseFloat(toFixed(a.price)),
            };
          })}
          referenceValue={{
            label: `AVG ${toFixed(pricePerKilometer)} ${Units.KC}`,
            value: pricePerKilometer,
          }}
          height={300}
        />
      </Box>

      <DataTable
        columns={[
          {
            header: 'Date',
            valueGetter: (item) => dateFormate(item.date),
          },
          {
            header: 'Price per KM',
            valueGetter: (item) =>
              toFixed(item.avgCostForLastPeriod, 2, Units.PricePerKM),
          },
          {
            header: 'Total AVG Price',
            valueGetter: (item) =>
              toFixed(item.totalAvgCost, 2, Units.PricePerKM),
          },
        ]}
        items={avgCostsPerDate.reverse()}
      />
    </Stack>
  );
}

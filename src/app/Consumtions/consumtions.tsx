import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { toFixed } from '../utils/toFixed';
import { getSortItemsByNumberFnc } from '../utils/sort';
import { Counter } from '../components/counter';
import { LocalGasStation, Speed } from '@mui/icons-material';
import { Stack, Grid } from '@mui/material';
import { DataTable } from '../components/dataTable/dataTable';
import { Units } from '../utils/units';

export interface IConsumptionProps {
  items: IItem[];
}

interface IAVGConsumption {
  date: Date;
  avgConsumptionForLastPeriod: number;
  totalAvgConsumption: number;
}

export function Consumtions({ items }: IConsumptionProps) {
  const sortedItems = useMemo<IItem[]>(() => {
    return items.sort(getSortItemsByNumberFnc('tachometer')) || [];
  }, [items]);

  const initialTachometer = sortedItems[0]?.tachometer || 0;

  const totalConsumption = useMemo<number>(() => {
    return sortedItems.slice(1, items.length).reduce((previous, current) => {
      return previous + current.amount;
    }, 0);
  }, [items]);

  const totalKilometers =
    sortedItems[sortedItems.length - 1]?.tachometer - initialTachometer;

  const avgConsumption = (totalConsumption / totalKilometers) * 100;

  const avgConsumptionsPerDate = useMemo<IAVGConsumption[]>(() => {
    return sortedItems
      .map((item, index, array) => {
        if (index === 0) {
          return {
            date: item.date,
            avgConsumptionForLastPeriod: 0,
            totalAvgConsumption: 0,
          };
        }

        const kilometersPeriod = item.tachometer - array[index - 1].tachometer;

        const totalAmount =
          array.slice(1, index).reduce((previous, current) => {
            return previous + current.amount;
          }, 0) + item.amount;

        console.log(item.date, totalAmount, item.tachometer);

        return {
          date: item.date,
          avgConsumptionForLastPeriod: (item.amount / kilometersPeriod) * 100,
          totalAvgConsumption:
            (totalAmount / (item.tachometer - initialTachometer)) * 100,
        };
      })
      .slice(1);
  }, [items]);

  if (items.length < 2) {
    return <div>There should be at least two history items</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Counter label="Total consumption" icon={<LocalGasStation />}>
            {toFixed(totalConsumption, undefined, 'L')}
          </Counter>
        </Grid>
        <Grid item xs={12} md={4}>
          <Counter label="Total kilometers" icon={<Speed />}>
            {toFixed(totalKilometers, 0, 'KM')}
          </Counter>
        </Grid>
        <Grid item xs={12} md={4}>
          <Counter label="Average consumption" icon={<Speed />}>
            {toFixed(avgConsumption, 2, 'L/100 KM')}
          </Counter>
        </Grid>
      </Grid>

      <DataTable
        columns={[
          {
            header: 'Date',
            valueGetter: (item) => item.date.toLocaleDateString(),
          },
          {
            header: 'AVG Con.',
            valueGetter: (item) =>
              toFixed(item.avgConsumptionForLastPeriod, 2, Units.LPer100KM),
          },
          {
            header: 'Total AVG Con.',
            valueGetter: (item) =>
              toFixed(item.totalAvgConsumption, 2, Units.LPer100KM),
          },
        ]}
        items={avgConsumptionsPerDate.reverse()}
      />
    </div>
  );
}

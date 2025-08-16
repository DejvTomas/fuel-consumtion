import { useMemo } from 'react';
import { IItem } from '../structures/item';
import { formatNumber, toFixed } from '../utils/toFixed';
import { getSortItemsByNumberFnc } from '../utils/sort';
import { Counter } from '../components/counter';
import { LegendToggle, LocalGasStation, Speed } from '@mui/icons-material';
import { Stack, Grid, Box } from '@mui/material';
import { DataTable } from '../components/dataTable/dataTable';
import { Units } from '../utils/units';
import { Chart } from '../components/chart';
import { dateFormate } from '../utils/dateFormate';
import {
  getMissingIntervalsFilter,
  getMissingKilometers,
  getTotalMissingKilometers,
  isIdOfNewInterval,
  missingIntervals,
} from '../missingIntervals/missingInterval';

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
    return sortedItems
      .slice(1, items.length)
      .filter(getMissingIntervalsFilter())
      .reduce((previous, current) => {
        return previous + current.amount;
      }, 0);
  }, [items]);

  const totalKilometers =
    sortedItems[sortedItems.length - 1]?.tachometer -
    initialTachometer -
    getTotalMissingKilometers();

  const avgConsumption = (totalConsumption / totalKilometers) * 100;

  const avgConsumptionsPerDate = useMemo<IAVGConsumption[]>(() => {
    return sortedItems
      .map((item, index, array) => {
        if (isIdOfNewInterval(item.id)) {
          return undefined;
        }
        if (index === 0) {
          return {
            date: item.date,
            avgConsumptionForLastPeriod: 0,
            totalAvgConsumption: 0,
          };
        }

        const kilometersPeriod = item.tachometer - array[index - 1].tachometer;

        const totalAmount =
          array
            .slice(1, index)
            .filter(getMissingIntervalsFilter())
            .reduce((previous, current) => {
              return previous + current.amount;
            }, 0) + item.amount;

        return {
          date: item.date,
          avgConsumptionForLastPeriod: (item.amount / kilometersPeriod) * 100,
          totalAvgConsumption:
            (totalAmount /
              (item.tachometer -
                initialTachometer -
                getMissingKilometers(index, array, item.id))) *
            100,
        };
      })
      .slice(1)
      .filter((x) => x !== undefined) as IAVGConsumption[];
  }, [items]);

  if (items.length < 2) {
    return <div>There should be at least two history items</div>;
  }

  return (
    <div>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Counter
              label="Total consumption"
              icon={<LocalGasStation fontSize="large" color="primary" />}
            >
              {formatNumber(totalConsumption, 0, 'L')}
            </Counter>
          </Grid>
          <Grid item xs={12} md={4}>
            <Counter
              label="Total kilometers"
              icon={<Speed fontSize="large" color="primary" />}
            >
              {formatNumber(totalKilometers, 0, 'KM')}
            </Counter>
          </Grid>
          <Grid item xs={12} md={4}>
            <Counter
              label="Average consumption"
              icon={<LegendToggle fontSize="large" color="primary" />}
            >
              {formatNumber(avgConsumption, 2, 'L/100 KM')}
            </Counter>
          </Grid>
        </Grid>

        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Chart
            title="Avarage consumption"
            points={avgConsumptionsPerDate
              .filter((x) => x !== undefined)
              .map((a) => {
                return {
                  label: dateFormate(a!.date),
                  value: parseFloat(toFixed(a!.avgConsumptionForLastPeriod)),
                };
              })}
            referenceValue={{
              label: `AVG ${toFixed(avgConsumption)} ${Units.LPer100KM}`,
              value: avgConsumption,
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
      </Stack>
    </div>
  );
}

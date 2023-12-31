import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import { useMemo } from 'react';
import { Typography } from '@mui/material';

export interface IChartProps {
  title: string;
  points: { label: string; value: number }[];
  height: number;
  referenceValue?: { label: string; value: number };
}

export function Chart(props: IChartProps) {
  const maxValue = useMemo(() => {
    const absoluteMax = Math.max(...props.points.map((p) => p.value));
    return Math.ceil(absoluteMax);
  }, [props.points]);
  const minValue = useMemo(() => {
    const absoluteMin = Math.min(...props.points.map((p) => p.value));
    return Math.floor(absoluteMin);
  }, [props.points]);

  return (
    <div style={{ height: props.height }}>
      <Typography
        variant="subtitle1"
        align="center"
        color="primary"
        sx={{ padding: '5px 0', fontSize: '18px' }}
      >
        {props.title}
      </Typography>
      <div style={{ height: 'calc(100% - 45px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            height={props.height}
            data={props.points}
            margin={{
              top: 5,
              right: 20,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis domain={[minValue, maxValue]} />
            <Tooltip />
            {props.referenceValue && (
              <ReferenceLine
                y={props.referenceValue.value}
                label={{ value: props.referenceValue.label, dy: -10 }}
                stroke="red"
                strokeDasharray="15"
              />
            )}

            <Area
              type="monotone"
              dataKey="value"
              label={false}
              stroke="#1976d250"
              strokeWidth={3}
              fill="#47bbff2e"
              layout={'horizontal'}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import './counter.scss';
import { blue } from '@mui/material/colors';
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface ICounterProps {
  label: string;
  children: string;
  icon?: ReactNode;
}

export function Counter(props: ICounterProps) {
  return (
    <div className={'counter'} style={{ borderColor: blue[500] }}>
      <Stack direction="row" spacing={1} alignItems={'center'}>
        {props.icon}
        <Stack textAlign={'center'}>
          <Typography color="primary" variant="button">
            {props.label}
          </Typography>

          <Typography variant="button">{props.children}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}

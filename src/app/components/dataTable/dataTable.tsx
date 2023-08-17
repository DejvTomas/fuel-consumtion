import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ReactNode } from 'react';

export interface IDataTableProps<T extends object> {
  columns: IDataTableColumns<T>[];
  items: T[];
}

export enum ColumnType {
  Text,
  Action,
}

export interface IDataTableColumns<T extends object> {
  header: string;
  type?: ColumnType;
  valueGetter: (item: T) => string | number | ReactNode;
}

export function DataTable<T extends object>(props: IDataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {props.columns.map((column, key) => (
              <TableCell key={key}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.columns.map((column, key) => (
                <TableCell
                  key={key}
                  width={column.type === ColumnType.Action ? 25 : undefined}
                  sx={
                    column.type === ColumnType.Action
                      ? { padding: '3px' }
                      : undefined
                  }
                >
                  {column.valueGetter(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

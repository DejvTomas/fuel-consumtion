import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface IDataTableProps<T extends object> {
  columns: IDataTableColumns<T>[];
  items: T[];
}

export interface IDataTableColumns<T extends object> {
  header: string;
  valueGetter: (item: T) => string;
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
                <TableCell key={key}>{column.valueGetter(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

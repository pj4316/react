import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  format?: (value: any) => string;
}

export interface DataTableProp {
  title: string,
  columns: Column[],
  rows: any[],
}

export const DataTable = (prop: DataTableProp) => {
  return (<Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {prop.columns.map((column) => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {prop.rows
            .map((row) => {
              return (
                <TableRow tabIndex={-1} key={row.id}>
                  {prop.columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>{column.format ? column.format(value): value }</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>);
};

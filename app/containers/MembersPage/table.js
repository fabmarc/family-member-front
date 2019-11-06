import _ from 'lodash';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const TableWrapper = styled.div`
  max-height: 440,
  overflow: 'auto',
`;

const rowsPerPage = 25;
const rowsPerPageOptions = [rowsPerPage];

export function DataTable({
  rows,
  columns,
  pagination,
  onChangePage,
}) {
  const page = (pagination && pagination.page - 1) || 0;
  const totalRows = (rows && rows.length) || 0;
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <TableWrapper>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {_.map(columns, column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(rows, row => (
              <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                {_.map(columns, column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.render
                        ? column.render(value, column, row)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
      <TablePagination
        page={page}
        count={totalRows}
        component="div"
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={onChangePage}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  pagination: PropTypes.object,
  onChangePage: PropTypes.func,
};

export default memo(DataTable);

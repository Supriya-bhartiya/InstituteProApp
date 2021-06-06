import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table as TB,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  TableChart as TableChartIcon,
} from '@material-ui/icons';
import Dropdown from '../../../components/Dropdown';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '30px',
    boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
    '&:hover': {
      boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
      borderColor: theme.palette.primary.main,
    },
  },
  titleWrapper: {
    margin: theme.spacing(2, 0),
    paddingRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    height: theme.spacing(8),
  },
  search: {
    width: '30%',
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
    outline: 'none',
    '&:hover': {
      boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
    },
  },
  filter: {
    height: theme.spacing(8),
  },
  tableWrapper: {
    overflow: 'auto',
  },
  cell: {
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
}));

export default function Table({
  title,
  columns,
  rows,
  totalRows,
  onChange,
  onSearch,
  searchText,
  onFilterChange,
  filterList,
  filterText,
  rowsPerPageOptions,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onChange(newPage * rowsPerPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    onChange(0, +event.target.value);
  };

  const handleSearch = e => {
    setSearchKey(e.target.value);
  };

  const handleOnSearch = () => {
    onSearch(searchKey);
    setPage(0);
  };

  const handleFilterChange = (e, l) => {
    onFilterChange(e, l);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Grid container className={classes.titleWrapper}>
        <Grid item className={classes.title}>
          <IconButton>
            <TableChartIcon />
          </IconButton>
          {title || 'Table'}
        </Grid>
        {onSearch && (
          <OutlinedInput
            value={searchKey}
            onChange={handleSearch}
            className={classes.search}
            placeholder={searchText || 'Search'}
            endAdornment={
              <InputAdornment onClick={handleOnSearch} position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={0}
          />
        )}
        {filterList && onFilterChange && (
          <Dropdown
            text={filterText || 'Filter'}
            list={filterList}
            onChange={handleFilterChange}
            className={classes.filter}
          />
        )}
      </Grid>
      <div className={classes.tableWrapper}>
        <TB stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  classes={{ root: classes.cell }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id || row.sr}
                  >
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          classes={{ root: classes.cell }}
                        >
                          {(column.component && column.component(row)) ||
                            (column.format && typeof value === 'number'
                              ? column.format(value)
                              : value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </TB>
      </div>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions || [10, 25, 50, 100]}
        component="div"
        count={isNaN(Number(totalRows)) ? 0 : Number(totalRows)}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

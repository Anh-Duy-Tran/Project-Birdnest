import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { DroneContext } from '../contexts/DroneProvider';

function createData(serialNumber, distance, history) {
  return {
    serialNumber,
    distance : Number((distance / 1000).toFixed(2)),
    lastSeen : new Date(history.at(-1).timestamp).toUTCString(),
    history : history.map(
      instance => {
        const roundedCoord = {...instance.coord}
        Object.keys(roundedCoord).forEach(
          key => roundedCoord[key] = Number((roundedCoord[key] / 1000).toFixed(2))
        )

        return {
          ...instance,
          timestamp : new Date(instance.timestamp).toUTCString(),
          coord : roundedCoord,
          distance : Number((instance.distance / 1000).toFixed(2))
        };
      })
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'box',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'serialNumber',
    numeric: false,
    disablePadding: false,
    label: 'Serial number',
  },
  {
    id: 'lastSeen',
    numeric: false,
    disablePadding: false,
    label: 'Last violation',
  },
  {
    id: 'distance',
    numeric: true,
    disablePadding: false,
    label: 'Closest distance (meter)',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.serialNumber}
        </TableCell>
        <TableCell align="right">{row.lastSeen}</TableCell>
        <TableCell align="right">{row.distance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Position (meter)</TableCell>
                    <TableCell align="right">Distance (meter)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.timestamp}>
                      <TableCell component="th" scope="row">
                        {historyRow.timestamp}
                      </TableCell>
                      <TableCell align="right">{`(x : ${historyRow.coord.x}, y : ${historyRow.coord.y})`}</TableCell>
                      <TableCell align="right">{historyRow.distance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DroneTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('serialNumber');
  const [selected, setSelected] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [ state, dispatch ] = React.useContext(DroneContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = state.violations !== null
    ? state.violations.map(
        drone => createData(drone.serialNumber, drone.closestDistance, drone.history))
    : []

  return (
    <Paper sx={{overflow : "auto"}}>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
          />
          <TableBody>
            {
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row key={row.serialNumber} row={row} />
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{marginTop : "auto"}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
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
import { DroneContext } from '../contexts/DroneProvider';

function createData(serialNumber, distance, history) {
  return {
    serialNumber,
    distance : Number((distance / 1000).toFixed(2)),
    lastSeen : new Date(history.at(-1).timestamp).toUTCString(),
    history : history.map(drone => {
      const roundedCoord = {...drone.coord}
      
      Object.keys(roundedCoord).forEach(
        key => roundedCoord[key] = Number((roundedCoord[key] / 1000).toFixed(2))
      )
      return {...drone, coord : roundedCoord};
    })
  };
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
                    <TableCell>Position (meter)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.timestamp}>
                      <TableCell component="th" scope="row">
                        {historyRow.timestamp}
                      </TableCell>
                      <TableCell>{`(x : ${historyRow.coord.x}, y : ${historyRow.coord.y})`}</TableCell>
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [ state, dispatch ] = React.useContext(DroneContext);

  const rows = state.violations !== null
    ? state.violations.map(
      drone => createData(drone.serialNumber, drone.closestDistance, drone.history)
    )
    : []

  return (
    <Paper sx={{overflow : "auto"}}>
      <TableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Serial number</TableCell>
              <TableCell align="right">Last violation</TableCell>
              <TableCell align="right">Closest distance (meter)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
              <Row key={row.serialNumber} row={row} />
            ))}
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
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DroneContext } from '../contexts/DroneProvider';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DroneDialog({ open }) {
  
  const [ state, dispatch ] = React.useContext(DroneContext);

  const handleClose = () => {
    dispatch({ type : "close-drone-dialog" });
  }

  const drone = state.droneDialog;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{overflow : "auto" }}
      >
      {
        open
        ? <>
          <BootstrapDialogTitle onClose={handleClose}>
            {drone.serialNumber}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <h3>Drone Info:</h3>
            
            <div>
              <Typography gutterBottom>
                Firmware: {drone.firmware}
              </Typography>

              <Typography gutterBottom>
                ipv4: {drone.ipv4}
              </Typography>

              <Typography gutterBottom>
                ipv6: {drone.ipv6}
              </Typography>

              <Typography gutterBottom>
                mac: {drone.mac}
              </Typography>

              <Typography gutterBottom>
                Manufacturer: {drone.manufacturer}
              </Typography>
            </div>

          </DialogContent>
        </>
        : null
      }
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

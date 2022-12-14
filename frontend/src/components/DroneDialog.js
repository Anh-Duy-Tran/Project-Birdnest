import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { DroneContext } from '../contexts/DroneProvider';

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
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function DroneDialog({ open }) {
  
  const [ state, dispatch ] = React.useContext(DroneContext);

  const handleClose = () => {
    dispatch({ type : "close-drone-dialog" });
  }

  const drone = state.droneDialog;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="drone-dialog-title"
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
            <h3>Drone information:</h3>
            
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
      </Dialog>
    </div>
  );
}

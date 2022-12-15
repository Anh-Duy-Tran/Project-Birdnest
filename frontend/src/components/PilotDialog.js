import * as React from 'react';
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
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function PilotDialog() {
  
  const [ state, dispatch ] = React.useContext(DroneContext);

  const handleClose = () => {
    dispatch({ type : "close-pilot-dialog" });
  }

  const pilot = state.pilotDialog;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="pilot-dialog-title"
        open={state.pilotDialog !== null}
        sx={{overflow : "auto"}}
      >
      {
        pilot !== null && pilot !== undefined
        ? <>
          <BootstrapDialogTitle onClose={handleClose}>
            {pilot.pilotId}
          </BootstrapDialogTitle>
          <DialogContent dividers>
          
          <h3>Pilot information:</h3>
            
          <div>
            <Typography gutterBottom>
              Pilot ID: {pilot.pilotId}
            </Typography>

            <Typography gutterBottom>
              First name: {pilot.firstName}
            </Typography>

            <Typography gutterBottom>
              Last name: {pilot.lastName}
            </Typography>

            <Typography gutterBottom>
              Email: {pilot.email}
            </Typography>

            <Typography gutterBottom>
              Created date: {new Date(pilot.createdDt).toLocaleString()}
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { DroneContext } from '../contexts/DroneProvider';

const DroneStack = () => {
  const [ state, dispatch ] = React.useContext(DroneContext);
  
  const onClick = (drone) => {
    dispatch({type : "open-drone-dialog", payload : drone});
  }
  
  return (
    <Box sx={{ width: '100%', overflow: 'auto'}}>
      <h2>Violate Drones</h2>
      <Stack spacing={2}>
        {
          state.violations !== null
          ? Object
              .keys(state.violations)
              .sort((a, b) => Number(state.violations[a]["closestDistance"]) - Number(state.violations[b]["closestDistance"]))
              .map(
            key => {
              const serialNumber = state.violations[key]["serialNumber"];
              const closetDistance = state.violations[key]["closestDistance"];
              console.log(state.drones);
              return (
                <Button key={key}
                        onClick={() => onClick(state.drones[serialNumber])}> 
                  {serialNumber} -- Closest distance of : {closetDistance}
                </Button>
              )
            }
          )
          : null
        }
      </Stack>
    </Box>
  );
}

export default DroneStack

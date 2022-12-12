import styled from 'styled-components';
import { useContext } from "react";
import { DroneContext } from '../contexts/DroneProvider';
import Drone from './Drone';

import { useElementSize } from 'usehooks-ts'
import DroneDialog from './DroneDialog';

const Container = styled.div`
  position: relative;
  width : 100%;
`

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  user-drag: none;
`

const Map = () => {
  const [ squareRef, {width, height} ] = useElementSize();

  const [ state, dispatch ] = useContext(DroneContext);

  const handleOpen = (drone) => {
    dispatch({type : "open-drone-dialog", payload : drone});
  }

  return (
    <Container>
      <DroneDialog open={state.droneDialog !== null}/>
      <Img src="map.png" alt="test" ref={squareRef} />
      {
        state.drones !== null
        ? Object.keys(state.drones).map(key => {
          const drone = state.drones[key];
          return (
            <Drone
              key={drone.serialNumber} 
              name={drone.serialNumber} 
              x = {drone.positionX} 
              y = {drone.positionY}
              width={width}
              height={height}
              onClick={() => handleOpen(state.drones[key])}
            ></Drone>
          )
        })
        : null
      }
    </Container>
  )
};

export default Map;
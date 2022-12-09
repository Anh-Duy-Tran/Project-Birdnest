import styled, { createGlobalStyle } from 'styled-components';
import React, { useRef } from "react";
import { DroneContext } from '../contexts/DroneProvider';
import Drone from './Drone';


import { useElementSize } from 'usehooks-ts'

const Container = styled.div`
  position: relative;
  width : 100%;
`

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  user-drag: none;
`


const Map = () => {
  const [ state, dispatch ] = React.useContext(DroneContext);
  const [squareRef, { width, height }] = useElementSize()

  return (
    <Container ref={squareRef}>
      <Img src="map.png" alt="test"/>
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
            ></Drone>
          )
        })
        : null
      }
    </Container>
  )
};

export default Map;
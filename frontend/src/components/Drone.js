import React from 'react';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import RocketIcon from '@mui/icons-material/Rocket';
import { DroneContext } from '../contexts/DroneProvider';


const NameTag = styled.p`
  top : -20px;
  position : absolute;
  font-size: 8px;
`
const DroneDiv = styled.div.attrs(props => ({
  style : {
    top: props.x,
    left: props.y,
  }
}))`
  position : absolute;
  transform : translate(-45%, -50%);
  transition: all 2s;
`

const Drone = ({x, y, name, width, height, onClick}) => {
  const [ state, dispatch ] = React.useContext(DroneContext);
  return (
    <DroneDiv x= {x * width / 500000} y={y * height / 500000}>
      <NameTag>{name}</NameTag>
      <IconButton sx={{ color : "black"}} onClick={onClick}>
        <RocketIcon></RocketIcon>
      </IconButton>
    </DroneDiv>
  )
}

export default Drone
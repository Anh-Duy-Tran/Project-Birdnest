import React from 'react';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import RocketIcon from '@mui/icons-material/Rocket';

const MapSize = {
  x : 500000,
  y : 500000
}

const NameTag = styled.p`
  width : 70px;
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
  return (
    <DroneDiv x= {x * width / MapSize.x} y={y * height / MapSize.y}>
      <NameTag>{name}</NameTag>
      <IconButton sx={{ color : "black"}} onClick={onClick}>
        <RocketIcon></RocketIcon>
      </IconButton>
    </DroneDiv>
  )
}

export default Drone
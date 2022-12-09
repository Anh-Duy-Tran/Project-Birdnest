import Navbar from "../../components/Navbar";
import Map from "../../components/Map";
import styled from 'styled-components';
import { useContext } from "react";
import { DroneContext } from "../../contexts/DroneProvider";
import DroneStack from "../../components/DroneStack";

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px calc(100vh - 80px);
`

const Body = styled.div`
  margin-top : 100px;
  margin-right : 50px;
  margin-left : 50px;
  height: calc(100vh - 130px);
  display : grid;
  gap: 20px;
  grid-template-columns: 50% 50%;
`

const MainPage = () => {
  const [ state, dispatch ] = useContext(DroneContext);
  return (
    <Container>
      <Navbar/>
      <Body>
        <Map/>
        <DroneStack/>
      </Body>
    </Container>
  )
}

export default MainPage;
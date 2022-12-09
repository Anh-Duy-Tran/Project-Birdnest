import * as React from 'react';

import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  height: 80px;
  position: absolute;
  width: 100vw;
  z-index: 10;
  background-color: #242730;
  color: white;
  font-family: jungkalight,sans-serif;
  font-size: 30px;
  user-select: none;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Right = styled.div`
  font-size: 20px;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`

const Center = styled.div`
  flex: 1;
  justify-content: flex-center;
  align-items: center;
  text-align: center;
  z-index: 10;
`


const Navbar = () => {

  return (
    <Container>
      <Wrapper>
        <Left>

        </Left>

        <Center>
          <p>Project Birdnest</p>
        </Center>

        <Right>
          <p>By Anh Duy Tran</p>
        </Right>
        
      </Wrapper>
    </Container>
  )
}

export default Navbar;
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import styled from '@emotion/styled';
import { Navbar, navbarHeight } from './components/navbar-component/Navbar';
import { Auctions } from './components/auctions-page/Auctions';
import { Row, Col } from 'antd';

const ContentLayout = styled.div`
  width:90%;
  margin:auto;
  padding-top: calc(${navbarHeight} + 1em);
  box-sizing:border-box;
  @media only screen and (min-width:800px){
    width:90%;
  }
  @media only screen and (min-width:1500px){
    width:70%;
  }
`

const StyledUl = styled('ul')`
  list-style: none;
`

const TitleLi = styled('li')`
  color:grey;
`

function App() {
  return (
    <BrowserRouter>
      <ContentLayout>
          <Route path="/" exact>
            <Auctions/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Navbar/>
      </ContentLayout>
      <div style={{background: "#EEEEF0", width: '100vw', left:0,bottom:0, margin:0}}>
            <Row>
              <Col flex={1}>
                <h1>CarsBidApp</h1>
              </Col>
              <Col flex={1}>
                <StyledUl>
                  <TitleLi>About us</TitleLi>
                  <li>Sell a car</li>
                  <li>Buy a car</li>
                  <li>Place a bid</li>
                </StyledUl>
              </Col>
              <Col flex={1}>
                <StyledUl>
                    <TitleLi>Guarantee</TitleLi>
                    <li>Terms and agreements</li>
                    <li>Report a scam</li>
                    <li>Contact us</li>
                  </StyledUl>
              </Col>
              <Col flex={1}>
                <StyledUl>
                    <TitleLi>Social Media</TitleLi>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                  </StyledUl>
              </Col>
            </Row>
          </div>
    </BrowserRouter>
  );
}

export default App;

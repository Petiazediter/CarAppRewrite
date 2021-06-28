import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import styled from '@emotion/styled';
import { Navbar, navbarHeight } from './components/navbar-component/Navbar';
import { Auctions } from './components/auctions-page/Auctions';

const ContentLayout = styled.div`
  margin-top: calc(${navbarHeight} + 1em);
  @media only screen and (min-width:800px){
    max-width:1500px;
    margin-top: calc(${navbarHeight} + 1em);
  }
`

function App() {
  return (
    <ContentLayout>
      <BrowserRouter>
        <Route path="/" exact>
          <Auctions/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Navbar/>
      </BrowserRouter>
    </ContentLayout>
  );
}

export default App;

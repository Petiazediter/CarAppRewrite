import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import styled from '@emotion/styled';
import { Navbar } from './components/navbar-component/Navbar';

const ContentLayout = styled.div`
  margin-top: 1em;
  width:100%;
  @media only screen and (min-width:800px){
    width:95%;
    max-width:1500px;
    margin:auto;
    margin-top:2em;
  }
`

function App() {
  return (
    <ContentLayout>
      <BrowserRouter>
      <Navbar/>
        <Route path="/" exact>
          <h1>Hello world</h1>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </BrowserRouter>
    </ContentLayout>
  );
}

export default App;

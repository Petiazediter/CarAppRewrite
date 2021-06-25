import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import { Layout } from 'antd'
import styled from '@emotion/styled';


const ContentLayout = styled(Layout)`
  width:100%;
  background:none;
  @media only screen and (min-width:800px){
    width:750px;
    margin:auto;
  }
`;

const TestPage = styled.div`
  width:100%;
  background:blue;
  height:200vh;
`

function App() {
  return (
    <ContentLayout>
      <BrowserRouter>
        <Route path="/" exact>
          <TestPage>
            <h1>Hello world</h1>
          </TestPage>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </BrowserRouter>
    </ContentLayout>
  );
}

export default App;

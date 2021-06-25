import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import { Layout } from 'antd'

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Route path="/" exact>
          Home page
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </BrowserRouter>
    </Layout>
  );
}

export default App;

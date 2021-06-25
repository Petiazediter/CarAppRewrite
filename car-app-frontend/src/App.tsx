import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        Home page
      </Route>
      <Route path="/about">
        <About/>
      </Route>
    </BrowserRouter>
  );
}

export default App;

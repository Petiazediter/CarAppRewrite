import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        Home page
      </Route>
      <Route path="/about">
        <div>
            <h1>Hello world!</h1>
        </div>
      </Route>
    </BrowserRouter>
  );
}

export default App;

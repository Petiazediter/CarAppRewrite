import { BrowserRouter, Route } from 'react-router-dom'; 
import { About } from "./components/about-page/About";
import styled from '@emotion/styled';
import { Navbar } from './components/shared/navbar-component/Navbar';
import { Auctions } from './components/auctions-page/Auctions';
import { Footer } from './components/footer/Footer';
import { DatabaseProvider } from './context/DatabaseContext';
import {navbarHeight} from "./components/shared/navbar-component/Navbar.styled";

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

function App() {
  return (
    <DatabaseProvider>
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
        <Footer/>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;

import { BrowserRouter, Route } from 'react-router-dom';
import { About } from './components/about-page/About';
import styled from '@emotion/styled';
import { Navbar } from './components/shared/navbar-component/Navbar';
import { Auctions } from './components/auctions-page/Auctions';
import { Footer } from './components/shared/footer/Footer';
import { DatabaseProvider } from './context/DatabaseContext';
import ThemeContextProviderComponent from './context/ThemeContext';
import { navbarHeight } from './components/shared/navbar-component/Navbar.styled';
import { CarPage } from './components/car-page/CarPage';
import { CarPageHOC } from './components/car-page/CarPageHOC';
import { SignInPage } from './components/sign-in-page/SignInPage';
import RegisterPage from './components/register-page/RegisterPage';
import { useEffect } from 'react';

const ContentLayout = styled.div`
	width: 90%;
	min-height: 100vh;
	margin: auto;
	padding-top: calc(${navbarHeight} + 1em);
	box-sizing: border-box;
	@media only screen and (min-width: 800px) {
		width: 90%;
	}
	@media only screen and (min-width: 1500px) {
		width: 70%;
	}
`;

function App() {
	return (
		<ThemeContextProviderComponent>
			<DatabaseProvider>
				<BrowserRouter>
					<ContentLayout>
						<Route path="/" exact>
							<Auctions />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Navbar />
						<Route path="/car/:carId" component={CarPageHOC(CarPage)} />
						<Route path={'/sign-in'} component={SignInPage} />
						<Route path={'/register'} component={RegisterPage} />
					</ContentLayout>
					<Footer />
				</BrowserRouter>
			</DatabaseProvider>
		</ThemeContextProviderComponent>
	);
}

export default App;

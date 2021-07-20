import styled from '@emotion/styled';
import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { About } from './components/about-page/About';
import { Auctions } from './components/auctions-page/Auctions';
import { CarPage } from './components/car-page/CarPage';
import { CarPageHOC } from './components/car-page/CarPageHOC';
import RegisterPage from './components/register-page/RegisterPage';
import { Navbar } from './components/shared/navbar-component/Navbar';
import {
	IS_DARK,
	navbarHeight,
} from './components/shared/navbar-component/Navbar.styled';
import { SignInPage } from './components/sign-in-page/SignInPage';
import { MyThemeContext } from './context/ThemeContext';

type ContentLayoutProps = {
	isdark: string;
};

const ContentLayout = styled.div<ContentLayoutProps>((props) => ({
	width: '90%',
	background: props.isdark === IS_DARK ? '#2E2E2E' : 'initial',
	color: props.isdark === IS_DARK ? 'white' : 'black',
	minHeight: '100vh',
	margin: 'auto',
	paddingTop: `calc(${navbarHeight} + 1em)`,
	boxSizing: 'border-box',
	'@media only screen and (min-width: 800px)': {
		width: '90%',
	},
	'@media only screen and (min-width: 1500px)': {
		width: '70%',
	},
}));

export const RouterComponent = () => {
	const { isDark } = useContext(MyThemeContext);

	return (
		<ContentLayout isdark={isDark ? IS_DARK : ''}>
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
	);
};

export default RouterComponent;

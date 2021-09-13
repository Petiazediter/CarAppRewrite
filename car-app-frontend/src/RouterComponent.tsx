import styled from '@emotion/styled';
import { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { About } from './components/about-page/About';
import { Auctions } from './components/auctions-page/Auctions';
import { CarPageWrapper } from './components/car-page/HigherOrderComponents';
import RegisterPage from './components/register-page/RegisterPage';
import SellComponent from './components/sell-page/SellComponent';
import { Navbar } from './components/shared/navbar-component/Navbar';
import {
	IS_DARK,
	navbarHeight,
} from './components/shared/navbar-component/Navbar.styled';
import { SignInPage } from './components/sign-in-page/SignInPage';
import { MyThemeContext } from './context/ThemeContext';
import { UserContext } from './context/UserContext';

type ContentLayoutProps = {
	isdark: string;
};

const ContentLayout = styled.div<ContentLayoutProps>((props) => ({
	width: '90%',
	background: props.isdark === IS_DARK ? '#222831' : '#eee',
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
	const userContext = useContext(UserContext);
	const history = useHistory();

	return (
		<ContentLayout isdark={isDark ? IS_DARK : ''}>
			<Route path="/" exact>
				<Auctions />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Navbar />
			<Route path={'/car/:carId'} exact component={CarPageWrapper} />
			<Route path={'/sign-in'} component={SignInPage} />
			<Route path={'/register'} component={RegisterPage} />
			<Route path={'/sell'} exact component={SellComponent} />
			<Route path={'/user/me'} exact>
				<button
					onClick={() => {
						userContext.changeUser(undefined);
						history.push('/');
					}}
				>
					Sign out
				</button>
			</Route>
		</ContentLayout>
	);
};

export default RouterComponent;

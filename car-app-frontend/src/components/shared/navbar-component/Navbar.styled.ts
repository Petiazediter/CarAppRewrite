import styled from '@emotion/styled';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

export const IS_HIGHLIGHTED = 'ishighlighted';
export const navbarHeight: string = '60px';

interface NavbarMenuColProps {
	highlight?: string;
}

export const NavbarMenuCol = styled(Col)<NavbarMenuColProps>(
	(props: NavbarMenuColProps) => ({
		background: `${props.highlight === IS_HIGHLIGHTED ? '#fc5c65' : 'none'}`,
		color: `${props.highlight === IS_HIGHLIGHTED ? 'white' : 'black'}`,
		fontWeight: 'bolder',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		'&:hover': {
			background: props.highlight === IS_HIGHLIGHTED ? '#eb3b5a' : 'none',
		},
	})
);

export const StyledNav = styled.nav({
	zIndex: 10,
	boxShadow: '0 1px 0 0 rgba(100,100,100,.2)',
	height: navbarHeight,
	position: 'fixed',
	background: 'white',
	width: '100%',
	left: 0,
	top: 0,
	margin: 0,
	paddingTop: '.5em',
	'@media only screen and (min-width: 800px)': {
		left: '50%',
		transform: 'translateX(-50%)',
		width: '90.1%',
	},
	'@media only screen and (min-width: 1500px)': {
		width: '70.1%',
	},
});

export const NavbarLink = styled(Link)<NavbarMenuColProps>(
	(props: NavbarMenuColProps) => ({
		color: props.highlight === IS_HIGHLIGHTED ? '#eeeeee' : 'grey',
		'&:hover': {
			color: props.highlight === IS_HIGHLIGHTED ? 'white' : 'black',
		},
	})
);

export const TitleLink = styled(Link)({
	position: 'relative',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const LeftAlignedH1 = styled.h1({
	position: 'relative',
	width: '100%',
	padding: 0,
	margin: 0,
	textAlign: 'left',
});

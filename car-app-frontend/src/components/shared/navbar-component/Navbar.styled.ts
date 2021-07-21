import styled from '@emotion/styled';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

export const IS_HIGHLIGHTED = 'ishighlighted';
export const IS_DARK = 'isdark';
export const navbarHeight: string = '60px';

interface NavbarMenuColProps {
	highlight?: string;
	isdark: string;
}

export type DarkModeProp = {
	isdark: string;
};

export const NavbarMenuCol = styled(Col)<NavbarMenuColProps>(
	(props: NavbarMenuColProps) => ({
		background: `${
			props.highlight === IS_HIGHLIGHTED
				? 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)'
				: 'none'
		}`,
		color: `${
			props.highlight === IS_HIGHLIGHTED
				? 'white'
				: props.isdark === IS_DARK
				? 'white'
				: 'black'
		}`,
		fontWeight: 'bolder',
		textAlign: 'center',
		borderRadius: '22px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		'&:hover': {
			background:
				props.highlight === IS_HIGHLIGHTED
					? 'linear-gradient(to right, #FF416C 0%, #FC6767 80%)'
					: 'none',
		},
	})
);

export const StyledNav = styled.nav<DarkModeProp>((props) => ({
	zIndex: 10,
	boxShadow: '0 1px 0 0 rgba(100,100,100,.2)',
	height: navbarHeight,
	borderRadius: '22px',
	padding: 0,
	paddingLeft: '1em',
	paddingRight: '1em',
	position: 'fixed',
	background: props.isdark === IS_DARK ? 'black' : 'white',
	width: '100%',
	left: 0,
	top: 0,
	margin: 0,
	'@media only screen and (min-width: 800px)': {
		left: '50%',
		transform: 'translateX(-50%)',
		width: '90.1%',
	},
	'@media only screen and (min-width: 1500px)': {
		width: '70.1%',
	},
}));

export const NavbarLink = styled(Link)<NavbarMenuColProps>(
	(props: NavbarMenuColProps) => ({
		color: props.highlight === IS_HIGHLIGHTED ? '#eeeeee' : 'grey',
		'&:hover': {
			color:
				props.highlight === IS_HIGHLIGHTED || props.isdark === IS_DARK
					? 'white'
					: 'black',
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

export const LeftAlignedH1 = styled.h1<DarkModeProp>((props) => ({
	position: 'relative',
	width: '100%',
	padding: 0,
	margin: 0,
	textAlign: 'left',
	color: props.isdark === IS_DARK ? 'white' : 'black',
}));

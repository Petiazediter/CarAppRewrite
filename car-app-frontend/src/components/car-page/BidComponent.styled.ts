import styled from '@emotion/styled';
import { PrimaryButton } from '../auctions-page/Auctions.styled';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';

export type DarkModeProp = {
	isdark: string;
};

export const BidContainer = styled.div({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
});

export const Bid = styled.section<DarkModeProp>((props) => ({
	background: props.isdark === IS_DARK ? '#393E46' : 'white',
	width: '400px',
	padding: '1em',
	borderRadius: '22px',
	boxShadow:
		props.isdark === IS_DARK
			? '0 0 4px 4px rgba(0, 0, 0, .2);'
			: '0 0 4px 4px rgba(0, 0, 255, .2);',
}));

export const BidDetails = styled.section<DarkModeProp>((props) => ({
	width: '100%',
	position: 'relative',
	display: 'flex',
	justifyContent: 'space-between',
	alignContent: 'center',
	color: 'black',
}));

export const BidButton = styled(PrimaryButton)({
	width: '100%',
	position: 'relative',
	marginTop: '5px',
});

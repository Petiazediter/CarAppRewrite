import styled from '@emotion/styled';

const CARD_BACKGROUND = '#fff';
const margin = 2;
const MARGIN = `${margin}px`;
const MARGIN_BETWEEN = `${margin * 2}px`;

export const CarComponentWrapper = styled.div({
	position: 'relative',
	background: CARD_BACKGROUND,
	margin: MARGIN,
	borderRadius: '0',
	overflow: 'hidden',
	width: '100%',
	'@media only screen and (min-width: 800px)': {
		width: `calc(50% - ${MARGIN_BETWEEN})`,
	},
	'@media only screen and (min-width: 1200px)': {
		width: `calc(33% - ${MARGIN_BETWEEN})`,
	},
});

export const BidSection = styled.div({
	position: 'relative',
	width: '100%',
	background: CARD_BACKGROUND,
	color: 'white',
	padding: '20px 10px 20px 10px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

export const BidDisplay = styled.div({
	width: '100%',
	fontWeight: 'bold',
	fontSize: 'larger',
	textAlign: 'center',
	color: 'white',
	borderRadius: '22px',
	padding: '10px',
	background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
});

export const Title = styled.h2({
	color: 'black',
	padding: 0,
	margin: 0,
	'&:hover': {
		color: '#fc5c65',
	},
});

export const CarName = styled(Title)({
	color: 'white',
	fontSize: 'x-large',
	fontWeight: 'bold',
});

export const SellerName = styled('span')({
	color: 'white',
	padding: 0,
	margin: 0,
});

export const CarDetails = styled.div({
	padding: '10px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	background: '#222',
	widht: '100%',
	color: 'white',
});

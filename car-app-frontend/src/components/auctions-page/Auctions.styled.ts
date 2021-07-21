import styled from '@emotion/styled';
import { Button, Col } from 'antd';

export const SortRow = styled(Col)({
	display: 'flex',
});

export const FlexCol = styled(Col)({
	position: 'relative',
	width: 0,
	display: 'flex',
	flexWrap: 'wrap',
	overflow: 'hidden',
});

export const NewsCol = styled(Col)({
	position: 'relative',
	display: 'none',
	'@media only screen and (min-width:800px)': {
		display: 'initial',
	},
});

export const PrimaryButton = styled(Button)({
	background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
	borderRadius: '22px',
	border: 'none',
	color: 'white',
	'&:hover, &:active, &:focus': {
		background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
		color: 'white',
	},
});

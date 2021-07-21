import styled from '@emotion/styled';
import { Button } from 'antd';

export const RegisterContainerSection = styled.section({
	width: '400px',
	margin: 'auto',
	h1: {
		width: '100%',
		textAlign: 'center',
	},
});

export const FormButton = styled(Button)({
	background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
	border: 'none',
	borderRadius: '22px',
	fontFamily: 'sans-serif',
	fontWeight: 'bold',
	'&:hover': {
		background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
	},
	'&:focus': {
		background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
	},
});

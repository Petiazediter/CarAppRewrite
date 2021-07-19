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
	background: '#ff4040',
	borderColor: '#ff4040',
	fontFamily: 'sans-serif',
	fontWeight: 'bold',
	'&:hover': {
		background: '#ff3030',
		borderColor: '#ff4040',
	},
	'&:focus': {
		background: '#ff3030',
		borderColor: '#ff4040',
	},
});

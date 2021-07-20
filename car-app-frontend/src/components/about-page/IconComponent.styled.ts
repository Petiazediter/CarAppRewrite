import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
	ArrowDownOutlined,
	CarOutlined,
	CheckOutlined,
	ContainerOutlined,
} from '@ant-design/icons';

export const IconComponentContainer = styled.section({
	display: 'flex',
	width: '70%',
	flexWrap: 'wrap',
	flexBasis: '50%',
});

export const IconElement = styled.div({
	padding: '1em',
	margin: '1em',
	background: '#fff',
	width: '45%',
	boxSizing: 'border-box',
	h2: {
		maxWidth: 'fit-content',
		paddingRight: '1em',
		borderBottom: '5px solid #ff4848',
		borderRadius: '2px',
	},
	p: {
		fontWeight: 600,
	},
});

const DynamicIconStyle = css({
	color: '#fcfcfc',
	fontSize: '2.5em',
	background: '#ff4848',
	padding: '8px',
	borderRadius: '8px',
});

export const Arrow = styled(ArrowDownOutlined)`
	${DynamicIconStyle};
`;

export const Car = styled(CarOutlined)`
	${DynamicIconStyle};
`;

export const Container = styled(ContainerOutlined)`
	${DynamicIconStyle};
`;

export const Check = styled(CheckOutlined)`
	${DynamicIconStyle};
`;

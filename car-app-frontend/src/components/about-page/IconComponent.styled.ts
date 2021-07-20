import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
	ArrowDownOutlined,
	CarOutlined,
	CheckOutlined,
	ContainerOutlined,
} from '@ant-design/icons';

export const IconElement = styled.div({
	background: '#fff',
	width: '300px',
	h2: {
		maxWidth: 'fit-content',
		paddingRight: '1em',
		borderBottom: '5px solid #ff4848',
		borderRadius: '2px',
	},
});

const DynamicIconStyle = css({
	color: '#ff4848',
	fontSize: '3em',
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

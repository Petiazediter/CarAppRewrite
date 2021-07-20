import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
	ArrowDownOutlined,
	CarOutlined,
	CheckOutlined,
	ContainerOutlined,
} from '@ant-design/icons';

export const IconElement = styled.div({
	background: '#08c',
	width: '300px',
});

const DynamicIconStyle = css({
	background: '#08c',
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

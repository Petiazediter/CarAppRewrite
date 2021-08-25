import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const StyledUl = styled('ul')`
	list-style: none;
	color: white;
`;

const TitleLi = styled('li')`
	color: white;
	font-weight: bold;
`;

const FooterDiv = styled('div')`
	background: #222;
    color: 'white'
	width: 100vw;
	inset: 0;
	margin: 2em 0 0 0;
`;

export const Footer: FunctionComponent = () => {
	return (
		<FooterDiv>
			<Row>
				<Col flex={1}>
					<h1 style={{ color: 'white' }}>CarsBidApp</h1>
				</Col>
				<Col flex={1}>
					<StyledUl>
						<TitleLi>About us</TitleLi>
						<li>Sell a car</li>
						<li>Buy a car</li>
						<li>Place a bid</li>
					</StyledUl>
				</Col>
				<Col flex={1}>
					<StyledUl>
						<TitleLi>Guarantee</TitleLi>
						<li>Terms and agreements</li>
						<li>Report a scam</li>
						<li>Contact us</li>
					</StyledUl>
				</Col>
				<Col flex={1}>
					<StyledUl>
						<TitleLi>Social Media</TitleLi>
						<li>Facebook</li>
						<li>Instagram</li>
						<li>Twitter</li>
					</StyledUl>
				</Col>
			</Row>
		</FooterDiv>
	);
};

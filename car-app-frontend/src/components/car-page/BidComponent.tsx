import styled from '@emotion/styled';
import React from 'react';
import { Car } from '../../models/Car';
import { PrimaryButton } from '../auctions-page/Auctions.styled';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';

export type BidComponentProps = {
	car: Car;
	isDark: boolean;
};

export type DarkModeProp = {
	isdark: string;
};

const BidContainer = styled.div({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
});

const Bid = styled.section<DarkModeProp>((props) => ({
	background: props.isdark === IS_DARK ? '#393E46' : 'white',
	width: '400px',
	padding: '1em',
	borderRadius: '22px',
	boxShadow:
		props.isdark === IS_DARK
			? '0 0 4px 4px rgba(0, 0, 0, .2);'
			: '0 0 4px 4px rgba(0, 0, 255, .2);',
}));

const BidDetails = styled.section<DarkModeProp>((props) => ({
	width: '100%',
	position: 'relative',
	display: 'flex',
	justifyContent: 'space-between',
	alignContent: 'center',
	color: 'black',
}));

const BidButton = styled(PrimaryButton)({
	width: '100%',
	position: 'relative',
	marginTop: '5px',
});

export default class BidComponent extends React.Component<BidComponentProps> {
	render() {
		return (
			<BidContainer>
				<Bid isdark={this.props.isDark ? IS_DARK : ''}>
					<BidDetails isdark={this.props.isDark ? IS_DARK : ''}>
						<span>
							Highest bid: $
							{this.props.car.bids[this.props.car.bids.length - 1].bid}
						</span>
						<span>
							{
								this.props.car.bids[this.props.car.bids.length - 1].user
									.username
							}
						</span>
					</BidDetails>
					<BidButton>Place a bid</BidButton>
				</Bid>
			</BidContainer>
		);
	}
}

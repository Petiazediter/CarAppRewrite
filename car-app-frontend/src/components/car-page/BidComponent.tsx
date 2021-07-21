import styled from '@emotion/styled';
import React from 'react';
import { Car } from '../../models/Car';
import { PrimaryButton } from '../auctions-page/Auctions.styled';

export type BidComponentProps = {
	car: Car;
};

const BidContainer = styled.div({
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
});

const Bid = styled.section({
	background: 'white',
	width: '400px',
	padding: '1em',
	borderRadius: '22px',
	boxShadow: '0 0 4px 4px rgba(0, 0, 255, .2);',
});

const BidDetails = styled.section({
	width: '100%',
	position: 'relative',
	display: 'flex',
	justifyContent: 'space-between',
	alignContent: 'center',
	color: 'black',
});

const BidButton = styled(PrimaryButton)({
	width: '100%',
	position: 'relative',
	marginTop: '5px',
});

export default class BidComponent extends React.Component<BidComponentProps> {
	render() {
		return (
			<BidContainer>
				<Bid>
					<BidDetails>
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

import React from 'react';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';
import {
	Bid,
	BidButton,
	BidContainer,
	BidDetails,
} from './BidComponent.styled';

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

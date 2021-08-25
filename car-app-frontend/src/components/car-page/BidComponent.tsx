import React from 'react';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';
import {
	Bid,
	BidButton,
	BidContainer,
	BidDetails,
} from './BidComponent.styled';
import { CarResult } from './HigherOrderComponents';

export type BidComponentProps = {
	car: CarResult;
	isDark: boolean;
};

export type BidComponentState = {
	isDark: string;
};

export default class BidComponent extends React.Component<
	BidComponentProps,
	BidComponentState
> {
	bidsLenght: number = 0;

	constructor(props: BidComponentProps) {
		super(props);
		this.state = {
			isDark: '',
		};
	}

	componentDidMount() {
		this.setState({
			isDark: this.props.isDark ? IS_DARK : '',
		});
		this.bidsLenght = this.props.car.bids.length - 1;
	}

	componentDidUpdate(prevProps: BidComponentProps) {
		if ((this.props.isDark ? IS_DARK : '') !== this.state.isDark) {
			this.setState({
				isDark: this.props.isDark ? IS_DARK : '',
			});
		}
		if (this.props.car.bids.length - 1 !== this.bidsLenght) {
			this.bidsLenght = this.props.car.bids.length - 1;
		}
	}

	render() {
		return (
			<BidContainer>
				<Bid isdark={this.state.isDark}>
					<BidDetails isdark={this.state.isDark}>
						<span>
							Highest bid: $
							{this.props.car.bids.length > 0
								? this.props.car.bids[this.bidsLenght].bid
								: this.props.car.minBid}
						</span>
						<span>
							{this.props.car.bids.length > 0
								? this.props.car.bids[this.bidsLenght].userId
								: 'No bid yet.'}
						</span>
					</BidDetails>
					<BidButton>Place a bid</BidButton>
				</Bid>
			</BidContainer>
		);
	}
}

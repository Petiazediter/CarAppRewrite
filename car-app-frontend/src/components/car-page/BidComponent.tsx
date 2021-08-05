import React from 'react';
import { Car } from '../../models/Car';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';
import {
	Bid,
	BidButton,
	BidContainer,
	BidDetails,
} from './BidComponent.styled';

export type BidComponentProps = {
	car: Car;
	isDark: boolean;
};

export type BidComponentState = {
	isDark: string;
	bidsLenght: number;
};

export default class BidComponent extends React.Component<
	BidComponentProps,
	BidComponentState
> {
	constructor(props: BidComponentProps) {
		super(props);
		this.setState({
			isDark: props.isDark ? IS_DARK : '',
			bidsLenght: props.car.bids.length,
		});
	}

	componentDidUpdate(prevProps: BidComponentProps) {
		if ((prevProps.isDark ? IS_DARK : '') !== this.state.isDark) {
			this.setState({
				...this.state,
				isDark: this.props.isDark ? IS_DARK : '',
			});
		}
		if (prevProps.car.bids.length !== this.state.bidsLenght) {
			this.setState({
				...this.state,
				bidsLenght: this.props.car.bids.length,
			});
		}
	}

	render() {
		return (
			<BidContainer>
				<Bid isdark={this.state.isDark}>
					<BidDetails isdark={this.state.isDark}>
						<span>
							Highest bid: ${this.props.car.bids[this.state.bidsLenght - 1].bid}
						</span>
						<span>
							{this.props.car.bids[this.state.bidsLenght - 1].user.username}
						</span>
					</BidDetails>
					<BidButton>Place a bid</BidButton>
				</Bid>
			</BidContainer>
		);
	}
}

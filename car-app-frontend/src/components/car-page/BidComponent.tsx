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
	bidsLenght: number;
};

export default class BidComponent extends React.Component<
	BidComponentProps,
	BidComponentState
> {
	constructor(props: BidComponentProps) {
		super(props);
		this.state = {
			isDark: '',
			bidsLenght: 0,
		};
	}

	componentDidMount() {
		this.setState({
			isDark: this.props.isDark ? IS_DARK : '',
			bidsLenght: this.props.car.bids.length - 1,
		});
	}

	componentDidUpdate(prevProps: BidComponentProps) {
		if ((this.props.isDark ? IS_DARK : '') !== this.state.isDark) {
			this.setState({
				...this.state,
				isDark: this.props.isDark ? IS_DARK : '',
			});
		}
		if (this.props.car.bids.length - 1 !== this.state.bidsLenght) {
			this.setState({
				...this.state,
				bidsLenght: this.props.car.bids.length - 1,
			});
		}
	}

	render() {
		return (
			<BidContainer>
				<Bid isdark={this.state.isDark}>
					<BidDetails isdark={this.state.isDark}>
						<span>
							Highest bid: ${this.props.car.bids[this.state.bidsLenght].bid}
						</span>
						<span>{this.props.car.bids[this.state.bidsLenght].userId}</span>
					</BidDetails>
					<BidButton>Place a bid</BidButton>
				</Bid>
			</BidContainer>
		);
	}
}

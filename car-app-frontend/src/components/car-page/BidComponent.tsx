import React from 'react';
import QueryUser from '../../models/schema/QueryUser';
import { IS_DARK } from '../shared/navbar-component/Navbar.styled';
import {
	Bid,
	BidButton,
	BidContainer,
	BidDetails,
} from './BidComponent.styled';

export type BidResult = {
	buyer: {
		username: string;
	};
	bid: number;
};

export type BidComponentProps = {
	bids: BidResult[];
	minBid: number;
	isDark: boolean;
	user: QueryUser | undefined;
	placeBid: () => void;
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
		this.bidsLenght = this.props.bids.length - 1;
	}

	componentDidUpdate(prevProps: BidComponentProps) {
		if ((this.props.isDark ? IS_DARK : '') !== this.state.isDark) {
			this.setState({
				isDark: this.props.isDark ? IS_DARK : '',
			});
		}
		if (this.props.bids.length - 1 !== this.bidsLenght) {
			this.bidsLenght = this.props.bids.length - 1;
		}
	}

	render() {
		return (
			<BidContainer>
				<Bid isdark={this.state.isDark}>
					<BidDetails isdark={this.state.isDark}>
						<span>
							Highest bid: $
							{this.props.bids.length > 0
								? this.props.bids[this.bidsLenght].bid
								: this.props.minBid}
						</span>
						<span>
							{this.props.bids.length > 0
								? this.props.bids[this.bidsLenght].buyer.username
								: 'No bid yet.'}
						</span>
					</BidDetails>
					{this.props.user ? (
						<BidButton
							onClick={() => {
								this.props.placeBid();
							}}
						>
							Place a bid
						</BidButton>
					) : (
						<BidButton disabled>Log in to place a bid</BidButton>
					)}
				</Bid>
			</BidContainer>
		);
	}
}

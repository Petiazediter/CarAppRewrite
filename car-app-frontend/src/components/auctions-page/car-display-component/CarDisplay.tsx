import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import {
	BidDisplay,
	BidSection,
	CarComponentWrapper,
	CarDetails,
	CarName,
	SellerName,
} from './CarDisplay.styled';
import { FunctionComponent } from 'react';
import { TimerDisplayFormat, TimerText } from '../TimerText';
import { CarResult } from './CarList';

export const CarDisplay: FunctionComponent<{ car: CarResult }> = (props) => {
	return (
		<CarComponentWrapper>
			<Link to={`/car/${props.car.id}`}>
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: '230px',
						overflow: 'hidden',
					}}
				>
					{props.car.exteriorImages.length > 0 ? (
						<img
							style={{
								width: '100%',
								height: '230px',
								overflow: 'hidden',
							}}
							src={props.car.exteriorImages[0].url}
							alt="The car"
						/>
					) : (
						<Empty
							style={{
								padding: 0,
								margin: 0,
								display: 'flex',
								justifyContent: 'center',
								height: '230px',
								alignItems: 'center',
							}}
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						/>
					)}
				</div>
			</Link>
			<CarDetails>
				<Link to={`/car/${props.car.id}`}>
					<CarName>{props.car.name}</CarName>
				</Link>
				<span style={{ fontWeight: 'bold' }}>
					Posted by
					<Link to={`/user/${props.car.seller.id}`}>
						<SellerName> {props.car.seller.username}</SellerName>
					</Link>{' '}
					| {props.car.city},{props.car.country}
				</span>
			</CarDetails>
			<BidSection>
				{props.car.bids.length > 0 ? (
					<BidDisplay>
						Highest Bid: ${props.car.bids[props.car.bids.length - 1].bid}
					</BidDisplay>
				) : (
					<BidDisplay>Highest Bid: ${props.car.minBid}</BidDisplay>
				)}
				<TimerText
					textStyle={{
						color: 'black',
						textAlign: 'center',
					}}
					fromDate={props.car.endDate}
					formatType={TimerDisplayFormat.SHORT_NAME}
					prefix={'Time left:'}
				/>
			</BidSection>
		</CarComponentWrapper>
	);
};

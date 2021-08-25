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
						minHeight: '200px',
						maxHeight: '200px',
						overflow: 'hidden',
					}}
				>
					{props.car.exteriorImages.length > 0 ? (
						<img
							style={{
								width: '100%',
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
								height: '200px',
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
				<BidDisplay>Highest Bid: ${props.car.minBid}</BidDisplay>
				<TimerText
					textStyle={{
						color: 'black',
						textAlign: 'center',
					}}
					fromDate={'10-9-2021-10-24-39'}
					formatType={TimerDisplayFormat.SHORT_NAME}
					prefix={'Time left:'}
				/>
			</BidSection>
		</CarComponentWrapper>
	);
};

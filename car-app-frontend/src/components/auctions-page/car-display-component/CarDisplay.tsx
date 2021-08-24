import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { Car } from '../../../models/Car';
import {
	BidSpan,
	CarComponentWrapper,
	CarName,
	ImageDiv,
	LabelSpan,
	SellerName,
} from './CarDisplay.styled';
import { FunctionComponent } from 'react';
import { TimerDisplayFormat, TimerText } from '../TimerText';
import { CarResult } from './CarList';

export const CarDisplay: FunctionComponent<{ car: CarResult }> = (props) => {
	return (
		<CarComponentWrapper>
			<Link to={`/car/${props.car.id}`}>
				<ImageDiv>
					<Carousel autoplay>
						{props.car.exteriorImages.map((item, index) => (
							<img
								key={index}
								style={{
									width: '100%',
									borderRadius: '10px',
									overflow: 'hidden',
								}}
								src={item.url}
								alt="The car"
							/>
						))}
					</Carousel>
					<BidSpan>
						<LabelSpan>Bid: </LabelSpan>${props.car.minBid}
						<LabelSpan> | Time: </LabelSpan>
						<TimerText
							fromDate={'10-9-2021-10-24-39'}
							formatType={TimerDisplayFormat.SHORT_NAME}
						/>
					</BidSpan>
				</ImageDiv>
				<CarName>{props.car.name}</CarName>
			</Link>
			<Link to={`/user/${props.car.seller.id}`}>
				<SellerName>{props.car.seller.username}</SellerName>
			</Link>
			<p>
				{props.car.city},{props.car.country}
			</p>
		</CarComponentWrapper>
	);
};

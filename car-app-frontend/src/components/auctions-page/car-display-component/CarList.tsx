import { gql, useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { CarFilters } from '../../../context/DatabaseContext';
import { CarDisplay } from './CarDisplay';

export type CarListProps = {
	filters: CarFilters;
};

export const CARS_AUCTION_QUERY = gql`
	query {
		cars {
			id
			minBid
			name
			endDate
			city
			country
			seller {
				id
				username
			}
			bids {
				bid
			}
			exteriorImages {
				url
			}
			interiorImages {
				url
			}
			paperImages {
				url
			}
			videos {
				url
			}
		}
	}
`;

export type CarsAuctionQueryResult = {
	cars: CarResult[];
};

export type CarResult = {
	id: number;
	name: string;
	endDate: string;
	city: string;
	minBid: number;
	country: string;
	seller: {
		id: number;
		username: string;
	};
	bids: {
		bid?: number;
	}[];
	exteriorImages: ImageResult[];
	videos: ImageResult[];
	interiorImages: ImageResult[];
	paperImages: ImageResult[];
};

export type ImageResult = {
	url: string;
};

const CarList: FunctionComponent<CarListProps> = (props) => {
	const { loading, error, data } =
		useQuery<CarsAuctionQueryResult>(CARS_AUCTION_QUERY);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error happened.</div>;
	if (!data) return <div>No cars to display</div>;
	return (
		<>
			{data.cars.map((car) => (
				<CarDisplay car={car} key={car.id} />
			))}
		</>
	);
};

export default CarList;

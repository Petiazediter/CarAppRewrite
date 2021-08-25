import { useQuery } from '@apollo/client';
import { FunctionComponent, useContext } from 'react';
import { MyThemeContext } from '../../context/ThemeContext';
import BidComponent from './BidComponent';
import { gql } from '@apollo/client';
import { RouteComponentProps } from 'react-router';
import { CarPage } from './CarPage';

const GET_CAR_QUERY = gql`
	query Query($carId: Int!) {
		car(id: $carId) {
			id
			name
			minBid
			bids {
				buyer {
					username
				}
				bid
			}
			seller {
				id
				username
			}
			paperImages {
				url
			}
			videos {
				url
			}
			exteriorImages {
				url
			}
			interiorImages {
				url
			}
			model
			brand
			km
			country
			city
			vin
		}
	}
`;

export type GetCarResult = {
	car: CarResult;
};

export type CarResult = {
	id: number;
	name: string;
	minBid: number;
	bids: {
		buyer: {
			username: string;
		};
		bid: number;
	}[];
	seller: {
		id: number;
		username: string;
	};
	paperImages: {
		url: string;
	}[];
	videos: {
		url: string;
	}[];
	exteriorImages: {
		url: string;
	}[];
	interiorImages: {
		url: string;
	}[];
	model: string;
	brand: string;
	km: number;
	country: string;
	city: string;
	vin: string;
};

export const CarPageHOC = (Component: any) => {
	return (props: RouteComponentProps<{ carId?: string | undefined }>) => {
		const id = props.match.params.carId;
		if (id) {
			try {
				const nId = Number(id);
				return <CarWrapper {...props} carId={nId} />;
			} catch {
				return <ErrorComponent {...props} />;
			}
		}
		return <ErrorComponent {...props} />;
	};
};

const ErrorComponent: FunctionComponent<RouteComponentProps> = (props) => {
	return <div>Error while fetching data...</div>;
};

const CarWrapper: FunctionComponent<CarWrapperProps> = (props) => {
	const { data, loading, error } = useQuery<GetCarResult>(GET_CAR_QUERY, {
		variables: {
			carId: props.carId,
		},
	});

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
	if (!data) return <div>No data...</div>;
	return <CarPage car={data.car} />;
};

interface CarWrapperProps extends RouteComponentProps<{ carId?: string }> {
	carId: number;
}

export const BidComponentHOC: FunctionComponent<{ car: CarResult }> = (
	props
) => {
	const { isDark } = useContext(MyThemeContext);
	return <BidComponent isDark={isDark} car={props.car} />;
};

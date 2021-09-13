import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { FunctionComponent, useContext } from 'react';
import { MyThemeContext } from '../../context/ThemeContext';
import BidComponent, { BidResult } from './BidComponent';
import { gql } from '@apollo/client';
import { useParams } from 'react-router';
import { CarPage } from './CarPage';
import { UserContext } from '../../context/UserContext';

const GET_CAR_QUERY = gql`
	query Query($carId: Int!) {
		car(id: $carId) {
			id
			name
			endDate
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
			highlightsItems {
				id
				highlight
			}
			equipmentItems {
				id
				equipment
			}
			extraItems {
				id
				extraItem
			}
			flaws {
				id
				flaw
			}
			model
			brand
			km
			country
			city
			vin
			highlightsTitle
			equipmentTitle
			serviceHistory
		}
	}
`;

export type GetCarResult = {
	car: CarResult;
};

export type CarResult = {
	id: number;
	name: string;
	endDate: string;
	minBid: number;
	bids: BidResult[];
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
	highlightsItems: {
		id: number;
		highlight: string;
	}[];
	equipmentItems: {
		id: number;
		equipment: string;
	}[];
	extraItems: {
		id: number;
		extraItem: string;
	}[];
	flaws: {
		id: number;
		flaw: string;
	}[];
	model: string;
	brand: string;
	km: number;
	country: string;
	city: string;
	vin: string;
	highlightsTitle: string;
	equipmentTitle: string;
	serviceHistory: string;
};

type CarPageRouteParams = {
	carId: string;
};

export const CarPageWrapper: FunctionComponent = () => {
	const { carId } = useParams<CarPageRouteParams>();

	if (carId) {
		try {
			const nId = Number(carId);
			return <CarWrapper carId={nId} />;
		} catch {
			return <ErrorComponent message={'Car id is not a number'} />;
		}
	}
	return <ErrorComponent message={'Car id is not found'} />;
};

const ErrorComponent: FunctionComponent<{ message: string }> = ({
	message,
}) => {
	return <div>{message}</div>;
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

interface CarWrapperProps {
	carId: number;
}

const BID_SUBSCRIPTION = gql`
	subscription BidSubscription($carId: Int!) {
		bidAdded(carId: $carId) {
			id
		}
	}
`;

export type BidSubResult = {
	bidAdded: {
		id: number;
	};
};

const BID_QUERY_RESULT = gql`
	query CarQuery($id: Int!) {
		car(id: $id) {
			bids {
				buyer {
					username
				}
				bid
			}
		}
	}
`;

type BidQueryResultT = {
	car: {
		bids: BidResult[];
	};
};

export const BidComponentHOC: FunctionComponent<{ car: CarResult }> = (
	props
) => {
	const userContext = useContext(UserContext);
	const client = useApolloClient();
	const { data: bids, refetch } = useQuery<BidQueryResultT, { id: number }>(
		BID_QUERY_RESULT,
		{
			variables: {
				id: Number(props.car.id),
			},
			fetchPolicy: 'network-only',
			nextFetchPolicy: 'network-only',
		}
	);
	const { error } = useSubscription<BidSubResult>(BID_SUBSCRIPTION, {
		client: client,
		variables: {
			carId: Number(props.car.id),
		},
		onSubscriptionData() {
			refetch();
		},
		shouldResubscribe: true,
	});

	const { isDark } = useContext(MyThemeContext);
	if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
	return (
		<BidComponent
			isDark={isDark}
			bids={bids ? bids.car.bids : props.car.bids}
			minBid={props.car.minBid}
			user={userContext.user}
			placeBid={() => {
				console.log('place bid');
			}}
		/>
	);
};

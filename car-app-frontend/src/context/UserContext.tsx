import { createContext, ReactElement, useState, useEffect } from 'react';
import { User } from './DatabaseContext';
import useLocalStorage from '../customHooks/useLocalStorage';
import { gql, useQuery } from '@apollo/client';

export const UserContext = createContext<{
	user: User | undefined;
	changeToken: (token: string) => void;
}>({
	user: undefined,
	changeToken: () => {},
});

const ME_QUERY = gql`
	query MeQuery {
		me {
			id
			username
			emailAddress
		}
	}
`;

type MeResult = {
	me: User;
};

export default function UserContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [userToken, setUserToken] = useLocalStorage('userToken', '');
	const { refetch } = useQuery<MeResult>(ME_QUERY, {
		fetchPolicy: 'network-only',
		onCompleted({ me }) {
			if (me) {
				setUser(me);
			}
		},
	});
	const [user, setUser] = useState<User>();
	const changeToken = (token: string) => {
		setUserToken(token);
		refetch();
	};
	const value = { user, changeToken };

	useEffect(() => {
		if (userToken === '') {
			setUser(undefined);
		}
	}, [userToken]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

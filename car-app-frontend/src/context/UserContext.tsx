import { gql, useQuery } from '@apollo/client';
import { createContext, ReactElement, useEffect, useState } from 'react';
import { AUTH_TOKEN } from '..';
import useLocalStorage from '../customHooks/useLocalStorage';
import QueryUser, { userQuery } from '../models/schema/QueryUser';

type ContextType = {
	token: string;
	changeToken(token: string): void;
	user: QueryUser | undefined;
	changeUser(user: QueryUser | undefined): void;
};

export const UserContext = createContext<ContextType>({
	user: undefined,
	token: '',
	changeToken: () => {},
	changeUser: () => {},
});

type ContextProviderType = {
	children: ReactElement;
};

const ME_QUERY = gql`
	#graphql
	query MeQuery {
		me {
			${userQuery}
		}
	}
`;

export type MeQueryType = {
	me: QueryUser;
};

export default function UserContextProvider({ children }: ContextProviderType) {
	const { refetch } = useQuery<MeQueryType>(ME_QUERY, {
		onCompleted(data) {
			setUser(data.me);
		},
		fetchPolicy: 'network-only',
	});
	const [token, setToken] = useLocalStorage(AUTH_TOKEN, '');
	const changeToken = (token: string) => {
		setToken(token);
	};
	const [user, setUser] = useState<QueryUser>();
	const changeUser = (user: QueryUser | undefined) => {
		setUser(user);
	};

	useEffect(() => {
		if (token === '') {
			setUser(undefined);
		} else {
			refetch().then();
		}
	}, [refetch, token]);

	return (
		<UserContext.Provider value={{ user, changeUser, changeToken, token }}>
			{children}
		</UserContext.Provider>
	);
}

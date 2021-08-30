import { createContext, ReactElement, useState, useEffect } from 'react';
import { User } from './DatabaseContext';
import useLocalStorage from '../customHooks/useLocalStorage';

export const UserContext = createContext<{
	user: User | undefined;
	changeToken: (token: string) => void;
}>({
	user: undefined,
	changeToken: () => {},
});

export default function UserContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [userToken, setUserToken] = useLocalStorage('userToken', '');
	const [user, setUser] = useState<User>();
	const changeToken = (token: string) => {
		setUserToken(token);
	};
	const value = { user, changeToken };

	useEffect(() => {
		if (userToken === '') {
			setUser(undefined);
		}
	}, [userToken]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

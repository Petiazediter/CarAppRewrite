import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
	useEffect,
} from 'react';
import { useDatabaseContext, User } from './DatabaseContext';
import useLocalStorage from '../customHooks/useLocalStorage';

export const UserContext = createContext<{
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>> | (() => void);
}>({
	user: undefined,
	setUser: () => {},
});

export default function UserContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [userId] = useLocalStorage('userId', '');
	const [user, setUser] = useState<User>();
	const value = { user, setUser };
	const databaseContext = useDatabaseContext();

	useEffect(() => {
		function getUser(uId: string | undefined): void {
			if (uId !== undefined) {
				const userIdAsNumber: number = +uId;
				databaseContext
					.getUserById(userIdAsNumber)
					.then((data) => setUser(data.user ? data.user : undefined));
			}
		}
		getUser(userId);
	}, [userId, databaseContext]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

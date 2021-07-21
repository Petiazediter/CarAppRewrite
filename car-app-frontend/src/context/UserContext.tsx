import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
	useEffect,
} from 'react';
import { User } from './DatabaseContext';
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
	const [, setUserId] = useLocalStorage('userId', '0');
	const [user, setUser] = useState<User>();
	const value = { user, setUser };

	useEffect(() => {
		return () => {
			if (user === undefined) {
				setUserId(''); // Remove
			} else {
				setUserId(`${user?.id}`);
			}
		};
	}, [user, setUserId]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

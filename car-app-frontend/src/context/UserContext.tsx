import {
	createContext,
	Dispatch,
	ReactElement,
	SetStateAction,
	useState,
	useEffect,
} from 'react';
import { User } from './DatabaseContext';

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
	const [user, setUser] = useState<User>();
	const value = { user, setUser };

	useEffect(() => {}, [user]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

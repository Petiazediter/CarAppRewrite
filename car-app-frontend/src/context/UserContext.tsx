import {
	ReactElement,
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';
import { User } from './DatabaseContext';

const initialValue = {};
const UserContext = createContext(initialValue);

export type UserContextValues = {
	user: User;
	setUser: Dispatch<SetStateAction<string>>;
};

export default function UserContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [user, setUser] = useState<User | null>(null);
	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			{children}
		</UserContext.Provider>
	);
}

import { createContext, ReactElement, useState } from 'react';
import { User } from './DatabaseContext';

type ContextType = {
	user: User | undefined;
};

export const UserContext = createContext<ContextType>({
	user: undefined,
});

export default function UserContextProvider({
	children,
}: {
	children: ReactElement;
}) {
	const [user] = useState<User>();

	return (
		<UserContext.Provider value={{ user: user }}>
			{children}
		</UserContext.Provider>
	);
}

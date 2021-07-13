import React, { FunctionComponent, ReactElement, useState } from 'react';

export type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

export const MyThemeContext = React.createContext<ThemeContextType>({
	isDark: false,
	toggleTheme: () => {},
});

export const ThemeContextProviderComponent: FunctionComponent<{
	children: ReactElement;
}> = ({ children }) => {
	const [isDark, setIsDark] = useState<boolean>(false);
	const toggleTheme = (): void => {
		setIsDark(!isDark);
	};

	return (
		<MyThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</MyThemeContext.Provider>
	);
};

export default ThemeContextProviderComponent;

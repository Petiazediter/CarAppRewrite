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
	const [isDark, setIsDark] = useState<boolean>(true);
	const toggleTheme = (): void => {
		setIsDark(!isDark);
		console.log(isDark);
	};

	const value = {
		isDark: isDark,
		toggleTheme: toggleTheme,
	};

	return (
		<MyThemeContext.Provider value={value}>{children}</MyThemeContext.Provider>
	);
};

export default ThemeContextProviderComponent;

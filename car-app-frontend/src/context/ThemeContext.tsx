import React, { FunctionComponent, ReactElement, useState } from 'react';
import useLocalStorage from '../customHooks/useLocalStorage';

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
	const [theme, setTheme] = useLocalStorage('theme', 'light');
	const [isDark, setIsDark] = useState<boolean>(theme === 'light');
	const toggleTheme = (): void => {
		setIsDark(!isDark);
		setTheme(isDark ? 'dark' : 'light');
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

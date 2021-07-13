import React, { FunctionComponent, ReactElement, useContext } from "react";

export type ThemeContext = {
    isDark: boolean
}

const MyThemeContext = React.createContext<ThemeContext>({isDark: false});

export function useThemeContext() {
    return useContext(MyThemeContext)
}

const ThemeContextProviderComponent: FunctionComponent<{children: ReactElement}>= ({children}) => {
    return (
        <MyThemeContext.Provider value={{isDark: false}}>
            {children}
        </MyThemeContext.Provider>
    )
}
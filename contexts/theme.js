import { useState, createContext } from 'react'

export const ThemeContext = createContext(null);

export function ThemeContextProvider({children}){
	const [theme, setTheme] = useState('dark')

	function toggleTheme(){
		setTheme(theme === 'light' ? 'dark' : 'light')
	}
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
		  {children}
		</ThemeContext.Provider>
	);
}
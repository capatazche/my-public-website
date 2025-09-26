import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the context's value
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// 1. Create the context with a default value
// The '!' is a non-null assertion, telling TypeScript we'll provide a value
const ThemeContext = createContext<ThemeContextType>(null!);

// 2. Create the Provider component
// This component will hold the actual state and logic
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. Create the custom hook to consume the context
// This is what your components will use
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
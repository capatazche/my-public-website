import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

// Define the shape of the context's value
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>(null!);

// Create the Provider component
// This component will hold the actual state and logic
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            setTheme(prefersLight ? 'light' : 'dark');
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme) {
            setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
        }
    };

    // IMPORTANT: Don't render children until the theme is known.
    // This prevents a flash of the wrong theme.
    if (!theme) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Create the custom hook to consume the context
// This is what your components will use
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
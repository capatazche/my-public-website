import { useState, useEffect } from 'react';

// Define the theme type
export type Theme = 'light' | 'dark';

// Define the shape of the object returned by the hook
interface UseThemeReturn {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
    const THEME_KEY = 'theme';

    // Explicitly type the state with our Theme type
    const [theme, setTheme] = useState<Theme>(() => {
        // The logic to get the initial theme is the same
        const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(pre-fers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};
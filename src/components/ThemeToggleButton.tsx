import { useTheme } from '../hooks/useTheme'; // Adjust the import path

export const ThemeToggleButton = () => {
    // TypeScript infers the types from the hook's return value
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};
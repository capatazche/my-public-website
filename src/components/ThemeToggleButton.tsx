import { useTheme } from '../contexts/ThemeContext.tsx';

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="bg-primary"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};
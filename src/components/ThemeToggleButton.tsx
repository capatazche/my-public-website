import { useTheme } from '../contexts/ThemeContext.tsx';
import { MoonIcon } from "./icons/MoonIcon.tsx";
import { SunIcon } from "./icons/SunIcon.tsx";

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="p-2 rounded-full hover:bg-secondary"
        >
            {theme === 'light' ? (
                <MoonIcon className="h-5 w-5" />
            ) : (
                <SunIcon className="h-5 w-5" />
            )}
        </button>
    );
};

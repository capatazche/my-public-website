import { useTheme } from '../contexts/ThemeContext.tsx';
import { AnimatedSunMoonIcon } from "./icons/AnimatedSunMoonIcon.tsx";

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
            <AnimatedSunMoonIcon theme={theme} className="h-5 w-5" />
        </button>
    );
};

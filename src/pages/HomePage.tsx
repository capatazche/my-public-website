import TechStack from "../components/TechStack.tsx";
import Hero from "../components/Hero.tsx";
import {ThemeToggleButton} from "../components/ThemeToggleButton.tsx";

export default function HomePage() {
    return (
        <div className="px-4">
            <ThemeToggleButton />
            <Hero />
            <TechStack />
        </div>
    );
}
import TechStack from "../components/TechStack.tsx";
import Hero from "../components/Hero.tsx";

export default function HomePage() {
    return (
        <div className="px-4">
            <Hero />
            <TechStack />
        </div>
    );
}
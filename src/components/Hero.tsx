// src/components/Hero.tsx

import GithubLogo from '../assets/react.svg';

export default function Hero() {
    return (
        <section className="text-center py-20">
            <h1 className="text-5xl font-bold tracking-tight">
                Bernardo Villalba Cahue
            </h1>

            {/* Uses the new muted foreground color */}
            <h2 className="mt-4 text-2xl text-[--muted-foreground]">
                Senior Software Engineer
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-lg">
                Welcome to my digital space. This website is a living project, built with some of my favorite technologies.
                It serves as both my portfolio and a practical demonstration of my skills.
            </p>

            <a
                href="https://github.com/your-username/your-repo" // <-- Don't forget to change this link!
                target="_blank"
                rel="noopener noreferrer"
                className="
                    mt-8 inline-flex items-center gap-3 px-6 py-3
                    bg-[--accent] text-white font-semibold rounded-lg /* Changed to your accent color */
                    transition-all duration-200 ease-in-out
                    hover:scale-105 hover:bg-[--accent-hover] /* Added your hover color */
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-offset-[--background] focus:ring-[--accent]
                "
            >
                <img src={GithubLogo} alt="GitHub Logo" className="w-6 h-6" />
                View Source on GitHub
            </a>
        </section>
    );
}
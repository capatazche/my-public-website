import GithubLogo from '../assets/github_white.svg';

export default function Hero() {
    return (
        <section className="text-center py-20">

            {/* Uses the new muted foreground color TODO: is this how the varibales would be referenced if I was to put them in root instead of layer base? */}
            <h2 className="text-3xl text-[--muted-foreground]">
                Hello
            </h2>
            <p className="mb-4">
                My name is
            </p>
            <h1 className="text-5xl font-bold tracking-tight">
                Bernardo Villalba Cahue
            </h1>

            <p className="mt-15 max-w-2xl mx-auto text-lg">
                Welcome to my digital space. This website is a living project, built with some of my favorite technologies.
            </p>

            <a
                href="https://github.com/capatazche/my-public-website"
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
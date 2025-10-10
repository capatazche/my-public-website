import { useTheme } from "../contexts/ThemeContext.tsx";
import { Link } from "react-router-dom";

import GithubLogoWhite from '../assets/github_white.svg';
import GithubLogoBlack from '../assets/github_black.svg';
import LinkedInLogo from '../assets/linkedin.svg';
import {useData} from "../hooks/useData.ts";

export default function Hero() {
    const { theme } = useTheme()
    const { personalInfo } = useData()

    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            {/* Decorative gradient spotlight background */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -z-10 h-[26rem] md:h-[22rem]">
                <div className="mx-auto h-full w-full md:w-[75%] md:rounded-full bg-accent/18 blur-2xl"></div>
            </div>

            <div className="mx-auto max-w-3xl text-center px-2">
                <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
                    {personalInfo.name}
                </h1>

                {personalInfo.title && (
                    <p className="mt-3 text-lg md:text-xl text-tertiary">
                        {personalInfo.title}
                    </p>
                )}

                <p className="mt-6 text-base md:text-lg text-secondary">
                    This site is a living project — open, iterative, and always evolving. It's built with modern web tech I enjoy using and learning from.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <Link
                        to="/resume"
                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:no-underline transition-transform duration-150"
                    >
                        View Resume
                    </Link>

                    <a
                        href="https://github.com/capatazche/my-public-website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-tertiary bg-bg-nav px-5 py-3 font-semibold text-secondary hover:no-underline hover:border-accent transition-transform duration-150"
                    >
                        <img src={theme === 'light' ? GithubLogoBlack : GithubLogoWhite} alt="GitHub" className="w-5 h-5" />
                        View Source Code
                    </a>

                    <a
                        href="#tech-stack"
                        className="inline-flex items-center gap-2 px-3 py-3"
                    >
                        Explore the stack →
                    </a>
                </div>

                {/* Socials */}
                <div className="mt-8 flex items-center justify-center gap-5 text-tertiary">
                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:no-underline hover:text-accent-hover">
                        <img src={LinkedInLogo} alt={`LinkedIn`} className={`h-5 w-5`}/>
                    </a>
                    |
                    <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:no-underline hover:text-accent-hover">
                        <img src={theme === 'light' ? GithubLogoBlack : GithubLogoWhite} alt="GitHub" className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}

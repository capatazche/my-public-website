import { useTheme } from "../contexts/ThemeContext.tsx";

import GithubLogoWhite from '../assets/github_white.svg';
import GithubLogoBlack from '../assets/github_black.svg';
import {useData} from "../hooks/useData.ts";

export default function Hero() {
    const { theme } = useTheme()
    const { personalInfo } = useData()

    return (
        <section className="text-center py-15">
            <h2 className="text-3xl text-secondary">
                Hello
            </h2>
            <p className="mb-4">
                My name is
            </p>
            <h1 className="text-5xl font-bold tracking-tight">
                {personalInfo.name}
            </h1>

            <p className="mt-15 max-w-2xl mx-auto text-lg">
                Welcome to my digital space. This website is a living project, built with some of my favorite technologies.
            </p>

            <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                    mt-8 inline-flex items-center gap-3 px-6 py-3
                    bg-bg-nav text-secondary font-semibold rounded-lg
                    transition-all duration-200 ease-in-out
                    hover:scale-105
                `}
            >
                <img src={theme === 'light' ? GithubLogoBlack : GithubLogoWhite} alt="GitHub Logo" className="w-6 h-6" />
                View Source on GitHub
            </a>
        </section>
    );
}

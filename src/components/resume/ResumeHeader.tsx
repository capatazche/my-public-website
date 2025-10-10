import LinkedInLogo from '../../assets/linkedin.svg';
import GithubLogoBlack from "../../assets/github_black.svg";
import GithubLogoWhite from "../../assets/github_white.svg";

import {useTheme} from "../../contexts/ThemeContext.tsx";

interface Props {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedinUrl: string;
    githubUrl: string;
}

export default function ResumeHeader({ name, title, location, email, linkedinUrl, githubUrl }: Props) {
    const { theme } = useTheme();

    return (
        <header className="flex flex-col items-center text-center py-8">
            <h1 className="text-4xl md:text-5xl font-extrabold">{name}</h1>
            <h2 className="text-xl md:text-2xl mt-2">{title}</h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                <span>{location}</span>
                <span>|</span>
                <a href={`mailto:${email}`}>{email}</a>
                <span>|</span>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <img src={LinkedInLogo} alt={`LinkedIn`} className={`h-5 w-5`}/>
                </a>
                <span>|</span>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <img src={theme === 'light' ? GithubLogoBlack : GithubLogoWhite} alt="GitHub" className="w-5 h-5" />
                </a>
            </div>
        </header>
    );
};

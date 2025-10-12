import ReactOnLightLogo from '../assets/reactOnLight.svg';
import ReactOnDarkLogo from '../assets/reactOnDark.svg';
import TypescriptLogo from '../assets/typescript.svg';
import TailwindLogo from '../assets/tailwind.svg';
import ViteLogo from '../assets/vite.svg';
import AmplifyLogo from '../assets/amplify.svg';
import TerraformOnLightLogo from '../assets/terraform_onLight.svg'
import TerraformOnDarkLogo from '../assets/terraform_onDark.svg';

import { useTheme } from "../contexts/ThemeContext.tsx";

const technologies = [
    {
        name: 'React',
        description: 'A powerful library for building dynamic user interfaces.',
        logoOnLight: ReactOnLightLogo,
        logoOnDark: ReactOnDarkLogo,
        shadowColorOnLight: '#087EA4',
        shadowColorOnDark: '#58C4DC',
        href: 'https://react.dev',
        className: 'react'
    },
    {
        name: 'TypeScript',
        description: 'Adds static types to JavaScript, improving code quality and maintainability.',
        logoOnLight: TypescriptLogo,
        logoOnDark: TypescriptLogo,
        shadowColorOnLight: '#3178c6',
        shadowColorOnDark: '#3178c6',
        href: 'https://www.typescriptlang.org/',
        className: ''
    },
    {
        name: 'Tailwind CSS v4',
        description: 'A utility-first CSS framework for rapid, custom UI development.',
        logoOnLight: TailwindLogo,
        logoOnDark: TailwindLogo,
        shadowColorOnLight: '#38bdf8',
        shadowColorOnDark: '#38bdf8',
        href: 'https://tailwindcss.com',
        className: ''
    },
    {
        name: 'Vite',
        description: 'A next-generation frontend tool for blazing-fast development.',
        logoOnLight: ViteLogo,
        logoOnDark: ViteLogo,
        shadowColorOnLight: '#646cff',
        shadowColorOnDark: '#646cff',
        href: 'https://vitejs.dev',
        className: ''
    },
    {
        name: 'AWS Amplify',
        description: 'The platform I will use for seamless hosting and CI/CD.',
        logoOnLight: AmplifyLogo,
        logoOnDark: AmplifyLogo,
        shadowColorOnLight: '#de2d34',
        shadowColorOnDark: '#de2d34',
        href: 'https://aws.amazon.com/amplify/',
        className: ''
    },
    {
        name: 'Terraform',
        description: 'IaC tool to manage the cloud infrastructure associated with this project',
        logoOnLight: TerraformOnLightLogo,
        logoOnDark: TerraformOnDarkLogo,
        shadowColorOnDark: '#a067da',
        shadowColorOnLight: '#7b42bc',
        href: 'https://developer.hashicorp.com/terraform',
        className: ''
    }
];

export default function TechStack() {
    const { theme } = useTheme();
    return (
        <section id="tech-stack" className="pt-12 pb-15">
            <div className="text-center">
                <h3 className="text-3xl font-bold">Built With</h3>
                <p className="mt-2">
                    The core technologies making this project possible.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {technologies.map((tech) => (
                    <div
                        key={tech.name}
                        className={`
                            flex flex-col items-center p-6 text-center
                            bg-bg-nav rounded-xl border border-transparent
                            transition-all duration-300
                            hover:border-accent hover:scale-[1.02]
                        `}
                    >
                        <a
                            href={tech.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={theme === 'light'? tech.logoOnLight : tech.logoOnDark} alt={`${tech.name} logo`}
                                style={
                                    {
                                        '--shadow-color': theme === 'light' ? tech.shadowColorOnLight : tech.shadowColorOnDark
                                    } as React.CSSProperties
                                }
                                className={`
                                    hover:drop-shadow-[0_0_2em_var(--shadow-color)]
                                    logo h-14 w-14 ${tech.className}
                                `}
                            />
                        </a>
                        <h4 className="mt-4 text-xl font-semibold">{tech.name}</h4>
                        <p className="mt-2 text-base text-secondary">
                            {tech.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

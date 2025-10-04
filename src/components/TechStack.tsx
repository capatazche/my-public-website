import ReactLogo from '../assets/react.svg';
import TypescriptLogo from '../assets/typescript.svg';
import TailwindLogo from '../assets/tailwind.svg';
import ViteLogo from '../assets/vite.svg';
import AmplifyLogo from '../assets/amplify.svg';

const technologies = [
    {
        name: 'React',
        description: 'A powerful library for building dynamic user interfaces.',
        logo: ReactLogo ,
        className: "react",
        shadowColor: '#61dafbcc',
        href: 'https://react.dev'
    },
    {
        name: 'TypeScript',
        description: 'Adds static types to JavaScript, improving code quality and maintainability.',
        logo: TypescriptLogo,
        className: "typescript",
        shadowColor: '#3178c6cc',
        href: 'https://www.typescriptlang.org/'
    },
    {
        name: 'Tailwind CSS v4',
        description: 'A utility-first CSS framework for rapid, custom UI development.',
        logo: TailwindLogo,
        className:"tailwind",
        shadowColor: '#06b6d4cc',
        href: 'https://tailwindcss.com'
    },
    {
        name: 'Vite',
        description: 'A next-generation frontend tool for blazing-fast development.',
        logo: ViteLogo,
        className:"vite",
        shadowColor: '#646cffcc',
        href: 'https://vitejs.dev'
    },
    {
        name: 'AWS Amplify',
        description: 'The platform I will use for seamless hosting and CI/CD.',
        logo: AmplifyLogo,
        className:"amplify",
        shadowColor: '#ff9900cc',
        href: 'https://aws.amazon.com/amplify/'
    },
];

export default function TechStack() {
    return (
        <section className="py-15">
            <div className="text-center">
                <h3 className="text-3xl font-bold">Built With</h3>
                <p className="mt-2">
                    The core technologies making this website possible.
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
                                src={tech.logo} alt={`${tech.name} logo`}
                                style={{ '--shadow-color': tech.shadowColor } as React.CSSProperties}
                                className={`
                                    hover:drop-shadow-[0_0_2em_var(--shadow-color)]
                                    logo h-14 w-14
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

import ReactLogo from '../assets/react.svg';
import TypescriptLogo from '../assets/typescript.svg';
import TailwindLogo from '../assets/tailwind.svg';
import ViteLogo from '../assets/vite.svg';
import AmplifyLogo from '../assets/amplify.svg';

const technologies = [
    // (The technologies array data remains exactly the same)
    { name: 'React', description: 'A powerful library for building dynamic user interfaces.', logo: ReactLogo , className: "react" },
    { name: 'TypeScript', description: 'Adds static types to JavaScript, improving code quality and maintainability.', logo: TypescriptLogo, className: "typescript" },
    { name: 'Tailwind CSS v4', description: 'A utility-first CSS framework for rapid, custom UI development.', logo: TailwindLogo, className:"tailwind" },
    { name: 'Vite', description: 'A next-generation frontend tool for blazing-fast development.', logo: ViteLogo, className:"vite" },
    { name: 'AWS Amplify', description: 'The platform I will use for seamless hosting and CI/CD.', logo: AmplifyLogo, className:"amplify" },
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
                        <img src={tech.logo} alt={`${tech.name} logo`} className={`${tech.className} logo h-14 w-14`} />
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
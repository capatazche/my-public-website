interface Props {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedinUrl: string;
}

export default function ResumeHeader({ name, title, location, email, linkedinUrl }: Props) {
    return (
        <header className="flex flex-col items-center text-center py-8">
            <h1 className="text-4xl md:text-5xl font-extrabold">{name}</h1>
            <h2 className="text-xl md:text-2xl mt-2">{title}</h2>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-tertiary">
                <span>{location}</span>
                <span>|</span>
                <a href={`mailto:${email}`}>{email}</a>
                <span>|</span>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
            </div>
        </header>
    );
};
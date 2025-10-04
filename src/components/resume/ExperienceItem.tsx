interface Props {
    title: string;
    organization: string;
    location: string;
    dateRange: string;
    details: string[];
}

export default function ExperienceItem({ title, organization, location, dateRange, details }: Props) {
    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="md:text-right">{dateRange}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-2">
                <p className="font-semibold">{organization}</p>
                <p className="md:text-right">{location}</p>
            </div>
            <ul className="list-disc list-inside space-y-1 text-start">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    );
};

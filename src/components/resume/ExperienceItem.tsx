interface Props {
    title: string;
    organization: string;
    location: string;
    dateRange: string;
    details: string[];
}

export default function ExperienceItem({ title, organization, location, dateRange, details }: Props) {
    return (
        // Usamos 'mb-6' (margin-bottom) para dar espacio entre cada item.
        <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
                <p className="text-slate-500 md:text-right">{dateRange}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-2">
                <p className="font-semibold text-slate-700">{organization}</p>
                <p className="text-slate-500 md:text-right">{location}</p>
            </div>
            {/* Mapeamos los detalles para crear una lista de bullet points */}
            <ul className="list-disc list-inside text-slate-600 space-y-1">
                {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    );
};
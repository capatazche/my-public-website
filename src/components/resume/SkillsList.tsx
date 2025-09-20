interface Props {
    category: string;
    skills: string[];
}

export default function SkillsList({ category, skills }: Props) {
    return (
        <div className="mb-4">
            <h4 className="font-semibold text-slate-800 mb-2">{category}:</h4>
            {/* 'flex-wrap' es la magia aquí. Permite que los items pasen a la siguiente línea si no hay espacio. */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span key={index} className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
            {skill}
          </span>
                ))}
            </div>
        </div>
    );
};
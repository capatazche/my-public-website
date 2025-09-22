interface Props {
    category: string;
    skills: string[];
}

export default function SkillsList({ category, skills }: Props) {
    return (
        <div className="mb-4">
            <h4 className="font-semibold mb-2 mt-1">{category}:</h4>
            {/* 'flex-wrap' es la magia aquí. Permite que los items pasen a la siguiente línea si no hay espacio. */}
            <div className="flex flex-wrap gap-2 justify-center">
                {skills.map((skill, index) => (
                    <span
                        key={index}
                        className="
                            bg-bg-nav text-sm font-medium px-3 py-1 rounded-full
                            hover:text-accent"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};
interface Props {
    title: string;
    children: React.ReactNode;
}

export default function ResumeSection({ title, children }: Props) {
    return (
        // Usamos 'py-6' (padding-top/bottom) para crear separación vertical entre secciones.
        <section className="py-6 border-b border-slate-200 last:border-b-0">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">
                {title}
            </h2>
            {children}
        </section>
    );
};
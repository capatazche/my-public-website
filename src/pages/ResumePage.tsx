import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeSection  from '../components/resume/ResumeSection';
import ExperienceItem from '../components/resume/ExperienceItem';
import SkillsList from '../components/resume/SkillsList';
import {useData} from "../hooks/useData.ts";

import resumeFileUrl from "../assets/resume.pdf";

export default function ResumePage() {
    const { personalInfo, resume } = useData()

    return (
        <div className="mx-auto p-2 md:p-4">
            <div className="relative">
                <ResumeHeader {...personalInfo} />

                <div className="absolute top-0 right-0 md:p-2">
                    <a
                        href={resumeFileUrl}
                        download={`${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`} // Dynamic filename
                        className={`
                            inline-flex items-center gap-2 px-3 py-2
                            rounded-lg bg-bg-nav opacity-60 md:opacity-100
                            transition-all duration-250 ease-in-out
                        `}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="35" height="35" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="1"
                             strokeLinecap="round" strokeLinejoin="round"
                             aria-label="Download resume">
                            {/* Paper / document rectangle */}
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                            {/* Download arrow */}
                            <path d="M12 8v6"/>
                            <path d="M8 12l4 4 4-4"/>
                            {/* Base line */}
                            <path d="M8 18h8"/>
                        </svg>


                    </a>
                </div>
            </div>

            <ResumeSection title="Summary">
                <p className="text-justify">{resume.summary}</p>
            </ResumeSection>

            <ResumeSection title="Technical Skills">
                <SkillsList category="Languages" skills={resume.skills.languages} />
                <SkillsList category="Cloud & DevOps" skills={resume.skills.cloudDevOps} />
                <SkillsList category="Data Science" skills={resume.skills.dataScience} />
                <SkillsList category="Backend" skills={resume.skills.backend} />
                <SkillsList category="Frontend" skills={resume.skills.frontend} />
                <SkillsList category="Developer Tools" skills={resume.skills.developerTools} />
            </ResumeSection>

            <ResumeSection title="Experience">
                <>
                    {resume.experience.map((job, index) => (
                        <ExperienceItem key={index} {...job} />
                    ))}
                </>
            </ResumeSection>

            {/* Puedes seguir agregando las demás secciones como Proyectos, Educación, etc. */}
            {/* Ejemplo de la sección de Educación */}
            <ResumeSection title="Education">
                <>
                    {resume.education.map((edu, index) => (
                        <ExperienceItem key={index} {...edu} />
                    ))}
                </>
            </ResumeSection>
        </div>
    );
};

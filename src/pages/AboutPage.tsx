import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeSection  from '../components/resume/ResumeSection';
import ExperienceItem from '../components/resume/ExperienceItem';
import SkillsList from '../components/resume/SkillsList';

// En un futuro, podrías mover estos datos a un archivo data.ts o un JSON.
const resumeData = {
    header: {
        name: "Bernardo Villalba Cahue",
        title: "Senior Software Engineer | Data-Intensive Systems & FinTech",
        location: "Greater Minneapolis-St. Paul Area",
        email: "bernardovillalbac@gmail.com",
        linkedinUrl: "https://www.linkedin.com/in/bernardo-villalba-cahue"
    },
    summary: "Senior Software Engineer with 9+ years of experience specializing in data-intensive systems and FinTech. Expertise in architecting and scaling distributed full-stack applications, complex data pipelines, and modern cloud infrastructure. Proven ability to lead technical projects from concept to production, translating complex business needs into robust and efficient software solutions.",
    experience: [
        {
            title: "Founder & Lead Software Engineer",
            organization: "Narranomics",
            location: "Minneapolis, Minnesota, United States",
            dateRange: "May 2023 - Present",
            details: [
                "Led the development of an AI-driven, sentiment-based trading platform from concept to production, achieving and maintaining near 100% uptime.",
                "Developed and deployed a daily automated job to scrape and ingest publications from the Federal Reserve, expanding the platform's data sources to include key macroeconomic signals.",
                "Owned the entire front-end development lifecycle using React and TypeScript, including a specialized data-labeling application that improved the quality of our NLP model training data.",
                "Designed and implemented a parallelized simulation framework using Docker, Argo Workflows, and AWS to backtest thousands of trading strategy parameters, reducing the R&D cycle from days to hours—an efficiency gain of over 90%.",
                "Translated business goals into a technical roadmap, led full-stack architectural decisions, and presented the platform's strategy and performance to prospective investors and key stakeholders."
            ]
        },
        {
            title: "Software Engineer, Science and Modeling",
            organization: "CIBO Technologies",
            location: "Minneapolis, Minnesota, United States",
            dateRange: "June 2021 - May2023",
            details: [
                "Maintained and scaled a complex data processing pipeline to support the science and modeling team's research and development efforts.",
                "Developed Python scripts to automate data tabulation and analysis, improving the efficiency of data preparation for modeling.",
                "Built and executed custom simulations using a variety of data inputs to deliver key modeling insights for external clients."
            ]
        },
    ],
    education: [
        {
            title: "Master's degree, Cognitive and Decision Making Sciences",
            organization: "UCL",
            location: "",
            dateRange: "2017-2018",
            details: []
        },
        // ... agrega el resto de tu educación
    ],
    skills: {
        languages: ["Python", "Kotlin", "Java", "TypeScript/JavaScript", "Scala", "SQL", "Matlab"],
        cloudDevOps: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Argo Workflows", "Ansible", "TeamCity", "uDeploy", "SBT"],
        // ... agrega el resto de las categorías de skills
    },
    // ... más secciones
};


export default function AboutPage() {
    return (
        <div className="mx-auto p-2 md:p-4">
            <ResumeHeader {...resumeData.header} />

            <ResumeSection title="Summary">
                <p className="text-justify">{resumeData.summary}</p>
            </ResumeSection>

            <ResumeSection title="Experience">
                <>
                    {resumeData.experience.map((job, index) => (
                        <ExperienceItem key={index} {...job} />
                    ))}
                </>
            </ResumeSection>

            {/* Puedes seguir agregando las demás secciones como Proyectos, Educación, etc. */}
            {/* Ejemplo de la sección de Educación */}
            <ResumeSection title="Education">
                <>
                    {resumeData.education.map((edu, index) => (
                        <ExperienceItem key={index} {...edu} />
                    ))}
                </>
            </ResumeSection>


            <ResumeSection title="Additional Information">
                <SkillsList category="Technical Skills" skills={resumeData.skills.languages} />
                <SkillsList category="Cloud & DevOps" skills={resumeData.skills.cloudDevOps} />
                {/* ... más SkillsLists ... */}
            </ResumeSection>
        </div>
    );
};
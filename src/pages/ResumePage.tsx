import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeSection  from '../components/resume/ResumeSection';
import ExperienceItem from '../components/resume/ExperienceItem';
import SkillsList from '../components/resume/SkillsList';

import resumeUrl from '../assets/bernardo_public_SWE_Sep30_2025.pdf';

// TODO: mover estos datos a un archivo data.ts o un JSON.
const resumeData = {
    header: {
        name: "Bernardo Villalba Cahue",
        title: "Senior Software Engineer | Data-Intensive Systems & FinTech",
        location: "Minneapolis, MN",
        email: "bernardo@bernardovc.dev",
        linkedinUrl: "https://www.linkedin.com/in/bernardo-villalba-cahue",
        githubUrl: "https://github.com/capatazche"
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
            dateRange: "June 2021 - May 2023",
            details: [
                "Maintained and scaled a complex data processing pipeline to support the science and modeling team's research and development efforts.",
                "Developed Python scripts to automate data tabulation and analysis, improving the efficiency of data preparation for modeling.",
                "Built and executed custom simulations using a variety of data inputs to deliver key modeling insights for external clients."
            ]
        },
        {
            title: "Full Stack Software Developer",
            organization: "CarVal Investors",
            location: "Minneapolis, Minnesota, United States",
            dateRange: "June 2020 - May 2021",
            details: [
                "Played a key role in a small agile team that migrated software development from a third-party vendor to an in-house team.",
                "Contributed across the full product lifecycle, including product ownership, UX design, and full-stack software engineering.",
                "Focused on the development, maintenance, and strategic consolidation of internal business and investment analysis applications."
            ]
        },
        {
            title: "Software Engineer",
            organization: "Virgin Pulse",
            location: "Minneapolis, Minnesota, United States",
            dateRange: "January 2019 - June 2020",
            details: [
                "Developed and maintained features for a complex rules engine that executed gamified rewards to nudge members towards healthier behaviors.",
                "Served as a key contributor on the team that built the company's live services coaching platform from the ground up.",
                "Engineered solutions that incorporated third-party software, including Salesforce Health Cloud, into the core platform."
            ]
        },
        {
            title: "Technology Analyst (Software Engineer)",
            organization: "Deutsche Bank",
            location: "Cary, North Carolina, United States",
            dateRange: "July 2016 - September 2017",
            details: [
                "Implemented new features and documented code for DB Entitlements, the bank's largest internal authorization application.",
                "Developed a new UI for the Distressed Products Group to visualize and edit complex financial instruments.",
                "Automated the generation of three weekly reports for the trading team, saving approximately 9 person-hours per month."

    ]
        },
    ],
    education: [
        {
            title: "Master's degree, Cognitive and Decision Making Sciences",
            organization: "University College London (UCL)",
            location: "London, England, United Kingdom",
            dateRange: "2017 - 2018",
            details: [
                "CONACYT - FUNED scholarship recipient."
            ]
        },
        {
            title: "Bachelor's degree, Mathematics with a focus on Computer Applications",
            organization: "University of Minnesota - Twin Cities",
            location:  "Minneapolis, Minnesota, Unites States",
            dateRange: "2012 - 2016",
            details: [
                "Deans List of College of Science and Engineering (Fall 2012, Spring 2013, Spring 2014).",
                "Global Excellence Scholarship recipient.",
                "School of Mathematics Maximillian Lando Scholarship recipient.",
                "J.A. Wedum Foundation Scholarship recipient."
]
        }
    ],
    skills: {
        languages: ["Python", "Kotlin", "Java", "TypeScript/JavaScript", "Scala", "SQL", "Matlab"],
        cloudDevOps: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Argo Workflows", "Ansible", "TeamCity", "uDeploy", "SBT"],
        dataScience: [ "Pandas", "NumPy", "DuckDB", "Scikit-learn", "NLP", "Time-Series Analysis"],
        backend: ["Spring", "Flask", "PostgreSQL", "Cassandra", "Apache Storm", "Jinja2"],
        frontend: ["React", "Angular/AngularJS", "Bootstrap", "Ui-Grid"],
        developerTools: ["Git", "Github", "Bitbucket", "SVN", "Jira", "Pytest", "Cypress", "Salesforce", "Intellij", "Linux"]
    },
    // ... más secciones
};


export default function ResumePage() {
    return (
        <div className="mx-auto p-2 md:p-4">
            <div className="relative">
                <ResumeHeader {...resumeData.header} />

                <div className="absolute top-0 right-0 md:p-2">
                    <a
                        href={resumeUrl}
                        download="BernardoVillalbaCahue_Resume.pdf"   // The desired filename for the user
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


            <ResumeSection title="Technical Skills">
                <SkillsList category="Languages" skills={resumeData.skills.languages} />
                <SkillsList category="Cloud & DevOps" skills={resumeData.skills.cloudDevOps} />
                <SkillsList category="Data Science" skills={resumeData.skills.dataScience} />
                <SkillsList category="Backend" skills={resumeData.skills.backend} />
                <SkillsList category="Frontend" skills={resumeData.skills.frontend} />
                <SkillsList category="Developer Tools" skills={resumeData.skills.developerTools} />
            </ResumeSection>
        </div>
    );
};
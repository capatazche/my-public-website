// Defines the structure for a single experience or education item.
export interface ExperienceItem {
    title: string;
    organization: string;
    location: string;
    dateRange: string;
    details: string[];
}

// Defines the structure for the skills section.
export interface Skills {
    languages: string[];
    cloudDevOps: string[];
    dataScience: string[];
    backend: string[];
    frontend: string[];
    developerTools: string[];
}

// Defines basic personal contact and social media information.
export interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedinUrl: string;
    githubUrl: string;
}

// Defines the structure for the resume content.
export interface Resume {
    summary: string;
    experience: ExperienceItem[];
    education: ExperienceItem[];
    skills: Skills;
}

// This is the main type that represents the entire personal-data.json file.
export interface PersonalData {
    personalInfo: PersonalInfo;
    resume: Resume;
}

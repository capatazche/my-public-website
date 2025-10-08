export interface ExperienceItem {
    title: string;
    organization: string;
    location: string;
    dateRange: string;
    details: string[];
}

export interface Skills {
    languages: string[];
    cloudDevOps: string[];
    dataScience: string[];
    backend: string[];
    frontend: string[];
    developerTools: string[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedinUrl: string;
    githubUrl: string;
}

export interface Resume {
    summary: string;
    experience: ExperienceItem[];
    education: ExperienceItem[];
    skills: Skills;
}

export interface Website {
    name: string;
}

// This is the main type that represents the entire data.json file.
export interface PersonalData {
    website: Website;
    personalInfo: PersonalInfo;
    resume: Resume;
}

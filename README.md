# Personal Website & Portfolio Template

A minimalist, fast, and accessible template for your personal site, built with React, TypeScript, Vite, Tailwind CSS v4, and React Router. It includes a theme toggle (light/dark), a home page with a tech stack showcase, and a resume page with a downloadable PDF.

## Features

- React 19 + TypeScript + Vite 7 for a modern, fast DX
- Tailwind CSS v4 with CSS variables and design tokens (custom @theme)
- Dark/Light theme toggle persisted in localStorage and applied early to avoid FOUC
- Client-side routing with React Router (Home, Resume)
- Responsive navigation with mobile menu
- Resume page with structured sections and downloadable PDF
- Clean, strict TypeScript configuration and ESLint rules

## How to Use This as a Template

This repository is designed to be a turnkey solution for your own personal website. To get started, follow these high-level steps:

**1. Get the Code:**
- **Fork** this repository to your own GitHub account.
- **Clone** your forked repository to your local machine.

**2. Personalize the Content:**
- **Update Components:** Go through the components in `src/` (especially in `src/pages/` and `src/components/`) and replace my information with your own. *TODO: generalize in a JSON file.
- **Replace Resume:** Add your own resume PDF to the `public/` folder and update the link in `src/pages/ResumePage.tsx`. *TODO: standardize it.

**3. Configure Your Infrastructure (AWS & Terraform):**
- **Prerequisites:** You will need your own **AWS account** and a **custom domain name** you have registered.
- **Set Up Variables:** In the `infra/` directory, copy the `terraform.tfvars.example` file to a new file named `terraform.tfvars`. Fill this file out with your own information:
    - `domain_name`: Your custom domain (e.g., "my-cool-site.com").
    - `repository_url`: The URL of **your forked GitHub repository**.
    - `aws_region`: The AWS region you want to deploy to.
- **Connect AWS:** Ensure your AWS CLI is configured with credentials for your account (`aws configure`). Terraform will use these credentials to create the necessary resources.

Once you deploy the infrastructure using Terraform, AWS Amplify will provide you with the necessary **DNS records**. You must add these records in your domain registrar's settings to verify your domain and point it to your new website.

## Tech Stack

- Framework: React 19, React Router 7
- Language: TypeScript 5
- Build tool: Vite 7
- Styling: Tailwind CSS v4 (@tailwindcss/vite)
- Linting: ESLint (typescript-eslint, react-hooks, react-refresh)

## Getting Started

Prerequisites:
- Node.js 20.x (Amplify build uses Node 20)
- npm (or yarn/pnpm if you prefer; scripts assume npm)

Install dependencies:

<pre><code>
npm install
</code></pre>

Start the dev server:

```bash
npm run dev
```

Open your browser at http://localhost:5173 (default Vite port).

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the code:

```bash
npm run lint
```

## Project Structure

```
my-personal-website/
├─ src/
│  ├─ App.tsx               # App layout and sticky Navbar
│  ├─ main.tsx              # Router + app bootstrap
│  ├─ index.css             # Tailwind v4 setup, CSS variables, base styles
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  └─ ResumePage.tsx     # Resume content and PDF download link
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ ThemeToggleButton.tsx
│  │  ├─ Hero.tsx
│  │  ├─ TechStack.tsx
│  │  └─ resume/
│  │     ├─ ResumeHeader.tsx
│  │     ├─ ResumeSection.tsx
│  │     ├─ ExperienceItem.tsx
│  │     └─ SkillsList.tsx
│  └─ contexts/
│     └─ ThemeContext.tsx   # Provides theme state and toggle
├─ public/
│  └─ ...                   # Static assets (favicon, resume PDF)
├─ infra/
│  ├─ main.tf               # Terraform config for AWS Amplify + IAM + domain
│  └─ ... 
├─ index.html               # Early theme application to avoid FOUC
├─ vite.config.ts           # Vite + @tailwindcss/vite + React plugin
├─ tailwind.config.js       # Tailwind content globs
├─ package.json             # Scripts and dependencies
└─ README.md
```

## Theming

- Theme state is managed in src/contexts/ThemeContext.tsx and persisted to localStorage.
- index.html applies the saved or preferred color scheme before React mounts to prevent flashes.
- Colors are defined with CSS variables in src/index.css under a custom @theme block and a [data-theme="light"] override.

## Routing

- React Router is set up in src/main.tsx.
- Routes:
  - / → HomePage
  - /resume → ResumePage

## Resume PDF *TODO: standardize it.

- The ResumePage includes a download button that points to a PDF in the public/ folder.
- To update the file, replace the PDF in public/ and update the path in src/pages/ResumePage.tsx if the filename changes.

Current path in code: public/bernardo_public_SWE_Sep30_2025.pdf

## Environment Variables

- The app does not require environment variables for local development.
- If you add integrations later, prefer Vite’s VITE_ prefixed variables and do not commit secrets.

## Setup & Deployment (AWS Amplify + Terraform)

The `infra/` directory automates setup of AWS Amplify hosting, IAM roles, and domain linkage.

**1. Configure Variables**
```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
```
Edit `terraform.tfvars`:
```hcl
domain_name    = "my-domain.com"
repository_url = "https://github.com/your-username/your-fork"
aws_region     = "us-east-1"
```

**2. Initialize & Apply**
```bash
terraform init
terraform apply
```

**3. Complete Amplify Setup**
- In the AWS console, go to the newly created Amplify app and connect your GitHub repository.
- Add the provided CNAME record to your domain registrar for SSL and DNS verification.
- After verification, your site will be live at your custom domain. 🎉

## Scripts

- dev: Start the Vite dev server
- build: Type-check + build production assets to dist
- preview: Serve the built app locally
- lint: Run ESLint across the project

## Contributing

This is a personal project; issues and PRs are welcome but may be reviewed at the author’s discretion.

## License

No license specified. All rights reserved by the repository owner unless stated otherwise.

# My Personal Website

A minimalist, fast, and accessible personal site built with React, TypeScript, Vite, Tailwind CSS v4, and React Router. It includes a theme toggle (light/dark), a home page with a tech stack showcase, and a resume page with a downloadable PDF.

If deployed, the site is intended to live at: https://bernardovc.dev

## Features

- React 19 + TypeScript + Vite 7 for a modern, fast DX
- Tailwind CSS v4 with CSS variables and design tokens (custom @theme)
- Dark/Light theme toggle persisted in localStorage and applied early to avoid FOUC
- Client-side routing with React Router (Home, Resume)
- Responsive navigation with mobile menu
- Resume page with structured sections and downloadable PDF
- Clean, strict TypeScript configuration and ESLint rules

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

```bash
npm install
```

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

## Resume PDF

- The ResumePage includes a download button that points to a PDF in the public/ folder.
- To update the file, replace the PDF in public/ and update the path in src/pages/ResumePage.tsx if the filename changes.

Current path in code: public/bernardo_public_SWE_Sep30_2025.pdf

## Environment Variables

- The app does not require environment variables for local development.
- If you add integrations later, prefer Vite’s VITE_ prefixed variables and do not commit secrets.

## Deployment (AWS Amplify via Terraform)

Infrastructure-as-code is under infra/main.tf and includes:
- An IAM user for development (AdministratorAccess attached) — intended for personal use.
- An IAM role for Amplify deployments with AdministratorAccess-Amplify.
- An Amplify App, a production Branch (main), and a Domain association for bernardovc.dev.

High-level steps:
1) Ensure you have: Terraform, AWS CLI configured, and appropriate credentials/profiles.
2) Set the required Terraform variable aws_region (e.g., via a terraform.tfvars file or -var flags).
3) Review provider profile in infra/main.tf (profile = "bernardovc-terraform-admin").
4) terraform init && terraform apply.
5) Connect the Amplify App to this GitHub repo in the AWS console if not already connected.
6) Configure the domain DNS per the outputs (SSL verification CNAME). Wait for verification.

Amplify build uses:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 20
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## Scripts

- dev: Start the Vite dev server
- build: Type-check + build production assets to dist
- preview: Serve the built app locally
- lint: Run ESLint across the project

## Contributing

This is a personal project; issues and PRs are welcome but may be reviewed at the author’s discretion.

## License

No license specified. All rights reserved by the repository owner unless stated otherwise.

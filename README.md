# Personal Website & Portfolio Template

A minimalist, fast, and accessible personal site template built with React, TypeScript, Vite, and Tailwind CSS.  
Includes a theme toggle, a home page with a tech stack showcase, and a resume page with a downloadable PDF.

## Features

- ⚡ Modern stack: React 19, TypeScript 5, Vite 7
- 🎨 Tailwind CSS v4 with CSS variables and design tokens
- 🌓 Light/dark theme toggle (persisted in `localStorage`, applied early to avoid FOUC)
- 📄 Resume page with structured sections and downloadable PDF
- 📱 Responsive navigation with mobile menu
- 🧭 Client-side routing with React Router
- ✅ Strict TypeScript + ESLint setup

## Using This Template

**1. Get the Code:**
- **Fork** this repository to your own GitHub account.
- **Clone** your forked repository to your local machine.

**2. Personalize the Content:**
- **Update Personal Data:** Go to `src/data/data.json` and replace my information with your own.
- **Replace Resume:** Replace the `resume.pdf` file in the `src/assets/` folder with your own resume (must be named `resume.pdf`).

## Tech Stack

| Category | Tools |
|-----------|-------|
| Framework | React 19, React Router 7 |
| Language  | TypeScript 5 |
| Build     | Vite 7 |
| Styling   | Tailwind CSS v4 (@tailwindcss/vite) |
| Linting   | ESLint (typescript-eslint, react-hooks, react-refresh) |

## Getting Started

**Requirements**
- Node.js ≥ 20 (used by AWS Amplify)
- npm (or yarn/pnpm)

**Install & Run**
```bash
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to preview.

**Build & Preview**
```bash
npm run build
npm run preview
```

**Lint**
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
│  │  └─ ResumePage.tsx     
│  ├─ components/
│  │  ├─ Navbar.tsx
│  │  ├─ ThemeToggleButton.tsx
│  │  ├─ Hero.tsx
│  │  ├─ TechStack.tsx
│  │  └─ resume/...
│  └─ contexts/
│     └─ ThemeContext.tsx   # Theme state and toggle
├─ public/
│  └─ ...                   
├─ infra/
│  ├─ main.tf               # Terraform config for AWS Amplify + IAM + domain
│  └─ ... 
├─ index.html               # Early theme application to avoid FOUC
├─ vite.config.ts           # Vite + @tailwindcss/vite + React plugin
├─ tailwind.config.js       # Tailwind content globs
├─ package.json             
└─ README.md
```

## Theming

- Managed in `ThemeContext.tsx` and persisted to `localStorage`.
- Applied early via `index.html` to avoid flashes.
- Colors defined in `index.css` under custom `@theme` block and `[data-theme="light"]` override.

## Routing

- Defined in `src/main.tsx`
    - `/` → HomePage
    - `/resume` → ResumePage

## Deployment (AWS Amplify + Terraform)

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

| Command | Description                         |
|----------|-------------------------------------|
| `npm run dev` | Start the Vite dev server           |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview built app locally           |
| `npm run lint` | Run ESLint                          |

## Contributing

Personal project; issues and PRs are welcome but may be reviewed at the author’s discretion.

## License

No license specified. All rights reserved by the repository owner unless stated otherwise.

## Visitor Tracking (Amplify Gen 2)

This project uses Amplify Gen 2 Data to track visitors in two DynamoDB models:

- Stats: Stores counters for totalVisitors and uniqueVisitors.
- Visitor: Stores each visitorId, lastSeen, and expirationTime (30 days out).

How it works:
- On app start, the client generates/persists a visitorId in localStorage and calls a custom mutation trackVisit.
- The mutation is implemented as a Lambda function that atomically:
  - Upserts the Visitor record, updating lastSeen and pushing expirationTime 30 days forward.
  - Increments Stats.totalVisitors (+1 always) and Stats.uniqueVisitors (+1 only if the visitor is new).

Key files:
- amplify/data/resource.ts: Models and the custom trackVisit mutation
- amplify/functions/track-visit: Lambda definition and handler
- src/lib/visitorTracking.ts: Client helper that invokes the mutation
- src/main.tsx: Boots visitor tracking after Amplify.configure

Deployment notes:
- After pulling/pushing the backend (amplify push), the function and schema will be deployed.
- Default authorization mode is identityPool, and both guest and authenticated users are allowed to call trackVisit.

# FlowForge

Premium personal portfolio for an independent full-stack developer, automation builder, and SEO specialist.

**Tagline:** Build. Automate. Scale.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Framer Motion**
- **Recharts**
- **Supabase** (PostgreSQL + Auth)
- **React Hook Form** + **Zod**
- Deployed on **Vercel**

## Features

- Single-page portfolio with sticky navigation
- Animated hero pipeline visualization
- Case-study project cards with challenge/solution/outcome
- Skills section with animated progress bars
- Contact form with validation (saved to Supabase)
- Admin dashboard at `/dashboard` with Recharts analytics
- Email whitelist authentication (`ADMIN_EMAILS`)
- SEO: metadata, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt

## Getting Started

### 1. Clone and install

```bash
npm install
```

### 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your site URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `ADMIN_EMAILS` | Comma-separated admin emails |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub profile URL |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile URL |

### 3. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in **SQL Editor**:

   ```
   supabase/migrations/001_create_contacts.sql
   ```

3. Enable **Email** auth provider under Authentication → Providers
4. Create an admin user under Authentication → Users with an email listed in `ADMIN_EMAILS`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

- Portfolio: `/`
- Admin login: `/login`
- Dashboard: `/dashboard`

## Project Structure

```
src/
├── app/              # Routes, layouts, SEO
├── components/       # UI, sections, layout, dashboard
├── lib/              # Supabase, auth, constants, validations
├── actions/          # Server actions (contact, leads)
└── types/            # TypeScript types
supabase/migrations/  # Database SQL
public/               # Static assets (resume.pdf)
```

## Customization

- **Stats:** Edit placeholder values in `src/lib/constants/stats.ts`
- **Skills:** Edit proficiency levels in `src/lib/constants/skills.ts`
- **Projects:** Edit case studies in `src/lib/constants/projects.ts`
- **Resume:** Replace `public/resume.pdf` with your resume
- **Analytics:** Set `NEXT_PUBLIC_VERCEL_ANALYTICS=true`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local.example`
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## License

Private — FlowForge

# NKM Advocates Website Pivot

## Overview
The NKM Advocates website has been pivoted from a solo-advocate site to a multi-disciplinary law firm with two membership communities (SME Club and Diaspora Club). The redesign aligns with the provided HTML mockup and strategy document, emphasizing a team-based approach, clear service departments, and community engagement.

## Key Changes

### Design System
- Updated CSS custom properties to match the NKM v2 design system (colors: --ink, --stone, --brass, --clay, etc.).
- Updated fonts: Fraunces (headings), Inter (body), IBM Plex Mono (accents).
- Added utility classes for eybrow, buttons, dividers, and reveal animations.

### Layout & Components
- **SiteHeader.tsx**: Added topbar (hours, social links), sticky header with logo (NKM ADVOCATES / ADVOCATES & CONSULTANTS), navigation menu with dropdown for departments, CTA button, and mobile menu.
- **SiteFooter.tsx**: Updated to match mockup footer layout with columns for departments, firm, quick links, and newsletter.
- **index.tsx**: Completely rewritten homepage with the following sections:
  1. Hero (with SVG skyline overlay, headline, subtext, CTA buttons)
  2. Explore strip (links to departments, serve, insights, podcast, team)
  3. About teaser (two-column layout)
  4. How it works (4-step process grid)
  5. Departments carousel (horizontal scrollable cards with hover effect)
  6. Who we serve (three audience cards: Kenya, Diaspora, Investors)
  7. Insights (grid of insight cards)
  8. Podcast section (episode grid)
  9. Team teaser (avatar row and description)
  10. Final CTA (seal, heading, paragraph, buttons)
  11. Footer (included via SiteFooter)

### Data & Logic
- **practice-areas.ts**: Updated to eight department entries matching the mockup:
  - Corporate Governance & Company Secretarial
  - Property & Real Estate Law
  - Business & Startup Law
  - Business & SME Advisory
  - Debt Recovery & Small Claims
  - Mediation, Arbitration & ADR
  - Intellectual Property
  - NGO & Non-Profit Registration
  - Family Law
  - Data Protection
  (Note: Some entries retained from original; all eight departments represented.)
  Added `getPracticeArea` helper function for dynamic route loading.
- **Environment Variables**: Updated `.env` with Supabase, Gemini, and Resend keys.

### Additional Features
- Glassmorphism navigation bar component (`src/components/ui/glassmorphism-navbar.tsx`) available for use (requires framer-motion).
- Reveal-on-scroll animation applied to elements with `.reveal` class.
- Responsive design breakpoints matching the mockup.

## Benefits
- **Trust**: Presents as a firm, not a solo practitioner, reducing key‑person risk.
- **Clarity**: Clear department structure helps visitors understand service offerings.
- **Engagement**: Two membership communities (SME Club, Diaspora Club) encourage long‑term relationships.
- **Conversion**: Prominent CTAs and easy navigation guide users to contact.
- **SEO & Performance**: Built with TanStack Start, Vite, and Tailwind for fast loading and good SEO.

## Implementation Files Changed
- `src/styles.css` – design system overhaul
- `src/routes/__root.tsx` – updated font imports and metadata
- `src/components/SiteHeader.tsx` – new header with topbar and sticky behavior
- `src/components/SiteFooter.tsx` – new footer layout
- `src/routes/index.tsx` – completely rewritten homepage
- `src/lib/practice-areas.ts` – updated to eight departments + helper
- `.env` – updated environment variables
- `src/components/ui/glassmorphism-navbar.tsx` – new optional component

## Dependencies Added
- `framer-motion` (for glassmorphism navbar animations)
- `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/react-start` (already present)
- `lucide-react` (already present)
- `tailwindcss`, `tw-animate-css` (already present)

## How to Run
1. `npm install` (or `npm ci`)
2. `npm run dev` – starts development server at http://localhost:3000
3. `npm run build` – produces production build in `.output`
4. `npm run preview` – preview production build locally

## Notes
- The site is now fully aligned with the HTML mockup and strategy.
- All sections are responsive and include the interactions described in the mockup (hover effects, scrolling reveals, etc.).
- The glassmorphism navbar is optional and can be imported where needed.
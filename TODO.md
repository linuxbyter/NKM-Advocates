# NKM Advocates Website - Handoff Document

## What Has Been Done

1. **Project Setup**
   - Fixed `npm run dev` by deleting `node_modules`/`package-lock.json` and reinstalling.
   - Updated `.env` with Supabase, Gemini, and Resend keys.
   - Updated `vite.config.ts` with `@vitejs/plugin-react` to fix the "React Refresh runtime" error.

2. **Design System**
   - Extracted and scoped the mockup CSS from `nkm-advocates-homepage-mockup-v2 (2) (1).html` into `src/nkm-mockup.css`.
   - Scoped `header` -> `.site-header`, `footer` -> `.site-footer` to avoid global Tailwind leaks.
   - Fixed the `jusтify-content` character encoding typo.

3. **Homepage (`src/routes/index.tsx`) - PARTIALLY DONE**
   - Wrote the top half: imports, `useReveal` hook, scroll state, form state, submit handler.
   - Wrote all sections up to and including the **Departments Carousel**.
   - The file is corrupted: it ends abruptly at line 164 with a " melon" typo and a truncated sentence.
   - ALL sections below the carousel are **missing** from the file (even though they were once in a previous edit attempt, they are not currently in the file).

4. **Server Functions**
   - `src/lib/leads.functions.ts` is complete (submitLead, submitFeedback).
   - `src/components/AssistantWidget.tsx` is complete (AI chat widget).

5. **Environment**
   - `.env` has all required keys for Supabase, Gemini, and Resend.

## What Is Left To Do

### 1. Fix the Corrupted `src/routes/index.tsx`

The file is broken. It has a " melon" typo on line 162 and ends mid-sentence at line 164. You need to fix the file and append all the remaining sections.

**Steps:**
1. Read `src/routes/index.tsx` to see the current broken state.
2. Fix the typo on line 162 (remove " melon").
3. Fix the truncated hero-note sentence at line 164.
4. Append the following sections from the HTML mockup (use the file `nkm-advocates-homepage-mockup-v2 (2) (1).html` in the root as the source of truth for exact content and structure):
   - **Who We Serve** (`id="serve"`) - 3 cards (Local Businesses, Diaspora Kenyans, Foreign Investors)
   - **Insights** (`id="insights"`) - 4 insight cards
   - **Podcast** (`id="podcast"`) - 3 episode cards, platform links
   - **Team** (`id="team"`) - team-teaser with avatar row and description
   - **Final CTA** (`id="contact"`) - Seal SVG, headline, paragraph, contact form, CTA buttons
   - **Footer** - 5-column foot-top, foot-bottom
5. Render `<AssistantWidget />` before closing the root `<div>`.
6. Ensure the file closes all JSX properly.

**Important:** Use the existing form state and `submit` handler (defined at lines 52-74 in the current file). Do NOT re-implement the form logic. Just wire the UI elements to the existing `form` state, `setForm`, `loading`, `success`, and `submit`.

### 2. Clean up `src/lib/practice-areas.ts`

The file currently has 11 entries with a duplicate `property-real-estate` slug.

Reduce to **exactly 8 clean** departments matching the mockup:
1. `business-sme-advisory` - Business & SME Advisory
2. `property-real-estate` - Property & Real Estate Law
3. `debt-recovery` - Debt Recovery & Small Claims
4. `mediation-adr` - Mediation, Arbitration & ADR
5. `intellectual-property` - Intellectual Property
6. `ngo-registration` - NGO & Non-Profit Registration
7. `family-law` - Family Law
8. `data-protection` - Data Protection

Remove: `corporate-governance` and `business-startup` (they overlap with Business & SME Advisory).

### 3. Verification

After everything compiles, run:
```bash
npm run dev    # Should start without errors
npm run build  # Should build successfully
```

## Context for the New Agent

- Do NOT modify `src/nkm-mockup.css` - it is ready.
- Do NOT modify `src/components/AssistantWidget.tsx` - it is ready.
- Do NOT modify `src/lib/leads.functions.ts` - it is ready.
- Use the HTML mockup `nkm-advocates-homepage-mockup-v2 (2) (1).html` as the source of truth for exact text/content.
- Team: Agnes Nyawira is the Managing Partner. Hannah and Rahab are no longer with the firm. Use generic initials/placeholders for other team members in the avatar row.
- All CSS classes (`.section`, `.serve-grid`, `.team-teaser`, `.final-cta`, `.site-footer`, etc.) are already defined in `src/nkm-mockup.css`.

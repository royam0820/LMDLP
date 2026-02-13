# Project Structure Documentation

This document provides an overview of the **La Maison des Petits Loups (LMDPL)** codebase structure. The project is built with **Next.js 15+ (App Router)** and uses **Sanity CMS** for content management.

## Root Directory
*   `src/`: Contains all the source code for the application.
*   `public/`: Static assets like images and fonts.
    *   `images/`: Stores images used in the site (logos, placeholders).
*   `Instructions/`: Documentation files (PRD, Guides, Setup info).
*   `sanity.config.ts`: Configuration file for the Sanity Studio (plugins, project ID, dataset).
*   `sanity.cli.ts`: Configuration for the Sanity CLI tool.

## Source Code (`src/`)

### 1. Application (`src/app/`)
This folder contains the routes and pages of the website (Next.js App Router).

*   **(site)**: A "Route Group". The parenthesis `()` mean it doesn't add to the URL path. It's used to group the public-facing pages together, likely to share a layout.
    *   `page.tsx`: The Homepage (`/`).
    *   `boutique/page.tsx`: The Shop page (`/boutique`).
    *   `ateliers/`: The Workshops section.
        *   `page.tsx`: List of workshops (`/ateliers`).
        *   `[slug]/page.tsx`: Individual workshop details page (dynamic route).
    *   `contact/page.tsx`: Contact page (`/contact`).
*   `studio`: The route for the Sanity CMS Studio (`/studio`). This is where the content editors log in.
*   `layout.tsx`: The main wrapper for the entire site. Contains the `<html>`, `<body>`, Navbar, Footer, and fonts.
*   `globals.css`: The global stylesheet (Tailwind CSS imports).

### 2. Components (`src/components/`)
Reusable React components used across the pages.

*   `Header.tsx`: The top navigation bar.
*   `Footer.tsx`: The site footer.
*   `Home/`: Components specific to the Homepage (Hero banner, Featured products, Reviews).
*   `Workshops/`: Components for the Atelier section (WorkshopList, WorkshopCard).
*   `Shop/`: Components for the Boutique (ProductCard).
*   `Forms/`: Contact or Booking forms.
*   `JsonLd.tsx`: **[SEO]** Invisible component that adds structured data for Google (Store info, Address).

### 3. Sanity CMS (`src/sanity/`)
Logic related to the content management system.

*   `schemaTypes/`: The definitions of your data.
    *   `atelierType.ts`: Defines what an "Atelier" looks like (title, date, price...).
    *   `productType.ts`: Defines a "Product".
    *   `testimonialType.ts`: Defines a "Review".
*   `lib/client.ts`: The connection to Sanity. This is where the app fetches data.
*   `queries.ts`: Collection of GROQ queries used to request specific data (e.g., "Get me the 3 latest reviews").
*   `structure.ts`: Configuration for how the Studio menu looks.
*   `env.ts`: Helper to read environment variables (Project ID, Dataset).

### 4. Utilities (`src/lib/` & `src/data/`)
*   `src/lib/`: Helper functions.
*   `src/data/`: Static data (if any) or mock data used before the CMS was ready.

## Key Files for Maintenance
*   **To change the Menu/Navbar**: Edit `src/components/Header.tsx`.
*   **To change the Footer**: Edit `src/components/Footer.tsx`.
*   **To add a new Page**: Create a new folder in `src/app/(site)/` with a `page.tsx` file.
*   **To change Design/Colors**: Tailwind classes in the components or `src/app/globals.css`.
*   **To update SEO/Address**: `src/components/JsonLd.tsx` and the `metadata` in `layout.tsx`.

## Environment Variables (.env.local)
*   `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your unique Sanity project ID.
*   `NEXT_PUBLIC_SANITY_DATASET`: The dataset to use (usually `development` locally and `production` on Vercel).

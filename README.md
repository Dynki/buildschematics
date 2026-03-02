# BlockBlueprints

A production-ready Minecraft tutorial website built with **Next.js 14+**, **TypeScript**, and **Tailwind CSS**.

## Features

- 🏰 Browse builds by **Structure** (Castles, Houses, Villages, Mega Builds, Farms)
- 🎨 Browse builds by **Aesthetic Style** (Gothic, Medieval, Modern, Cottagecore, Fantasy, Desert, Snow)
- 🔍 **Combined filters** — structure + style + difficulty + survival mode
- ⚡ **Server-side filtering** — all filter logic runs on the server, no client-side data leaking
- 🌐 **SEO-optimised** — `generateMetadata` on every page with OpenGraph tags
- 📱 **Fully responsive** dark-mode UI with emerald accent

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app
  page.tsx                     # Homepage
  layout.tsx                   # Root layout (Navbar + Footer)
  /builds/[structure]/page.tsx # Structure category page
  /styles/[style]/page.tsx     # Style category page
  /build/[slug]/page.tsx       # Build detail page
  /search/page.tsx             # Search + all-filters page

/components
  /ui          # Badge, Tag, SearchBar, Pagination, Gallery
  /layout      # Navbar, Footer
  /build       # BuildCard, CategoryCard
  /filters     # FilterSidebar

/lib
  types.ts     # TypeScript types
  data.ts      # Mock build data + category metadata
  utils.ts     # Filtering, slug helpers, display helpers
```

## Routing

| URL | Description |
|-----|-------------|
| `/` | Homepage with hero, category grids, featured builds |
| `/builds/castles` | All castle builds |
| `/builds/castles?style=Gothic` | Castles filtered by Gothic style |
| `/styles/gothic` | All Gothic-style builds |
| `/build/gothic-mountain-castle` | Build detail page |
| `/search?q=farm` | Search results |
| `/search?structure=Farms&difficulty=Beginner` | Filtered search |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (dark mode, emerald accent)
- **React Server Components** (filtering on the server)
- Client components only where interactivity is needed (SearchBar, FilterSidebar, Gallery)

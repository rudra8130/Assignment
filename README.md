# Vajra LED – Solutions Page

A responsive "Solutions" landing page for **Vajra LED**, built with React, Tailwind CSS v4 and Lucide icons.

## Tech Stack

- [React](https://react.dev/) (via [Vite](https://vite.dev/))
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` plugin, no config file needed)
- [lucide-react](https://lucide.dev/) for all icons
- Inter font (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm (or yarn / pnpm)

### Installation

```bash
# 1. Create the project (skip if you already have it)
npm create vite@latest vajra-led -- --template react
cd vajra-led

# 2. Install dependencies
npm install lucide-react tailwindcss @tailwindcss/vite

# 3. Copy the project's src/ files and vite.config.js over the generated ones
```

Make sure `src/main.jsx` imports the stylesheet and renders the app:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Run

```bash
npm run dev       # start dev server
npm run build     # production build in /dist
npm run preview   # preview the production build
```

## Project Structure

```
vajra-led/
├── public/
│   └── images/              # all photos (see "Images" below)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # sticky header + mobile menu
│   │   ├── Hero.jsx             # hero banner + feature strip
│   │   ├── Solutions.jsx        # 8 application cards
│   │   ├── HelpBanner.jsx       # "Need Help Choosing…" banner
│   │   ├── PopularProducts.jsx  # product carousel
│   │   ├── WhyChoose.jsx        # dark "Why Choose Vajra LED" section
│   │   └── Projects.jsx         # real-world projects gallery
│   ├── App.jsx                  # page composition
│   ├── index.css                # Tailwind import, theme tokens, shared classes
│   └── main.jsx
├── vite.config.js
└── README.md
```

## Images

All images are plain files in `public/images/` and are referenced by URL. If a file is missing, each section falls back to a gradient or icon placeholder, so the layout still works while you add assets.

| Path | Used in |
| --- | --- |
| `images/hero.jpg` | Hero background |
| `images/solutions/industrial.jpg`, `warehouse.jpg`, `street.jpg`, `commercial.jpg`, `petrol-pump.jpg`, `hospital.jpg`, `school.jpg`, `solar.jpg` | Solution cards |
| `images/engineer.png` | Help banner (transparent PNG recommended) |
| `images/products/high-bay.png`, `flood-light.png`, `street-light.png`, `panel-light.png`, `downlight.png`, `solar-street-light.png` | Product carousel (transparent PNGs recommended) |
| `images/why-bg.jpg` | "Why Choose" background (optional) |
| `images/projects/warehouse.jpg`, `industrial.jpg`, `highway.jpg`, `office.jpg`, `petrol-pump.jpg` | Projects gallery |

## Design Tokens

Defined in the `@theme` block of `src/index.css`, so they work as Tailwind utilities (e.g. `bg-navy-900`, `text-blue-500`, `border-line`).

| Token | Value | Purpose |
| --- | --- | --- |
| `navy-900` / `navy-800` | `#06142e` / `#0a1f4d` | Dark sections, headings |
| `blue-500` / `blue-600` | `#2563eb` / `#1d4ed8` | Primary buttons, links |
| `blue-400` | `#3b82f6` | Highlights on dark backgrounds |
| `blue-50` | `#eef4ff` | Light backgrounds |
| `ink` / `muted` / `line` | `#0f172a` / `#5b6475` / `#e5e9f2` | Text and borders |

Shared component classes (also in `index.css`): `.container-x`, `.btn`, `.btn-primary`, `.btn-light`, `.btn-sm`.

## Customizing Content

Text and items live in simple arrays at the top of each component:

- Nav links: `Navbar.jsx` → `links`
- Hero features: `Hero.jsx` → `features`
- Solution cards: `Solutions.jsx` → `solutions`
- Products: `PopularProducts.jsx` → `products`
- "Why Choose" items: `WhyChoose.jsx` → `reasons`
- Project photos: `Projects.jsx` → `projects`

To change an icon, import another one from `lucide-react` and update the `icon` field. Browse available icons at [lucide.dev/icons](https://lucide.dev/icons).

## Responsive Behavior

- **Navbar:** collapses into a hamburger menu below 900px.
- **Hero strip:** 4 columns → 2 columns below 720px.
- **Solution cards:** 4 → 2 → 1 columns.
- **Carousels (products, projects):** all items visible on wide screens; scroll-snap with arrow buttons on smaller screens.


## Accessibility Notes

- Icon-only buttons have `aria-label`s.
- Focus states are visible on all interactive elements.
- Smooth scrolling is disabled for users who prefer reduced motion.

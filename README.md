# Aurelia Builders — website

React + Vite + TypeScript + Tailwind CSS v4. Smooth scrolling (Lenis), motion (Framer Motion), 3D hero (react-three-fiber).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Change brand, content, images (no code changes needed)

| What | Where |
| --- | --- |
| Company name, phone, email, address, WhatsApp number, footer credit | `brand` in `src/data/site.ts` |
| Menu items | `nav` in `src/data/site.ts` |
| Services (each gets its own `/services/<slug>` page + dropdown entry) | `services` in `src/data/site.ts` |
| Projects, gallery, testimonials, team, partners, FAQs | same file |
| All photos | `I` in `src/data/site.ts` (Unsplash placeholders — replace with client photos in `/public/images`) |
| Theme colours | top of `src/index.css` (`@theme` = brand palette, `:root` / `.dark` = light and dark surfaces) |
| Fonts | `index.html` (Google Fonts) + `--font-*` in `src/index.css` |

## Structure

```
src/
  components/
    layout/    Navbar (services dropdown, mobile menu), Footer
    sections/  HeroStory (scroll-driven 3D), Scroller (stack, horizontal cards, arc, orbit, loops), Gallery, Blocks (page hero, stats, FAQ, CTA...)
    three/     HouseScene — procedural 3D house, no model files to download
    ui/        Reveal, Cards (glare / glow / tilt), Marquee, Wave, Breadcrumbs, Effects (smooth scroll, splash, WhatsApp, click sparks)
  data/        site.ts — all copy and imagery
  hooks/       theme, media-query, on-screen
  pages/       Home, About, Services, ServiceDetail, Projects, Contact, NotFound
```

## Before launch checklist

- Replace placeholder name, contact details, WhatsApp number and every photo / testimonial / portrait.
- Hook up the contact form (`src/pages/Contact.tsx`, `submit`) to your email / CRM / form service — it currently only shows a thank-you state.
- Replace the OpenStreetMap embed bounding box in `Contact.tsx` with the real office location.
- Update the `<title>` / Open Graph tags in `index.html` and add a real share image + favicon.
- Host on any static host; add a rewrite of all routes to `index.html` (Netlify `_redirects`: `/* /index.html 200`, Vercel `rewrites`).

## Performance & accessibility notes

- 3D pauses when off-screen; all heavy sections animate with transform/opacity only.
- Respects `prefers-reduced-motion` (smooth-scroll disabled, animations shortened).
- Skip-to-content link, visible focus rings, labelled controls, light/dark theme remembered per visitor.

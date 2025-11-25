## FindEvents

FindEvents is a Nuxt 2 application that showcases how to build an event discovery experience with modern Vue tooling. Users can browse a catalog of curated experiences, refine the list with stacked filters, and inspect rich detail pages complete with pricing, availability, and a Mapbox-powered location preview. The app uses static JSON data, so it can be hosted anywhere without a backend.

### Highlights
- Nuxt 2 + Composition API for performant server-side rendering (SSR) or static generation.
- Pinia store backed by `data/events.json` keeps filtering and detail views in sync.
- Debounced multi-select filters for city, category, and tags, synced to the query string for shareable URLs.
- Event detail page with responsive gallery, availability list, related events, and interactive Mapbox map.
- Jest unit tests for the Pinia store and Cypress specs for the critical filter journeys.

---

## Tech Stack
- Nuxt 2.15 with auto-imported components
- Vue 2.7 + Composition API module
- Pinia 2 for state management
- Tailwind CSS (via `@nuxtjs/tailwindcss`)
- Mapbox GL JS for maps
- Jest + Vue Test Utils for unit tests
- Cypress 12 for end-to-end tests

---

## Project Structure
| Path | Description |
| ---- | ----------- |
| `pages/eventsList` | Main listing + filtering UI routed from `/`. |
| `pages/event/_slug.vue` | Dynamic detail page with gallery, availability, related events, and Mapbox view. |
| `components/` | Presentational pieces (`EventCard`, `EventFilter`, `MultiSelect`, `BaseCard`). |
| `store/events.ts` | Pinia store responsible for fetching, filtering, and deriving related events. |
| `data/events.json` | Static dataset used in place of a backend. |
| `tests/` | Jest unit specs for the Pinia store. |
| `cypress/` | Cypress end-to-end specs validating the filtering UX. |

---

## Getting Started
1. **Requirements**
   - Node.js 18+ (LTS recommended)
   - npm 9+ or Yarn 1.x

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   # available at http://localhost:3000 (redirects `/` → `/eventsList`)
   ```

4. **Production build**
   ```bash
   npm run build     # compile for production
   npm run start     # serve the build (Node server)
   npm run generate  # optional: output a fully static site
   ```

---

## Testing & Quality
| Command | Purpose |
| ------- | ------- |
| `npm run test` | Runs Jest unit tests in `tests/`. |
| `npm run lint` | ESLint + Prettier validation. |
| `npm run e2e` | Headless Cypress run (ensure `npm run dev` is active). |
| `npm run e2e:silent` | Alias for `cypress run`. |
| `npm run lintfix` | Auto-format and fix lint issues. |

During Cypress development you can use `npm run dev` in one terminal and `npm run e2e` (headed) in another.

---

## Data & Configuration
- **Static dataset**: `data/events.json` contains every event card, including geolocation, pricing, categories, tags, and image metadata. Update this file to change the catalog.
- **Filtering logic**: implemented in `store/events.ts` and exposes helper actions (`fetchEvents`, `filterEvents`, `fetchSupplierEvents`, `fetchEventsByTags`).
- **Mapbox token**: the detail page (`pages/event/_slug.vue`) currently ships with a demo token. Replace `mapboxgl.accessToken` with your own key or load it from environment variables if deploying publicly.
- **Fallback images**: `components/EventCard.vue` uses `/fallback_image.jpg` from the `static/` directory if a thumbnail fails to load.

---

## Deployment Notes
- Nuxt’s router is configured to redirect `/` → `/eventsList`. If you export a static site (`npm run generate`), ensure your hosting (e.g., Netlify, Vercel, S3) falls back to `200.html` for SPA navigation.
- The project is self-contained; no API calls are made at runtime. Updating `data/events.json` and redeploying is enough to refresh the catalog.
- When exposing the Mapbox map, review rate limits and protect your access token (consider using environment variables or a proxy).

---

## Contributing
1. Fork / clone the repo.
2. Create a feature branch.
3. Run `npm run lint` and `npm run test`.
4. Open a pull request describing your change and any screenshots or test notes.

---

## Troubleshooting
- **Filters show no results**: confirm the selected combination actually exists in `data/events.json`. Clear filters with the dropdown toggles.
- **Map fails to load**: check the browser console for Mapbox token errors and ensure network access to `api.mapbox.com`.
- **Cypress can’t reach the site**: start the dev server (`npm run dev`) before running Cypress specs.

Enjoy exploring events! 🎉


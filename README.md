# Deface Frontend

React-based shell for the Deface image-processing experience. Tailwind handles the visual layer while Vitest and React Testing Library provide an isolated safety net for the UI.

## Getting started
1. `npm install`
2. `npm run dev` to start the Vite dev server
3. `npm run test` to exercise the Vitest suite

## Structure
- `src/components`, `src/services`, and `src/hooks` hold the on-deck modules for the UI, API, and behavioral logic.
- `src/config/constants.ts` declares the allowed filter and paste options so that configuration stays separate from layout code.
- `src/services/apiClient.ts` points at `http://localhost:8000/api/deface-image`, which will be the API surface for future integrations.
- `vitest.config.ts` runs tests against the `happy-dom` environment with shared global helpers.

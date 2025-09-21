# Copilot Instructions for XPS Dashboard

## Project Overview

- **XPS Dashboard** is a Next.js-based platform for managing daily software testing activities, scripts, test cases, and credentials.
- Uses **Prisma** ORM (with SQLite) for database access. Schema and migrations are in `prisma/`.
- UI is built with **shadcn/ui** components and **Tailwind CSS** for styling. Custom UI components are in `components/`.
- App logic is organized by feature in `actions/`, `app/`, and `components/` directories.

## Key Architectural Patterns

- **Feature Folders:** Each major feature (e.g., basics, portals, users, tasks) has its own subfolder in both `actions/` and `app/`.
- **UI Components:** Shared and feature-specific UI components are in `components/`, with further grouping (e.g., `MyUi/`, `ui/`, `AppLayout/`).
- **Database Access:** Use the generated Prisma client from `lib/generated/prisma/` for all DB operations. Schema is defined in `prisma/schema.prisma`.
- **State Management:** Table and pagination state is passed as props (see `TablePagination.jsx`).

## Developer Workflows

- **Install dependencies:**
  ```sh
  pnpm install
  ```
- **Run development server:**
  ```sh
  pnpm dev
  ```
- **Prisma migrations:**
  ```sh
  npx prisma migrate dev --name <desc>
  npx prisma generate
  ```
- **Seed database:**
  ```sh
  node seed/seedData.js
  ```

## Project Conventions

- **Component Naming:** Use PascalCase for React components. Place shared UI in `components/ui/`, custom in `components/MyUi/`.
- **Pagination:** Use the `TablePagination` component for table navigation. It expects a `table` prop with `.getState().pagination` and navigation methods.
- **Styling:** Use Tailwind CSS utility classes. Prefer shadcn/ui primitives for new UI.
- **API/Actions:** Place server-side logic in `actions/` by feature. Use `lib/` for utilities and shared logic.
- **No direct DB access in components:** Always use actions or hooks for data fetching/mutations.

## Integration Points

- **Prisma:** All DB models and migrations in `prisma/`. Generated client in `lib/generated/prisma/`.
- **UI Libraries:** shadcn/ui, motion-primitives, lucide-react.
- **App Routing:** Next.js app directory structure (`app/`).

## Examples

- **Paginated Table:** See `components/MyUi/TablePagination.jsx` for usage pattern.
- **Prisma Model:** See `prisma/schema.prisma` for DB schema.
- **Feature Logic:** See `actions/basics/portals.js` for feature-specific server logic.

---

For more, see `README.md` and feature folders. When in doubt, follow existing patterns and prefer composition over duplication.

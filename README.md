# Kanban Todo Board

A Kanban-style task management app built with Next.js 15. Tasks live across four columns — Backlog, In Progress, Review, and Done — and you can drag them between columns, search, paginate, and do full CRUD.

---

## Tech used

- **Next.js 15** (App Router, Turbopack in dev)
- **React 19**
- **Redux Toolkit** — global UI state (search term, column pages)
- **TanStack React Query** — data fetching and cache invalidation
- **Ant Design 5** — UI components
- **dnd-kit** — drag and drop
- **React Hook Form + Zod** — form handling and validation
- **Tailwind CSS 4** — utility classes
- **localStorage** — task persistence (no backend needed)

---

## Getting started locally

Make sure you have **Node.js 18+** installed.

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd todo-kanban

# 2. Install dependencies
npm install
# or if you have bun:
bun install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:4000](http://localhost:4000) in your browser.

### Other scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server on port 4000 (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server on port 4000 |
| `npm run lint` | Run ESLint |
| `npm run check-types` | TypeScript type check |

---

## Features

- **4 Kanban columns** — Backlog, In Progress, Review, Done
- **Create tasks** — global "New Task" button (column is your choice) or the `+` button inside each column (column is locked to that column)
- **Edit tasks** — click the edit icon on any card
- **Delete tasks** — click the delete icon, confirm the popup
- **Drag and drop** — grab any card and drop it into a different column
- **Search** — filters across all columns by title or description in real time
- **Pagination** — 5 tasks per column, navigate with the page controls at the bottom of each column
- **Data persistence** — everything is saved to localStorage so it survives page refreshes

---

## Project structure

```
app/
  layout.tsx          # Root layout, providers wired here
  page.tsx            # Home page — just renders KanbanBoard
  AppProviders.tsx    # Redux + React Query + Ant Design providers
  global.css          # Global styles and Tailwind import

components/
  AppLayout/          # Header and page shell
  KanbanBoard/        # Board container, toolbar, drag context
  KanbanColumn/       # Single column with task list and pagination
  TaskCard/           # Individual task card with drag handle
  TaskFormModal/      # Create / edit modal with form validation

redux/
  slices/ui/          # Search term and column page state

integrations/
  services/tasks/     # useGetTasks, useCreateTask, useUpdateTask, useDeleteTask hooks
                      # task-storage.ts — all localStorage read/write logic
  tanstack/           # React Query client setup
  query-keys/         # Centralized query key definitions

types/
  Task.ts             # Task and Column type definitions
```

---

## Deploying to Vercel

Vercel is the easiest option for Next.js apps — it's made by the same team.

### Steps

**1. Push your code to GitHub**

If you haven't already:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-username/todo-kanban.git
git push -u origin main
```

**2. Create a Vercel account**

Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.

**3. Import the project**

- Click **"Add New Project"**
- Pick your `todo-kanban` repo from the list
- Vercel will detect it's a Next.js app automatically

**4. Configure the project**

In the project settings before deploying, you don't need to change anything for this app since there are no environment variables. Just leave everything as default.

If you want the app to run on port 4000 locally but Vercel uses its own port internally — that's fine, Vercel handles that on its end.

**5. Deploy**

Click **Deploy** and wait about a minute. Vercel will give you a URL like `https://todo-kanban-xyz.vercel.app`.

After the first deploy, every push to `main` will trigger a new deployment automatically.

---

## Deploying to Netlify (alternative)

**1. Push to GitHub** (same as above)

**2. Go to [netlify.com](https://netlify.com)** and log in with GitHub

**3. Click "Add new site" → "Import an existing project"**

**4. Pick your GitHub repo**

**5. Set the build settings:**

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `.next` |

**6. Add the Next.js plugin**

Netlify needs a plugin to properly handle Next.js. In your project's `netlify.toml` file (create it in the root):

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Then install the plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

Commit and push — Netlify will redeploy automatically.

> **Honest recommendation:** just use Vercel for Next.js. It takes 3 minutes and needs zero config.

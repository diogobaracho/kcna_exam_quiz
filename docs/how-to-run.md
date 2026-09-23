# How to run the KCNA Exam Quiz

Two ways to run it: with Docker (no local Node install needed) or directly with Node.

## Option A — Docker (recommended)

Prerequisites: Docker 24+ with Compose v2 (`docker compose version` should work).

### Development server (hot reload)

```bash
docker compose up dev
```

Open **http://localhost:5173**. Edit any file — including question files under `data/questions/`
— and the page updates automatically.

Stop it with `Ctrl+C`, or `docker compose down` from another terminal.

### Production-style build

Builds the app once and serves the static files with nginx, the same way it would be deployed.

```bash
docker compose up --build prod
```

Open **http://localhost:8080**. Rebuild (`--build`) whenever source files change; this service
does not hot-reload.

### Run the test suite in a container

```bash
docker compose run --rm test
```

This runs `npm run test:run` (all Vitest suites, including the question-bank validation) inside
a throwaway container and exits with the test result code.

## Option B — Without Docker

Prerequisites: Node.js 18 or newer and npm 9 or newer (`node --version`, `npm --version`).

```bash
npm ci               # install exact dependency versions
npm run dev           # dev server at http://localhost:5173, with hot reload
```

For a production build:

```bash
npm run build         # outputs to dist/
npm run preview        # serves dist/ at http://localhost:4173
```

## npm scripts reference

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot module reload |
| `npm run build` | Type-checks, then builds the production bundle into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest once, non-interactive (used in CI and Docker) |
| `npm run test:coverage` | Vitest once with a coverage report |
| `npm run validate:questions` | Runs only the question-bank validation test (fast feedback while authoring content) |
| `npm run typecheck` | TypeScript, no output emitted |
| `npm run lint` | ESLint over `.ts`/`.tsx` files |

## Ports

| Service | Port | URL |
|---|---|---|
| `dev` | 5173 | http://localhost:5173 |
| `prod` | 8080 | http://localhost:8080 |
| Node `npm run preview` | 4173 | http://localhost:4173 |

Change the host-side port by editing the left side of the `ports:` mapping in
`docker-compose.yml` (e.g. `"3000:5173"` to expose dev on port 3000 instead).

## Data and privacy

The app has no backend and makes no network calls once loaded. All progress (attempt history,
scores, the last-used setup) is stored in your browser's `localStorage`, scoped to whichever
origin you loaded the app from (`localhost:5173` and `localhost:8080` are treated as different
origins with separate storage). Nothing is sent anywhere. Clearing your browser's site data for
that origin, or using a private/incognito window, resets the history.

## Troubleshooting

**Port already in use** — another process is using 5173/8080/4173. Either stop that process or
change the port mapping as described above.

**Changes to `data/questions/` don't show up in the dev container** — make sure you're running
`docker compose up dev` (not `prod`, which doesn't hot-reload) and that the bind mount in
`docker-compose.yml` is active (the default `docker-compose.yml` already mounts the whole
project). On some Linux/WSL setups file-change notifications don't cross into containers
reliably; the compose file already sets `CHOKIDAR_USEPOLLING=true` for `dev` to work around
this. If it still doesn't refresh, restart the container.

**"command not found: docker compose"** — older Docker installs use the standalone `docker-compose`
(with a hyphen) instead of the `docker compose` plugin. Substitute accordingly, or upgrade Docker.

**Node version errors** (`npm ci` fails, or Vite complains) — check `node --version`; this
project targets Node 18+. If you have `nvm`, run `nvm install 18 && nvm use 18`.

**A previous attempt or score seems stuck / won't go away** — open the browser dev tools,
Application (or Storage) tab, and clear Local Storage for the site, or use the History page's
"Clear all" button inside the app.

**Tests fail only in Docker but pass locally (or vice versa)** — this is almost always a stale
`node_modules` inside the container image. Rebuild without cache:
`docker compose build --no-cache dev`.

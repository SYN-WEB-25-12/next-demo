# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # start Next.js dev server (localhost:3000)
npm run build           # production build
npm run lint            # ESLint (eslint-config-next core-web-vitals + typescript)
npm test                # run all tests (tests/**/*.test.ts) via tsx + node:test
tsx --env-file=.env.local --env-file=.env --test tests/auth-session.e2e.test.ts  # run a single test file

npx prisma generate      # regenerate Prisma client into lib/generated/prisma (do this after any schema.prisma change)
npx prisma migrate dev   # create + apply a new migration locally
npx prisma db seed       # seed the local database (prisma/seed.ts)
```

All tests under `tests/` are e2e and hit a real Postgres database through Prisma (no mocking) — a database must be reachable via `DATABASE_URL`/`DATABASE_URL_UNPOOLED` before running `npm test`. `docker compose up database` starts just the Postgres container for local work against `npm run dev` on the host; `docker compose up` runs the whole app containerized instead (see `Dockerfile.dev`). See `.env.example` for which env file (`.env.local` vs `.env.docker-compose`) each `DATABASE_URL` variant belongs in.

## Architecture

Next.js App Router project. Prisma 7 with the generated client emitted to `lib/generated/prisma` (gitignored, regenerate after schema changes), connected via `@prisma/adapter-pg` for plain Postgres or `@prisma/adapter-neon` when `DATABASE_URL` contains `neon.tech` (selected automatically in `lib/prisma.ts`).

Each feature area under `app/<feature>/` follows a **repository → service → helpers** layering, with Server Actions in `actions.ts` as the thin entry point called from `"use client"` components/forms:

- `*.repository.ts` — only Prisma calls, no business logic.
- `*.service.ts` — business logic/validation, calls the repository; this is what `actions.ts` and pages call.
- `*.helpers.ts` — pure functions with no DB access (e.g. password hashing, formatting).
- `actions.ts` — `"use server"` functions bound to forms; parse `FormData`, delegate to the service, map results to `{ error }` shapes or `redirect()`.

This pattern spans two areas that otherwise look unrelated at first glance:
- `app/auth/` (`auth.service.ts`, `user.repository.ts`, `auth.helpers.ts`) handles registration/login with Argon2id password hashing.
- `lib/session/` (`session.service.ts`, `session.repository.ts`, `session.helpers.ts`) implements DB-backed sessions (`Session` Prisma model) with an httpOnly cookie holding only the session id. `lib/session.ts` is a re-export barrel kept for backwards-compatible imports (`import sessionService from "@/lib/session"`) — add new session logic under `lib/session/`, not in the barrel file.
- `app/blog/` (`service.ts`, `post.repository.ts`, `blog.helpers.ts`) follows the same split for posts; `deletePost` is author-gated (only the owning `userId` — or anyone, if the post has no author — may delete).

Auth and blog are intentionally wired together: `app/blog/actions.ts` reads the current session via `sessionService.getCurrent()` to attribute created posts to the logged-in user (anonymous posts get `userId: null`).

`app/pokemon/` and the root `app/page.tsx`/`app/_components/` are unrelated lecture-demo routes (no DB layering) — don't assume their patterns apply to `auth`/`blog`.

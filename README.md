# RepoIQ

Type any GitHub handle and get an editorial-style developer report — a 1–100 signal
score, a tier, a language breakdown, headline stats, and the account's top repositories.

Built with Next.js 16, React 19, and TypeScript.

## How it works

RepoIQ reads only public GitHub data. Given a handle it fetches the user profile and
up to 100 non-fork repositories, then derives:

| Output | Derived from |
| --- | --- |
| **Score** (1–100) | Weighted blend of total stars (≤38), public repo count (≤18), followers (≤20), account age (≤12), and language diversity (≤12). Stars and followers are log-scaled so a handful of large repos doesn't swamp the result. |
| **Tier** | `EARLY-CAREER` below 50, `SOLID MID` at 50, `STRONG SENIOR` at 70, `EXCEPTIONAL` at 85 |
| **Languages** | Top 5 by weight, where each repo contributes `stars + 1` to its primary language |
| **Top repos** | 5 highest-starred owned (non-fork) repositories |

Nothing is written to disk or sent anywhere else — a report is computed per request and
cached for an hour.

## Getting started

```bash
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Environment

Create a `.env` file:

```bash
# Optional. Raises the GitHub API limit from 60 to 5,000 requests/hour.
# A classic token with no scopes is enough — only public data is read.
GITHUB_TOKEN=ghp_...
```

Without a token the app still works, but you will hit GitHub's unauthenticated rate
limit quickly; the UI surfaces this as a "rate limit reached" message.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

## Project structure

```
src/
├── app/
│   ├── page.tsx              Landing page
│   ├── analyze/page.tsx      Handle input + live report
│   ├── api/analyze/route.ts  GET /api/analyze?handle=<handle>
│   └── globals.css           Design tokens + responsive layout primitives (.rq-*)
└── lib/
    ├── github.ts             GitHub fetching and scoring
    ├── report.ts             Report types + handle normalization
    └── theme.ts              Color scale, fonts, fluid sizing helpers
drizzle/                      Postgres migrations (see Roadmap)
```

### Styling

Pages are styled with inline styles driven by tokens in `src/lib/theme.ts`. Inline
styles can't carry media queries, so the split is deliberate:

- Values that only need to **scale** use `fluid(min, max)` / `clamp()` inline.
- Layouts that need to **rearrange** use `.rq-*` classes in `globals.css`, which own
  the breakpoints (860px and 900px).

## API

```http
GET /api/analyze?handle=octocat
```

Handles are normalized first, so `octocat`, `@octocat`, and
`https://github.com/octocat` all resolve the same way.

**200** — a `Report` object (see `src/lib/report.ts`).

**Errors** — `{ "error": string }` with status `400` (empty handle), `404` (no such
user), `429` (GitHub rate limit), or `502` (GitHub unreachable).

## Roadmap

The `drizzle/` directory contains migrations for `users`, `stats`, and `tokens` tables
intended for GitHub OAuth and cached profile stats. That schema is not wired into the
app yet — the current build is stateless and needs no database to run.

## License

Not currently licensed for reuse.

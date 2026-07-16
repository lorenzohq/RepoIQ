import type { Language, Report } from "./report";
import { c } from "./theme";

type GitHubUser = {
    login: string;
    name: string | null;
    avatar_url: string;
    public_repos: number;
    followers: number;
    created_at: string;
};

type GitHubRepo = {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    fork: boolean;
    stargazers_count: number;
    forks_count: number;
};

export class GitHubError extends Error {
    constructor(
        message: string,
        readonly status: number,
    ) {
        super(message);
    }
}

function tierFor(score: number): [string, string] {
    if (score >= 85) return ["EXCEPTIONAL", "SIGNAL"];
    if (score >= 70) return ["STRONG SENIOR", "SIGNAL"];
    if (score >= 50) return ["SOLID MID", "SIGNAL"];
    return ["EARLY-CAREER", "SIGNAL"];
}

const LANG_PALETTE = [c.accent, c.bar, c.bar, c.bar, c.bar];

function ghHeaders(): HeadersInit {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
}

export async function analyzeUser(handle: string): Promise<Report> {
    const user = await fetch(
        `https://api.github.com/users/${encodeURIComponent(handle)}`,
        { headers: ghHeaders(), next: { revalidate: 3600 } },
    );

    if (user.status === 404) {
        throw new GitHubError(`No GitHub user named "${handle}".`, 404);
    }
    if (user.status === 403 || user.status === 429) {
        throw new GitHubError("GitHub rate limit reached — try again in a few minutes.", 429);
    }
    if (!user.ok) {
        throw new GitHubError("Could not reach GitHub. Check the handle and try again.", 502);
    }

    const u: GitHubUser = await user.json();

    const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(handle)}/repos?per_page=100&sort=pushed`,
        { headers: ghHeaders(), next: { revalidate: 3600 } },
    );
    const allRepos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const owned = allRepos.filter((r) => !r.fork);

    const totalStars = owned.reduce((a, r) => a + (r.stargazers_count || 0), 0);
    const totalForks = owned.reduce((a, r) => a + (r.forks_count || 0), 0);

    const langWeights = new Map<string, number>();
    for (const r of owned) {
        if (!r.language) continue;
        langWeights.set(r.language, (langWeights.get(r.language) ?? 0) + (r.stargazers_count || 0) + 1);
    }
    const langEntries = [...langWeights.entries()].sort((a, b) => b[1] - a[1]);
    const langTotal = langEntries.reduce((a, e) => a + e[1], 0) || 1;
    const languages: Language[] = langEntries.slice(0, 5).map(([name, weight], i) => {
        const pct = Math.round((weight / langTotal) * 100);
        return { name, pct, width: `${pct}%`, color: LANG_PALETTE[i] };
    });

    const years = Math.max(0, (Date.now() - new Date(u.created_at).getTime()) / 3.15e10);

    const sStars = Math.min(38, Math.log10(totalStars + 1) * 13);
    const sRepos = Math.min(18, (u.public_repos || 0) / 3);
    const sFollow = Math.min(20, Math.log10((u.followers || 0) + 1) * 8);
    const sAge = Math.min(12, years * 2);
    const sDiv = Math.min(12, langEntries.length * 2.5);
    const score = Math.max(1, Math.min(100, Math.round(sStars + sRepos + sFollow + sAge + sDiv)));

    const [tierLine1, tierLine2] = tierFor(score);
    const topLang = languages[0]?.name ?? "no dominant language";

    return {
        login: u.login,
        name: u.name || u.login,
        avatar: u.avatar_url,
        score,
        tierLine1,
        tierLine2,
        joined: `JOINED ${new Date(u.created_at).getFullYear()}`,
        summary:
            `${u.name || handle} has ${u.public_repos || 0} public repositories drawing ` +
            `${totalStars.toLocaleString()} stars, working primarily in ${topLang}. ` +
            `Active on GitHub for ${years.toFixed(1)} years with ${(u.followers || 0).toLocaleString()} followers.`,
        languages,
        stats: [
            { value: (u.public_repos || 0).toLocaleString(), label: "PUBLIC REPOS" },
            { value: totalStars.toLocaleString(), label: "TOTAL STARS" },
            { value: (u.followers || 0).toLocaleString(), label: "FOLLOWERS" },
            { value: totalForks.toLocaleString(), label: "FORKS EARNED" },
        ],
        repos: owned
            .slice()
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
            .slice(0, 5)
            .map((r) => ({
                name: r.name,
                url: r.html_url,
                desc: r.description || "—",
                lang: r.language || "—",
                stars: (r.stargazers_count || 0).toLocaleString(),
            })),
    };
}

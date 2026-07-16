export type Language = { name: string; pct: number; width: string; color: string };
export type Repo = { name: string; url: string; desc: string; lang: string; stars: string };
export type Stat = { value: string; label: string };

export type Report = {
    login: string;
    name: string;
    avatar: string;
    score: number;
    tierLine1: string;
    tierLine2: string;
    summary: string;
    joined: string;
    languages: Language[];
    repos: Repo[];
    stats: Stat[];
};

export function normalizeHandle(input: string): string {
    return input
        .trim()
        .replace(/^https?:\/\/github\.com\//, "")
        .replace(/^@+/, "")
        .split("/")[0];
}

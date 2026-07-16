import Link from "next/link";
import { c, mono, serif, SHELL } from "@/lib/theme";

const HEAT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

function heatCells(count: number) {
    return Array.from({ length: count }, (_, i) => {
        const v = Math.abs(Math.sin(i * 12.9898 + 4.1) * 43758.5453) % 1;
        const step = v > 0.85 ? 4 : v > 0.62 ? 3 : v > 0.38 ? 2 : v > 0.2 ? 1 : 0;
        return HEAT_COLORS[step];
    });
}

const heroLanguages = [
    { name: "Go", pct: 34, barColor: c.accent },
    { name: "Python", pct: 28, barColor: c.bar },
    { name: "TypeScript", pct: 22, barColor: c.bar },
    { name: "Rust", pct: 16, barColor: c.bar },
];

const features = [
    {
        n: "01",
        title: "Code quality scoring",
        desc: "Static-analysis-informed scoring across readability, test coverage, and structure — not lines shipped.",
    },
    {
        n: "02",
        title: "Language proficiency",
        desc: "Real fluency per language and framework, weighted by recency and depth of contribution.",
    },
    {
        n: "03",
        title: "Contribution consistency",
        desc: "Distinguishes sustained builders from single-weekend contributors and portfolio padding.",
    },
    {
        n: "04",
        title: "Open-source impact",
        desc: "Stars, forks, and external contributors weighed against real maintenance burden, not vanity metrics.",
    },
    {
        n: "05",
        title: "Candidate comparison",
        desc: "Line up every applicant on one board, sorted by whichever signal matters most for the role.",
    },
    {
        n: "06",
        title: "AI-written summary",
        desc: "One paragraph a non-technical hiring manager can act on, backed by the raw data underneath.",
    },
];

const candidates = [
    { rank: "01", name: "Jane Kaur", handle: "@jane-kaur", score: 91, scoreColor: "oklch(52% 0.14 155)", strength: "Distributed systems", commits: "412", impact: "HIGH", impactColor: "oklch(48% 0.12 155)" },
    { rank: "02", name: "Mateus Ferreira", handle: "@m-ferreira", score: 87, scoreColor: "oklch(52% 0.14 155)", strength: "Backend — Go, Rust", commits: "365", impact: "HIGH", impactColor: "oklch(48% 0.12 155)" },
    { rank: "03", name: "Rin Tanaka", handle: "@rin-t", score: 74, scoreColor: "oklch(58% 0.13 70)", strength: "Frontend — TypeScript", commits: "208", impact: "MEDIUM", impactColor: "oklch(52% 0.1 70)" },
    { rank: "04", name: "David Ochieng", handle: "@d-ochieng", score: 62, scoreColor: c.bar, strength: "DevOps — scripting", commits: "96", impact: "LOW", impactColor: "oklch(55% 0.015 60)" },
];

const SHORTLIST_COLS = "40px 2fr 1fr 1.5fr 1fr 1fr";

const eyebrow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: mono,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: c.label,
};

export default function Landing() {
    return (
        <div style={{ color: c.ink, background: c.canvas, width: "100%", overflowX: "hidden" }}>
            {/* TOP BAR */}
            <header style={{ ...SHELL, padding: "26px 80px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <div style={{ fontFamily: serif, fontSize: 26, letterSpacing: "-0.01em" }}>RepoIQ</div>
                <nav style={{ display: "flex", alignItems: "baseline", gap: 34, fontFamily: mono, fontSize: 12.5, letterSpacing: "0.02em" }}>
                    <a href="#reads" style={{ color: c.muted }}>What it reads</a>
                    <a href="#shortlist" style={{ color: c.muted }}>Ranking</a>
                    <Link href="/analyze" style={{ color: c.ink, borderBottom: `1px solid ${c.accent}`, paddingBottom: 2 }}>
                        Start now →
                    </Link>
                </nav>
            </header>

            {/* HERO */}
            <section style={{ ...SHELL, padding: "70px 80px 96px" }}>
                <div style={{ ...eyebrow, paddingBottom: 22, borderBottom: `1px solid ${c.rule}` }}>
                    <span>CANDIDATE INTELLIGENCE, FROM SOURCE</span>
                    <span>INDEX 00</span>
                </div>
                <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 112, lineHeight: 0.98, letterSpacing: "-0.02em", margin: "44px 0 0", maxWidth: 1050 }}>
                    See what a candidate has{" "}
                    <span style={{ fontStyle: "italic", color: c.accent }}>actually built.</span>
                </h1>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginTop: 56, alignItems: "end" }}>
                    <p style={{ gridColumn: "span 2", fontSize: 18, lineHeight: 1.6, color: "oklch(38% 0.015 60)", maxWidth: 640, margin: 0 }}>
                        RepoIQ reads a candidate&apos;s real commit history, code quality, and
                        open-source impact — then renders it as a single, honest signal. It&apos;s the
                        clearest picture of an engineer&apos;s ability, drawn straight from the work
                        itself.
                    </p>
                    <div style={{ fontFamily: mono, fontSize: 12.5, color: c.label, lineHeight: 1.9, textAlign: "right" }}>
                        <div>ANALYSIS TIME &nbsp;—&nbsp; &lt;8s</div>
                        <div>SIGNALS READ &nbsp;—&nbsp; 40+</div>
                        <div>RESUMES NEEDED &nbsp;—&nbsp; 0</div>
                    </div>
                </div>
            </section>

            {/* SPECIMEN */}
            <section style={{ borderTop: `1px solid ${c.rule}`, borderBottom: `1px solid ${c.rule}` }}>
                <div style={{ ...SHELL, padding: "30px 80px 60px" }}>
                    <div style={{ ...eyebrow, marginBottom: 44 }}>
                        <span>SPECIMEN — @jane-kaur</span>
                        <span>SAMPLE REPORT</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 72, alignItems: "center" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                                <div style={{ fontFamily: serif, fontSize: 240, lineHeight: 0.8, letterSpacing: "-0.03em" }}>91</div>
                                <div style={{ fontFamily: mono, fontSize: 12, color: c.label, lineHeight: 1.8, paddingTop: 14 }}>
                                    <div style={{ color: c.accent }}>/ OUT OF 100</div>
                                    <div style={{ marginTop: 14 }}>STRONG SENIOR</div>
                                    <div>SIGNAL</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 26, lineHeight: 1.35, color: c.body, margin: "28px 0 0", maxWidth: 460 }}>
                                Consistent three-year contribution history. Maintains two
                                widely-used libraries with a clean review record.
                            </p>
                        </div>

                        <div>
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: c.label, marginBottom: 14 }}>
                                3-YEAR CONTRIBUTION FIELD
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(40, 1fr)", gap: 3, marginBottom: 40 }}>
                                {heatCells(280).map((color, i) => (
                                    <div key={i} style={{ width: "100%", aspectRatio: 1, background: color }} />
                                ))}
                            </div>
                            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: c.label, marginBottom: 16 }}>
                                LANGUAGE PROFICIENCY
                            </div>
                            {heroLanguages.map((lang) => (
                                <div key={lang.name} style={{ display: "grid", gridTemplateColumns: "110px 1fr 44px", alignItems: "center", gap: 16, padding: "9px 0", borderTop: `1px solid ${c.ruleSoft}` }}>
                                    <div style={{ fontSize: 14, color: c.body }}>{lang.name}</div>
                                    <div style={{ height: 5, background: c.track }}>
                                        <div style={{ height: "100%", width: `${lang.pct}%`, background: lang.barColor }} />
                                    </div>
                                    <div style={{ fontFamily: mono, fontSize: 12.5, color: "oklch(45% 0.015 60)", textAlign: "right" }}>
                                        {lang.pct}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT IT READS */}
            <section id="reads" style={{ ...SHELL, padding: "80px 80px" }}>
                <div style={{ ...eyebrow, marginBottom: 8 }}>
                    <span>WHAT REPOIQ READS</span>
                    <span>INDEX 01</span>
                </div>
                {features.map((f) => (
                    <div key={f.n} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1.15fr", gap: 40, alignItems: "baseline", padding: "30px 0", borderTop: `1px solid ${c.rule}` }}>
                        <div style={{ fontFamily: serif, fontSize: 40, color: c.accentSoft, lineHeight: 1 }}>{f.n}</div>
                        <div style={{ fontFamily: serif, fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{f.title}</div>
                        <div style={{ fontSize: 15.5, color: c.muted, lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </section>

            {/* SHORTLIST */}
            <section id="shortlist" style={{ borderTop: `1px solid ${c.rule}` }}>
                <div style={{ ...SHELL, padding: "80px 80px" }}>
                    <div style={{ ...eyebrow, marginBottom: 16 }}>
                        <span>THE SHORTLIST, RANKED</span>
                        <span>INDEX 02</span>
                    </div>
                    <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 52, letterSpacing: "-0.02em", margin: "0 0 44px", maxWidth: 720, lineHeight: 1.05 }}>
                        Every handle from a req, on one page.
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: SHORTLIST_COLS, padding: "0 0 14px", fontFamily: mono, fontSize: 11, letterSpacing: "0.05em", color: c.label, borderBottom: `1px solid ${c.ink}` }}>
                        <div>#</div><div>CANDIDATE</div><div>SCORE</div>
                        <div>STRONGEST IN</div><div>COMMITS/YR</div><div>IMPACT</div>
                    </div>
                    {candidates.map((cand) => (
                        <div key={cand.rank} style={{ display: "grid", gridTemplateColumns: SHORTLIST_COLS, padding: "22px 0", alignItems: "center", borderBottom: `1px solid ${c.ruleSoft}` }}>
                            <div style={{ fontFamily: mono, fontSize: 12.5, color: c.ghost }}>{cand.rank}</div>
                            <div>
                                <div style={{ fontFamily: serif, fontSize: 24, letterSpacing: "-0.01em" }}>{cand.name}</div>
                                <div style={{ fontFamily: mono, fontSize: 12, color: c.faint }}>{cand.handle}</div>
                            </div>
                            <div style={{ fontFamily: serif, fontSize: 34, color: cand.scoreColor, lineHeight: 1 }}>{cand.score}</div>
                            <div style={{ fontSize: 14, color: "oklch(35% 0.015 60)" }}>{cand.strength}</div>
                            <div style={{ fontFamily: mono, fontSize: 14 }}>{cand.commits}</div>
                            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.04em", color: cand.impactColor }}>{cand.impact}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CLOSING */}
            <section id="start" style={{ borderTop: `1px solid ${c.rule}` }}>
                <div style={{ ...SHELL, padding: "110px 80px 120px", textAlign: "center" }}>
                    <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", color: c.label, marginBottom: 30 }}>
                        INDEX 03 — BEGIN
                    </div>
                    <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 88, letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 40px" }}>
                        Stop reading resumes.
                        <br />
                        <span style={{ fontStyle: "italic", color: c.accent }}>Start reading code.</span>
                    </h2>
                    <Link href="/analyze" style={{ display: "inline-block", fontFamily: mono, fontSize: 14, letterSpacing: "0.04em", color: c.ink, borderBottom: `1.5px solid ${c.accent}`, paddingBottom: 4 }}>
                        PASTE A GITHUB HANDLE →
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ ...SHELL, padding: "24px 80px 44px", display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: c.faint, borderTop: `1px solid ${c.rule}` }}>
                <span>RepoIQ</span>
                <span>SIGNAL, NOT RESUMES — © 2026</span>
            </footer>
        </div>
    );
}

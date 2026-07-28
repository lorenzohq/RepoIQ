"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Report } from "@/lib/report";
import { normalizeHandle } from "@/lib/report";
import { c, fluid, mono, serif, shell } from "@/lib/theme";

type State =
    | { status: "idle" }
    | { status: "loading"; query: string }
    | { status: "error"; message: string }
    | { status: "result"; report: Report };

const eyebrow: React.CSSProperties = {
    fontFamily: mono,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: c.label,
};

export default function Analyze() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<State>({ status: "idle" });
    const runId = useRef(0);
    const isLoading = state.status === "loading";

    async function run() {
        const handle = normalizeHandle(inputRef.current?.value ?? "");
        if (!handle) return;

        const id = ++runId.current;
        setState({ status: "loading", query: handle });

        try {
            const res = await fetch(`/api/analyze?handle=${encodeURIComponent(handle)}`);
            const body = await res.json();
            if (id !== runId.current) return;

            if (!res.ok) {
                setState({ status: "error", message: body.error ?? "Something went wrong." });
                return;
            }
            setState({ status: "result", report: body as Report });
        } catch {
            if (id !== runId.current) return;
            setState({
                status: "error",
                message: "Could not reach GitHub. Check the handle and try again.",
            });
        }
    }

    return (
        <div style={{ color: c.ink, background: c.canvas, width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
            {/* TOP BAR */}
            <header className="rq-header" style={shell("26px")}>
                <Link href="/" style={{ fontFamily: serif, fontSize: 26, letterSpacing: "-0.01em", color: c.ink }}>
                    RepoIQ
                </Link>
                <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: "0.02em", color: c.muted }}>
                    LIVE ANALYSIS
                </div>
            </header>

            {/* INPUT */}
            <section style={shell(fluid(40, 60), "0px")}>
                <div className="rq-eyebrow" style={{ ...eyebrow, paddingBottom: 22, borderBottom: `1px solid ${c.rule}` }}>
                    <span>PASTE A GITHUB HANDLE</span>
                    <span>PUBLIC DATA ONLY</span>
                </div>
                <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: fluid(36, 76), lineHeight: 1, letterSpacing: "-0.02em", margin: `${fluid(28, 40)} 0 ${fluid(26, 36)}`, maxWidth: 820 }}>
                    Read any engineer <span style={{ fontStyle: "italic", color: c.accent }}>from source.</span>
                </h1>

                <div className="rq-input-group" style={{ border: `1px solid ${c.ink}`, background: c.surface }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "0 6px 0 20px", fontFamily: mono, fontSize: 18, color: c.faint }}>
                        @
                    </div>
                    <input
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") run();
                        }}
                        placeholder="octocat"
                        aria-label="GitHub handle"
                        autoComplete="off"
                        spellCheck={false}
                        style={{ flex: 1, border: "none", background: "transparent", fontFamily: mono, fontSize: 18, color: c.ink, padding: "18px 8px", outline: "none" }}
                    />
                    <button
                        onClick={run}
                        disabled={isLoading}
                        aria-busy={isLoading}
                        className="rq-input-btn"
                        style={{ border: "none", background: c.ink, color: c.canvas, fontFamily: mono, fontSize: 13, letterSpacing: "0.04em", paddingInline: 28, minWidth: 150, cursor: isLoading ? "wait" : "pointer" }}
                    >
                        {isLoading ? (
                            <>
                                READING
                                <span style={{ display: "inline-block", width: "1.6em", textAlign: "left" }}>
                                    {[0, 1, 2].map((i) => (
                                        <span
                                            key={i}
                                            style={{ animation: `repoiq-dot 1.2s ${i * 0.16}s infinite ease-in-out` }}
                                        >
                                            .
                                        </span>
                                    ))}
                                </span>
                            </>
                        ) : (
                            "ANALYZE →"
                        )}
                    </button>
                </div>
                <div style={{ fontFamily: mono, fontSize: 12, color: "oklch(58% 0.015 60)", marginTop: 14 }}>
                    Try: torvalds · gaearon · sindresorhus · yyx990803
                </div>
            </section>

            {/* STATES */}
            <section style={shell(fluid(40, 60), fluid(64, 100))}>
                {state.status === "loading" && (
                    <div style={{ fontFamily: mono, fontSize: 13, color: c.label, padding: "40px 0", borderTop: `1px solid ${c.rule}` }}>
                        READING COMMITS FOR @{state.query} …
                    </div>
                )}

                {state.status === "error" && (
                    <div style={{ borderTop: `1px solid ${c.rule}`, padding: "40px 0" }}>
                        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.05em", color: c.accent, marginBottom: 10 }}>
                            NO SIGNAL
                        </div>
                        <div style={{ fontFamily: serif, fontSize: fluid(23, 32) }}>{state.message}</div>
                    </div>
                )}

                {state.status === "result" && <ReportView r={state.report} />}

                {state.status === "idle" && (
                    <div style={{ borderTop: `1px solid ${c.rule}`, padding: "48px 0", fontFamily: serif, fontStyle: "italic", fontSize: fluid(21, 30), color: c.ghost, maxWidth: 620 }}>
                        Enter a handle above to generate a live report — score, languages, and
                        top repositories, drawn straight from public GitHub data.
                    </div>
                )}
            </section>
        </div>
    );
}

function ReportView({ r }: { r: Report }) {
    return (
        <>
            <div className="rq-eyebrow" style={{ ...eyebrow, borderTop: `1px solid ${c.ink}`, paddingTop: 20, marginBottom: fluid(28, 44) }}>
                <span>REPORT — @{r.login}</span>
                <span>{r.joined}</span>
            </div>

            <div className="rq-split" style={{ alignItems: "start" }}>
                {/* Score + identity */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
                        <Image
                            src={r.avatar}
                            alt=""
                            width={56}
                            height={56}
                            style={{ borderRadius: "50%", background: "oklch(90% 0.012 75)" }}
                        />
                        <div>
                            <div style={{ fontFamily: serif, fontSize: 28, lineHeight: 1 }}>{r.name}</div>
                            <div style={{ fontFamily: mono, fontSize: 12.5, color: c.faint }}>@{r.login}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                        <div style={{ fontFamily: serif, fontSize: fluid(110, 200), lineHeight: 0.78, letterSpacing: "-0.03em" }}>
                            {r.score}
                        </div>
                        <div style={{ fontFamily: mono, fontSize: 12, color: c.label, lineHeight: 1.8, paddingTop: 12 }}>
                            <div style={{ color: c.accent }}>/ OUT OF 100</div>
                            <div style={{ marginTop: 14 }}>{r.tierLine1}</div>
                            <div>{r.tierLine2}</div>
                        </div>
                    </div>
                    <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: fluid(19, 24), lineHeight: 1.35, color: c.body, margin: "26px 0 0", maxWidth: 460 }}>
                        {r.summary}
                    </p>
                </div>

                {/* Stats + languages */}
                <div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: c.rule, border: `1px solid ${c.rule}`, marginBottom: 40 }}>
                        {r.stats.map((s) => (
                            <div key={s.label} style={{ background: c.surface, padding: `20px ${fluid(14, 22)}` }}>
                                <div style={{ fontFamily: serif, fontSize: fluid(27, 38), lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.05em", color: "oklch(50% 0.015 60)", marginTop: 6 }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: c.label, marginBottom: 16 }}>
                        LANGUAGE PROFICIENCY
                    </div>
                    {r.languages.map((lang) => (
                        <div key={lang.name} style={{ display: "grid", gridTemplateColumns: "clamp(78px, 22vw, 130px) 1fr 44px", alignItems: "center", gap: 16, padding: "9px 0", borderTop: `1px solid ${c.ruleSoft}` }}>
                            <div style={{ fontSize: 14, color: c.body }}>{lang.name}</div>
                            <div style={{ height: 5, background: c.track }}>
                                <div style={{ height: "100%", width: lang.width, background: lang.color }} />
                            </div>
                            <div style={{ fontFamily: mono, fontSize: 12.5, color: "oklch(45% 0.015 60)", textAlign: "right" }}>
                                {lang.pct}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top repositories */}
            <div style={{ marginTop: fluid(44, 64) }}>
                <div className="rq-eyebrow" style={{ ...eyebrow, marginBottom: 8 }}>
                    <span>TOP REPOSITORIES</span>
                    <span>BY STARS</span>
                </div>
                {r.repos.map((repo) => (
                    <div key={repo.url} className="rq-repo" style={{ padding: "22px 0", borderTop: `1px solid ${c.rule}` }}>
                        <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: serif, fontSize: fluid(19, 24), letterSpacing: "-0.01em", color: c.ink, overflowWrap: "anywhere" }}
                        >
                            {repo.name}
                        </a>
                        <div style={{ fontSize: 14.5, color: "oklch(42% 0.015 60)", lineHeight: 1.5 }}>{repo.desc}</div>
                        <div style={{ fontFamily: mono, fontSize: 13, color: c.muted }}>{repo.lang}</div>
                        <div style={{ fontFamily: mono, fontSize: 13, textAlign: "right" }}>★ {repo.stars}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

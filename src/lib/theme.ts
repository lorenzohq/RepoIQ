export const c = {
    ink: "oklch(22% 0.015 60)",
    body: "oklch(30% 0.015 60)",
    muted: "oklch(40% 0.015 60)",
    label: "oklch(48% 0.015 60)",
    faint: "oklch(52% 0.015 60)",
    ghost: "oklch(62% 0.015 60)",
    accent: "oklch(60% 0.16 42)",
    accentDeep: "oklch(50% 0.16 42)",
    accentSoft: "oklch(72% 0.05 45)",
    canvas: "oklch(97% 0.012 85)",
    surface: "oklch(99% 0.005 85)",
    rule: "oklch(86% 0.015 75)",
    ruleSoft: "oklch(88% 0.012 75)",
    track: "oklch(91% 0.012 75)",
    bar: "oklch(45% 0.015 60)",
} as const;

export const SHELL: React.CSSProperties = {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "0 80px",
};

export const mono = "var(--font-mono), ui-monospace, monospace";
export const serif = "var(--font-serif), serif";

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

/** Horizontal gutter — collapses from 80px down to 20px on narrow screens. */
export const PAD = "clamp(20px, 5vw, 80px)";

export const SHELL: React.CSSProperties = {
    maxWidth: 1320,
    margin: "0 auto",
    paddingInline: PAD,
};

/** SHELL with fluid gutters plus explicit vertical padding. */
export function shell(top: string, bottom: string = top): React.CSSProperties {
    return { ...SHELL, paddingTop: top, paddingBottom: bottom };
}

/**
 * Fluid size that reaches `max` at the 1320px shell width and never drops
 * below `min`. Used for type and vertical rhythm so the layout scales without
 * needing media queries for every value.
 */
export function fluid(min: number, max: number) {
    return `clamp(${min}px, ${((max / 1320) * 100).toFixed(2)}vw, ${max}px)`;
}

export const mono = "var(--font-mono), ui-monospace, monospace";
export const serif = "var(--font-serif), serif";

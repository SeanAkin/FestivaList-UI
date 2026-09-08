export const surfaces = {
  base: "#100E0C",
  raised: "#191512",
  overlay: "#221D19",
  sunken: "#0B0908",
} as const;

export const accent = {
  main: "#EE992B",
  strong: "#FFB350",
  dim: "rgba(238, 153, 43, 0.14)",
  line: "rgba(238, 153, 43, 0.32)",
} as const;

export const ink = {
  primary: "#F7F3EE",
  secondary: "#A8A099",
  muted: "#6F6862",
} as const;

export const lines = {
  soft: "rgba(247, 243, 238, 0.07)",
  medium: "rgba(247, 243, 238, 0.13)",
} as const;

export const shadows = {
  low: "0 1px 2px rgba(10, 6, 2, 0.4)",
  medium: "0 12px 28px -12px rgba(10, 6, 2, 0.7)",
  high: "0 32px 64px -24px rgba(10, 6, 2, 0.85)",
} as const;

export const danger = "#E86A5A";

export const fonts = {
  display: '"Outfit", "Geist", "Helvetica Neue", Arial, sans-serif',
  body: '"Geist", "Inter", "Helvetica Neue", Arial, sans-serif',
} as const;

export const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

export const shellMaxWidth = "1240px";

export const cssVariables = {
  "--surface-base": surfaces.base,
  "--surface-raised": surfaces.raised,
  "--surface-overlay": surfaces.overlay,
  "--surface-sunken": surfaces.sunken,
  "--accent": accent.main,
  "--accent-strong": accent.strong,
  "--accent-dim": accent.dim,
  "--accent-line": accent.line,
  "--ink-primary": ink.primary,
  "--ink-secondary": ink.secondary,
  "--ink-muted": ink.muted,
  "--line-soft": lines.soft,
  "--line-medium": lines.medium,
  "--shadow-low": shadows.low,
  "--shadow-medium": shadows.medium,
  "--shadow-high": shadows.high,
  "--danger": danger,
  "--font-display": fonts.display,
  "--font-body": fonts.body,
  "--ease": easing,
  "--shell-max": shellMaxWidth,
} as const;

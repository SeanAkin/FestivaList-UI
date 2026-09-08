import { createTheme } from "@mui/material/styles";
import { accent, cssVariables, danger, easing, fonts, ink, lines, shadows, surfaces } from "./tokens";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: accent.main, dark: "#C97C1B", light: accent.strong, contrastText: surfaces.sunken },
    secondary: { main: accent.strong },
    background: { default: surfaces.base, paper: surfaces.raised },
    text: { primary: ink.primary, secondary: ink.secondary, disabled: ink.muted },
    divider: lines.soft,
    error: { main: danger },
    success: { main: "#7BB661" },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.display,
      fontWeight: 800,
      fontSize: "clamp(2.75rem, 7vw, 5rem)",
      lineHeight: 0.98,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontFamily: fonts.display,
      fontWeight: 700,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontFamily: fonts.display,
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
    },
    h5: { fontFamily: fonts.display, fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontFamily: fonts.display, fontWeight: 600, letterSpacing: "-0.015em" },
    subtitle2: { fontWeight: 500, letterSpacing: "0.01em" },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6, color: ink.secondary },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 600,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      lineHeight: 1.6,
      fontVariantNumeric: "tabular-nums",
    },
    button: { fontWeight: 600, letterSpacing: "0.005em" },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": cssVariables,
        "*:focus-visible": {
          outline: `2px solid ${accent.main}`,
          outlineOffset: "2px",
          borderRadius: "4px",
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          transition: `background-color 180ms ${easing}, color 180ms ${easing}, transform 120ms ${easing}, border-color 180ms ${easing}`,
          "&:active": { transform: "translateY(1px)" },
        },
        sizeLarge: { padding: "0.8rem 1.6rem", fontSize: "1rem" },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: shadows.low },
        },
        containedPrimary: {
          backgroundColor: accent.main,
          color: surfaces.sunken,
          "&:hover": { backgroundColor: accent.strong },
        },
        outlined: {
          borderColor: lines.medium,
          color: ink.primary,
          "&:hover": { borderColor: accent.line, backgroundColor: accent.dim },
        },
        text: {
          color: ink.secondary,
          "&:hover": { color: ink.primary, backgroundColor: lines.soft },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          color: ink.secondary,
          transition: `color 180ms ${easing}, background-color 180ms ${easing}`,
          "&:hover": { color: accent.main, backgroundColor: accent.dim },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: surfaces.raised,
          border: `1px solid ${lines.soft}`,
          boxShadow: "none",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: surfaces.sunken,
          borderRadius: 10,
          transition: `border-color 180ms ${easing}`,
          "& fieldset": { borderColor: lines.medium },
          "&:hover fieldset": { borderColor: accent.line },
          "&.Mui-focused fieldset": { borderColor: accent.main, borderWidth: "1px" },
        },
        input: {
          "&::placeholder": { color: ink.muted, opacity: 1 },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: ink.secondary,
          "&.Mui-focused": { color: accent.main },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 2, marginTop: 6 },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: surfaces.raised,
          backgroundImage: "none",
          borderRadius: 18,
          border: `1px solid ${lines.medium}`,
          boxShadow: shadows.high,
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          padding: "1.5rem 1.5rem 0.5rem",
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: { root: { padding: "0.5rem 1.5rem" } },
    },

    MuiDialogActions: {
      styleOverrides: { root: { padding: "1rem 1.5rem 1.5rem", gap: "0.5rem" } },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: "rgba(11, 9, 8, 0.72)", backdropFilter: "blur(3px)" },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: accent.main,
            "& + .MuiSwitch-track": { backgroundColor: accent.main, opacity: 0.45 },
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: surfaces.overlay,
          border: `1px solid ${lines.medium}`,
          color: ink.primary,
          fontSize: "0.75rem",
          borderRadius: 8,
          padding: "0.4rem 0.6rem",
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.8125rem",
          color: ink.secondary,
          borderColor: lines.medium,
          padding: "0.35rem 0.9rem",
          transition: `color 180ms ${easing}, background-color 180ms ${easing}`,
          "&:hover": { backgroundColor: lines.soft },
          "&.Mui-selected": {
            backgroundColor: accent.dim,
            color: accent.strong,
            "&:hover": { backgroundColor: accent.dim },
          },
        },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: "rgba(247, 243, 238, 0.05)" },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: { color: accent.main, textDecorationColor: accent.line },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: surfaces.overlay,
          color: ink.primary,
          border: `1px solid ${lines.medium}`,
          borderRadius: 12,
          boxShadow: shadows.medium,
        },
      },
    },
  },
});

export default darkTheme;

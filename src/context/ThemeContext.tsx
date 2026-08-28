"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  body: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMuted: string;
  hover: string;
  border: string;
  skeleton: string;
  glow: string;
};

const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    primary: "#f59e0b",
    secondary: "#f97316",
    accent: "#fb923c",
    body: "#111113",
    surface: "#1a1a1f",
    surfaceHover: "#252529",
    text: "#fafaf9",
    textMuted: "#a8a29e",
    hover: "#292524",
    border: "#2e2c2a",
    skeleton: "#1f1e1c",
    glow: "rgba(251, 146, 60, 0.12)",
  },
  light: {
    primary: "#d97706",
    secondary: "#ea580c",
    accent: "#f97316",
    body: "#fffbf5",
    surface: "#fff7ed",
    surfaceHover: "#ffedd5",
    text: "#1c1917",
    textMuted: "#78716c",
    hover: "#fff1e0",
    border: "#e7ddd0",
    skeleton: "#f3ebe0",
    glow: "rgba(217, 119, 6, 0.08)",
  },
};

type ThemeContextValue = {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const THEME_STORAGE_KEY = "namaste-ai-theme";

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isTheme(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch {
      // Storage can be unavailable in restricted/privacy-focused browser contexts.
      // Keep the default theme instead of letting theme initialization fail.
    } finally {
      setIsThemeLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Applying the theme should not depend on persistent storage being writable.
    }
  }, [isThemeLoaded, theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }, []);

  const value = useMemo(
    () => ({ theme, colors: themeColors[theme], setTheme, toggleTheme }),
    [setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}

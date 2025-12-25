"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // ✅ MISSING STATE (THIS WAS THE BUG)
  const [theme, setTheme] = useState(null);

  // 🔁 Sync theme to backend (non-blocking)
  const syncThemeToServer = async (theme) => {
    try {
      await fetch("/api/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
    } catch (err) {
      console.warn("Theme sync failed (safe to ignore)");
    }
  };

  // 🌍 Load theme ONCE on app load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      setTheme(systemTheme);
      localStorage.setItem("theme", systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  // 🎨 Apply theme whenever it changes
  useEffect(() => {
    if (!theme) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    syncThemeToServer(theme); // 🔥 background sync
  }, [theme]);

  // 🔄 Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

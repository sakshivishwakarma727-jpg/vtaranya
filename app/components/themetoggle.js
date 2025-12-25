"use client";

import { useTheme } from "@/context/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 16px",
        borderRadius: "10px",
        border: "1px solid var(--border-main)",
        background: "var(--bg-card)",
        color: "var(--text-main)",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}

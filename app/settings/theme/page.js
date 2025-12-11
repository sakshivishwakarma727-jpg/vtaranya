"use client";
import { useState } from "react";

export default function ThemeSettings() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Theme</h1>

      <div className="mt-4 space-y-3">
        <label>
          <input type="radio" value="light" onChange={() => setTheme("light")} checked={theme==="light"} />
          Light Mode
        </label>

        <label>
          <input type="radio" value="dark" onChange={() => setTheme("dark")} checked={theme==="dark"} />
          Dark Mode
        </label>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

function toggleTheme(themes: string[]) {
  const html = document.querySelector("html");
  const currentTheme = html?.getAttribute("data-theme") || themes[0];
  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
  
  html?.setAttribute("data-theme", nextTheme);  // Switch to next theme
  localStorage.setItem("theme", nextTheme);     // Persist the selected theme
}

export default function AppBar() {
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/themes.json")  // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setThemes(data));

    const savedTheme = localStorage.getItem("theme") || "light"; 
    document.querySelector("html")?.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <nav className="navbar bg-base-200 text-base-content shadow-lg"> {/* DaisyUI classes */}
      <a href="/" className="btn btn-ghost normal-case text-xl">Portfolio</a>
      <div className="space-x-4">
        <a href="/" className="btn btn-ghost">Home</a>
        <a href="/projects" className="btn btn-ghost">Projects</a>
        <a href="/video-game" className="btn btn-ghost">Video Game</a>
        <button
          className="btn btn-primary"
          aria-label="Change Theme"
          onClick={() => toggleTheme(themes)}
          disabled={themes.length === 0}
        >
          <Icon icon="ri:dice-line" />
        </button>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

// Function to toggle between themes
function toggleTheme(themes: string[]) {
  const html = document.querySelector("html");
  const currentTheme = html?.getAttribute("data-theme") || themes[0];
  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];

  html?.setAttribute("data-theme", nextTheme); // Switch to next theme
  localStorage.setItem("theme", nextTheme); // Persist the selected theme
}

export default function AppBar() {
  const [themes, setThemes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState<string>("corporate"); // Tracks current theme

  useEffect(() => {
    fetch("/api/themes.json") // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setThemes(data));

    const savedTheme = localStorage.getItem("theme") || "corporate";
    document.querySelector("html")?.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme); // Set current theme on page load
  }, []);

  const handleThemeChange = () => {
    toggleTheme(themes);
    const html = document.querySelector("html");
    const newTheme = html?.getAttribute("data-theme") || "corporate";
    setCurrentTheme(newTheme); // Update current theme
  };

  const themeIcons: Record<string, string> = {
    corporate: "mdi:weather-sunny",
    dracula: "mdi:weather-night",
    retro: "mdi:vinyl",
    aqua: "mdi:waves",
  };

  return (
    <nav className="navbar bg-base-200 text-base-content shadow-lg px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="text-xl font-bold">
          Omar's Portfolio
        </Link>
        <div className="flex space-x-2 sm:space-x-4 items-center">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            Projects
          </Link>
          <Link to="/video-game" className="btn btn-ghost">
            Play me!
          </Link>
          <button
            className="btn btn-primary p-1 w-10 h-10 flex items-center justify-center"
            aria-label="Change Theme"
            onClick={handleThemeChange}
            disabled={themes.length === 0}
          >
            <Icon icon={themeIcons[currentTheme]} width="28" height="28" />
          </button>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";

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
  const [currentTheme, setCurrentTheme] = useState<string>("corporate");
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu

  useEffect(() => {
    // Fetch themes from API
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
    <nav className="navbar bg-base-200 text-base-content shadow-none px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="text-xl font-clash font-semibold">
          Omar's Portfolio
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <Icon icon="mdi:menu" className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex items-center space-x-0 md:space-x-4 mt-4 md:mt-0`}
        >
          <Link
            to="/"
            className="btn btn-ghost w-full md:w-auto text-left font-clash font-semibold md:text-center rounded-none"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="btn btn-ghost w-full md:w-auto text-left font-clash font-semibold md:text-center rounded-none"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            to="/video-game"
            className="btn btn-ghost w-full md:w-auto text-left font-clash font-semibold md:text-center rounded-none"
            onClick={() => setMenuOpen(false)}
          >
            Play me!
          </Link>
          <button
className={`p-2 flex items-center justify-center mt-2 md:mt-0 border-2 border-base-content bg-base-100 hover:bg-primary hover:border-primary hover:text-base-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
    menuOpen ? "w-full" : "md:w-10 h-10 rounded-none"
  }`}
  aria-label="Change Theme"
  onClick={() => {
    handleThemeChange();
    setMenuOpen(false);
  }}
  disabled={themes.length === 0}
  style={{
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  }}
>
  <Icon
    icon={themeIcons[currentTheme]}
    width="24"
    height="24"
    className="inherit" // Inherits styles from the button
  />
</button>
        </div>
      </div>
    </nav>
  );
}

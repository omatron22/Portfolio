import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

// Function to toggle between themes
function toggleTheme(themes: string[]) {
  const html = document.querySelector("html");
  const currentTheme = html?.getAttribute("data-theme") || themes[0];
  const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
  
  html?.setAttribute("data-theme", nextTheme);  // Switch to next theme
  localStorage.setItem("theme", nextTheme);     // Persist the selected theme
}

export default function AppBar() {
  const [themes, setThemes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState<string>("light"); // Tracks current theme

  useEffect(() => {
    fetch("/api/themes.json")  // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setThemes(data));

    const savedTheme = localStorage.getItem("theme") || "light"; 
    document.querySelector("html")?.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);  // Set current theme on page load
  }, []);

  const handleThemeChange = () => {
    toggleTheme(themes);
    const html = document.querySelector("html");
    const newTheme = html?.getAttribute("data-theme") || "light";
    setCurrentTheme(newTheme);  // Update current theme
  };

  const themeIcons: Record<string, string> = {
    light: "mdi:weather-sunny",   
    dark: "mdi:weather-night",    
    retro: "mdi:cassette",    
    aqua: "mdi:waves",            
    cyberpunk: "mdi:bee"          
  };

  return (
    <nav className="navbar bg-base-200 text-base-content shadow-lg">
      <div className="flex justify-between w-full">
        <a href="/" className="btn btn-ghost normal-case text-xl">Omar's Portfolio</a>
        <div className="flex space-x-4 items-center">
          <a href="/" className="btn btn-ghost">Home</a>
          <a href="/projects" className="btn btn-ghost">Projects</a>
          <a href="/video-game" className="btn btn-ghost">Play me!</a>
          <button
  className="btn btn-primary p-1 w-10 h-10 flex items-center justify-center"
  aria-label="Change Theme"
  onClick={handleThemeChange}
  disabled={themes.length === 0}
>
  <Icon icon={themeIcons[currentTheme]} width="33" height="33" /> {/* Adjust icon size */}
</button>

        </div>
      </div>
    </nav>
  );
}

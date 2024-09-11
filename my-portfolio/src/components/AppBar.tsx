import React from "react";

const AppBar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <a href="/" className="text-2xl font-bold">Omar's Portfolio</a>
      </div>
      <div className="space-x-4">
        <a href="/" className="hover:text-gray-400">Home</a>
        <a href="/projects" className="hover:text-gray-400">Projects</a>
        <a href="/video-game" className="hover:text-gray-400">Video Game</a>
      </div>
    </nav>
  );
};

export default AppBar;
export {};

import React from "react";

const VideoGame = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content"> {/* DaisyUI classes */}
      <h1 className="text-4xl font-bold mb-8">Video Game Placeholder</h1>
      <div className="w-64 h-64 card shadow-lg bg-base-200 flex items-center justify-center rounded-lg">
        <p className="text-lg">[Placeholder for the Game]</p>
      </div>
    </div>
  );
};

export default VideoGame;

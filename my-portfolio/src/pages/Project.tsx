import React from "react";

const Project = () => {
  const projects = [
    { title: "Project 1", description: "Placeholder for Project 1" },
    { title: "Project 2", description: "Placeholder for Project 2" },
    { title: "Project 3", description: "Placeholder for Project 3" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
export {};

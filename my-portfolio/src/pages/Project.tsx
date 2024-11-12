import React from "react";
import { Icon } from "@iconify-icon/react";

const Project = () => {
  const projects = [
    {
      title: "GPIB to SQL DLL Automation",
      company: "Experior Laboratories",
      purpose: "Automate data extraction from VISA machines and streamline SQL database integration",
      language: "C, LabVIEW (DLL integration)",
      description: `Developed a solution to automate the process of extracting data from VISA machines, which previously required manual effort and separate LabVIEW algorithms for each machine. The C code communicated with machines to retrieve measurement data, automatically adding it to an SQL database by either updating an existing entry or creating a new one. The code was converted into a DLL for integration with LabVIEW, allowing for easy replication and significantly improving efficiency.`,
      githubLink: "https://github.com/omatron22/GPIB-to-SQL-DLL",
    },
    {
      title: "Placeholder Project 1",
      company: "Placeholder Company",
      purpose: "Placeholder purpose for the project",
      language: "JavaScript, React",
      description: `This is a placeholder project description to represent a potential future project. It includes a brief overview of the technologies used and the problem it solves.`,
      githubLink: "#",
    },
    {
      title: "Placeholder Project 2",
      company: "Placeholder Company",
      purpose: "Placeholder purpose for the project",
      language: "Python, Django",
      description: `This is a placeholder project description to represent a potential future project. It includes a brief overview of the technologies used and the problem it solves.`,
      githubLink: "#",
    },
    {
      title: "Placeholder Project 3",
      company: "Placeholder Company",
      purpose: "Placeholder purpose for the project",
      language: "Java, Spring Boot",
      description: `This is a placeholder project description to represent a potential future project. It includes a brief overview of the technologies used and the problem it solves.`,
      githubLink: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-16 px-6">
      <div
        className="max-w-7xl w-full mx-auto"
        style={{
          columnCount: 2,
          columnGap: "1.5rem",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-base-100 border border-base-100 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 mb-6 break-inside-avoid"
          >
            {/* Card Header with Title Bar */}
            <div className="bg-base-300 text-base-content flex items-center justify-between py-2 px-4 rounded-t-lg">
              <h1 className="text-lg font-semibold text-base-content">{project.title}</h1>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            {/* Card Content */}
            <div className="p-4 space-y-2">
              <div className="flex flex-col text-base space-y-1">
                {project.company && (
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:briefcase-outline" className="text-primary" />
                    <span className="font-medium text-base-content">{project.company}</span>
                  </div>
                )}
                {project.purpose && (
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:target" className="text-error" />
                    <span className="text-base-content">{project.purpose}</span>
                  </div>
                )}
                {project.language && (
                  <div className="flex items-center space-x-2">
                    <Icon icon="mdi:code-tags" className="text-success" />
                    <span className="text-base-content">{project.language}</span>
                  </div>
                )}
              </div>
              {project.description && (
                <p className="text-sm text-base-content leading-relaxed mt-2">{project.description}</p>
              )}
              <div className="flex justify-end mt-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-content hover:text-primary transition-transform transform hover:scale-110"
                  >
                    <Icon icon="mdi:github" className="text-2xl" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;

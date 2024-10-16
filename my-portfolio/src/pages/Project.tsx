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
      <div className="max-w-7xl w-full mx-auto columns-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="break-inside-avoid bg-white shadow-md rounded-md overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 text-center">
              <h1 className="text-xl font-semibold">{project.title}</h1>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex flex-col text-base space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:briefcase-outline" className="text-secondary" />
                  <span className="font-medium">{project.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:target" className="text-secondary" />
                  <span>{project.purpose}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="mdi:code-tags" className="text-secondary" />
                  <span>{project.language}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {project.description}
              </p>
              <div className="flex justify-end mt-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-transform transform hover:scale-110"
                >
                  <Icon icon="mdi:github" className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder for sprout element in the middle */}
        <div className="flex items-center justify-center w-full">
          <div className="w-32 h-32">
            {/* Space for future sprout illustration */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
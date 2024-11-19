import React from "react";
import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate(); // Initialize navigate

  const projects = [
    {
      title: "Personal Portfolio Website",
      company: "Personal Project",
      purpose: "Showcase skills, projects, and personality through a custom-built interactive experience",
      language: "TypeScript, React, Tailwind CSS, DaisyUI",
      description: `Built a custom portfolio website using React and TypeScript, designed to create a visually engaging and interactive experience. 
      The entire site features hand-drawn SVG designs, created from scratch with Illustrator and Photoshop, giving it a distinctive, personal style.
      The colors dynamically adapt using DaisyUI theme switching, creating a seamless visual experience across different themes.
      The site also includes a typewriter text animation, an image slider, and smooth scrolling for responsive navigation.
      An integrated 2D platformer game, created with React and Phaser, adds an interactive element, featuring original animations, dynamic character selection, and custom music composed and recorded for a unique touch.`,
      githubLink: "https://github.com/omatron22/Portfolio",
    },
    {
      title: "GPIB to SQL DLL Automation",
      company: (
        <a
          href="https://experiorlabs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Experior Laboratories
        </a>
      ),
      purpose: "Automate data extraction from VISA machines and streamline SQL database integration",
      language: "C, LabVIEW (DLL integration)",
      description: `Developed a solution to automate the process of extracting data from VISA machines, which previously required manual effort and separate LabVIEW algorithms for each machine. The C code communicated with machines to retrieve measurement data, automatically adding it to an SQL database by either updating an existing entry or creating a new one. The code was converted into a DLL for integration with LabVIEW, allowing for easy replication and significantly improving efficiency.`,
      githubLink: "https://github.com/omatron22/GPIB-to-SQL-DLL",
    },
    {
      title: "Samson The Game: A 2D Platformer",
      company: "Personal Project",
      purpose: "Create a unique 2D platformer from scratch, combining animations, gameplay, and my own music",
      language: "JavaScript, TypeScript, React, Phaser",
      description: `Created a custom 2D platformer using React and Phaser, inspired by classic 8-bit games. 
      Designed frame-by-frame animations for characters and backgrounds, all drawn with sprite sheets using Piskel, Illustrator, and Photoshop.
      The game features obstacle generation, collision detection, and a scoring system.
      You can choose between different characters, each with its own design.
      The background music and sound effects are original, recorded and mixed by me.`,
      githubLink: "https://github.com/omatron22/Portfolio",
    },
    {
      title: "BeanPod",
      company: (
        <a
          href="https://web.cs.ucla.edu/classes/fall23/cs35L/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          35-L: Software Construction Course
        </a>
      ),
      purpose: "Create a messaging app prototype tailored for student communication needs",
      language: "React, Firebase, Git",
      description: `BeanPod is a prototype of a private messaging app developed as a group project for a software construction course. 
      It features a dynamic and responsive UI built with React, designed with student communication in mind. 
      The backend leverages Firebase for real-time database management, enabling instant message syncing and secure Google sign-in authentication. 
      Key features include streamlined Google Authentication, real-time chat functionality, image sharing, a comprehensive chat history feature, and a user-friendly dark mode toggle.`,
      githubLink: "#", // Add your GitHub link here if available
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
            className="bg-base-100 rounded-lg shadow-md mb-6 break-inside-avoid"
          >
            {/* Card Header with Title Bar */}
            <div className="bg-base-300 text-base-content flex items-center justify-between py-2 px-4 rounded-t-lg">
              <h1 className="text-lg font-semibold text-base-content">{project.title}</h1>
              <div className="flex space-x-2">
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
              <div className="flex justify-end mt-2 space-x-4">
                {/* Dog Icon for Video Game */}
                {project.title === "Samson The Game: A 2D Platformer" && (
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/video-game");
                    }}
                    className="text-base-content hover:text-success transition-transform transform hover:scale-110 cursor-pointer"
                  >
                    <Icon icon="mdi:dog" className="text-2xl" />
                  </button>
                )}
                {/* Home Icon for Portfolio Website */}
                {project.title === "Personal Portfolio Website" && (
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/");
                    }}
                    className="text-base-content hover:text-info transition-transform transform hover:scale-110 cursor-pointer"
                  >
                    <Icon icon="mdi:home" className="text-2xl" />
                  </button>
                )}
                {/* GitHub Icon */}
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

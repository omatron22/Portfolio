import React from "react";
import TypingAnimation from "../components/TypingAnimation";
import { Icon } from "@iconify-icon/react";
import ThreeDModelViewer from '../components/ThreeDModelViewer';  // Import the 3D Model Viewer

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero flex flex-col lg:flex-row items-start justify-start py-20 px-10"> 
        <div className="lg:w-1/2">
          {/* Typing Animation and Image on the Left */}
          <TypingAnimation
            texts={["Hey, I'm Omar!"]}
            speed={200} // Slower typing speed
          />
          <img
            src="/me.jpeg"
            alt="Omar's Profile"
            className="rounded-lg w-64 h-64 md:w-80 md:h-80 object-cover my-6" 
          />
        </div>
        <div className="lg:w-1/2">
          {/* Placeholder for future content */}
        </div>
      </section>

      {/* Education Section */}
      <section className="education bg-base-200 py-10 flex">
        <div className="lg:w-1/2 text-left px-10">
          <h2 className="text-4xl font-semibold mb-6">My Education</h2>
          <div className="card shadow-lg bg-base-300 p-4 mb-6">
            <h3 className="text-2xl font-bold text-primary">University of California, Los Angeles</h3>
            <p className="text-lg text-gray-500">(2020-2024)</p>
            <p className="text-lg">B.A. Linguistics and Computer Science</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:snowflake" className="text-2xl text-primary mr-3" />
                <p className="text-lg">UCLA Snowteam Athlete</p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:account-group" className="text-2xl text-primary mr-3" />
                <p className="text-lg">
                  Society of LatinX Engineers Member <em>(Web Developer)</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <ThreeDModelViewer modelPath="/bear_head/scene.gltf" />
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience bg-base-100 py-10 flex">
        <div className="lg:w-1/2 text-left px-10">
          <h2 className="text-4xl font-semibold mb-6">My Experience</h2>
          <div className="card shadow-lg bg-base-300 p-4 mb-6">
            <h3 className="text-2xl font-bold text-primary">Experior Laboratories</h3>
            <p className="text-lg text-gray-500">Programming Intern (Summer 2023)</p>
            <p>Developed shortcuts for the LabVIEW software using C, SQLite, and other technologies.</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:tools" className="text-2xl text-primary mr-3" />
                <p className="text-lg">Automation Project Lead</p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:database" className="text-2xl text-primary mr-3" />
                <p className="text-lg">Optimized Data Management Processes</p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:code-tags" className="text-2xl text-primary mr-3" />
                <p className="text-lg">C, SQLite, LabVIEW Expertise</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <ThreeDModelViewer modelPath="/computer/scene.gltf" />
        </div>
      </section>



{/* Soft Skills Section */}
<section className="soft-skills bg-base-100 py-10 px-10">
  <h2 className="text-4xl font-semibold mb-10 text-center">Soft Skills</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-base-200 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Bilingual</h3>
      <p className="text-sm">Fluent in English and Spanish.</p>
    </div>

    <div className="bg-base-200 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Teamwork</h3>
      <p className="text-sm">Worked on the web development team for UCLA’s Society of LatinX Engineers.</p>
    </div>

    <div className="bg-base-200 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Leadership</h3>
      <p className="text-sm">UCLA Snow Team member with excellent collaboration skills.</p>
    </div>

    <div className="bg-base-200 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Problem Solving</h3>
      <p className="text-sm">Strong critical thinking; assigned myself an automation project at ExperiorLabs, improving overall processes.</p>
    </div>
  
   <div className="bg-base-200 shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Communication</h3>
      <p className="text-sm">Phone Banking for the non profit group CHIRLA.</p>
    </div>
    </div>
</section>



{/* Skills Section */}
<section className="skills bg-base-200 py-10 px-10">
  <h2 className="text-4xl font-semibold mb-10 text-center">Technical Skills</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
    {/* Example Skills */}
    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Frontend Development</span>
      <p className="text-sm">HTML, CSS, JavaScript, React</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Backend Development</span>
      <p className="text-sm">Node.js, Express, SQL, MongoDB</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">UI/UX Design</span>
      <p className="text-sm">Figma, Adobe XD, Adobe Photoshop</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Database Management</span>
      <p className="text-sm">MySQL, PostgreSQL, Firebase</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Version Control</span>
      <p className="text-sm">Git, GitHub</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Cloud Services</span>
      <p className="text-sm">Google Cloud</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">Automation</span>
      <p className="text-sm">Excel Macros, Python Scripting</p>
    </div>

    <div className="flex flex-col items-center">
      <span className="text-lg font-medium">DevOps</span>
      <p className="text-sm">Docker, CI/CD</p>
    </div>
  </div>
</section>




{/* Tech Stack Section */}
<section className="tech-stack bg-base-200 py-10 text-center">
  <h2 className="text-4xl font-semibold mb-6">Technologies</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
    
    {/* C/C++ */}
    <div className="flex flex-col items-center">
      <img src="/c:c++.png" alt="C/C++" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">C/C++</span>
    </div>

    {/* Python */}
    <div className="flex flex-col items-center">
      <img src="/python.png" alt="Python" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Python</span>
    </div>

    {/* Java */}
    <div className="flex flex-col items-center">
      <img src="/java.png" alt="Java" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Java</span>
    </div>

    {/* JavaScript */}
    <div className="flex flex-col items-center">
      <img src="/javascript.png" alt="JavaScript" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">JavaScript</span>
    </div>

    {/* React.JS */}
    <div className="flex flex-col items-center">
      <img src="/react.png" alt="React.JS" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">React.JS</span>
    </div>

    {/* SQL */}
    <div className="flex flex-col items-center">
      <img src="/sql.png" alt="SQL" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">SQL</span>
    </div>

    {/* MongoDB */}
    <div className="flex flex-col items-center">
      <img src="/mongo.png" alt="MongoDB" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">MongoDB</span>
    </div>

    {/* Git */}
    <div className="flex flex-col items-center">
      <img src="/git.png" alt="Git" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Git</span>
    </div>

    {/* Bash */}
    <div className="flex flex-col items-center">
      <img src="/bash.png" alt="Bash" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Bash</span>
    </div>

    {/* Excel Macro */}
    <div className="flex flex-col items-center">
      <img src="/macro.png" alt="Excel Macro" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Excel Macro</span>
    </div>

    {/* HTML */}
    <div className="flex flex-col items-center">
      <img src="/html.png" alt="HTML" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">HTML</span>
    </div>

    {/* CSS */}
    <div className="flex flex-col items-center">
      <img src="/css.png" alt="CSS" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">CSS</span>
    </div>

    {/* Lisp */}
    <div className="flex flex-col items-center">
      <img src="/lisp.png" alt="Lisp" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Lisp</span>
    </div>

    {/* OCaml */}
    <div className="flex flex-col items-center">
      <img src="/ocaml.png" alt="OCaml" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">OCaml</span>
    </div>

    {/* Rust */}
    <div className="flex flex-col items-center">
      <img src="/rust.png" alt="Rust" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Rust</span>
    </div>

    {/* Prolog */}
    <div className="flex flex-col items-center">
      <img src="/prolog.png" alt="Prolog" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Prolog</span>
    </div>

    {/* Haskell */}
    <div className="flex flex-col items-center">
      <img src="/haskell.png" alt="Haskell" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Haskell</span>
    </div>

    {/* Firebase */}
    <div className="flex flex-col items-center">
      <img src="/firebase.png" alt="Firebase" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Firebase</span>
    </div>

    {/* Google Cloud */}
    <div className="flex flex-col items-center">
      <img src="/google.png" alt="Google Cloud" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Google Cloud</span>
    </div>

    {/* Photoshop */}
    <div className="flex flex-col items-center">
      <img src="/photoshop.png" alt="Photoshop" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Photoshop</span>
    </div>

    {/* Canva */}
    <div className="flex flex-col items-center">
      <img src="/canva.png" alt="Canva" className="w-20 h-20 object-contain mb-2" />
      <span className="text-lg">Canva</span>
    </div>
  </div>
</section>



      {/* Footer with LinkedIn, GitHub, and CV */}
      <footer className="bg-base-300 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.linkedin.com/in/omaresp22/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon icon="mdi:linkedin" className="text-4xl" />
          </a>
          <a href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon icon="mdi:github" className="text-4xl" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
            <Icon icon="mdi:file-pdf-box" className="text-4xl" />
          </a>
        </div>
        <p className="text-sm">© 2024 Omar Espinoza</p>
      </footer>
    </div>
  );
};

export default Home;
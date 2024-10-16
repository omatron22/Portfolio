import React from "react";
import TypingAnimation from "../components/TypingAnimation";
import { Icon } from "@iconify-icon/react";
import SimpleImageSlider from "react-simple-image-slider"; // Image slider component
import MySVGComponent from '../components/MySVGComponent';
import MySVGComponent2 from '../components/MySVGComponent2';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-start items-center p-0 m-0 overflow-hidden h-auto">
        {/* Typing Animation - Top Center */}
        <div className="z-10 text-center absolute top-10 w-full">
          <TypingAnimation texts={["Hey, I'm Omar!"]} speed={200} />
        </div>

        {/* SVG Component - Increased size and moved lower */}
        <div className="w-full h-auto flex justify-start items-center mt-8 mb-2">
          <MySVGComponent className="w-[90%] h-auto ml-auto" />
        </div>

        <section className="relative w-full h-auto mt-8 mb-2">
          {/* Parent container for SVG, Education, and Experience */}
          <div className="relative w-full h-auto">

            {/* About Section */}
            <section className="relative about bg-base-200 py-10 flex">
              <div className="lg:w-1/2 text-left px-10 z-20">
                <h2 className="text-4xl font-semibold mb-6">About me</h2>
                <div className="card shadow-lg bg-base-300 p-6 z-30">
                  <p className="text-lg leading-relaxed text-base-content">
                    Hi! My name is Omar Espinoza. I'm from Ventura, California. I spend most of my time working on a project, making music, or being outdoors.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 flex items-center justify-center z-10">
                {/* Empty space or image section */}
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ width: '450px', height: '300px' }}>
                  <SimpleImageSlider
                    width={450}
                    height={300}
                    images={[
                      { url: "/two.jpeg" },
                      { url: "/one.jpg" },
                      { url: "/three.jpeg" }
                    ]}
                    showBullets={true}
                    showNavs={false}
                    autoPlay={false}
                    slideDuration={3}
                    style={{
                      borderRadius: '12px',
                      clipPath: 'inset(0 round 12px)',
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section className="relative education bg-base-200 py-10 flex">
              <div className="lg:w-1/2 flex items-center justify-start z-10">
                {/* Empty left space */}
              </div>
              <div className="lg:w-1/2 text-left px-10 z-20">
                <h2 className="text-4xl font-semibold mb-6">Education</h2>
                <div className="card shadow-lg bg-base-300 p-4 mb-6 z-30">
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
                      <p className="text-lg">Society of LatinX Engineers Member <em>(Web Developer)</em></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section className="relative experience bg-base-100 py-10 flex">
              <div className="lg:w-1/2 text-left px-10 z-20">
                <h2 className="text-4xl font-semibold mb-6">Experience</h2>
                <div className="card shadow-lg bg-base-300 p-4 mb-6 z-30">
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
              <div className="lg:w-1/2 flex items-center justify-center z-10">
                {/* Empty right space */}
              </div>
            </section>

            {/* SVG Background */}
            <div className="absolute w-full h-full z-10 pointer-events-none" style={{ top: '300px', transform: 'scale(1.5)', left: '285px' }}>
              <MySVGComponent2 className="w-full h-full" />
            </div>
          </div>
        </section>
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
<section className="tech-stack bg-base-200 py-10">
  <h2 className="text-3xl font-semibold mb-6 text-center">Technologies</h2>
  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4 w-full px-6">
    {/* Icon List */}
    {[{ src: "/c:c++.png", alt: "C/C++", width: "w-16", height: "h-16" },
      { src: "/python.png", alt: "Python", width: "w-14", height: "h-14" },
      { src: "/java.png", alt: "Java", width: "w-14", height: "h-14" },
      { src: "/javascript.png", alt: "JavaScript", width: "w-14", height: "h-14" },
      { src: "/react.png", alt: "React.JS", width: "w-14", height: "h-14" },
      { src: "/sql.png", alt: "SQL", width: "w-14", height: "h-14" },
      { src: "/mongo.png", alt: "MongoDB", width: "w-14", height: "h-14" },
      { src: "/git.png", alt: "Git", width: "w-14", height: "h-14" },
      { src: "/bash.png", alt: "Bash", width: "w-14", height: "h-14" },
      { src: "/macro.png", alt: "Excel Macro", width: "w-14", height: "h-14" },
      { src: "/html.png", alt: "HTML", width: "w-14", height: "h-14" },
      { src: "/css.png", alt: "CSS", width: "w-14", height: "h-14" },
      { src: "/lisp.png", alt: "Lisp", width: "w-12", height: "h-12" },
      { src: "/ocaml.png", alt: "OCaml", width: "w-12", height: "h-12" },
      { src: "/rust.png", alt: "Rust", width: "w-12", height: "h-12" },
      { src: "/prolog.png", alt: "Prolog", width: "w-12", height: "h-12" },
      { src: "/haskell.png", alt: "Haskell", width: "w-14", height: "h-14" },
      { src: "/firebase.png", alt: "Firebase", width: "w-14", height: "h-14" },
      { src: "/google.png", alt: "Google Cloud", width: "w-12", height: "h-12" },
      { src: "/photoshop.png", alt: "Photoshop", width: "w-12", height: "h-12" },
      { src: "/canva.png", alt: "Canva", width: "w-16", height: "h-16" }].map((icon, index) => (
      <div key={index} className="flex items-center justify-center">
        <img src={icon.src} alt={icon.alt} className={`${icon.width} ${icon.height} object-contain`} />
      </div>
    ))}
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
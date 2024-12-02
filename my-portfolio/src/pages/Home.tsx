import React, { useRef, useState, useEffect } from "react";
import TypingAnimation from "../components/TypingAnimation";
import { Icon } from "@iconify-icon/react";
import SimpleImageSlider from "react-simple-image-slider";
import MySVGComponent from '../components/MySVGComponent';
import MySVGComponent2 from '../components/MySVGComponent2';

const Home = () => {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

  const handleHeroClick = () => {
    if (aboutSectionRef.current) {
      const aboutSectionTop = aboutSectionRef.current.getBoundingClientRect().top + window.scrollY;
      console.log("Scrolling to:", aboutSectionTop);
      window.scrollTo({
        top: aboutSectionTop,
        behavior: "smooth",
      });
    }
  };

  // Scaling logic
  const [scale, setScale] = useState(1);

  const scalingContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const designWidth = 1440; // Your full-screen design width in pixels

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const scaleFactor = currentWidth / designWidth;
      setScale(scaleFactor);

      if (contentRef.current && scalingContainerRef.current) {
        const contentHeight = contentRef.current.offsetHeight; // Unscaled height
        const scaledHeight = contentHeight * scaleFactor; // Scaled visual height
        scalingContainerRef.current.style.height = `${scaledHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial scale
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-base-100 text-base-content overflow-hidden">
      {/* Scaling container */}
      <div
        ref={scalingContainerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          // Height is set dynamically
        }}
      >
        <div ref={contentRef}>

{/* Hero Section */}
<section className="relative flex flex-col justify-start items-center p-0 m-0 overflow-hidden h-auto">
  {/* Typing Animation - Top Center */}
  <div className="z-10 text-center absolute top-10 w-full">
    <TypingAnimation texts={["Hey, I'm Omar!"]} speed={200} />
  </div>

  {/* Clickable SVG Wrapper */}
  <div
  className="w-full h-auto flex justify-start items-center mt-8 mb-2 transform transition-transform duration-300 hover:scale-105 cursor-pointer z-30"
  onClick={handleHeroClick}
>
  <MySVGComponent className="w-[90%] h-auto ml-auto" />
</div>


        <section className="relative w-full h-auto mt-8 mb-2">
          {/* Parent container for SVG, Education, and Experience */}
          <div className="relative w-full h-auto">

{/* About Section */}
<section ref={aboutSectionRef} className="relative about bg-base-200 py-10 flex">
<div className="w-1/2 text-left px-10 z-20">
    {/* Content Section as Pop-Up Window */}
    <div className="relative bg-base-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300">
    {/* Header Tab as Window Title Bar */}
      <div className="bg-base-300 text-lg flex items-center justify-between py-2 px-4">
        <h2 className="text-lg font-semibold">About Me</h2>
        <div className="flex space-x-2">
        </div>
      </div>
      {/* Card Content */}
      <div className="p-6">
        <p className="text-lg leading-relaxed text-base-content">
          Hi! My name is Omar Espinoza. I'm from Ventura, California. I spend most of my time working on a project, making music, or being outdoors.
        </p>
      </div>
    </div>
  </div>
  <div className="w-1/2 flex items-center justify-center z-10">
{/* Image Slider Section */}
<div className="rounded-xl overflow-hidden shadow-lg ml-40" style={{ width: '450px', height: '300px' }}>
  <SimpleImageSlider
    width={450}
    height={300}
    images={[
      { url: "/two.jpeg" },
      { url: "/one.JPG" },
      { url: "/three.jpeg" }
    ]}
    showBullets={false}
    showNavs={true}
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
  <div className="w-1/2 flex items-center justify-start z-10">
    {/* Empty left space */}
  </div>
  <div className="w-1/2 text-left px-10 z-20">
    {/* Content Section as Pop-Up Window */}
    <div className="relative bg-base-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300">
      {/* Header Tab as Window Title Bar */}
      <div className="bg-base-300 text-lg flex items-center justify-between py-2 px-4">
        <h2 className="text-lg font-semibold">Education</h2>
        <div className="flex space-x-2">
        </div>
      </div>
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-lg">
          <a
            href="https://www.ucla.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-info transition-colors duration-300"
          >
            University of California, Los Angeles
          </a>
        </h3>
        <p className="text-lg text-secondary">(2020-2024)</p>
        <p className="text-lg">B.A. Linguistics and Computer Science</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <Icon icon="mdi:snowflake" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg">
              <a
                href="https://uclaclubsports.com/sports/mens-skiing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-info transition-colors duration-300"
              >
                UCLA Snowteam Athlete
              </a>
            </p>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:account-group" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg">
              <a
                href="https://uclasoles.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-info transition-colors duration-300"
              >
                Society of LatinX Engineers Member <em>(Web Developer)</em>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Experience Section */}
<section className="relative experience bg-base-100 py-10 flex">
  <div className="w-1/2 text-left px-10 z-20">
    {/* Content Section as Pop-Up Window */}
    <div className="relative bg-base-100 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300">
      {/* Header Tab as Window Title Bar */}
      <div className="bg-base-300 text-lg flex items-center justify-between py-2 px-4">
        <h2 className="text-lg font-semibold">Experience</h2>
        <div className="flex space-x-2">

        </div>
      </div>
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-lg">
          <a
            href="https://experiorlabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-info transition-colors duration-300"
          >
            Experior Laboratories
          </a>
        </h3>
        <p className="text-lg text-secondary">Programming Intern (Summer 2023)</p>
        <p>
          Developed shortcuts for the LabVIEW software using C, SQLite, and other technologies. Learn more about the project 
          <a
            href="https://github.com/omatron22/GPIB-to-SQL-DLL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info hover:underline ml-1"
          >
            here.
          </a>
        </p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <Icon icon="mdi:tools" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg">Automation Project Lead</p>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:database" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg">Optimized Data Management Processes</p>
          </div>
          <div className="flex items-center">
            <Icon icon="mdi:code-tags" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg">C, SQLite, LabVIEW Expertise</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-1/2 flex items-center justify-center z-10">
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

{/* Skills Section */}
<section className="skills bg-base-100 py-16 px-8">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
    {/* Skills */}
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
    <span className="text-xl font-semibold text-lg">Frontend Development</span>
      <p className="text-base text-lg">HTML, CSS, JavaScript, React, Tailwind CSS, DaisyUI</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">Backend Development</span>
      <p className="text-base text-lg">Node.js, MongoDB, SQL</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">UI/UX Design</span>
      <p className="text-base text-lg">Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">Database Management</span>
      <p className="text-base text-lg">Relational Databases (MySQL), NoSQL Databases (Firebase)</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">Version Control</span>
      <p className="text-base text-lg">Git, GitHub</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">Cloud Services</span>
      <p className="text-base text-lg">Google Cloud, Firebase Hosting</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">Automation</span>
      <p className="text-base text-lg">Python Scripting, C/C++</p>
    </div>
    <div className="bg-base-100 border border-base-200 rounded-lg p-4 shadow-md flex flex-col items-center space-y-3">
      <span className="text-xl font-semibold text-lg">DevOps</span>
      <p className="text-base text-lg">Docker, CI/CD</p>
    </div>
  </div>
</section>


{/* Tech Stack Section */}
<section className="tech-stack bg-base-200 py-10">
  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4 w-full px-6">
    {/* Icon List */}
    {[{ src: "/c:c++.png", alt: "C/C++", width: "w-24", height: "h-24" },
      { src: "/python.png", alt: "Python", width: "w-14", height: "h-14" },
      { src: "/javascript.png", alt: "JavaScript", width: "w-14", height: "h-14" },
      { src: "/html.png", alt: "HTML", width: "w-14", height: "h-14" },
      { src: "/css.png", alt: "CSS", width: "w-14", height: "h-14" },
      { src: "/logo192.png", alt: "React.JS", width: "w-14", height: "h-14" },
      { src: "/git.png", alt: "Git", width: "w-14", height: "h-14" },
      { src: "/SQL.png", alt: "SQL", width: "w-14", height: "h-14" },
      { src: "/mongo.png", alt: "MongoDB", width: "w-14", height: "h-14" },
      { src: "/firebase.png", alt: "Firebase", width: "w-14", height: "h-14" },
      { src: "/google.png", alt: "Google Cloud", width: "w-12", height: "h-12" },
      { src: "/photoshop.png", alt: "Photoshop", width: "w-11", height: "h-11" },
      { src: "/illustrator.png", alt: "illustrator", width: "w-16", height: "h-16" }, 
      { src: "/xd.png", alt: "xd", width: "w-24", height: "h-24" }].map((icon, index) => (
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
      <Icon icon="mdi:linkedin" className="text-4xl hover:text-info hover:scale-110 transition-transform duration-300" />
    </a>
    <a href="https://github.com/omatron22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <Icon icon="mdi:github" className="text-4xl hover:text-success hover:scale-110 transition-transform duration-300" />
    </a>
    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV">
      <Icon icon="mdi:file-pdf-box" className="text-4xl hover:text-error hover:scale-110 transition-transform duration-300" />
    </a>
  </div>
  <p className="text-sm">© 2024 Omar Espinoza</p>
</footer>
    </div>
    </div>
    </div>

  );
};

export default Home;
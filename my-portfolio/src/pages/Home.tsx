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
    
      // Detect pinch zoom on mobile devices
      const isPinchZoomed = window.innerWidth !== window.outerWidth;
    
      if (isPinchZoomed) {
        // Skip the scaling logic during pinch zoom
        return;
      }
    
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
  <div className="w-3/5 text-left px-6 z-20">
    {/* Content Section as Modern Card */}
    <div className="bg-base-100 shadow-md border border-base-300 p-6 rounded-lg w-full">
      {/* Card Header */}
      <h2 className="text-xl font-clash font-bold mb-4">
        About Me
      </h2>

      {/* Card Content */}
      <p className="text-base leading-relaxed text-base-content font-Inter">
      Hi, I’m Omar Espinoza from Ventura, California. I like creating things – whether I’m coding a web application, redesigning old furniture, or improvising on my guitar and piano. I aim to channel my passion into unique, thoughtful creations that bring ideas to life. Few things are more satisfying than transforming a vision into something real that resonates with others. I’m looking to apply my technical and creative skills in a role where I can keep learning and improve how people interact with technology.      </p>
    </div>
  </div>

  <div className="w-2/5 flex items-center justify-center z-10">
    {/* Image Slider Section */}
    <div 
      className="relative overflow-hidden shadow-lg border border-base-300 rounded-lg transition-transform"
      style={{ maxWidth: '450px', aspectRatio: '3 / 2' }} 
    >
      <div 
        className="bg-base-100 relative h-full w-full overflow-hidden"
      >
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
          slideDuration={4} 
          navStyle={2} 
          navSize={40} 
          navMargin={10} 
        />
      </div>
    </div>
  </div>
</section>



{/* Education Section */}
<section className="relative education bg-base-200 py-10 flex">
  <div className="w-1/2 flex items-center justify-start z-10">
    {/* Empty left space */}
  </div>
  <div className="w-1/2 text-left px-10 z-20">
    {/* Content Section as Modern Floating Card */}
    <div className="relative bg-base-100 shadow-md border border-base-300 rounded-lg overflow-hidden">
      
      {/* Header Tab */}
      <div className="bg-secondary text-base-content py-3 px-4">
        <h2 className="text-lg font-clash font-semibold">Education</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="font-clash text-lg">
          <a
            href="https://www.ucla.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-info transition-colors duration-300"
          >
            University of California, Los Angeles
          </a>
        </h3>
        
        <p className="text-lg font-clash text-secondary">(2020-2024)</p>
        
        <p className="text-lg font-Inter">B.A. Linguistics and Computer Science</p>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <Icon icon="mdi:snowflake" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg font-Inter">
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
            <p className="text-lg font-Inter">
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
    {/* Content Section as Modern Floating Card */}
    <div className="relative bg-base-100 shadow-md border border-base-300 rounded-lg overflow-hidden">
      
      {/* Header Tab */}
      <div className="bg-secondary text-base-content py-3 px-4">
        <h2 className="text-lg font-clash font-semibold">Experience</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="font-clash text-lg">
          <a
            href="https://experiorlabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-info transition-colors duration-300"
          >
            Experior Laboratories
          </a>
        </h3>
        
        <p className="text-lg font-clash text-secondary">Programming Intern (Summer 2023)</p>
        
        <p className="text-lg font-Inter">
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
            <p className="text-lg font-Inter">Automation Project Lead</p>
          </div>

          <div className="flex items-center">
            <Icon icon="mdi:database" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg font-Inter">Optimized Data Management Processes</p>
          </div>

          <div className="flex items-center">
            <Icon icon="mdi:code-tags" className="text-2xl text-base-400 mr-3" />
            <p className="text-lg font-Inter">C, SQLite, LabVIEW Expertise</p>
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
<div 
  className="absolute w-full h-full z-10 pointer-events-none" 
  style={{ top: '350px', transform: 'scale(1.5)', left: '285px' }} // Adjusted top from 300px to 350px
>
  <MySVGComponent2 className="w-full h-full" />
</div>

          </div>
        </section>
      </section>

{/* Skills Section */}
<section className="skills bg-base-100 py-16 px-8">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    {[
      { title: 'Frontend Development', skills: 'HTML, CSS, JavaScript, React, Tailwind CSS, DaisyUI' },
      { title: 'Backend Development', skills: 'Node.js, MongoDB, SQL' },
      { title: 'UI/UX Design', skills: 'Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator' },
      { title: 'Database Management', skills: 'Relational Databases (MySQL), NoSQL Databases (Firebase)' },
      { title: 'Version Control', skills: 'Git, GitHub' },
      { title: 'Cloud Services', skills: 'Google Cloud, Firebase Hosting' },
      { title: 'Automation', skills: 'Python Scripting, C/C++' },
      { title: 'DevOps', skills: 'Docker, CI/CD' }
    ].map((skill, index) => (
      <div 
        key={index} 
        className="relative bg-base-100 shadow-lg p-6 flex flex-col items-center text-center space-y-4 rounded-lg"
      >
        {/* Title */}
        <h2 className="text-xl font-clash font-semibold text-trace">
          {skill.title}
        </h2>

        {/* Content */}
        <p className="text-base font-clash leading-relaxed text-base-content">
          {skill.skills}
        </p>
      </div>
    ))}
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
    <Icon icon="mdi:file-document-outline" className="text-4xl hover:text-error hover:scale-110 transition-transform duration-300" />
    </a>
  </div>
  <p className="text-sm font-clash">© 2024 Omar Espinoza</p>
</footer>
    </div>
    </div>
    </div>
  );
};

export default Home;
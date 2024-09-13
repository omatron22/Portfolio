import React from "react";
import TypingAnimation from "../components/TypingAnimation";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content"> {/* DaisyUI utility classes */}
      <h1 className="text-5xl font-bold">Hi, I'm Omar!</h1>
      <TypingAnimation
        texts={["I don't know what I'm doing", "I love my water bottle", "I miss my dog"]}
        speed={150}
      />
      <p className="mt-5 text-lg">
        I build web applications with a passion for software development and AI-driven solutions. Let’s build something amazing!
      </p>
    </div>
  );
};

export default Home;

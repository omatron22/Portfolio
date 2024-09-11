import React from "react";
import TypingAnimation from "../components/TypingAnimation"; // Ensure this path is correct

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">Hi, I'm Omar!</h1>
      <TypingAnimation texts={["I dont know what I'm doing", "I love my water bottle", "I miss my dog"]} speed={150} />
      <p className="mt-5 text-lg">I build web applications with a passion for software development and AI-driven solutions. Let’s build something amazing!</p>
    </div>
  );
};

export default Home;
export {};

import React from "react";
import TypingAnimation from "./TypingAnimation";

export default function Hero() {
  return (
    <section className="hero min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-4">Hi, I'm Omar!</h1>
      <TypingAnimation texts={["Full Stack Developer", "AI Enthusiast", "Tech Lover"]} speed={150} />
      <p className="mt-5 text-lg">
        I build modern web applications with a passion for technology and AI-driven solutions.
      </p>
    </section>
  );
}

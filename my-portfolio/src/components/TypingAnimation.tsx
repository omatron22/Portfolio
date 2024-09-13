import React, { useEffect, useState } from "react";

type Props = {
  texts: string[];
  speed: number;
};

const TypingAnimation = ({ texts, speed }: Props) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => prev + texts[currentIndex].charAt(charIndex));
      setCharIndex((prevCharIndex) => prevCharIndex + 1);

      // When we finish typing out the current text
      if (charIndex === texts[currentIndex].length) {
        setTimeout(() => {
          setCurrentText("");
          setCharIndex(0);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);  // Pause before moving to the next word
      }
    }, speed);

    return () => clearInterval(interval);
  }, [charIndex, currentIndex, texts, speed]);

  return <p>{currentText}</p>;
};

export default TypingAnimation;

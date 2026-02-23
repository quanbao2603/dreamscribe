import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number; 
  className?: string; 
  infinite?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 100, 
  className = "", 
  infinite = true 
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex(0);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, infinite]);

  return (
    <span className={`${className} inline relative border-r-4 border-purple-500 pr-1 py-2 animate-pulse-cursor`}>
      {currentText}
    </span>
  );
};

export default Typewriter;
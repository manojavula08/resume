
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Mail, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

import { socialMediaLinks } from '@/utils/socialMediaLinks';


const HeroSection = () => {
  const [nameColorIndex, setNameColorIndex] = useState(0);
  const [displayText, setDisplayText] = useState("Hello, there");
  const [languageIndex, setLanguageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showCursor, setShowCursor] = useState(true);

  // Colors for name transition
  const nameColors = [
    "text-slate-500", 
    "text-gray-500", 
    "text-blue-500", 
    "text-indigo-600",
    "text-green-500",
    "text-orange-500"
  ];

  // Programming languages to cycle through - added Kotlin and C
  const greetings = [
    "Hello, there",
    "console.log('Hello, there')",
    "print('Hello, there')",
    "System.out.println('Hello, there')",
    "echo 'Hello, there'",
    "<h1>Hello, there.</h1>",
    "println(\"Hello, there\")",
    "printf(\"Hello, there\");" 
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Name color transition effect
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setNameColorIndex((prevIndex) => (prevIndex + 1) % nameColors.length);
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentGreeting = greetings[languageIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText((prev) => 
          currentGreeting.substring(0, prev.length + 1)
        );
        
        // If completed typing current greeting
        if (displayText === currentGreeting) {
          // Pause before deleting
          setTypingSpeed(1500);
          setIsDeleting(true);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
        setTypingSpeed(40);
        
        // If completely deleted
        if (displayText === '') {
          setIsDeleting(false);
          setLanguageIndex((prevIndex) => (prevIndex + 1) % greetings.length);
          setTypingSpeed(150);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, languageIndex]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col">
        <div className="space-y-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-primary font-mono h-6">
            {displayText}
            <span 
              className={`font-bold ${nameColors[nameColorIndex]} ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            >
              |
            </span>
          </p>
          <h1 className={`text-5xl md:text-7xl font-bold transition-colors duration-500 ${nameColors[nameColorIndex]}`}>
            Manoj Avula.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-slate">
            I build things for the web.
          </h2>
          <p className="text-slate-dark text-xl font-medium -mt-1 hover:text-primary hover:scale-110">Full stack developer</p>
          <p className="text-slate max-w-xl text-lg md:text-xl py-6">
            I'm a software developer specializing in building exceptional digital experiences.
            Currently, I'm focused on building accessible, human-centered products.
          </p>
          
          <div className="flex space-x-6 pt-2">
            <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-primary transition-colors duration-300 group">
              <Github className=" transition-all duration-300 hover:scale-125 group-hover:fill-primary group-hover:text-primary" size={24} />
            </a>
            <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-primary transition-colors duration-300 group">
              <Linkedin className="transition-all duration-300 hover:scale-125 group-hover:fill-primary group-hover:text-primary" size={24} />
            </a>
            <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-primary transition-colors duration-300 group">
              <Instagram className="transition-all duration-300 hover:scale-125  group-hover:text-primary" size={24} />
            </a>
            <a href={socialMediaLinks.email} className="text-slate hover:text-primary transition-colors duration-300 group">
              <Mail className="transition-all duration-300 hover:scale-125  group-hover:text-primary" size={24} />
            </a>
            <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate hover:text-primary transition-colors duration-300 group">
              <Twitter className="transition-all duration-300 hover:scale-125 group-hover:fill-primary group-hover:text-primary" size={24} />
            </a>
          </div>
          
          <div className="pt-6">
            <a href="#about">
              <Button
                className="bg-primary text-white hover:bg-primary/90 px-7 py-6 text-base hover:scale-105 transition-transform"
              >
                Check out my work
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-slate hover:text-primary transition-colors duration-300">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

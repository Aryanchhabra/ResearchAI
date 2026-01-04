import React, { FC, useEffect, useState, useRef } from "react";
import InputArea from "./ResearchBlocks/elements/InputArea";
import { motion, AnimatePresence } from "framer-motion";

type THeroProps = {
  promptValue: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleDisplayResult: (query: string) => void;
};

const Hero: FC<THeroProps> = ({
  promptValue,
  setPromptValue,
  handleDisplayResult,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Enhanced particle effect with gradient orbs
    if (particlesContainerRef.current) {
      const container = particlesContainerRef.current;
      const particleCount = window.innerWidth < 768 ? 12 : 25;
      container.innerHTML = '';
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 40 + 25;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.15 + 0.05;
        
        // Random gradient colors
        const colors = [
          'rgba(20, 184, 166, 0.1)',
          'rgba(6, 182, 212, 0.1)',
          'rgba(59, 130, 246, 0.1)',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.className = 'absolute rounded-full';
        Object.assign(particle.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          background: color,
          opacity: opacity.toString(),
          boxShadow: `0 0 ${size * 4}px ${color}`,
          animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        });
        
        container.appendChild(particle);
      }
    }
  }, []);

  const handleClickSuggestion = (value: string) => {
    setPromptValue(value);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Enhanced gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Particle background */}
      <div ref={particlesContainerRef} className="absolute inset-0 -z-10 pointer-events-none"></div>
      
      {/* Main content - Perfectly Centered */}
      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full max-w-4xl px-6 sm:px-8 relative z-10 flex flex-col items-center"
      >
        {/* Brand - Centered */}
        <motion.div
          variants={fadeInUp}
          className="text-center mb-20 w-full"
        >
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Research
            </span>
            <motion.span 
              className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-light ml-3"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              AI
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-gray-500 text-lg sm:text-xl font-extralight tracking-wider mb-4"
            variants={fadeInUp}
          >
            Intelligent research, simplified
          </motion.p>
          <motion.div 
            className="flex justify-center items-center gap-4 mt-8"
            variants={fadeInUp}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-teal-400/60"></div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </motion.div>
        </motion.div>
        
        {/* Input section - Centered and Prominent */}
        <motion.div 
          variants={fadeInUp}
          className="mb-12 w-full flex justify-center"
        >
          <InputArea
            promptValue={promptValue}
            setPromptValue={setPromptValue}
            handleSubmit={handleDisplayResult}
          />
        </motion.div>

        {/* Suggestions - Centered */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-16 w-full"
        >
          <AnimatePresence>
            {suggestions.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
                onClick={() => handleClickSuggestion(item.name)}
                className="group relative px-6 py-3 rounded-2xl 
                         border border-white/5 bg-white/5 
                         backdrop-blur-sm
                         hover:border-white/10 hover:bg-white/10
                         transition-all duration-300
                         text-sm text-gray-400 hover:text-gray-200
                         font-light overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">{item.name}</span>
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-blue-500/0 
                              group-hover:from-teal-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 
                              transition-all duration-500"></div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Features - Centered */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center items-center gap-10 text-sm text-gray-600"
        >
          <motion.span 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-teal-400/60 animate-pulse"></div>
            <span className="font-extralight tracking-wide">AI-Powered</span>
          </motion.span>
          <motion.span 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <span className="font-extralight tracking-wide">Real-time</span>
          </motion.span>
          <motion.span 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <span className="font-extralight tracking-wide">Citations</span>
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

type suggestionType = {
  id: number;
  name: string;
  icon: string;
};

const suggestions: suggestionType[] = [
  {
    id: 1,
    name: "Analyze trends in",
    icon: "/img/stock2.svg",
  },
  {
    id: 2,
    name: "Research about",
    icon: "/img/hiker.svg",
  },
  {
    id: 3,
    name: "Latest developments in",
    icon: "/img/news.svg",
  },
];

export default Hero;

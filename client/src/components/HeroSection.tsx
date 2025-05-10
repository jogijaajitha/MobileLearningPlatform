import React, { useRef } from 'react';
import WaitlistForm from './WaitlistForm';
import APP_IMAGES from '@/assets/AppScreens';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Hero Content */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-4"
            >
              Learn Anything in <span className="text-[#4A6FFF]">Minutes</span>, Not Months
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              Skrolla turns any topic into engaging, swipeable flashcards powered by AI. From Spanish to Astrophysics—learn faster with personalized content that adapts to you.
            </motion.p>
            
            {/* CTA Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md"
            >
              <WaitlistForm />
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <img 
              src={APP_IMAGES.heroApp}
              alt="Skrolla app on smartphone" 
              className="rounded-3xl shadow-2xl mx-auto max-w-xs md:max-w-sm"
            />
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="absolute -top-6 -left-6 bg-[#FFD166] rounded-full w-12 h-12 md:w-16 md:h-16 opacity-70"
            />
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
              className="absolute -bottom-8 -right-4 bg-[#4A6FFF] rounded-full w-20 h-20 opacity-20"
            />
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <motion.button
            onClick={scrollToHowItWorks}
            whileHover={{ scale: 1.1 }}
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="text-gray-400"
          >
            <ChevronDown size={24} />
          </motion.button>
        </div>
      </div>
      
      {/* Reference to how-it-works section for smooth scrolling */}
      <div id="how-it-works" ref={howItWorksRef} className="h-0 w-0" />
    </section>
  );
};

export default HeroSection;

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
              Type. Swipe. <span className="text-[#4A6FFF]">Master</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 mb-6"
            >
              Skrolla turns any topic into dynamic, scrollable flashcards that combine short-form lessons with interactive Q&A. It's microlearning designed for busy minds and short attention spans—powered by AI, personalized for you.
            </motion.p>
            
            {/* Value Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-lg">📚</span>
                </div>
                <p className="text-base text-gray-700 font-medium">Learn anything—from coding to cooking—in minutes.</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-lg">⚡</span>
                </div>
                <p className="text-base text-gray-700 font-medium">Flashcards that teach <em>and</em> quiz you.</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-lg">📱</span>
                </div>
                <p className="text-base text-gray-700 font-medium">Designed for swipe-based, mobile-first learning.</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-lg">🤖</span>
                </div>
                <p className="text-base text-gray-700 font-medium">Powered by AI, tailored to your interests.</p>
              </div>
            </motion.div>
            
            {/* CTA Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md"
            >
              <div className="relative">
                <div className="absolute -top-3 -left-3 bg-[#FFD166] w-16 h-16 rounded-full opacity-20 z-0"></div>
                <div className="border-2 border-[#4A6FFF] rounded-xl p-6 bg-white shadow-lg relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A6FFF] flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">Join the Waitlist</h3>
                  </div>
                  <p className="text-base text-gray-600 mb-5">Be the first to try Skrolla and turn your scroll time into learning time.</p>
                  <WaitlistForm buttonText="Get Early Access" />
                </div>
              </div>
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

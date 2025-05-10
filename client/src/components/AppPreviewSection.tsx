import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import APP_IMAGES from '@/assets/AppScreens';
import { motion } from 'framer-motion';

const AppPreviewSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const benefits = [
    {
      highlight: "Instant knowledge",
      text: "on any topic with AI-generated flashcards"
    },
    {
      highlight: "Deeper understanding",
      text: "through interactive Q&A learning prompts"
    },
    {
      highlight: "Efficient learning",
      text: "with content tailored specifically to your needs"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:w-1/2 order-2 lg:order-1"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-6">
              AI-Powered Flashcards for Any Topic
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8">
              Skrolla uses advanced AI to generate custom flashcards combining concise learning content and Q&A prompts for any topic you want to master—no manual content creation needed.
            </motion.p>
            
            <motion.div variants={containerVariants} className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div key={index} variants={itemVariants} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <Check className="text-emerald-500 h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-medium">{benefit.highlight}</span> {benefit.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10">
              <Button 
                onClick={() => {
                  const element = document.getElementById('get-early-access');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#4A6FFF] hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-all"
              >
                Join the Waiting List
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right App Showcase */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Two phone mockups showing the app interface */}
              <div className="flex justify-center space-x-4">
                <motion.div 
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: -6, y: 16 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <img 
                    src={APP_IMAGES.appPreview1}
                    alt="Skrolla app interface example 1" 
                    className="h-96 rounded-3xl shadow-xl"
                  />
                </motion.div>
                <motion.div 
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: 6, y: -16 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  <img 
                    src={APP_IMAGES.appPreview2}
                    alt="Skrolla app interface example 2" 
                    className="h-96 rounded-3xl shadow-xl"
                  />
                </motion.div>
              </div>
              
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
                className="absolute top-1/4 -left-12 bg-[#FFD166] rounded-full w-24 h-24 opacity-30"
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
                className="absolute bottom-1/4 -right-12 bg-[#4A6FFF] rounded-full w-32 h-32 opacity-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewSection;

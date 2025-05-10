import React from 'react';
import APP_IMAGES from '@/assets/AppScreens';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorksSection: React.FC = () => {
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

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-4">
            How Skrolla Works
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learning shouldn't be complicated. With Skrolla, mastering any subject is as simple as these three steps.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <img 
                src={APP_IMAGES.step1}
                alt="Entering a topic in Skrolla app" 
                className="rounded-2xl shadow-lg h-64 object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-[#4A6FFF] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Enter Any Topic</h3>
            <p className="text-gray-600">
              Type anything you're curious about—from quantum physics to digital marketing—and watch AI create your personal curriculum.
            </p>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <img 
                src={APP_IMAGES.step2}
                alt="Flashcards in Skrolla app" 
                className="rounded-2xl shadow-lg h-64 object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-[#FF6B6B] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">2</div>
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Swipe Through Flashcards</h3>
            <p className="text-gray-600">
              Effortlessly flip through beautiful, engaging cards that break down complex concepts into digestible pieces. No more information overload.
            </p>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <img 
                src={APP_IMAGES.step3}
                alt="Learning through Q&A on Skrolla" 
                className="rounded-2xl shadow-lg h-64 object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-[#FFD166] text-neutral-dark w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">3</div>
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Master Any Subject</h3>
            <p className="text-gray-600">
              Answer AI-generated questions that adapt to your progress. What used to take months of study now happens in minutes of engaging interaction.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Demo Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold font-heading mb-6">See Skrolla in Action</h3>
          <div className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={APP_IMAGES.appDemo}
              alt="Skrolla app interface showcase" 
              className="w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
              >
                <Play className="text-[#4A6FFF] h-6 w-6 ml-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

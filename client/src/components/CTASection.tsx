import React from 'react';
import WaitlistForm from './WaitlistForm';
import { motion } from 'framer-motion';
import { AppleIcon, SquarePlay } from 'lucide-react';

const CTASection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="get-early-access" className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#4A6FFF] to-[#6B8BFF] text-white">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-6">
            Ready to Master Any Topic in Minutes?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg mb-10 opacity-90">
            Join our early access list and be the first to experience AI-powered flashcards that make learning anything faster and more effective.
          </motion.p>
          
          <motion.div variants={itemVariants} className="max-w-md mx-auto">
            <WaitlistForm 
              variant="cta"
              buttonText="Get Early Access"
              className="flex flex-col sm:flex-row gap-3 justify-center"
            />
          </motion.div>
          
          {/* App Badges */}
          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <p className="text-lg opacity-90 mb-4 sm:mr-8 sm:mb-0 sm:self-center">Coming soon to:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* App Store Badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center hover:bg-opacity-30 transition-all cursor-pointer"
              >
                <AppleIcon className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <p className="text-xs opacity-90">Download on the</p>
                  <p className="font-medium">App Store</p>
                </div>
              </motion.div>
              
              {/* Google Play Badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center hover:bg-opacity-30 transition-all cursor-pointer"
              >
                <SquarePlay className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <p className="text-xs opacity-90">GET IT ON</p>
                  <p className="font-medium">Google Play</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

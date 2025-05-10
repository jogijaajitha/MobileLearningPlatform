import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Brain, User, LineChart, Gamepad, Wifi } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all"
    >
      <div className="flex items-start mb-4">
        <div className="bg-white rounded-full p-3 mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold font-heading">{title}</h3>
      </div>
      <p className="opacity-90">
        {description}
      </p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      icon: <Brain className="text-[#4A6FFF] h-5 w-5" />,
      title: "AI-Generated Content",
      description: "Advanced AI creates custom flashcards and learning materials for any topic you want to learn."
    },
    {
      icon: <Clock className="text-[#4A6FFF] h-5 w-5" />,
      title: "Bite-sized Learning",
      description: "Concise, focused content designed to maximize knowledge retention in just minutes a day."
    },
    {
      icon: <User className="text-[#4A6FFF] h-5 w-5" />,
      title: "Interactive Q&A",
      description: "Dynamic question-answer prompts test your understanding and reinforce what you've learned."
    },
    {
      icon: <LineChart className="text-[#4A6FFF] h-5 w-5" />,
      title: "Adaptive Learning",
      description: "Content automatically adjusts to focus on areas where you need more practice."
    },
    {
      icon: <Gamepad className="text-[#4A6FFF] h-5 w-5" />,
      title: "Swipe-to-Learn Interface",
      description: "Intuitive, engaging card-based design makes learning feel natural and enjoyable."
    },
    {
      icon: <Wifi className="text-[#4A6FFF] h-5 w-5" />,
      title: "Universal Learning",
      description: "Master any subject from languages to science, history to programming—all in one app."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#4A6FFF] to-[#6B8BFF] text-white">
      <div className="container mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Why Choose Skrolla
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg max-w-2xl mx-auto opacity-90">
            Our innovative approach to learning makes education accessible, engaging, and effective.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Feature {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

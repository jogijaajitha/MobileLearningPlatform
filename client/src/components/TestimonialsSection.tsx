import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialProps {
  rating: number;
  quote: string;
  initials: string;
  name: string;
  role: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ rating, quote, initials, name, role }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-4">
        <div className="text-amber-400 flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < rating ? 'fill-current' : 'stroke-current'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-6">
        {quote}
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-gray-600 font-bold">{initials}</span>
        </div>
        <div>
          <h4 className="font-bold text-neutral-dark">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
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

  const testimonials = [
    {
      rating: 5,
      quote: "Skrolla's AI flashcards helped me learn web development concepts in days instead of weeks. I just entered the topics I needed and the app did the rest.",
      initials: "JD",
      name: "Jamie Davis",
      role: "Product Designer"
    },
    {
      rating: 5,
      quote: "The Q&A format is brilliant! It helped me prepare for my finals by testing my knowledge in a way that feels natural. I've learned more Spanish in two weeks with Skrolla than two months with other apps.",
      initials: "SR",
      name: "Sarah Reynolds",
      role: "Marketing Manager"
    },
    {
      rating: 4.5,
      quote: "As a busy parent, I love that I can pick any random topic my kids ask about and instantly have flashcards to learn with them. The AI generates perfect content every time.",
      initials: "MT",
      name: "Michael Torres",
      role: "Software Engineer"
    }
  ];

  const stats = [
    {
      value: "93%",
      description: "faster learning with AI-generated flashcards"
    },
    {
      value: "10+",
      description: "topics mastered per month by average users"
    },
    {
      value: "95%",
      description: "of users report better knowledge retention"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-4">
            What Early Users Say
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our beta testers are already experiencing the benefits of bite-sized learning with Skrolla.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Testimonial {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl md:text-5xl font-bold font-heading text-[#4A6FFF] mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

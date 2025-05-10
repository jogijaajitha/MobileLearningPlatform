import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import AppPreviewSection from '@/components/AppPreviewSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Home: React.FC = () => {
  // Set document title
  useEffect(() => {
    document.title = 'Skrolla - Type. Swipe. Master.';
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <AppPreviewSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;

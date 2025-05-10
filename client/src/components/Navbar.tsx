import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white bg-opacity-95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold font-heading text-[#4A6FFF]">Skrolla</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => handleClick('how-it-works')} 
            className="font-medium hover:text-[#4A6FFF] transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleClick('features')} 
            className="font-medium hover:text-[#4A6FFF] transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => handleClick('testimonials')} 
            className="font-medium hover:text-[#4A6FFF] transition-colors"
          >
            Testimonials
          </button>
        </div>
        
        <Button 
          onClick={() => handleClick('get-early-access')}
          className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all"
        >
          Get Early Access
        </Button>
        
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              <button 
                onClick={() => handleClick('how-it-works')} 
                className="font-medium hover:text-[#4A6FFF] transition-colors text-left px-2 py-2"
              >
                How It Works
              </button>
              <button 
                onClick={() => handleClick('features')} 
                className="font-medium hover:text-[#4A6FFF] transition-colors text-left px-2 py-2"
              >
                Features
              </button>
              <button 
                onClick={() => handleClick('testimonials')} 
                className="font-medium hover:text-[#4A6FFF] transition-colors text-left px-2 py-2"
              >
                Testimonials
              </button>
              <Button 
                onClick={() => handleClick('get-early-access')}
                className="bg-[#FF6B6B] text-white px-4 py-2 mt-4 rounded-full font-medium hover:bg-opacity-90 transition-all w-full"
              >
                Get Early Access
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

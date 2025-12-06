import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, Moon, Sun } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount, isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-brand-dark-bg/90 backdrop-blur-md py-4 shadow-sm border-b border-gray-200/50 dark:border-white/10' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white cursor-pointer select-none">
          VIBE.
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className={`text-sm font-medium hover:text-brand-accent transition-colors uppercase tracking-widest ${
                isScrolled ? 'text-brand-dark dark:text-gray-300' : 'text-brand-dark dark:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
           <button 
            onClick={toggleDarkMode}
            className={`hover:scale-110 transition-transform ${isScrolled ? 'text-brand-dark dark:text-white' : 'text-brand-dark dark:text-white'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className={`hover:scale-110 transition-transform ${isScrolled ? 'text-brand-dark dark:text-white' : 'text-brand-dark dark:text-white'}`}>
            <Search size={20} />
          </button>
          
          <button 
            onClick={onCartClick}
            className={`relative hover:scale-110 transition-transform ${isScrolled ? 'text-brand-dark dark:text-white' : 'text-brand-dark dark:text-white'}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
              onClick={toggleDarkMode}
              className="text-brand-dark dark:text-white"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-brand-dark dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-brand-dark-surface shadow-xl border-t border-gray-100 dark:border-white/10 md:hidden flex flex-col p-6 space-y-4 animate-fade-in-down h-screen">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-lg font-bold text-brand-dark dark:text-white hover:text-brand-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center space-x-4">
             <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
               <Search size={20} /> <span>Search</span>
             </button>
             <button onClick={() => { setIsMobileMenuOpen(false); onCartClick(); }} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
               <ShoppingBag size={20} /> <span>Cart ({cartCount})</span>
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
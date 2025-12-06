import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-90 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 dark:to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <span className="inline-block py-1 px-3 border border-brand-dark/30 dark:border-white/30 bg-white/20 dark:bg-black/40 backdrop-blur-sm rounded-full text-xs font-bold tracking-[0.2em] uppercase text-brand-dark dark:text-white mb-6">
          SS / 2024 Collection
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-brand-dark dark:text-white mb-6 tracking-tighter leading-none">
          REDEFINE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-gray-500 dark:from-white dark:to-gray-400">YOUR STYLE.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-light">
          Khám phá bộ sưu tập streetwear mới nhất. Đơn giản nhưng không đơn điệu. Chất lượng định hình phong cách.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#new-drops" className="group relative px-8 py-4 bg-brand-dark text-white dark:bg-white dark:text-brand-dark font-bold text-sm uppercase tracking-wider overflow-hidden rounded-full transition-all hover:shadow-xl hover:shadow-brand-dark/20 dark:hover:shadow-white/10 flex items-center justify-center">
            <span className="relative z-10 flex items-center">
              Shop Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
          <a href="#collections" className="px-8 py-4 bg-transparent border border-brand-dark text-brand-dark dark:border-white dark:text-white font-bold text-sm uppercase tracking-wider rounded-full hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-all flex items-center justify-center">
            View Lookbook
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
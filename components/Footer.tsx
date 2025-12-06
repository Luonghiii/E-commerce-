import React from 'react';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-brand-dark-surface pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-black tracking-tighter mb-6 text-brand-dark dark:text-white">VIBE.</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Thời trang không chỉ là quần áo, nó là thái độ sống. VIBE mang đến sự tối giản nhưng đầy cá tính cho thế hệ mới.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white dark:bg-brand-dark rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-all shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-brand-dark rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-brand-dark rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-all shadow-sm">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 md:col-span-4">
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400">Shop</h4>
            <ul className="space-y-4">
              {['New Arrivals', 'Best Sellers', 'Hoodies', 'Pants', 'Accessories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-4">
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400">Support</h4>
            <ul className="space-y-4">
              {['FAQ', 'Shipping', 'Returns', 'Size Guide', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 md:col-span-4">
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400">Newsletter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Đăng ký để nhận tin tức mới nhất và mã giảm giá 10%.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="flex-1 bg-white dark:bg-brand-dark/50 px-4 py-3 text-sm border-none focus:outline-none focus:ring-1 focus:ring-brand-dark dark:focus:ring-white w-full shadow-sm rounded-l-lg dark:text-white placeholder-gray-400"
              />
              <button className="bg-brand-dark dark:bg-white dark:text-brand-dark text-white px-6 py-3 rounded-r-lg hover:bg-brand-accent dark:hover:bg-brand-accent dark:hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 VIBE Studios. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-dark dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-brand-dark dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Features from './components/Features';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import Reveal from './components/Reveal';
import FilterBar from './components/FilterBar';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Frown } from 'lucide-react';

const App: React.FC = () => {
  // --- State Management ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // --- Filter & Sort State ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('newest');

  // --- Dark Mode Logic ---
  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  // --- Cart Logic ---
  const addToCart = (product: Product, size: string, quantity: number) => {
    setCart(prev => {
      const cartId = `${product.id}-${size}`;
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, selectedSize: size, quantity, cartId }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    // Simulate API call and payment processing
    setTimeout(() => {
      setIsCheckingOut(false);
      setCart([]);
      setIsCartOpen(false);
      setTimeout(() => {
        alert("Thanh toán thành công! Đơn hàng VIBE-8888 đang được xử lý.");
      }, 300);
    }, 2000);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Filter Logic ---
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Sort by New first, then ID (assuming higher ID is newer)
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id - a.id;
        });
        break;
    }

    return result;
  }, [activeCategory, activeSort]);

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark-bg text-brand-dark dark:text-brand-light selection:bg-brand-accent selection:text-white transition-colors duration-300">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Shop / New Drops Section */}
        <section id="new-drops" className="py-24 container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
              <div>
                <span className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-2 block">Latest Collections</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark dark:text-white">SHOP ALL</h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <FilterBar 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeSort={activeSort}
              onSortChange={setActiveSort}
              totalProducts={filteredProducts.length}
            />
          </Reveal>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 50}>
                  <ProductCard 
                    product={product} 
                    onClick={setSelectedProduct}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-down">
                <Frown size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">No vibe found here.</h3>
                <p className="text-gray-500 dark:text-gray-400">Try changing your filters or check back later.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveSort('newest'); }}
                  className="mt-6 text-brand-accent font-bold uppercase text-sm border-b border-brand-accent pb-1 hover:opacity-80"
                >
                  Clear all filters
                </button>
             </div>
          )}
        </section>

        {/* Categories / Banner Split */}
        <section id="collections" className="py-10">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
              <div className="relative group overflow-hidden h-full min-h-[400px]">
                <img 
                  src="https://picsum.photos/900/1200?grayscale&blur=1" 
                  alt="Men Collection" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-black mb-4 uppercase">Urban Men</h3>
                  <button onClick={() => { setActiveCategory('Hoodies'); document.getElementById('new-drops')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block bg-white text-black px-8 py-3 font-bold text-sm uppercase hover:bg-brand-accent hover:text-white transition-colors cursor-pointer">
                    Shop Men
                  </button>
                </div>
              </div>
              <div className="relative group overflow-hidden h-full min-h-[400px]">
                <img 
                  src="https://picsum.photos/900/1201?grayscale&blur=1" 
                  alt="Women Collection" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                 <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-black mb-4 uppercase">Street Women</h3>
                  <button onClick={() => { setActiveCategory('Tops'); document.getElementById('new-drops')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block bg-white text-black px-8 py-3 font-bold text-sm uppercase hover:bg-brand-accent hover:text-white transition-colors cursor-pointer">
                    Shop Women
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-50 dark:bg-black/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <Reveal>
                  <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-sm">
                    <img 
                      src="https://picsum.photos/1000/1000?grayscale" 
                      alt="About Vibe Studios" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="w-full lg:w-1/2">
                <Reveal delay={200}>
                  <span className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-4 block">About The Brand</span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark dark:text-white mb-8">
                    WE ARE VIBE.
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Được thành lập tại trung tâm Sài Gòn, VIBE STUDIOS đại diện cho tiếng nói của thế hệ trẻ: Tự do, Phóng khoáng và Đầy bản sắc.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Mỗi thiết kế của chúng tôi không chỉ là quần áo, mà là một tác phẩm nghệ thuật đường phố được may đo tỉ mỉ. Chúng tôi tin rằng phong cách tối giản (Minimalism) chính là đỉnh cao của sự tinh tế.
                  </p>
                  <div className="grid grid-cols-3 gap-8 text-center border-t border-gray-200 dark:border-white/10 pt-8">
                    <div>
                      <h4 className="text-3xl font-black text-brand-dark dark:text-white mb-1">20K+</h4>
                      <span className="text-xs uppercase tracking-widest text-gray-500">Customers</span>
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-brand-dark dark:text-white mb-1">100+</h4>
                      <span className="text-xs uppercase tracking-widest text-gray-500">Products</span>
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-brand-dark dark:text-white mb-1">4.9</h4>
                      <span className="text-xs uppercase tracking-widest text-gray-500">Rating</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <Reveal>
          <Features />
        </Reveal>

        {/* Marquee Text - Aesthetic touch */}
        <div className="py-4 bg-brand-accent overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="text-white font-black text-2xl mx-8">NEW SEASON SALE 50% OFF</span>
            <span className="text-brand-dark font-black text-2xl mx-8">FREE SHIPPING WORLDWIDE</span>
            <span className="text-white font-black text-2xl mx-8">LIMITED EDITION DROPS</span>
            <span className="text-brand-dark font-black text-2xl mx-8">SUSTAINABLE FASHION</span>
             <span className="text-white font-black text-2xl mx-8">NEW SEASON SALE 50% OFF</span>
            <span className="text-brand-dark font-black text-2xl mx-8">FREE SHIPPING WORLDWIDE</span>
            <span className="text-white font-black text-2xl mx-8">LIMITED EDITION DROPS</span>
            <span className="text-brand-dark font-black text-2xl mx-8">SUSTAINABLE FASHION</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    onAddToCart(product, selectedSize, quantity);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative z-10 bg-white dark:bg-brand-dark-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row animate-fade-in-down overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-white rounded-full transition-colors text-brand-dark dark:text-white dark:hover:text-brand-dark"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-auto">
            <span className="text-brand-accent font-bold tracking-widest text-xs uppercase mb-2 block">{product.category}</span>
            <h2 className="text-3xl font-black text-brand-dark dark:text-white mb-2 leading-tight">{product.name}</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm">
              {product.description || "Chất lượng cao cấp. Thiết kế độc đáo. Một sản phẩm không thể thiếu trong tủ đồ của bạn."}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="font-bold text-sm text-brand-dark dark:text-white uppercase">Select Size</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-lg font-bold transition-all ${
                      selectedSize === size 
                        ? 'border-brand-dark bg-brand-dark text-white dark:bg-white dark:text-brand-dark dark:border-white' 
                        : 'border-gray-200 text-gray-600 hover:border-brand-dark dark:border-gray-600 dark:text-gray-300 dark:hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-red-500 text-xs mt-2">* Please select a size</p>}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex gap-4 border-t border-gray-100 dark:border-white/10 pt-8 mt-4">
             <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-brand-dark dark:text-white transition-colors"
                >
                  -
                </button>
                <span className="px-4 font-bold text-brand-dark dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 text-brand-dark dark:text-white transition-colors"
                >
                  +
                </button>
             </div>
             
             <button 
                onClick={handleAddToCart}
                disabled={!selectedSize || isAdding}
                className={`flex-1 py-3 px-6 rounded-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  !selectedSize 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : isAdding
                      ? 'bg-green-600 text-white'
                      : 'bg-brand-dark text-white hover:bg-brand-accent dark:bg-white dark:text-brand-dark dark:hover:bg-brand-accent dark:hover:text-white'
                }`}
             >
                {isAdding ? (
                  <>Added <Check size={20} /></>
                ) : (
                  <>Add to Cart <ShoppingBag size={20} /></>
                )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
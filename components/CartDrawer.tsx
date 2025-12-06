import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout, isCheckingOut }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-brand-dark-surface shadow-2xl z-[70] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-black text-brand-dark dark:text-white tracking-tighter">YOUR CART</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-brand-dark dark:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-lg font-medium">Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="mt-4 text-brand-accent font-bold hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 animate-fade-in-down">
                <div className="w-20 h-24 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-brand-dark dark:text-white line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => onRemove(item.cartId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Size: <span className="font-bold text-brand-dark dark:text-gray-300">{item.selectedSize}</span></p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-brand-dark dark:text-white">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </p>
                    <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/5 rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQty(item.cartId, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:text-white text-xs shadow-sm transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.cartId, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-white/10 hover:bg-brand-accent hover:text-white dark:text-white text-xs shadow-sm transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-brand-dark">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">Subtotal</span>
              <span className="text-xl font-black text-brand-dark dark:text-white">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
              </span>
            </div>
            <button 
              onClick={onCheckout}
              disabled={isCheckingOut}
              className={`w-full bg-brand-dark dark:bg-white dark:text-brand-dark text-white py-4 font-bold uppercase tracking-widest hover:bg-brand-accent dark:hover:bg-brand-accent dark:hover:text-white transition-all flex items-center justify-center gap-2 group ${isCheckingOut ? 'opacity-80 cursor-wait' : ''}`}
            >
              {isCheckingOut ? (
                <span className="flex items-center gap-2">
                   <span className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-brand-dark/30 dark:border-t-brand-dark rounded-full animate-spin"></span>
                   Processing...
                </span>
              ) : (
                <>Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
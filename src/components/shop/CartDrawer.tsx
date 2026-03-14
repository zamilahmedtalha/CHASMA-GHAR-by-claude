import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { GlassSurface } from '../ui/GlassSurface';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotal } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const phoneNumber = "923232565653";
    let message = "Hello Chasma Ghar! I would like to place an order:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.quantity} x $${item.price.toFixed(2)}\n`;
    });
    
    message += `\n*Total: $${getTotal().toFixed(2)}*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] hidden opacity-0"
        onClick={() => setIsOpen(false)}
      />
      <GlassSurface
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[200] flex flex-col translate-x-full bg-white/80"
        borderRadius={0}
        blur={24}
        opacity={0.95}
      >
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <h2 className="text-display-sm text-[--color-text-primary] flex items-center gap-2">
            <ShoppingBag size={24} />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <X size={24} className="text-[--color-text-primary]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[--color-text-muted] space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-body">Your cart is empty.</p>
              <GlassSurface borderRadius={999} brightness={0} opacity={1}>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-[#0A0A0A] text-white text-label rounded-full hover:bg-[#2A2A2A] transition-colors"
                >
                  Continue Shopping
                </button>
              </GlassSurface>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/5 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-body text-[--color-text-primary]">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[--color-text-muted] hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-price text-[--color-text-secondary]">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                    >
                      <Minus size={14} className="text-[--color-text-primary]" />
                    </button>
                    <span className="text-label text-[--color-text-primary] w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                    >
                      <Plus size={14} className="text-[--color-text-primary]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-black/5 bg-white/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-body text-[--color-text-primary]">Subtotal</span>
              <span className="text-display-sm text-[--color-text-primary]">${getTotal().toFixed(2)}</span>
            </div>
            <GlassSurface borderRadius={999} brightness={0} opacity={1}>
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#25D366] text-white text-label rounded-full hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Checkout via WhatsApp
              </button>
            </GlassSurface>
          </div>
        )}
      </GlassSurface>
    </>
  );
};

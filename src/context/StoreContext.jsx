import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SITE_CONFIG } from '../config/site';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Wishlist state with safe localStorage read/write
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('pmg_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Enquiry Cart state
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('pmg_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 2800 ? null : prev));
    }, 3000);
  }, []);

  // Sync wishlist to storage
  useEffect(() => {
    try {
      localStorage.setItem('pmg_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [wishlist]);

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('pmg_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [cart]);

  // Toggle Wishlist item
  const toggleWishlist = useCallback((product) => {
    if (!product) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to Wishlist! ❤️`, 'success');
        return [...prev, product];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  // Add to Cart
  const addToCart = useCallback((product, qty = 1) => {
    if (!product) return;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        showToast(`Updated quantity for "${product.name}" in Cart`, 'info');
        return updated;
      } else {
        showToast(`Added "${product.name}" to Cart! 🛒`, 'success');
        return [...prev, { ...product, quantity: qty }];
      }
    });
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from Cart', 'info');
  }, [showToast]);

  // Direct Buy Now (Instant Checkout)
  const initiateBuyNow = useCallback((product, qty = 1) => {
    if (!product) return;
    setCheckoutProduct({ ...product, quantity: qty });
    setIsCheckoutOpen(true);
  }, []);

  // Cart Checkout (Checkout all items in cart)
  const initiateCartCheckout = useCallback(() => {
    if (cart.length === 0) {
      showToast('Your Cart is empty! Please add products first.', 'info');
      return;
    }
    setCheckoutProduct(null); // null signifies checking out the whole cart
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, [cart.length, showToast]);

  const updateCartQuantity = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // WhatsApp Enquiry Link Generator for all items in Cart
  const generateCartWhatsAppUrl = useCallback((customerName = '', notes = '') => {
    if (cart.length === 0) return '#';

    let text = `*New Product Enquiry - ${SITE_CONFIG.name}*\n\n`;
    if (customerName) {
      text += `*Customer:* ${customerName}\n`;
    }
    text += `*Enquiry Items (${cart.length}):*\n`;

    let totalApprox = 0;
    cart.forEach((item, idx) => {
      const itemTotal = item.price * (item.quantity || 1);
      totalApprox += itemTotal;
      text += `${idx + 1}. *${item.name}*\n`;
      text += `   - Brand: ${item.brand} | Qty: ${item.quantity || 1}\n`;
      text += `   - Price: ₹${item.price.toLocaleString('en-IN')}\n`;
      if (item.condition) {
        text += `   - Condition: ${item.condition}\n`;
      }
    });

    text += `\n*Total Estimate:* ₹${totalApprox.toLocaleString('en-IN')}\n`;
    if (notes) {
      text += `*Note:* ${notes}\n`;
    }
    text += `\nPlease let me know availability and best offer price. I am interested!`;

    return SITE_CONFIG.createWhatsAppLink(text);
  }, [cart]);

  // Single Product Enquiry URL generator
  const getSingleProductWhatsAppUrl = useCallback((product, activeOffer = null) => {
    if (!product) return '#';
    let text = `Hello *${SITE_CONFIG.name}*! 👋\n\n`;
    text += `I am interested in buying: *${product.name}*\n`;
    text += `• Brand: ${product.brand}\n`;
    text += `• Listed Price: ₹${product.price.toLocaleString('en-IN')} (MRP ₹${product.mrp.toLocaleString('en-IN')})\n`;
    if (activeOffer) {
      text += `• Applied Offer: ${activeOffer.title} (${activeOffer.discountText})\n`;
    }
    if (product.condition) {
      text += `• Condition Grade: ${product.condition} (Battery: ${product.batteryHealth || 'N/A'})\n`;
    }
    text += `\nCan you confirm current stock at your G.M.S. Road store and delivery options? Thank you!`;

    return SITE_CONFIG.createWhatsAppLink(text);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        generateCartWhatsAppUrl,
        getSingleProductWhatsAppUrl,
        isWishlistOpen,
        setIsWishlistOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutProduct,
        setCheckoutProduct,
        initiateBuyNow,
        initiateCartCheckout,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

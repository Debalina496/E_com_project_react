import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContextType, CartItem } from './type';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotalItems = (cart: CartItem[]) =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      const updatedCart = existingItem
        ? prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...item, quantity: 1 }];

      const totalItems = calculateTotalItems(updatedCart);
      toast.success(`${totalItems} item is added in your cart`);
      return updatedCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      const totalItems = calculateTotalItems(updatedCart);
      toast.info(`Total items in cart: ${totalItems}`);
      return updatedCart;
    });
  };

  const totalItems = calculateTotalItems(cart);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, totalItems, totalPrice }}
      >
        {children}
      </CartContext.Provider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

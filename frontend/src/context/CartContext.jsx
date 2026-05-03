import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gamevault_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart', err);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gamevault_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (game) => {
    setCartItems((prevItems) => {
      // Check if game already in cart
      const exists = prevItems.find((item) => item.id === game.id);
      if (exists) {
        toast.error('Game is already in your cart');
        return prevItems;
      }
      toast.success(`${game.title} added to cart`);
      return [...prevItems, game];
    });
  };

  const removeFromCart = (gameId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== gameId));
    toast.success('Removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('gamevault_cart');
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.newPrice || item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

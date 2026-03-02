

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Initialize wishlist from localStorage if available
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle product in wishlist
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(item => item._id === product._id)
        ? prev.filter(item => item._id !== product._id)
        : [...prev, product]
    );
  };

  // Remove product from wishlist
  const removeFromWishlist = (_id) => {
    setWishlist(prev => prev.filter(item => item._id !== _id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => useContext(WishlistContext);

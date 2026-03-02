
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved).map(i => ({
        ...i,
        price: Number(i.price),
        quantity: Number(i.quantity) || 1
      }));
      setCartItems(parsed);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: Number(item.quantity) + 1, price: Number(item.price) }
            : { ...item, price: Number(item.price) }
        );
      } else {
        return [...prev, { ...product, quantity: 1, price: Number(product.price) }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, quantity: Number(item.quantity) - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
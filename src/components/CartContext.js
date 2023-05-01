import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...existingProduct, quantity: existingProduct.quantity - 1 }
            : item
        )
      );
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const incrementCartItem = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItem = (productId) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...existingProduct, quantity: existingProduct.quantity - 1 }
            : item
        )
      );
    }
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems || [],
        addToCart,
        removeFromCart,
        emptyCart,
        incrementCartItem,
        decrementCartItem,
        totalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

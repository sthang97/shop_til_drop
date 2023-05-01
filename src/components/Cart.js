import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    totalCost,
    incrementCartItem,
    decrementCartItem,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: { price: totalCost, productName: "Multiple items" },
    });
  };

  const handleBackToHomepage = () => {
    navigate("/");
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity === 0) {
      removeFromCart(item.id);
    } else if (quantity > item.quantity) {
      incrementCartItem(item.id);
    } else {
      decrementCartItem(item.id);
    }
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-item-image"
            />
            <div>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button
                onClick={() => handleQuantityChange(item, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cart-summary">
        <h2>Total: ${totalCost.toFixed(2)}</h2>
        <div className="cart-buttons">
          {cartItems.length > 0 && (
            <button
              className="proceed-to-payment"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          )}
          <button className="back-to-homepage" onClick={handleBackToHomepage}>
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

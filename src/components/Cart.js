import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, totalCost } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: { price: totalCost, productName: "Multiple items" },
    });
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
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cart-summary">
        <h2>Total: ${totalCost.toFixed(2)}</h2>
        {cartItems.length > 0 && (
          <button
            className="proceed-to-payment"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import awsExports from "./aws-exports";
import Home from "./components/Home";
import Product from "./components/Product";
import Admin from "./components/Admin";
import SecureRoute from "./components/SecureRoute";
import OrderReceipt from "./components/OrderReceipt";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import Payment from "./components/Payment";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <div className="container">
        {/* <h1>Hello {user.username}</h1> */}
        <button onClick={signOut}>Sign out</button>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/admin"
                element={<SecureRoute user={user} Component={Admin} />}
              />
              <Route path="/receipt/:id" element={<OrderReceipt />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              {/* <Route path="/test-payment" element={<Payment />} /> */}
            </Routes>
          </Router>
        </CartProvider>
      </div>
    </>
  );
}

export default withAuthenticator(App);

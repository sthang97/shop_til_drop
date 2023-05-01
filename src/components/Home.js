import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Home.css";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 20,
    description: "A comfortable and stylish T-Shirt.",
    imageUrl: "https://m.media-amazon.com/images/I/71K6ujD7R5L._AC_UL1500_.jpg",
  },
  {
    id: 2,
    name: "Hoodie",
    price: 40,
    description: "A warm and cozy hoodie for everyday wear.",
    imageUrl: "https://m.media-amazon.com/images/I/51eiioNt5DL._AC_UL1200_.jpg",
  },
  {
    id: 3,
    name: "Shorts",
    price: 25,
    description: "Comfortable running shorts for exercise.",
    imageUrl: "https://m.media-amazon.com/images/I/41wTgk+4L3L._AC_.jpg",
  },
  {
    id: 4,
    name: "Pants",
    price: 35,
    description: "Active joggers sweatpants.",
    imageUrl: "https://m.media-amazon.com/images/I/614cbwtCbML._AC_UL1500_.jpg",
  },
  // Add more products as needed
];

const Home = () => {
  const [search, setSearch] = useState("");
  const { addToCart, cartItems } = useContext(CartContext);

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <header>
        <h1>Clothing Store</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="search-input"
        />
        <Link to="/cart" className="cart-icon-container">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{getTotalCartItems()}</span>
        </Link>
      </header>
      <div className="products-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)} className="add-to-cart">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

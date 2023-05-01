import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 20,
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTBUegIwv1UPIhwQmaIc1a01r9NIEgIvMqBAO6EgzSOT1P33GaorX_qbHldfk_MBamBky-pohNts3UQlmJhHbARyDfcCdRmmNwQOA0y280WGOHZKqN5Fy4Q",
  },
  {
    id: 2,
    name: "Hoodie",
    price: 40,
    imageUrl: "https://m.media-amazon.com/images/I/51eiioNt5DL._AC_UL1200_.jpg",
  },
  // Add more products as needed
];

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  const handlePayment = () => {
    console.log(
      "Navigating to /payment with price:",
      product.price,
      "and product name:",
      product.name
    );
    navigate("/payment", {
      state: { price: product.price, productName: product.name },
    });
  };

  return (
    <div className="product-container">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>Price: ${product.price}</p>
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Product;

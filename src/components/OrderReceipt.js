import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./OrderReceipt.css";

const OrderReceipt = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { order, productName } = state || {};

  if (!order) {
    return <p>Order not found</p>;
  }

  const { purchase_units } = order;
  const { amount } = purchase_units[0];

  return (
    <div className="order-receipt">
      <h1>Order Receipt</h1>
      <p>Order ID: {id}</p>
      <table className="order-details">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productName}</td>
            <td>1</td>
            <td>${amount.value}</td>
          </tr>
        </tbody>
      </table>
      <p className="order-total">Total: ${amount.value}</p>
    </div>
  );
};

export default OrderReceipt;

import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
// import { Navigate } from "react-router-dom";
import UnauthorizedAccessTracker from "./UnauthorizedAccessTracker";

const Admin = ({ user, isAdmin }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchOrders = async () => {
    try {
      const response = await API.get("api6ef8d58e", "/items");
      const orders = response;
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  if (!isAdmin) {
    return (
      <>
        <UnauthorizedAccessTracker
          userId={user.username}
          details="Attempted to access admin page"
        />
        {null}
        {/* <Navigate to="/fake-admin" replace /> */}
      </>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Admin;

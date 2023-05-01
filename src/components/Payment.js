import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const price = location.state?.price || 0;
  const productName = location.state?.productName || "N/A";

  console.log("Payment component rendered"); // Add this line
  console.log("Price: ", price); // Add this line

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      navigate(`/receipt/${order.id}`, { state: { order, productName } });
    } catch (error) {
      console.error("Error capturing the order: ", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Abg7pzK9aTcJLCBjuFMWwbCSaGxWVjVr4Xjdc7ci-BF4zGbhWI7NN5Y36zpZZzYXaPa7B0ZxBoaI6ClY",
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                custom_id: "default",
                description: productName,
                amount: {
                  value: price,
                },
              },
            ],
          });
        }}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default Payment;

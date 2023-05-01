import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ user, Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default SecureRoute;

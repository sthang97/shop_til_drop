import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Admin from "./Admin";

const SecureRoute = ({ user }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      const groups =
        user.signInUserSession.accessToken.payload["cognito:groups"];
      const isUserAdmin = groups && groups.includes("OnlyAuthMember");
      setIsAdmin(isUserAdmin);

      console.log("User authenticated:", isAuthenticated);
      console.log("User is part of OnlyAuthMember group:", isUserAdmin);
    } else {
      setIsAuthenticated(false);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    console.log("isAdmin:", isAdmin);
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAdmin, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (location.pathname === "/admin") {
    if (isAdmin) {
      return <Admin user={user} />;
    } else {
      return <Navigate to="/fake-admin" replace />;
    }
  }

  return null;
};

export default SecureRoute;

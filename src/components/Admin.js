import React from "react";
import { Auth } from "aws-amplify";

const Admin = () => {
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Admin;

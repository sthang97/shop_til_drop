import { useEffect } from "react";
import { API } from "aws-amplify";

const UnauthorizedAccessTracker = ({ userId, details }) => {
  useEffect(() => {
    const logUnauthorizedAccess = async () => {
      try {
        await API.post("api6ef8d58e", "/unauthorized-access", {
          body: {
            userId,
            details,
          },
        });
      } catch (error) {
        console.error("Error logging unauthorized access:", error);
      }
    };

    logUnauthorizedAccess();
  }, [userId, details]);

  return null;
};

export default UnauthorizedAccessTracker;

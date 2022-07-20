import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loginUser")));
  }, [location]);

  return { user };
};

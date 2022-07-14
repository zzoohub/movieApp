import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loginUser")));
  }, []);

  return { user };
};

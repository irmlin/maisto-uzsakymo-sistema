import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn) {
      const data = localStorage.getItem('userData');
      setUserData(JSON.parse(data));
      setIsAuthenticated(loggedIn);
      setIsLoading(false)
    }
    else {
      setUserData({});
      setIsAuthenticated(false);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <UserContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

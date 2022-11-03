import { createContext } from "react";
import { ROLES } from "../Enums/Enums";
import { useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userRole, setUserRole] = useState(ROLES.CLIENT);
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider
      value={{ userRole, setUserRole, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

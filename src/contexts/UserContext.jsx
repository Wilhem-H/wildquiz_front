import { createContext, useContext, useMemo } from "react";

import useLocalStorage from "./useLocalStorage";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const logout = () => {
    setUser(null);

    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/logout`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === "logout") {
          window.alert("Vous êtes déconnecté");
        }
      });
  };

  return (
    <UserContext.Provider
      value={useMemo(() => ({
        user,
        setUser,
        logout,
      }))}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

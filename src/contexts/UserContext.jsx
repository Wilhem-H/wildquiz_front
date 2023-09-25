import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "./useLocalStorage";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const logout = () => {
    setUser(null);
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

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);

import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import PropTypes from "prop-types";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setCurrentUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const { decodedToken } = useJwt(sessionStorage.getItem("_tk") || "");
  // console.log(decodedToken)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn)
  const [currentUser, setCurrentUser] = useState(null);
// console.log(isExpired(decodedToken && typeof decodedToken === "object" && !Array.isArray(decodedToken) && decodedToken.exp))
useEffect(() => {
  if (decodedToken && typeof decodedToken === "object" && !Array.isArray(decodedToken) && decodedToken.exp) {
      setIsLoggedIn(true);
      setCurrentUser(decodedToken); // You may need to extract user information from the token
  } else {
    setIsLoggedIn(false); // Set isLoggedIn to false if the token is not a valid object
    setCurrentUser(null);
  }
}, [decodedToken]);

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    setCurrentUser,
    currentUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

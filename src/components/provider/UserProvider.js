import { createContext, useContext, useState } from "react";
import React from "react";

const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const signIn = (userToken) => {
    setUser(userToken);
  };

  const signUp = (userToken) => {
    setUser(userToken);
  };

  const logout = () => {
    setUser(null);
  };

  const isUserLoggedIn = user;
  
  const loggedInUserHandler = (user) => {
    setLoggedInUser(user);
  }

  const obj = {
    signIn,
    signUp,
    logout,
    isUserLoggedIn,
    loggedInUser,
    loggedInUserHandler
  };

  return <userContext.Provider value={obj}>{children}</userContext.Provider>;
}

export function useUser() {
  return useContext(userContext);
}




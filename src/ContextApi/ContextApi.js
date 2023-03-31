import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authdata')));
  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

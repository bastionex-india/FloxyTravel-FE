// import React from "react";
// import { useState } from "react";

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authdata')));
//   return (
//     <AuthContext.Provider
//       value={{
//         authData,
//         setAuthData,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authData, setAuthData] = useState(null);

//   return (
//     <AuthContext.Provider value={{ authData, setAuthData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// console.log(AuthContext)
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import CryptoJS from "crypto-js";
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const storedAuthData = JSON.parse(localStorage.getItem('authdata'));

//   const [authData, setAuthData] = useState(storedAuthData);

//   const updateAuthData = (newAuthData) => {

//     const decrypt = (encryptedData, key, iv) => {
//       const decryptedText = CryptoJS.AES.decrypt(encryptedData, key, {
//         iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       });
//       return decryptedText.toString(CryptoJS.enc.Utf8);
//     };

//     const key = CryptoJS.enc.Hex.parse("lifeisoutside!1234567890@$%^&*()");
//     const iv = CryptoJS.enc.Hex.parse("blkiajnij2345tgh");

//     const decryptedData = decrypt(newAuthData.data, key, iv);

//     setAuthData(JSON.parse(decryptedData));
//     console.log(111,JSON.parse(decryptedData))
//     localStorage.setItem('authdata', JSON.parse(decryptedData));

//   };

//   return (
//     <AuthContext.Provider value={{ authData, updateAuthData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedEncryptedAuthData = localStorage.getItem("authdata");
  const [authData, setAuthData] = useState(null);

  const decryptData = (encryptedData) => {
    // Your decryption logic here
    const key = CryptoJS.enc.Hex.parse("lifeisoutside!1234567890@$%^&*()");
    const iv = CryptoJS.enc.Hex.parse("blkiajnij2345tgh");
    const decryptedText = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8));
  };

  useEffect(() => {
    if (storedEncryptedAuthData) {
      const decryptedData = decryptData(storedEncryptedAuthData);
      setAuthData(decryptedData);
    }
  }, [storedEncryptedAuthData]);

  const updateAuthData = (newEncryptedAuthData) => {
    const decryptedData = decryptData(newEncryptedAuthData);

    setAuthData(decryptedData);
    localStorage.setItem("authdata", newEncryptedAuthData);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authdata');
  };

  return (
    <AuthContext.Provider value={{ authData, updateAuthData, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

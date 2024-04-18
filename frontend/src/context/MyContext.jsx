import React from "react";

import { createContext, useContext } from "react";

import { Outlet } from "react-router-dom";

export const TheContext = createContext(null);

const MyContext = ({ children }) => {
  return (
    <div>
      <h1>PROVIDER!</h1>
      <TheContext.Provider value={"Jesus Fking Christ"}>
        {children}
      </TheContext.Provider>
    </div>
  );
};

export default MyContext;

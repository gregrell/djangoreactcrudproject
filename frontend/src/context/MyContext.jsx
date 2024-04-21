import React from "react";

import { createContext, useContext } from "react";
import AuthContext from "./AuthContext";

export const TheContext = createContext(null);

const MyContext = ({ children }) => {
  return (
    <div>
      <h1>PROVIDER!</h1>
      <TheContext.Provider value={"My Context String"}>
        <AuthContext>{children}</AuthContext>
      </TheContext.Provider>
    </div>
  );
};

export default MyContext;

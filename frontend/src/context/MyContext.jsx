/* My Context
Used in App.js to encapsulate all routes in a browser router
context is created here as TheContext, and an initial string value is assigned 
to it here. TheContext is then provided to all children to this component.

This component also imports AuthContext which handles user authorizations. 
Children of this MyContext component are also wrapped with AuthContext. Children
of this component therefore have access to 2 contexts - MyContext and AuthContext
*/

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

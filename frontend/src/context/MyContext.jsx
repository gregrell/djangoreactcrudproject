/* My Context
Used in App.js to encapsulate all routes in a browser router
context is created here as TheContext, and an initial string value is assigned 
to it here. TheContext is then provided to all children to this component.

This component also imports AuthContext which handles user authorizations. 
Children of this MyContext component are also wrapped with AuthContext. Children
of this component therefore have access to 2 contexts - MyContext and AuthContext
*/

import React from "react";

import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";

export const TheContext = createContext(null);

const MyContext = ({ children }) => {
  const [user, setUser] = useState(null);

  let appInfo = {
    userState: { user, setUser },
  };

  return (
    <div>
      <h3>
        This is the start of context provider. context provider as
        'MyContext.jsx'
      </h3>
      <TheContext.Provider value={appInfo}>
        <AuthContext>{children}</AuthContext>
      </TheContext.Provider>
      <h3>end context provider 'MyContext.jsx'</h3>
    </div>
  );
};

export default MyContext;

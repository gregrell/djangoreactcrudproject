import React from "react";
import { useContext, createContext } from "react";

const authcontextdata = createContext(null);

export function useAuthContext() {
  return useContext(authcontextdata);
}
const AuthContext = ({ children, ...rest }) => {
  const authcontextvalue = {
    name: "greg",
  };

  return (
    <>
      <authcontextdata.Provider value={authcontextvalue}>
        <div {...rest}>{children}</div>
      </authcontextdata.Provider>
    </>
  );
};

export default AuthContext;

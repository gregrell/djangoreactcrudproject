import React from "react";
import { useContext, createContext, useState } from "react";

const authcontextdata = createContext(null);

export function useAuthContext() {
  return useContext(authcontextdata);
}
const AuthContext = ({ children, ...rest }) => {
  let [user, setUser] = useState();
  let [auth, setAuth] = useState();

  async function loginUser(username, password) {
    let server1 = "https://www.boredapi.com/api/activity";
    let server2 = "http://localhost:8000/api/token/";

    const user = { username: username, password: password };

    let response = await fetch(server2, {
      method: "POST",
      user,
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(user),
    });

    const activity = await response.json();
    console.log(activity);
  }

  let authcontextvalue = {
    name: "greg",
    loginUser,
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

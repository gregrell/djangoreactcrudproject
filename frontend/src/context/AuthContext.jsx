import React from "react";
import { useContext, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const authcontextdata = createContext(null);

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

    const data = await response.json();
    if (response.status !== 200) {
      console.log(response.statusText);
    }
    if (response.status === 200) {
      setAuth(data);
      setUser(jwtDecode(data.access));
      console.log(jwtDecode(data.access));
    }
  }

  let authcontextvalue = {
    loginUser,
    user: user,
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

export function useAuthContext() {
  return useContext(authcontextdata);
}

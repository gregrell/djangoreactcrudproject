import React from "react";
import { useContext, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const authcontextdata = createContext(null);

const AuthContext = ({ children, ...rest }) => {
  let navigate = useNavigate();

  let [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? jwtDecode(JSON.parse(localStorage.getItem("user")))
      : null
  );
  let [auth, setAuth] = useState(() =>
    JSON.parse(localStorage.getItem("auth"))
  );

  async function loginUser(username, password) {
    //let server1 = "https://www.boredapi.com/api/activity";
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
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data.access));
      navigate("/");
    }
  }

  function logoutUser() {
    setAuth(null);
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/");
  }

  let authcontextvalue = {
    loginUser,
    logoutUser,
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

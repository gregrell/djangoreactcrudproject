//This AuthContext component is called from the parent MyContext component.
//The MyContext component will share context globally with the application

import React from "react";
import { useContext, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { jwtEncode } from "jwt-encode";
import { useNavigate } from "react-router-dom";
import { useUserCRUD } from "../utils/api";
import { TheContext } from "../context/MyContext";

const authcontextdata = createContext(null);

const AuthContext = ({ children, ...rest }) => {
  let navigate = useNavigate();
  const userCRUD = useUserCRUD();
  const appSettings = useContext(TheContext);

  let [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? jwtDecode(JSON.parse(localStorage.getItem("user")))
      : null
  );
  let [auth, setAuth] = useState(() =>
    JSON.parse(localStorage.getItem("auth"))
  );

  const [loaded, setLoaded] = useState(false);

  async function loginUser(username, password) {
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
      setUser(jwtDecode(data?.access));
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(data.access));
      navigate("/");
    }
  }

  async function refreshToken() {
    let server2 = "http://localhost:8000/api/token/refresh/";

    let response = await fetch(server2, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(auth),
    });

    const data = await response.json();
    if (response.status !== 200) {
      logoutUser();
    }
    if (response.status === 200) {
      const newtokens = {
        refresh: auth.refresh,
        access: data.access,
      };
      setAuth(newtokens);
      setUser(jwtDecode(data.access));
      localStorage.setItem("auth", JSON.stringify(newtokens));
      localStorage.setItem("user", JSON.stringify(data.access));
    }
    setLoaded(true);
  }

  function logoutUser() {
    setAuth(null);
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/");
  }

  function isAuth() {
    return user && user;
  }

  function authHeader() {
    return `Bearer ${auth.access}`;
  }

  //Refresh token poll

  React.useEffect(() => {
    if (!loaded && user) {
      refreshToken();
    }

    let interval = setInterval(() => {
      if (user) {
        refreshToken();
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [user, loaded]);

  // Use Effect to set the user in the userCRUD hook when the auth context user changes
  React.useEffect(() => {
    if (user) {
      userCRUD.getUser({ id: user.user_id, authcontext: authcontextvalue });
    } else {
      userCRUD.setUser(null);
    }
  }, [user]);

  //Use effect to set the global user in the app settings context
  React.useEffect(() => {
    appSettings.userState.setUser(userCRUD.user);
  }, [userCRUD.user]);

  let authcontextvalue = {
    loginUser,
    logoutUser,
    user: user,
    auth: auth,
    isAuth,
    authHeader,
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

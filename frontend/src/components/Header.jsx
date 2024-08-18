import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TheContext } from "../context/MyContext";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const somecontext = useContext(TheContext);
  const authcontext = useAuthContext();
  const { user } = authcontext;

  React.useEffect(() => {}, []);

  return (
    <>
      <p>
        This is the Header Component 'Header.jsx' <br />
        Super user: Greg, password:3686 header context {somecontext} <br />{" "}
        Logged in: <br />
        authcontext: user ID: {user && user.user_id} <br />
        user name: {user && user.username}
        <br />
      </p>
      <Link to="/">notes</Link>
      <span>|</span>
      {!user && <Link to="login">login</Link>}
      {user && <Link to="logout">logout</Link>}
      {user && <Link to="usersettings">User Settings</Link>}
      <br />
      End of Header Component
      <br />
    </>
  );
};

export default Header;

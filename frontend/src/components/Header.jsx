import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TheContext } from "../context/MyContext";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const somecontext = useContext(TheContext);
  const authcontext = useAuthContext();
  const { user } = authcontext;
  return (
    <>
      <p>
        user: Greg, password:3686 header context {somecontext} <br />{" "}
        authcontext: user ID: {user && user.user_id}
      </p>
      <Link to="/">notes</Link>
      <span>|</span>
      <Link to="login">login</Link>
      <br />
      <br />
    </>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TheContext } from "../context/MyContext";

const Header = () => {
  const somecontext = useContext(TheContext);
  return (
    <>
      <p>user: Greg, password:3686 header context {somecontext}</p>
      <Link to="/">notes</Link>
      <span>|</span>
      <Link to="login">login</Link>
      <br />
      <br />
    </>
  );
};

export default Header;

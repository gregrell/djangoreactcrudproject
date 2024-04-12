import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <p>user: Greg, password:3686</p>
      <Link to="/">notes</Link>
      <span>|</span>
      <Link to="login">login</Link>
      <br />
      <br />
    </>
  );
};

export default Header;

import React from "react";
import { useContext } from "react";
import { TheContext } from "../context/MyContext";

const LoginPage = () => {
  const somecontext = useContext(TheContext);
  return (
    <>
      <p>login page context {somecontext}</p>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          autoComplete="current-password"
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default LoginPage;

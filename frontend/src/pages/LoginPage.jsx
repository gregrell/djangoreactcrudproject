import React from "react";
import { useContext } from "react";
import { TheContext } from "../context/MyContext";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const somecontext = useContext(TheContext);
  const authcontext = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username && password) {
      authcontext.loginUser(username, password);
    }
    if (!username) {
      alert("username is blank");
    }
    if (!password) {
      alert("password is blank");
    }
  }

  return (
    <>
      <p>login page context {somecontext}</p>
      <form onSubmit={handleSubmit}>
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

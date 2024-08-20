import React from "react";
import { useContext } from "react";
import { TheContext } from "../context/MyContext";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const somecontext = useContext(TheContext);
  const authcontext = useAuthContext();
  const navigate = useNavigate();

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

  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <>
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
      <button onClick={handleSignupClick}>Sign Up</button>
    </>
  );
};

export default LoginPage;

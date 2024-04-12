import React from "react";

const LoginPage = () => {
  return (
    <>
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

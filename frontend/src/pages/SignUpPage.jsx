import React, { useState } from "react";
import { useUserLookupAPI } from "../utils/api";

const SignUpPage = () => {
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const [usernameExists] = useUserLookupAPI(form);

  function handleSubmit() {}

  function handleInputChange(e) {
    setForm((rest) => ({ ...rest, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <div>Sign Up Page Start</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          autoComplete="username"
          onChange={handleInputChange}
          value={form.username || ""}
        />
        {usernameExists && <p>Username already exists</p>}
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          autoComplete="email"
          onChange={handleInputChange}
          value={form.email || ""}
        />
        <br />

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          autoComplete="First Name"
          onChange={handleInputChange}
          value={form.firstname || ""}
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          autoComplete="Last Name"
          onChange={handleInputChange}
          value={form.lastname || ""}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={form.password || ""}
        />
        <br />

        <input type="submit" value="Sign Up" disabled={!complete} />
      </form>
      <div>Sign Up Page End</div>
    </>
  );
};

export default SignUpPage;

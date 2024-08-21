import React, { useEffect, useState } from "react";
import { useUserLookupAPI, useUserCRUD } from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const navigate = useNavigate();

  //Use effect is called every time the form changes. Will call check complete which
  //determines if everything is filled in properly.
  useEffect(() => {
    checkFormComplete();
  }, [form]);

  const [usernameExists, userEmailExists] = useUserLookupAPI(form);

  const useUser = useUserCRUD();

  async function handleSubmit(e) {
    e.preventDefault();
    let success = false;
    const user = {
      username: form.username,
      email: form.email,
      first_name: form.firstname,
      last_name: form.lastname,
      password: form.password,
    };

    success = await useUser.createUser(user);
    if (success) {
      //Navigate("/login");
      navigate("/login");
    } else {
      console.log("could not create user");
      //todo: error handle user creation gone wrong
    }
  }

  function handleInputChange(e) {
    setForm((rest) => ({ ...rest, [e.target.name]: e.target.value }));
  }

  function checkFormComplete() {
    const usernamelengthok = form.username.length > 2;
    const emailmatch = form.email.match(
      //email format string, check if the email address is ok, then put result in emailmatch
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let emailformatok = false;
    if (!!emailmatch) {
      //if email match is not null then the format is ok
      emailformatok = true;
    }

    const firstnamelengthok = form.firstname.length > 0;
    const lastnamelengthok = form.lastname.length > 0;
    const passwordlengthok = form.password.length > 0;
    setComplete(
      usernamelengthok &&
        emailformatok &&
        firstnamelengthok &&
        lastnamelengthok &&
        passwordlengthok &&
        !usernameExists &&
        !userEmailExists
    );
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
        {userEmailExists && <p>Email already exists</p>}

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

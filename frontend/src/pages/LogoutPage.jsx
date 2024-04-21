import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext, { useAuthContext } from "../context/AuthContext";

const LogoutPage = () => {
  const authcontext = useAuthContext();
  const navigate = useNavigate();

  authcontext.logoutUser();
  navigate("/");
  return <div>LogoutPage</div>;
};

export default LogoutPage;

import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext, { useAuthContext } from "../context/AuthContext";

const LogoutPage = () => {
  const authcontext = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    authcontext.logoutUser();
    navigate("/");
  }, []);

  return <div>Logout Page</div>;
};

export default LogoutPage;

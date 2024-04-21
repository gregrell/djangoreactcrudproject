import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const authcontext = useAuthContext();
  const isAuthenticated = authcontext.isAuth();

  if (isAuthenticated) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <Navigate to="login" />
      </div>
    );
  }
};

export default PrivateRoute;

import React from "react";
import { Outlet, Navigate } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
};

export default PrivateRoute;

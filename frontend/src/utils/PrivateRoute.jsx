import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = false;

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

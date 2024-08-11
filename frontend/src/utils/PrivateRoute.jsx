/* 
  This component is used in App.js in a BrowserRouter component. Its children are 
  routes that require the user to be logged in to access.  This component uses information
  from AuthContext to determine if the user is logged in or not. If isAuthenticatd is true
  then the user is logged in and can access the Outlet component. If the user is not logged
  in, they are redirected to login page. The Outlet component will send all children of this 
  component to it when the user is authorized
*/

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const authcontext = useAuthContext();
  const isAuthenticated = authcontext.isAuth();

  if (isAuthenticated) {
    return (
      <div>
        <h3>
          User is authenticated - Outlet: The default home / position goes to
          'NotesListPage.jsx' <br />
        </h3>
        <Outlet />
      </div>
    );
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

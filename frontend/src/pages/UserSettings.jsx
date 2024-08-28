import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { MyContext, TheContext } from "../context/MyContext";
import { useExtendedUserInfoCrud } from "../utils/api";
import { useContext } from "react";

const UserSettings = ({ params }) => {
  const authcontext = useAuthContext();
  const { user } = authcontext;
  const [extendedUserInfo] = useExtendedUserInfoCrud(authcontext);
  const appSettings = useContext(TheContext);

  //appSettings.userState.setUser(user);

  console.log("rendered UserSettings");

  return (
    <div>
      User Settings Page Start
      <br />
      <div>
        <p>User Name: {user?.username}</p>
        <br />
        <p>Email: {user?.email}</p>
        <br />
        <p>First Name: {user?.first_name}</p>
        <br />
        {/*  <p>Last Name: {appSettings.userState?.user}</p>
        <br />
        
        <p>DOB: {extendedUserInfo?.dob}</p> */}
      </div>
      <br />
      User Settings Page End
    </div>
  );
};

export default UserSettings;

import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useUserInfoCrud } from "../utils/api";

const UserSettings = ({ params }) => {
  const authcontext = useAuthContext();
  const { user } = authcontext;
  const [userInfo] = useUserInfoCrud(authcontext);
  return (
    <div>
      User Settings Page Start
      <br />
      <div>
        <p>User Name: {user.username}</p>
        <br />
        <p>Email: {user.email}</p>
        <br />
        <p>First Name: {userInfo?.first_name}</p>
        <br />
        <p>Last Name: {userInfo?.last_name}</p>
        <br />
        <p>DOB: {userInfo?.dob}</p>
      </div>
      <br />
      User Settings Page End
    </div>
  );
};

export default UserSettings;

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SessionContext from "./SessionContext";
import { FirebaseContext } from "./Firebase";
import * as ROUTES from "../constants/routes";

const userMap = {
  H: "Health Post",
  V: "Volunteers",
  R: "Rescue Team",
  T: "Tourist"
};

export default function AccountPage() {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.HOME);

  const firebase = useContext(FirebaseContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (authUser)
      firebase.GetUser(authUser.uid).then(doc => {
        setUserInfo({ ...doc.data(), email: authUser.email });
      });
  }, [firebase, authUser]);

  return authUser ? (
    <>
      <br />
      <h2>Name: {userInfo.name}</h2>
      <h2>Phone Number: {userInfo.phoneNumber}</h2>
      <h2>Role: {userMap[userInfo.role]}</h2>
      {userInfo.latitude && (
        <h2>Location: {`${userInfo.latitude}, ${userInfo.longitude}`}</h2>
      )}
    </>
  ) : (
    <h2>Please Login First</h2>
  );
}

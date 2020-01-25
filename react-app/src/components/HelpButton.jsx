import React, { useContext } from "react";
import { FirebaseContext } from "./Firebase";
import SessionContext from "./SessionContext";
import GetGeoLocation from "../utilities/location";
import "./HelpButton.css";

const HelpButton = () => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(SessionContext);

  const handleClick = () => {
    console.log("Async command started");
    GetGeoLocation(({ coords }) => {
      if (authUser)
        firebase.UsersRef.doc(authUser.uid)
          .update({
            toRescue: true,
            latitude: coords.latitude,
            longitude: coords.longitude
          })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
    }, true);
  };

  return (
    <div className="sonar-wrapper">
      <div className="sonar-emitter" onClick={handleClick}>
        <div className="sonar-wave"></div>
      </div>
    </div>
  );
};

export default HelpButton;

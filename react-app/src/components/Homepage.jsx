import React from "react";
import Tourist from "./Tourist";
import Volunteer from "./Volunteer";
import Alert from "react-bootstrap/Alert";

const Homepage = ({ authUser }) => {
  if (authUser && authUser.tourist) {
    return (
      <div>
        <Tourist authUser={authUser} />
        <Volunteer authUser={authUser} />
      </div>
    );
  } else
    return (
      <div>
        <Alert variant="info">Please login first</Alert>
      </div>
    );
};

export default Homepage;

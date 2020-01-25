import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Tourist from "./Tourist";
import Volunteer from "./Volunteer";
import Alert from "react-bootstrap/Alert";
import SessionContext from "./SessionContext";
import * as ROUTES from "../constants/routes";

const Homepage = () => {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);
  if (authUser) {
    if (authUser.tourist) {
      return (
        <div>
          <Tourist authUser={authUser} />
        </div>
      );
    } else {
      return (
        <div>
          <Volunteer authUser={authUser} />
        </div>
      );
    }
  } else
    return (
      <div>
        <Alert variant="info">Please login first</Alert>
      </div>
    );
};

export default Homepage;

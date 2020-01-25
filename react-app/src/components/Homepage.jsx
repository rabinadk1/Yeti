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
    if (authUser.tourist) return <Tourist authUser={authUser} />;
    else return <Volunteer authUser={authUser} />;
  } else return <Alert variant="info">Please login first</Alert>;
};

export default Homepage;

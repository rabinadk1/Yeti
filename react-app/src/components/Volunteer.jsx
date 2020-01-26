import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SessionContext from "./SessionContext";
import * as ROUTES from "../constants/routes";

import "./HelpButton.css";

const Volunteer = () => {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);

  if (authUser.tourist) history.push(ROUTES.TOURIST);

  return (
    <div>
      <Button
        variant="outline-success"
        size="lg"
        block
        onClick={() => history.push(ROUTES.VOLUNTEER_MAP)}
      >
        Anyone needs my help?
      </Button>
    </div>
  );
};

export default Volunteer;

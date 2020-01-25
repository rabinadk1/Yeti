import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import * as ROUTES from "../constants/routes";
import HelpButton from "./HelpButton";
import SessionContext from "./SessionContext";

const Tourist = () => {
  const history = useHistory();

  const authUser = useContext(SessionContext);
  if (!authUser) history.push(ROUTES.LOG_IN);

  return (
    <div>
      <HelpButton />
      <Button
        variant="outline-success"
        size="lg"
        block
        onClick={() => history.push(ROUTES.SEE_OTHER)}
      >
        Helpers Near me
      </Button>
    </div>
  );
};

export default Tourist;
